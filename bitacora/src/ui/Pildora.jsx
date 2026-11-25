import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { anotarMuestra, velocidadDe } from '../logica/gesto.js'
import { RESORTE } from './movimiento.js'
import { useReducido } from './useOpciones.js'

// Píldora de navegación que se arrastra, la misma de teoria-musical (components/BarraPestanas.jsx y CaminoLecciones.jsx):
//  - FLOTA: mientras el dedo está apoyado, la barra lo sigue con resistencia, sin pasar de `max` px; al soltar vuelve.
//  - MATRACA: al llegar a otra opción (arrastrando, tocando o con flechas) la barra da un golpe, como si el dedo la
//    jalara: se INCLINA según dónde está la opción (0° al centro, `max` en las orillas) y según si el dedo va por
//    encima o por debajo del eje de la barra; lo que no se va en inclinación se va en un golpe LATERAL. Sin dedo
//    que jale (tocar, flechas), solo el golpe lateral. Todo vuelve a 0 a los `vuelve` ms.
//  - IMÁN: la marca se corre un poco hacia el dedo sin dejar su opción.
//  - Arrastrar de lado cambia de opción EN VIVO. Jalar hacia arriba o abajo (más vertical que horizontal) se lo pasa a
//    `alJalar(fase, { dy, vy })`: quien contiene la barra la mueve y decide si cambia de lado o rebota
//    (src/ui/Navegacion.jsx y src/logica/gesto.js). En 'mover' devuelve true si al soltar cambiaría de lado.
export const FLOTA = { factor: 0.5, max: 14 }
export const MATRACA = {
  max: 3,
  eje: 4,
  rango: 22,
  lateral: 4,
  vuelve: 50,
  golpe: { ...RESORTE.pulsar, stiffness: RESORTE.pulsar.stiffness * 4, damping: RESORTE.pulsar.damping * 2 },
  vuelta: { ...RESORTE.suave, stiffness: RESORTE.suave.stiffness * 4, damping: RESORTE.suave.damping * 2 },
}
export const REBOTE = { type: 'spring', stiffness: 520, damping: 11, mass: 0.7 }
const IMAN = 0.35
const IMAN_MAX = 14

const gradosMatraca = (i, total) => {
  const centro = (total - 1) / 2
  return centro > 0 ? (MATRACA.max * (i - centro)) / centro : 0
}
const flotar = (d) => {
  const e = Math.abs(d) * FLOTA.factor
  return Math.sign(d) * (e / (1 + e / FLOTA.max))
}

/**
 * items: [{ id, nombre, Icono? }]. `variante`: 'pestanas' (ícono; la elegida crece y muestra su nombre, o todas con
 * nombre si `todas`) o 'vistas' (solo texto, a lo ancho). `alIr(item)` navega; `alRepetir()` al tocar la que ya está.
 * `vuelta`: cambia cada vez que la barra pasa al otro lado; así la marca blanca no vuela de la barra vieja a la nueva.
 */
