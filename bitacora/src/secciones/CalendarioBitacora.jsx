import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { armarCalendario, contarPorDia, nivel } from '../logica/calendario.js'
import { larga } from '../logica/fechas.js'
import { Flecha } from '../ui/Iconos.jsx'
import { DESPLEGAR, RESORTE } from '../ui/movimiento.js'

// Superficie sólida (no vidrio): el calendario es contenido, y el texto que pasa por detrás no debe estorbar.
const SUPERFICIE = 'border border-zinc-200 bg-white shadow-[0_8px_24px_rgb(16_18_28/0.10)] dark:shadow-[0_8px_24px_rgb(0_0_0/0.45)]'

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const CELDA = 13 // px
const HUECO = 3 // px
const COL = CELDA + HUECO
/** Lupa: hasta cuántos px alrededor del cursor crecen los cuadritos, y cuánto crece el del centro. */
const RADIO = 46
const CRECE = 1.15

// Verde = «hecho» (sistema de color de la página): más registros ese día, verde más intenso.
const FONDO = [
  'var(--color-zinc-100)',
  'color-mix(in srgb, var(--color-bien) 35%, var(--color-zinc-100))',
  'color-mix(in srgb, var(--color-bien) 68%, var(--color-zinc-100))',
  'var(--color-bien)',
]

