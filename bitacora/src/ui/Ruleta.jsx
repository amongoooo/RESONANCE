import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { anotarMuestra, resistencia, velocidadDe } from '../logica/gesto.js'
import { caminoCorto, conTope, desplazamiento, destino, indiceCentral, limitar, lugaresDe, modulo } from '../logica/ruleta.js'
import { REBOTE } from './Pildora.jsx'
import { RESORTE } from './movimiento.js'
import { useReducido } from './useOpciones.js'
import { VIDRIO } from './vidrio.js'

// Ruleta de navegación (Ajustes > Tipo de navegación > Ruleta), con el mismo vidrio que la barra.
//  - Se gira arrastrando de lado; al soltar sigue con el impulso y se detiene con una opción en la ventana del centro.
//    Esa es la elegida: navega en cuanto llega al centro (no mientras gira por las demás).
//  - Tocar una opción de un lado la gira hasta el centro. Tocar la del centro sube la página (como la barra).
//  - Si todas caben a la vista lleva TOPE; si no, es INFINITA (src/logica/ruleta.js).
//  - Jalar hacia arriba o abajo se lo pasa a `alJalar`, igual que Pildora.jsx (cambia de lado o rebota).

const ANCHO = { pestanas: 92, vistas: 104 }
const GIRO = { type: 'spring', stiffness: 260, damping: 32, restDelta: 0.001, restSpeed: 0.01 }
const GIRO_REDUCIDO = { type: 'tween', duration: 0.12, ease: 'easeOut' }
const MASCARA = 'linear-gradient(to right, transparent, #000 16%, #000 84%, transparent)'

function Casilla({ pos, s, lugares, tope, ancho, item, real, centro, pestanas, alTocar }) {
  const d = useTransform(pos, (p) => desplazamiento(s, p, lugares, tope))
  const x = useTransform(d, (v) => v * ancho)
  const scale = useTransform(d, (v) => 1 - 0.14 * Math.min(Math.abs(v), 2))
  const opacity = useTransform(d, (v) => Math.max(0, 1 - 0.32 * Math.abs(v)))
  const Comp = real ? motion.button : motion.div
  const extra = real
    ? { type: 'button', role: 'tab', 'aria-selected': centro, 'aria-label': item.nombre, tabIndex: -1, onClick: (e) => e.detail === 0 && alTocar() }
    : { 'aria-hidden': true }
  const Icono = item.Icono
  return (
    <Comp
      {...extra}
      style={{ x, scale, opacity, width: ancho, marginLeft: -ancho / 2 }}
      className={`absolute inset-y-0 left-1/2 flex flex-col items-center justify-center gap-px transition-colors duration-200 ${centro ? 'font-bold text-zinc-900' : 'font-semibold text-zinc-500'}`}
    >
      {Icono && <Icono width={24} height={24} strokeWidth={centro ? 2.3 : 2} />}
      <span className={`max-w-full truncate px-1 ${pestanas ? 'text-[0.75rem]' : 'text-[0.9375rem]'}`}>{pestanas ? item.nombre : (item.corto ?? item.nombre)}</span>
    </Comp>
  )
}

