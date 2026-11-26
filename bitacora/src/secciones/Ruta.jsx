import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { corta } from '../logica/fechas.js'
import { Flecha, MarcaBien } from '../ui/Iconos.jsx'
import { colorFase } from '../ui/color.js'
import { DESPLEGAR, RESORTE } from '../ui/movimiento.js'
import Pulsable from '../ui/Pulsable.jsx'
import MetasDiarias from './MetasDiarias.jsx'

export default function Ruta({ D, fase, enCurso }) {
  const [abierta, setAbierta] = useState(fase.id)

  return (
    <div className="flex flex-col gap-10">
      <MetasDiarias tiempo={D.tiempo} />

      <section aria-labelledby="h-semanas" className="flex flex-col gap-5">
        <h2 id="h-semanas" className="font-titulo text-2xl font-bold tracking-tight">
          Las 32 semanas
        </h2>
        {/* Franja de fases: cada una mide lo que sus semanas */}
        <ol className="flex gap-1" aria-label="Fases">
          {D.fases.map((f) => {
            const suyas = D.semanas.filter((s) => s.fase === f.id)
            const hechas = suyas.filter((s) => s.hecha).length
            const c = colorFase(f.id)
            return (
              <li key={f.id} style={{ flex: `${suyas.length} 1 0` }} className="min-w-0">
                <span className="relative block h-3 overflow-hidden rounded-full" style={{ backgroundColor: c.suave }}>
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: c.base }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(hechas / suyas.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={RESORTE.suave}
                  />
                  {f.id === fase.id && <span className="absolute inset-0 rounded-full ring-2 ring-inset" style={{ '--tw-ring-color': c.base }} />}
                </span>
              </li>
            )
          })}
        </ol>

        <ul className="flex flex-col gap-3">
          {D.fases.map((f) => {
            const suyas = D.semanas.filter((s) => s.fase === f.id)
            const hechas = suyas.filter((s) => s.hecha).length
            const c = colorFase(f.id)
            const abiertaEsta = abierta === f.id
            return (
              <li key={f.id} className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
                <Pulsable
                  tipo="tarjeta"
                  onClick={() => setAbierta((a) => (a === f.id ? null : f.id))}
                  aria-expanded={abiertaEsta}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                >
                  <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: c.base }} aria-hidden="true" />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-titulo text-lg leading-tight font-bold tracking-tight" style={{ color: c.tinta }}>
                      {f.nombre}
                      {f.id === fase.id && <span className="ml-2 align-middle text-sm font-semibold text-zinc-500">(ahora)</span>}
                    </span>
                    <span className="text-sm text-zinc-500">
                      <span className="font-dato font-medium">{corta(f.inicio)} a {corta(f.fin)}</span> · {hechas} de {suyas.length} semanas
                    </span>
                  </span>
                  <motion.span animate={{ rotate: abiertaEsta ? 90 : 0 }} transition={RESORTE.pulsar} className="text-zinc-400">
                    <Flecha width={22} height={22} />
                  </motion.span>
                </Pulsable>
                <AnimatePresence initial={false}>
                  {abiertaEsta && (
                    <motion.div key="semanas" {...DESPLEGAR} className="overflow-hidden">
                      <p className="border-t border-zinc-100 px-5 pt-3 text-base text-zinc-600">{f.meta}</p>
                      <ol className="flex flex-col px-5 pt-1 pb-4">
                        {suyas.map((s) => {
                          const actual = enCurso && s.n === enCurso.n
                          return (
                            <li
                              key={s.n}
                              className={`flex items-start gap-3 border-t border-zinc-100 py-2.5 first:border-t-0 ${actual ? '-mx-2 rounded-2xl px-2' : ''}`}
                              style={actual ? { backgroundColor: c.suave } : undefined}
                            >
                              {s.hecha ? (
                                <MarcaBien tam={22} className="mt-0.5" />
                              ) : (
                                <span className="mt-0.5 size-[22px] shrink-0 rounded-full border-2 border-zinc-300" aria-hidden="true" />
                              )}
                              <span className="text-base leading-snug">
                                <span className="sr-only">{s.hecha ? 'Terminada: ' : 'Pendiente: '}</span>
                                <strong>Semana {s.n}</strong>{' '}
                                <span className="font-dato text-sm font-medium text-zinc-500">{corta(s.inicio)}</span>
                                {actual && <span className="ml-1 text-sm font-semibold" style={{ color: c.tinta }}>esta semana</span>}
                                <br />
                                <span className="text-zinc-700">{s.meta}</span>
                              </span>
                            </li>
                          )
                        })}
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
