import { separarDecisiones } from '../logica/listas.js'
import { Bombilla, Flecha } from '../ui/Iconos.jsx'

/** El juego: la idea, lo que lo hace distinto, lo que falta decidir, el recorrido por zonas y la validación. */
export default function Juego({ juego, zonas, validacion, decisiones }) {
  const { pendientes } = separarDecisiones(decisiones)
  const principales = zonas.filter((z) => !z.extra)
  const extras = zonas.filter((z) => z.extra)

  return (
    <div className="flex flex-col gap-10">
      <p className="text-xl leading-relaxed text-zinc-700">{juego.idea}</p>

      {pendientes.length > 0 && (
        <a href="#/decisiones" className="flex items-start gap-3 rounded-3xl border-2 border-fijate bg-fijate-suave px-5 py-4 no-underline">
          <Bombilla className="mt-0.5 shrink-0 text-fijate-tinta" />
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-sm font-semibold tracking-wider text-fijate-tinta uppercase">Aún por decidir</span>
            {pendientes.map((d) => (
              <span key={d.decision} className="font-titulo text-lg leading-tight font-bold tracking-tight text-zinc-900">
                {d.decision.replace(/^Pendiente:\s*/, '')}
              </span>
            ))}
          </span>
          <Flecha className="mt-0.5 shrink-0 text-fijate-tinta" />
        </a>
      )}

      <section aria-labelledby="h-pilares" className="flex flex-col gap-3">
        <h2 id="h-pilares" className="font-titulo text-xl font-bold tracking-tight">
          Lo que lo hace distinto
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {juego.pilares.map((p) => (
            <li key={p.nombre} className="flex flex-col gap-1 rounded-3xl border border-zinc-200 bg-white px-5 py-4">
              <span className="font-titulo text-lg leading-tight font-bold tracking-tight">{p.nombre}</span>
              <span className="text-base leading-snug text-zinc-600">{p.texto}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="h-zonas" className="flex flex-col gap-3">
        <h2 id="h-zonas" className="font-titulo text-xl font-bold tracking-tight">
          El recorrido
        </h2>
        <p className="-mt-1 text-base text-zinc-600">Cada zona enseña un concepto; la última los junta todos.</p>
        <ol className="relative ml-4 flex flex-col gap-3 border-l-2 border-sky-300 pl-6">
          {principales.map((z, i) => (
            <li key={z.nombre} className="relative rounded-3xl border border-zinc-200 bg-white px-5 py-4">
              <span
                aria-hidden="true"
                className="absolute top-4 -left-[43px] grid size-8 place-items-center rounded-full border-4 border-fondo bg-sky-500 font-dato text-sm font-medium text-blanco"
              >
                {i + 1}
              </span>
              <span className="sr-only">Zona {i + 1}: </span>
              <span className="block font-titulo text-lg leading-tight font-bold tracking-tight">{z.nombre}</span>
              <span className="mt-1 block text-base leading-snug text-zinc-600">{z.concepto}</span>
            </li>
          ))}
        </ol>
        {extras.length > 0 && (
          <>
            <h3 className="mt-2 text-base font-semibold text-zinc-500">Extras, solo si sobra tiempo</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {extras.map((z) => (
                <li key={z.nombre} className="flex flex-col gap-1 rounded-3xl border border-dashed border-zinc-300 px-5 py-4">
                  <span className="font-titulo text-lg leading-tight font-bold tracking-tight">{z.nombre}</span>
                  <span className="text-base leading-snug text-zinc-600">{z.concepto}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section aria-labelledby="h-validacion" className="flex flex-col gap-2 rounded-3xl bg-zinc-900 px-5 py-5 text-white">
        <h2 id="h-validacion" className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
          Cómo se va a comprobar que enseña
        </h2>
        <p className="font-titulo text-xl leading-snug font-bold tracking-tight">{validacion.pregunta}</p>
        <p className="text-lg leading-relaxed text-zinc-300">{validacion.resultados ?? validacion.estado}</p>
      </section>
    </div>
  )
}