/** items: [{ id, nombre, corto?, Icono? }]. Mismas props que Pildora (`todas` no aplica). */
export default function Ruleta({ items, activo, variante = 'pestanas', etiqueta, alIr, alRepetir, alJalar }) {
  const reducir = useReducido()
  const pestanas = variante === 'pestanas'
  const ancho = ANCHO[variante]
  const n = items.length
  const indiceRuta = Math.max(0, items.findIndex((x) => x.id === activo))
  const rutaRef = useRef(indiceRuta)
  rutaRef.current = indiceRuta

  const caja = useRef(null)
  const [visible, setVisible] = useState(0)
  useLayoutEffect(() => {
    const el = caja.current
    const medir = () => setVisible(el.clientWidth)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const tope = visible > 0 && conTope(n, ancho, visible)
  const lugares = visible > 0 ? lugaresDe(n, ancho, visible, tope) : n

  const pos = useMotionValue(indiceRuta)
  const meta = useRef(indiceRuta)
  const [centro, setCentro] = useState(indiceRuta)
  useMotionValueEvent(pos, 'change', (p) => setCentro(indiceCentral(p, n)))
  const escala = useMotionValue(1)
  const arrastre = useRef(null)

  /** Gira hasta `m` (un entero) y elige esa opción en cuanto casi llega al centro. */
  const girar = (m, velocidad = 0) => {
    m = limitar(m, n, tope)
    meta.current = m
    let avisado = false
    const elegir = () => {
      if (avisado || meta.current !== m) return
      avisado = true
      const i = modulo(m, n)
      if (i !== rutaRef.current) alIr(items[i])
    }
    animate(pos, m, {
      ...(reducir ? GIRO_REDUCIDO : { ...GIRO, velocity: velocidad }),
      onUpdate: (p) => Math.abs(m - p) < 0.15 && elegir(),
      onComplete: elegir,
    })
  }

  // Si la página cambia por otro lado (un enlace, «atrás»), la ruleta gira hasta ella por el camino corto.
  useEffect(() => {
    if (arrastre.current || modulo(meta.current, n) === indiceRuta) return
    girar(caminoCorto(pos.get(), indiceRuta, n, tope))
  }, [indiceRuta])

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch {
      /* puntero que ya no existe */
    }
    pos.stop()
    arrastre.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, pos0: pos.get(), modo: null, listo: false, muestras: [{ t: e.timeStamp, x: e.clientX, y: e.clientY }] }
  }
  const onPointerMove = (e) => {
    const s = arrastre.current
    if (!s || s.id !== e.pointerId) return
    const dx = e.clientX - s.x0
    const dy = e.clientY - s.y0
    anotarMuestra(s.muestras, { t: e.timeStamp, x: e.clientX, y: e.clientY })
    if (!s.modo && Math.hypot(dx, dy) < 8) return
    if (!s.modo) s.modo = Math.abs(dy) > Math.abs(dx) * 1.2 && alJalar ? 'vertical' : 'lado'
    if (s.modo === 'vertical') {
      const listo = !!alJalar('mover', { dy, vy: velocidadDe(s.muestras).vy })
      if (listo !== s.listo) {
        s.listo = listo
        if (!reducir) animate(escala, listo ? 0.95 : 1, REBOTE)
      }
      return
    }
    let p = s.pos0 - dx / ancho
    // Con tope, pasarse de la primera o de la última cuesta cada vez más (y al soltar regresa).
    if (tope && p < 0) p = -resistencia(-p * ancho, 0.5, 36) / ancho
    if (tope && p > n - 1) p = n - 1 + resistencia((p - (n - 1)) * ancho, 0.5, 36) / ancho
    pos.set(p)
  }
  const soltar = (e) => {
    const s = arrastre.current
    if (!s || s.id !== e.pointerId) return
    arrastre.current = null
    animate(escala, 1, RESORTE.suave)
    const suelta = e.type === 'pointerup'
    if (s.modo === 'vertical') {
      alJalar(suelta ? 'soltar' : 'cancelar', { dy: suelta ? e.clientY - s.y0 : 0, vy: suelta ? velocidadDe(s.muestras).vy : 0 })
      return
    }
    if (s.modo === 'lado') {
      const velocidad = suelta && !reducir ? -velocidadDe(s.muestras).vx / ancho : 0 // opciones por segundo
      girar(destino({ pos: pos.get(), velocidad, n, tope }), velocidad)
      return
    }
    if (!suelta) return girar(Math.round(pos.get()))
    // Un toque: la opción que tocaste gira al centro; la del centro sube la página.
    const c = caja.current.getBoundingClientRect()
    const m = limitar(Math.round(pos.get() + (e.clientX - (c.left + c.width / 2)) / ancho), n, tope)
    if (m === Math.round(pos.get())) alRepetir?.()
    else girar(m)
  }
  const onKeyDown = (e) => {
    const paso = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!paso) return
    e.preventDefault()
    girar(Math.round(meta.current) + paso)
  }

  return (
    <motion.div style={{ scale: escala }} className="pointer-events-auto w-full">
      <div
        ref={caja}
        role="tablist"
        aria-label={etiqueta}
        tabIndex={0}
        className={`${VIDRIO} relative w-full overflow-hidden rounded-full select-none ${pestanas ? 'h-15' : 'h-12'}`}
        style={{ touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={soltar}
        onPointerCancel={soltar}
        onKeyDown={onKeyDown}
      >
        <span
          aria-hidden="true"
          className={`absolute left-1/2 rounded-full bg-white shadow-[0_1px_5px_rgb(16_18_28/0.18)] dark:bg-zinc-100 ${pestanas ? 'inset-y-1.5' : 'inset-y-1'}`}
          style={{ width: ancho - 8, marginLeft: -(ancho - 8) / 2 }}
        />
        <div className="absolute inset-0" style={tope ? undefined : { maskImage: MASCARA, WebkitMaskImage: MASCARA }}>
          {Array.from({ length: lugares }, (_, s) => (
            <Casilla
              key={s}
              pos={pos}
              s={s}
              lugares={lugares}
              tope={tope}
              ancho={ancho}
              item={items[s % n]}
              real={s < n}
              centro={s % n === centro}
              pestanas={pestanas}
              alTocar={() => girar(caminoCorto(pos.get(), s, n, tope))}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
