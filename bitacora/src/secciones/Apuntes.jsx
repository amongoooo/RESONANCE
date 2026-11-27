import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { contarEtiquetas } from '../logica/listas.js'
import { apuntePedido, buscarApuntes, leerApuntes, resumen } from '../logica/apuntes.js'
import { larga } from '../logica/fechas.js'
import { Flecha } from '../ui/Iconos.jsx'
import { Contenido } from '../ui/Markdown.jsx'
import Pulsable from '../ui/Pulsable.jsx'
import { RESORTE } from '../ui/movimiento.js'

// Apuntes (Registro > Apuntes): un archivo .md por tema en contenido/apuntes/ (formato en su LEEME.md).
const ARCHIVOS = import.meta.glob('../../contenido/apuntes/*.md', { query: '?raw', import: 'default', eager: true })
const APUNTES = leerApuntes(ARCHIVOS)

function Etiquetas({ lista }) {
  if (!lista.length) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Etiquetas">
      {lista.map((t) => (
        <li key={t} className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-600">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Tarjeta({ a, abierta, alTocar }) {
  return (
    <motion.li
      id={`apunte-${a.id}`}
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={RESORTE.suave}
      className="scroll-mt-28 rounded-3xl border border-zinc-200 bg-white"
    >
      <button
        type="button"
        onClick={alTocar}
        aria-expanded={abierta}
        aria-controls={`texto-${a.id}`}
        className="flex w-full items-start gap-3 px-5 py-4 text-left"
        style={{ touchAction: 'manipulation' }}
      >
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="font-dato text-sm font-medium text-zinc-500">{a.editado ? `Editado el ${larga(a.editado)}` : 'Sin fecha de edición'}</span>
          <span className="font-titulo text-xl leading-tight font-bold tracking-tight">{a.titulo}</span>
          {!abierta && resumen(a.cuerpo) && <span className="text-base leading-snug text-zinc-600">{resumen(a.cuerpo)}</span>}
        </span>
        <Flecha className={`mt-1 shrink-0 text-zinc-400 transition-transform ${abierta ? 'rotate-90' : ''}`} />
      </button>
      <div className="px-5 pb-4">
        <Etiquetas lista={a.etiquetas} />
      </div>
      {abierta && (
        <div id={`texto-${a.id}`} className="border-t border-zinc-100 px-5 pt-4 pb-5">
          <Contenido texto={a.cuerpo} />
        </div>
      )}
    </motion.li>
  )
}

/** Apuntes: buscador, filtro por etiqueta y una tarjeta por tema (lo editado más nuevo primero); se abren al tocarlas. */
export default function Apuntes({ apuntes = APUNTES }) {
  const [consulta, setConsulta] = useState('')
  const [etiqueta, setEtiqueta] = useState(null)
  const [abiertas, setAbiertas] = useState(() => new Set([apuntePedido(window.location.hash)].filter(Boolean)))
  const etiquetas = useMemo(() => contarEtiquetas(apuntes), [apuntes])
  const visibles = buscarApuntes(apuntes, consulta, etiqueta)

  // Si la dirección pide un apunte (#/registro/apuntes?abrir=id), se abre y se lleva a la vista.
  useEffect(() => {
    const id = apuntePedido(window.location.hash)
    if (id) setTimeout(() => document.getElementById(`apunte-${id}`)?.scrollIntoView({ block: 'start' }), 250)
  }, [])

  const alternar = (id) =>
    setAbiertas((antes) => {
      const nuevo = new Set(antes)
      if (!nuevo.delete(id)) nuevo.add(id)
      return nuevo
    })

  if (apuntes.length === 0) return <p className="text-lg text-zinc-600">Aún no hay apuntes. Agrega el primero en contenido/apuntes/ (instrucciones en su LEEME.md).</p>

  return (
    <div className="flex flex-col gap-5">
      <label className="flex flex-col gap-1.5">
        <span className="sr-only">Buscar en los apuntes</span>
        <input
          type="search"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          placeholder="Buscar: bombo, tiles, Unity…"
          enterKeyHint="search"
          className="min-h-12 rounded-2xl border border-zinc-200 bg-white px-4 text-lg outline-none focus:border-sky-500"
        />
      </label>

      {etiquetas.length > 1 && (
        <div role="group" aria-label="Filtrar por etiqueta" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ etiqueta: null, n: apuntes.length }, ...etiquetas].map(({ etiqueta: t, n }) => {
            const activo = etiqueta === t
            return (
              <Pulsable
                key={t ?? 'todo'}
                onClick={() => setEtiqueta(t)}
                aria-pressed={activo}
                className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-base font-semibold ${activo ? 'border-zinc-900 bg-zinc-900 text-fondo' : 'border-zinc-200 bg-white text-zinc-700'}`}
              >
                {t ?? 'Todo'}
                <span className={`font-dato text-sm ${activo ? 'opacity-70' : 'text-zinc-500'}`}>{n}</span>
              </Pulsable>
            )
          })}
        </div>
      )}

      <p className="text-base text-zinc-500" aria-live="polite">
        {visibles.length === apuntes.length ? `${apuntes.length} apuntes` : `${visibles.length} de ${apuntes.length} apuntes`}
      </p>

      {visibles.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-3xl border border-dashed border-zinc-300 px-5 py-5">
          <span className="text-lg text-zinc-600">Ningún apunte tiene eso.</span>
          <Pulsable
            onClick={() => {
              setConsulta('')
              setEtiqueta(null)
            }}
            className="min-h-11 rounded-full bg-zinc-100 px-4 text-base font-bold text-zinc-700"
          >
            Ver todos
          </Pulsable>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {visibles.map((a) => (
              <Tarjeta key={a.id} a={a} abierta={abiertas.has(a.id)} alTocar={() => alternar(a.id)} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}
