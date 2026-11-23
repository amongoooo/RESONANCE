import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import { aClave, cuando, diasEntre } from '../logica/fechas.js'
import { contarEtiquetas, porMes } from '../logica/listas.js'
import { RESORTE } from '../ui/movimiento.js'
import { opciones } from '../logica/opciones.js'
import Pulsable from '../ui/Pulsable.jsx'
import CalendarioBitacora from './CalendarioBitacora.jsx'

function Entrada({ e, primeraDelDia }) {
  return (
    <motion.li id={primeraDelDia ? `dia-${e.fecha}` : undefined} layout="position" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={RESORTE.suave} className="relative">
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

/** Bitácora: resumen arriba, calendario de cuadritos (fijo al bajar), filtro por tema y entradas agrupadas por mes. */
export default function Bitacora({ entradas, decisiones = [], desde }) {
  const [tema, setTema] = useState(null)
  const [mesActivo, setMesActivo] = useState(null)
  const fijo = useRef(null)
  const temas = useMemo(() => contarEtiquetas(entradas), [entradas])
  const visibles = tema ? entradas.filter((e) => e.etiquetas?.includes(tema)) : entradas
  const meses = porMes(visibles)

  if (entradas.length === 0) {
    return <p className="text-lg text-zinc-600">Aún no hay entradas. Agrega la primera en datos.js, en la lista «bitacora».</p>
  }

  // Lleva la página a `el`, dejándolo justo debajo del calendario fijo.
  const irA = (el, suave) => {
    if (!el) return
    // Lo que queda fijo arriba: la barra Bitácora | Decisiones y, debajo, el calendario (ya pegado arriba).
    const barra = document.querySelector('[role="tablist"]')?.parentElement?.getBoundingClientRect().bottom ?? 0
    const tope = barra + (fijo.current?.offsetHeight ?? 0) + 12
    const reducir = opciones().movimiento === 'reducido'
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - tope, behavior: suave && !reducir ? 'smooth' : 'auto' })
  }
  const fechasVisibles = visibles.map((e) => e.fecha)
  const alElegirDia = (fecha) => {
    if (!fechasVisibles.length) return
    // Ese día o, si no tiene entradas, el más cercano que sí tenga.
    const cerca = fechasVisibles.reduce((a, b) => (Math.abs(diasEntre(fecha, b)) < Math.abs(diasEntre(fecha, a)) ? b : a))
    irA(document.getElementById(`dia-${cerca}`), false)
  }
  const alElegirMes = (mes) => {
    setMesActivo(mes)
    if (!mes) return
    const conEntradas = meses.find((g) => g.clave <= mes) ?? meses.at(-1)
    irA(document.getElementById(`mes-${conEntradas?.clave}`), true)
  }

  const ultima = porMes(entradas)[0].items[0]
  const hoy = aClave(new Date())
  const hasta = [hoy, ...entradas.map((e) => e.fecha)].sort().at(-1)
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

      <CalendarioBitacora
        refFijo={fijo}
        entradas={entradas}
        decisiones={decisiones}
        desde={desde ?? [...entradas].map((e) => e.fecha).sort()[0]}
        hasta={hasta}
        mesActivo={mesActivo}
        alElegirMes={alElegirMes}
        alElegirDia={alElegirDia}
      />

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
        <section key={g.clave} id={`mes-${g.clave}`} aria-label={g.mes} className="flex flex-col gap-4">
          <h2 className={`font-titulo text-lg font-bold tracking-tight first-letter:uppercase ${mesActivo === g.clave ? 'text-bien-tinta' : 'text-zinc-500'}`}>{g.mes}</h2>
          <ol className="relative ml-2 flex flex-col gap-6 border-l-2 border-zinc-200 pl-6">
            <AnimatePresence initial={false}>
              {g.items.map((e, i) => (
                <Entrada key={e.fecha + (e.hora ?? '') + e.titulo} e={e} primeraDelDia={g.items.findIndex((x) => x.fecha === e.fecha) === i} />
              ))}
            </AnimatePresence>
          </ol>
        </section>
      ))}
    </div>
  )
}