export default function Pildora({ items, activo, variante = 'pestanas', todas = false, etiqueta, alIr, alRepetir, alJalar, vuelta = 0, className = '' }) {
  const reducir = useReducido()
  const indiceRuta = items.findIndex((x) => x.id === activo)
  const [foco, setFoco] = useState(indiceRuta)
  const focoRef = useRef(foco)
  const arrastre = useRef(null)
  const botones = useRef([])
  const iman = useMotionValue(0)
  const flotaX = useMotionValue(0)
  const flotaY = useMotionValue(0)
  const giro = useMotionValue(0)
  const golpe = useMotionValue(0)
  const escala = useMotionValue(1)
  const tiempo = useRef(null)

  const cambiarFoco = (i) => {
    focoRef.current = i
    setFoco(i)
  }
  useEffect(() => {
    if (!arrastre.current) cambiarFoco(indiceRuta)
  }, [indiceRuta])
  useEffect(() => () => clearTimeout(tiempo.current), [])

  const matraca = (i, dir, tiron = 0) => {
    if (reducir) return
    clearTimeout(tiempo.current)
    const grados = gradosMatraca(i, items.length) * tiron
    animate(giro, grados, MATRACA.golpe)
    animate(golpe, dir * MATRACA.lateral * (1 - Math.abs(grados) / MATRACA.max), MATRACA.golpe)
    tiempo.current = setTimeout(() => {
      animate(giro, 0, MATRACA.vuelta)
      animate(golpe, 0, MATRACA.vuelta)
    }, MATRACA.vuelve)
  }

  const ir = (i) => {
    if (i === indiceRuta) return alRepetir?.()
    cambiarFoco(i)
    alIr(items[i])
  }

  const centro = (i) => {
    const c = botones.current[i]?.getBoundingClientRect()
    return c ? c.left + c.width / 2 : 0
  }
  const masCercana = (x) => items.reduce((mejor, _, i) => (Math.abs(centro(i) - x) < Math.abs(centro(mejor) - x) ? i : mejor), 0)

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch {
      /* puntero que ya no existe */
    }
    const caja = e.currentTarget.getBoundingClientRect()
    arrastre.current = {
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      eje: caja.top + caja.height / 2,
      movio: false,
      vertical: false,
      listo: false,
      muestras: [{ t: e.timeStamp, x: e.clientX, y: e.clientY }],
    }
  }
  const onPointerMove = (e) => {
    const s = arrastre.current
    if (!s || s.id !== e.pointerId) return
    const dx = e.clientX - s.x0
    const dy = e.clientY - s.y0
    anotarMuestra(s.muestras, { t: e.timeStamp, x: e.clientX, y: e.clientY })
    if (!s.movio && Math.hypot(dx, dy) < 8) return
    if (!s.movio) s.vertical = Math.abs(dy) > Math.abs(dx) * 1.2 && !!alJalar
    s.movio = true
    if (s.vertical) {
      // La barra entera la mueve quien la contiene. Al pasar el umbral, un rebote avisa que al soltar cambia de lado.
      const listo = !!alJalar('mover', { dy, vy: velocidadDe(s.muestras).vy })
      if (listo !== s.listo) {
        s.listo = listo
        if (!reducir) animate(escala, listo ? 0.95 : 1, REBOTE)
      }
      return
    }
    if (!reducir) {
      flotaX.set(flotar(dx) * 0.4)
      flotaY.set(flotar(dy))
    }
    const i = masCercana(e.clientX)
    if (i !== focoRef.current) {
      const d = e.clientY - (s.eje + flotaY.get())
      const tiron = Math.sign(d) * Math.min(1, Math.max(0, (Math.abs(d) - MATRACA.eje) / MATRACA.rango))
      matraca(i, Math.sign(i - focoRef.current), tiron)
      cambiarFoco(i)
      alIr(items[i])
    }
    if (!reducir) iman.set(Math.max(-IMAN_MAX, Math.min(IMAN_MAX, (e.clientX - centro(focoRef.current)) * IMAN)))
  }
  const soltar = (e) => {
    const s = arrastre.current
    if (!s || s.id !== e.pointerId) return
    arrastre.current = null
    animate(flotaX, 0, RESORTE.suave)
    animate(flotaY, 0, RESORTE.suave)
    animate(iman, 0, REBOTE)
    animate(escala, 1, RESORTE.suave)
    if (s.vertical) {
      const dy = e.type === 'pointerup' ? e.clientY - s.y0 : 0
      alJalar(e.type === 'pointerup' ? 'soltar' : 'cancelar', { dy, vy: e.type === 'pointerup' ? velocidadDe(s.muestras).vy : 0 })
      return
    }
    if (e.type !== 'pointerup') return
    if (!s.movio) {
      const i = masCercana(e.clientX)
      if (i !== focoRef.current) matraca(i, Math.sign(i - focoRef.current))
      ir(i)
    }
  }

  const onKeyDown = (e) => {
    const paso = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!paso) return
    e.preventDefault()
    const i = Math.min(items.length - 1, Math.max(0, focoRef.current + paso))
    if (i === focoRef.current) return
    matraca(i, paso)
    ir(i)
    requestAnimationFrame(() => botones.current[i]?.focus())
  }

  const transicion = reducir ? { duration: 0 } : RESORTE.pulsar
  const pestanas = variante === 'pestanas'

  return (
    <motion.div style={{ x: flotaX, y: flotaY, scale: escala }} className={`pointer-events-auto w-full ${className}`}>
      <motion.div
        role="tablist"
        aria-label={etiqueta}
        className={`vidrio relative flex w-full select-none items-center justify-between rounded-full ${pestanas ? 'h-15 px-1.5' : 'h-12 gap-1 p-1'} border border-blanco/70 bg-white/75 backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_0_0.5px_rgb(16_18_28/0.12),0_8px_28px_rgb(16_18_28/0.12),inset_0_1px_0_rgb(255_255_255/0.7)] dark:border-blanco/15 dark:shadow-[0_0_0_0.5px_rgb(0_0_0/0.45),0_8px_28px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.12)]`}
        style={{ touchAction: 'none', rotate: giro, x: golpe }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={soltar}
        onPointerCancel={soltar}
        onKeyDown={onKeyDown}
      >
        <LayoutGroup id={`pildora-${etiqueta}-${vuelta}`}>
          {items.map((p, i) => {
            const activa = i === foco
            const conNombre = !pestanas || activa || todas
            const Icono = p.Icono
            return (
              <motion.button
                key={p.id}
                ref={(el) => (botones.current[i] = el)}
                layout={pestanas}
                transition={transicion}
                type="button"
                role="tab"
                aria-selected={activa}
                aria-label={p.nombre}
                tabIndex={activa ? 0 : -1}
                data-opcion={p.id}
                // Con el dedo o el ratón lo resuelve la píldora (pointerup); este clic es el del teclado o el lector.
                onClick={(e) => e.detail === 0 && ir(i)}
                className={`relative flex items-center justify-center rounded-full transition-colors duration-200 ${activa ? 'text-zinc-900' : 'text-zinc-500'} ${
                  !pestanas ? `h-full min-w-0 font-bold ${items.length > 4 ? 'flex-auto px-1 text-sm sm:text-[0.9375rem]' : 'flex-1 px-2 text-base'}` : todas ? 'h-13 min-w-0 flex-1 flex-col gap-0.5 px-1' : activa ? 'h-12 shrink-0 gap-1.5 px-4' : 'size-12 shrink-0'
                }`}
              >
                {activa && (
                  <motion.span layoutId="marca" transition={transicion} className="absolute inset-0" aria-hidden="true">
                    <motion.span className="absolute inset-0 rounded-full bg-white shadow-[0_1px_5px_rgb(16_18_28/0.18)] dark:bg-zinc-100" style={{ x: iman }} />
                  </motion.span>
                )}
                {Icono && (
                  <motion.span layout="position" transition={transicion} className="relative grid place-items-center">
                    <Icono width={activa ? 26 : 24} height={activa ? 26 : 24} strokeWidth={activa ? 2.3 : 2} />
                  </motion.span>
                )}
                {pestanas ? (
                  <AnimatePresence initial={false}>
                    {conNombre && (
                      <motion.span
                        key="nombre"
                        initial={todas ? false : { opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={transicion}
                        className={`relative overflow-hidden whitespace-nowrap ${todas ? 'max-w-full truncate text-[0.75rem]' : 'text-sm'} ${activa ? 'font-bold' : 'font-semibold'}`}
                        aria-hidden="true"
                      >
                        {p.nombre}
                      </motion.span>
                    )}
                  </AnimatePresence>
                ) : (
                  <span className="relative truncate">{p.corto ?? p.nombre}</span>
                )}
              </motion.button>
            )
          })}
        </LayoutGroup>
      </motion.div>
    </motion.div>
  )
}
