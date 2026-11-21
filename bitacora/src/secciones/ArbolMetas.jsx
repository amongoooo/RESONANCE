import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { avance, cumplida, esPaso } from '../logica/arbol.js'
import { larga, plazo } from '../logica/fechas.js'
import BarraProgreso from '../ui/BarraProgreso.jsx'
import { Check, Flecha, MarcaBien } from '../ui/Iconos.jsx'
import { DESPLEGAR, RESORTE } from '../ui/movimiento.js'
import Pulsable from '../ui/Pulsable.jsx'

/** ¿`id` está dentro de la rama `rama` (o es ella)? Los ids van como "0.2.1". */
const contiene = (rama, id) => id === rama || id?.startsWith(rama + '.')

function Paso({ nodo }) {
  return (
    <li className="flex items-start gap-3 py-2">
      {nodo.hecho ? (
        <MarcaBien tam={22} className="mt-0.5" />
      ) : (
        <span className="mt-0.5 size-[22px] shrink-0 rounded-full border-2 border-zinc-300" aria-hidden="true" />
      )}
      <span className={`text-base leading-snug ${nodo.hecho ? 'text-zinc-500 line-through decoration-zinc-300' : 'text-zinc-800'}`}>
        <span className="sr-only">{nodo.hecho ? 'Hecho: ' : 'Pendiente: '}</span>
        {nodo.titulo}
      </span>
    </li>
  )
}

function Rama({ nodo, abierta, alTocar, proxima, nivel }) {
  const { hechos, total } = avance(nodo)
  const lista = cumplida(nodo)
  const esProxima = proxima && nodo.id === proxima.id
  const [abiertaHija, setAbiertaHija] = useState(() => nodo.ramas.find((r) => !esPaso(r) && contiene(r.id, proxima?.id))?.id ?? null)

  return (
    <li className="relative">
      {/* Puntito sobre la línea del tronco */}
      <span
        aria-hidden="true"
        className={`absolute top-6 -left-[25px] size-3.5 rounded-full border-[3px] border-fondo ${lista ? 'bg-bien' : esProxima ? 'bg-fijate' : 'bg-zinc-300'}`}
      />
      <motion.div layout="position" transition={RESORTE.suave} className={`overflow-hidden rounded-3xl border bg-white ${esProxima ? 'border-fijate' : 'border-zinc-200'}`}>
        <Pulsable
          tipo="tarjeta"
          onClick={alTocar}
          aria-expanded={abierta}
          className="flex w-full items-start gap-3 px-5 py-4 text-left"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-2">
            <span className={`font-titulo font-bold leading-tight tracking-tight ${nivel === 0 ? 'text-xl' : 'text-lg'}`}>{nodo.titulo}</span>
            {nodo.fecha && (
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span className="font-dato font-medium text-zinc-500">{larga(nodo.fecha)}</span>
                {!lista && (
                  <span className={`rounded-full px-2.5 py-0.5 font-semibold ${esProxima ? 'bg-fijate-suave text-fijate-tinta' : 'bg-zinc-100 text-zinc-600'}`}>
                    {plazo(nodo.fecha)}
                  </span>
                )}
              </span>
            )}
            <span className="flex items-center gap-3">
              <BarraProgreso valor={total ? hechos / total : 0} className="flex-1" alto="h-2" etiqueta={`Avance de ${nodo.titulo}`} />
              <span className="font-dato text-sm font-medium tabular-nums text-zinc-500">
                {hechos}/{total}
              </span>
            </span>
          </span>
          {lista ? (
            <span className="mt-0.5 flex items-center gap-1 text-sm font-bold text-bien-tinta">
              <Check width={18} height={18} strokeWidth={3} /> Cumplida
            </span>
          ) : null}
          <motion.span animate={{ rotate: abierta ? 90 : 0 }} transition={RESORTE.pulsar} className="mt-0.5 text-zinc-400">
            <Flecha width={22} height={22} />
          </motion.span>
        </Pulsable>

        <AnimatePresence initial={false}>
          {abierta && (
            <motion.div key="hijas" {...DESPLEGAR} className="overflow-hidden">
              <div className="border-t border-zinc-100 px-5 pt-2 pb-4">
                {nodo.nota && <p className="mb-1 py-2 text-base leading-snug text-zinc-600">{nodo.nota}</p>}
                {nodo.limite && <p className="py-1 text-sm text-zinc-500">Límite duro: <span className="font-dato font-medium">{larga(nodo.limite)}</span></p>}
                <ul className="flex flex-col">
                  {nodo.ramas.filter(esPaso).map((p) => (
                    <Paso key={p.id} nodo={p} />
                  ))}
                </ul>
                {nodo.ramas.some((r) => !esPaso(r)) && (
                  <ul className="relative mt-3 ml-6 flex flex-col gap-3 border-l-2 border-zinc-200 pl-4">
                    {nodo.ramas
                      .filter((r) => !esPaso(r))
                      .map((r) => (
                        <Rama
                          key={r.id}
                          nodo={r}
                          nivel={nivel + 1}
                          proxima={proxima}
                          abierta={abiertaHija === r.id}
                          alTocar={() => setAbiertaHija((a) => (a === r.id ? null : r.id))}
                        />
                      ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </li>
  )
}

/** El árbol: la raíz arriba y sus ramas colgando de un tronco. Una rama abierta a la vez por nivel. */
export default function ArbolMetas({ raiz, proxima }) {
  const { hechos, total } = avance(raiz)
  const [abierta, setAbierta] = useState(() => raiz.ramas.find((r) => contiene(r.id, proxima?.id))?.id ?? null)
  const ramas = raiz.ramas.filter((r) => !esPaso(r))

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-3xl bg-zinc-900 px-5 py-5 text-white">
        <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">La meta grande</p>
        <p className="mt-1 font-titulo text-2xl font-extrabold tracking-tight">{raiz.titulo}</p>
        {raiz.fecha && (
          <p className="mt-1 text-base text-zinc-300">
            <span className="font-dato font-medium">{larga(raiz.fecha)}</span> · {plazo(raiz.fecha)}
          </p>
        )}
        <div className="mt-4 flex items-center gap-3">
          <BarraProgreso valor={total ? hechos / total : 0} className="flex-1" fondo="bg-zinc-700" etiqueta="Avance total" />
          <span className="font-dato text-sm font-medium tabular-nums text-zinc-300">
            {hechos} de {total} pasos
          </span>
        </div>
      </div>

      <ul className="relative ml-6 flex flex-col gap-3 border-l-2 border-zinc-200 pl-4">
        {ramas.map((r) => (
          <Rama
            key={r.id}
            nodo={r}
            nivel={0}
            proxima={proxima}
            abierta={abierta === r.id}
            alTocar={() => setAbierta((a) => (a === r.id ? null : r.id))}
          />
        ))}
      </ul>
    </div>
  )
}
