import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { cuando, diasEntre } from '../logica/fechas.js'
import { contarEtiquetas, porMes } from '../logica/listas.js'
import { RESORTE } from '../ui/movimiento.js'
import Pulsable from '../ui/Pulsable.jsx'

function Entrada({ e }) {
  return (
    <motion.li layout="position" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={RESORTE.suave} className="relative">
      <span aria-hidden="true" className="absolute top-1.5 -left-[33px] size-4 rounded-full border-4 border-fondo bg-sky-500" />
      <time dateTime={e.hora ? `${e.fecha}T${e.hora}` : e.fecha} className="font-dato text-sm font-medium text-zinc-500">
        {cuando(e)}
      </time>
      <h3 className="mt-1 font-titulo text-xl leading-tight font-bold tracking-tight">{e.titulo}</h3>
      {e.imagen && <img src={e.imagen} alt={e.alt || e.titulo} loading="lazy" className="mt-3 max-w-full rounded-2xl border border-zinc-200 [image-rendering:pixelated]" />}
      <p className="mt-2 text-lg leading-relaxed text-zinc-600">{e.texto}</p>
      {e.enlace && (
        <p className="mt-2">
          <a href={e.enlace.url} className="font-semibold text-sky-500 underline underline-offset-4">
            {e.enlace.texto}
          </a>
        </p>
      )}
      {e.etiquetas?.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Temas">
          {e.etiquetas.map((t) => (
            <li key={t} className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-600">
              {t}
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  )
}

/** Bitácora: resumen arriba, filtro por tema y entradas agrupadas por mes. */
export default function Bitacora({ entradas }) {
  const [tema, setTema] = useState(null)
  const temas = useMemo(() => contarEtiquetas(entradas), [entradas])
  const visibles = tema ? entradas.filter((e) => e.etiquetas?.includes(tema)) : entradas
  const meses = porMes(visibles)

  if (entradas.length === 0) {
    return <p className="text-lg text-zinc-600">Aún no hay entradas. Agrega la primera en datos.js, en la lista «bitacora».</p>
  }

  const ultima = porMes(entradas)[0].items[0]
  const hace = diasEntre(ultima.fecha, new Date())
  const dias = new Set(entradas.map((e) => e.fecha)).size

  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-3 gap-2">
        {[
          ['Entradas', entradas.length],
          ['Días con registro', dias],
          ['Última', hace <= 0 ? 'Hoy' : hace === 1 ? 'Ayer' : `Hace ${hace} d`],
        ].map(([t, v]) => (
          <div key={t} className="flex flex-col-reverse gap-0.5 rounded-3xl border border-zinc-200 bg-white px-4 py-3">
            <dt className="text-sm leading-tight text-zinc-500">{t}</dt>
            <dd className="font-dato text-xl font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      {temas.length > 1 && (
        <div role="group" aria-label="Filtrar por tema" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ etiqueta: null, n: entradas.length }, ...temas].map(({ etiqueta, n }) => {
            const activo = tema === etiqueta
            return (
              <Pulsable
                key={etiqueta ?? 'todo'}
                onClick={() => setTema(etiqueta)}
                aria-pressed={activo}
                className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-base font-semibold ${activo ? 'border-zinc-900 bg-zinc-900 text-fondo' : 'border-zinc-200 bg-white text-zinc-700'}`}
              >
                {etiqueta ?? 'Todo'}
                <span className={`font-dato text-sm ${activo ? 'opacity-70' : 'text-zinc-500'}`}>{n}</span>
              </Pulsable>
            )
          })}
        </div>
      )}

      {meses.map((g) => (
        <section key={g.clave} aria-label={g.mes} className="flex flex-col gap-4">
          <h2 className="font-titulo text-lg font-bold tracking-tight text-zinc-500 first-letter:uppercase">{g.mes}</h2>
          <ol className="relative ml-2 flex flex-col gap-6 border-l-2 border-zinc-200 pl-6">
            <AnimatePresence initial={false}>
              {g.items.map((e) => (
                <Entrada key={e.fecha + (e.hora ?? '') + e.titulo} e={e} />
              ))}
            </AnimatePresence>
          </ol>
        </section>
      ))}
    </div>
  )
}
