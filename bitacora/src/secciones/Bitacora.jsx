import { motion } from 'motion/react'
import { larga } from '../logica/fechas.js'
import { AL_VERSE } from '../ui/movimiento.js'

export default function Bitacora({ entradas }) {
  if (entradas.length === 0) {
    return <p className="text-lg text-zinc-600">Aún no hay entradas. Agrega la primera en datos.js, en la lista «bitacora».</p>
  }
  return (
    <ol className="relative ml-2 flex flex-col gap-6 border-l-2 border-zinc-200 pl-6">
      {entradas.map((e) => (
        <motion.li key={e.fecha + e.titulo} {...AL_VERSE} className="relative">
          <span aria-hidden="true" className="absolute top-1.5 -left-[33px] size-4 rounded-full border-4 border-fondo bg-sky-500" />
          <time dateTime={e.fecha} className="font-dato text-sm font-medium text-zinc-500">
            {larga(e.fecha)}
          </time>
          <h3 className="mt-1 font-titulo text-xl leading-tight font-bold tracking-tight">{e.titulo}</h3>
          {e.imagen && (
            <img src={e.imagen} alt={e.alt || e.titulo} loading="lazy" className="mt-3 max-w-full rounded-2xl border border-zinc-200 [image-rendering:pixelated]" />
          )}
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
      ))}
    </ol>
  )
}