const nombreMes = (mes) => MESES[Number(mes.slice(5, 7)) - 1]
const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`
const describir = (d) =>
  d.total === 0
    ? `${larga(d.fecha)}: sin registros`
    : `${larga(d.fecha)}: ${[d.entradas && plural(d.entradas, 'entrada', 'entradas'), d.decisiones && plural(d.decisiones, 'decisión', 'decisiones')].filter(Boolean).join(' y ')}`

let guardadoAbierto = null
const leerAbierto = () => {
  if (guardadoAbierto !== null) return guardadoAbierto
  try {
    return localStorage.getItem('resonancia:calendario') !== 'guardado'
  } catch {
    return true
  }
}

/**
 * Calendario de cuadritos de la Bitácora, fijo arriba al bajar la página (debajo de la barra Bitácora | Decisiones).
 *  - Una columna por semana (lunes arriba). Va del inicio del proyecto a hoy: nada antes ni después.
 *  - Los meses van debajo y la tira se desliza de lado; empieza mostrando lo más reciente.
 *  - Tocar un mes lo resalta y lleva a ese mes en la bitácora (tocarlo otra vez lo suelta).
 *  - Con el cursor encima, efecto lupa: los cuadritos cercanos crecen y la página va a ese día. Con el dedo, tocar un día.
 *  - La pestañita de abajo guarda o saca el calendario (se recuerda en este navegador).
 */
export default function CalendarioBitacora({ entradas, decisiones, desde, hasta, mesActivo, alElegirMes, alElegirDia, refFijo }) {
  const porDia = useMemo(() => contarPorDia(entradas, decisiones), [entradas, decisiones])
  const { semanas, meses } = useMemo(() => armarCalendario(desde, hasta, porDia), [desde, hasta, porDia])
  const [abierto, setAbierto] = useState(leerAbierto)
  const [diaVisto, setDiaVisto] = useState(null)
  const tira = useRef(null)
  const celdas = useRef(new Map())
  const cuadro = useRef(0)
  const ultimoDia = useRef(null)

  const dias = semanas.flat().filter(Boolean)
  const conRegistro = dias.filter((d) => d.total > 0).length

  // Empieza mostrando lo más reciente (a la derecha).
  useLayoutEffect(() => {
    if (abierto && tira.current) tira.current.scrollLeft = tira.current.scrollWidth
  }, [abierto, semanas.length])

  const alternar = () => {
    const nuevo = !abierto
    guardadoAbierto = nuevo
    try {
      localStorage.setItem('resonancia:calendario', nuevo ? 'abierto' : 'guardado')
    } catch {
      /* nada */
    }
    setAbierto(nuevo)
  }

  // Lupa: cada cuadrito crece según qué tan cerca está del cursor (directo en el DOM, sin re-dibujar React).
  const lupa = (x, y) => {
    cancelAnimationFrame(cuadro.current)
    cuadro.current = requestAnimationFrame(() => {
      celdas.current.forEach((el) => {
        if (x === null) {
          el.style.transform = ''
          el.style.zIndex = ''
          return
        }
        const r = el.getBoundingClientRect()
        const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y)
        const f = Math.max(0, 1 - d / RADIO)
        el.style.transform = f > 0 ? `scale(${1 + CRECE * f * f})` : ''
        el.style.zIndex = f > 0 ? String(Math.round(f * 10)) : ''
      })
    })
  }
  useEffect(() => () => cancelAnimationFrame(cuadro.current), [])

  const ver = (dia) => {
    setDiaVisto(dia)
    if (dia && dia.fecha !== ultimoDia.current) {
      ultimoDia.current = dia.fecha
      alElegirDia(dia.fecha)
    }
  }

  const diaEn = (x, y) => {
    const el = document.elementFromPoint(x, y)?.closest('[data-fecha]')
    return el ? dias.find((d) => d.fecha === el.dataset.fecha) : null
  }

  const posMeses = []
  meses.forEach((m, i) => {
    const izq = Math.max(m.semana * COL, i ? posMeses[i - 1].izq + 30 : 0)
    posMeses.push({ ...m, izq })
  })
  const ancho = Math.max(semanas.length * COL - HUECO, (posMeses.at(-1)?.izq ?? 0) + 28)

  return (
    <div ref={refFijo} className="sticky z-20 -mx-1 flex flex-col items-center" style={{ top: 'var(--alto-arriba, 4.25rem)' }}>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div key="calendario" {...DESPLEGAR} className="w-full overflow-hidden">
            <div className={`flex w-full flex-col gap-2 rounded-3xl px-4 pt-3 pb-2.5 ${SUPERFICIE}`}>
              <div
                ref={tira}
                className="-mx-1 overflow-x-auto px-1 pt-2 pb-1 [scrollbar-width:none]"
                onPointerMove={(e) => {
                  if (e.pointerType !== 'mouse') return
                  lupa(e.clientX, e.clientY)
                  const d = diaEn(e.clientX, e.clientY)
                  if (d) ver(d)
                }}
                onPointerLeave={() => {
                  lupa(null)
                  setDiaVisto(null)
                  ultimoDia.current = null
                }}
              >
                <div className="relative mx-auto" style={{ width: ancho }}>
                  <div role="grid" aria-label="Días con registro" className="flex" style={{ gap: HUECO }}>
                    {semanas.map((semana, i) => (
                      <div key={i} role="row" className="flex flex-col" style={{ gap: HUECO }}>
                        {semana.map((d, j) =>
                          d ? (
                            <button
                              key={d.fecha}
                              ref={(el) => (el ? celdas.current.set(d.fecha, el) : celdas.current.delete(d.fecha))}
                              type="button"
                              role="gridcell"
                              data-fecha={d.fecha}
                              aria-label={describir(d)}
                              onClick={() => ver(d)}
                              className="relative rounded-[4px] transition-[transform,opacity,box-shadow] duration-150 ease-out"
                              style={{
                                width: CELDA,
                                height: CELDA,
                                backgroundColor: FONDO[nivel(d.total)],
                                opacity: mesActivo && d.mes !== mesActivo ? 0.3 : 1,
                                boxShadow:
                                  diaVisto?.fecha === d.fecha
                                    ? '0 0 0 2px var(--color-zinc-900)'
                                    : mesActivo === d.mes
                                      ? '0 0 0 1.5px var(--color-bien-tinta)'
                                      : 'inset 0 0 0 1px rgb(16 18 28 / 0.06)',
                              }}
                            />
                          ) : (
                            <span key={j} aria-hidden="true" style={{ width: CELDA, height: CELDA }} />
                          ),
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Meses debajo: tocar uno lo resalta y lleva a él */}
                  <div className="relative mt-1.5 h-7">
                    {posMeses.map((m) => {
                      const activo = m.mes === mesActivo
                      return (
                        <button
                          key={m.mes}
                          type="button"
                          aria-pressed={activo}
                          onClick={() => alElegirMes(activo ? null : m.mes)}
                          className={`absolute top-0 flex h-7 items-center rounded-full px-1.5 text-sm transition-colors ${
                            activo ? 'bg-bien-suave font-bold text-bien-tinta' : 'font-semibold text-zinc-500 hover:text-zinc-900'
                          }`}
                          style={{ left: m.izq - 6, touchAction: 'manipulation' }}
                        >
                          {nombreMes(m.mes)}
                          {m.mes.slice(5) === '01' || m === posMeses[0] ? <span className="ml-1 font-dato text-xs font-medium opacity-70">{m.mes.slice(2, 4)}</span> : null}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              <p aria-live="polite" className="min-h-5 text-center font-dato text-xs leading-5 text-zinc-500">
                {diaVisto ? describir(diaVisto) : `${plural(conRegistro, 'día', 'días')} con registro de ${dias.length}`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Pestañita: guarda o saca el calendario */}
      <button
        type="button"
        onClick={alternar}
        aria-expanded={abierto}
        className={`relative z-10 -mt-px flex h-8 items-center gap-1 rounded-b-2xl px-3.5 text-sm font-bold text-zinc-600 ${SUPERFICIE} ${abierto ? 'border-t-0 shadow-none' : 'mt-0 rounded-t-2xl'}`}
        style={{ touchAction: 'manipulation' }}
      >
        <motion.span animate={{ rotate: abierto ? -90 : 90 }} transition={RESORTE.pulsar} className="grid place-items-center">
          <Flecha width={16} height={16} strokeWidth={2.5} />
        </motion.span>
        {abierto ? 'Guardar' : 'Calendario'}
      </button>
    </div>
  )
}
