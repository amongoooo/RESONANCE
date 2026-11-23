import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import D from './datos.js'
import { conIds, proximaMeta } from './logica/arbol.js'
import { cuando, deClave, larga, masNuevoPrimero, sumarDias } from './logica/fechas.js'
import { separarDecisiones } from './logica/listas.js'
import { PAGINAS } from './logica/rutas.js'
import ArbolMetas from './secciones/ArbolMetas.jsx'
import Bitacora from './secciones/Bitacora.jsx'
import Decisiones from './secciones/Decisiones.jsx'
import Estado from './secciones/Estado.jsx'
import Juego from './secciones/Juego.jsx'
import Ruta from './secciones/Ruta.jsx'
import Sintonizador from './secciones/Sintonizador.jsx'
import { Flecha } from './ui/Iconos.jsx'
import { BarraAbajo, Cabecera, usePagina } from './ui/Navegacion.jsx'
import { RESORTE } from './ui/movimiento.js'

/** Título grande de cada página y una línea que dice qué hay en ella. */
function Titulo({ titulo, bajada }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-titulo text-4xl leading-none font-extrabold tracking-tight">{titulo}</h1>
      {bajada && <p className="text-lg leading-snug text-zinc-600">{bajada}</p>}
    </div>
  )
}

/** Tarjeta que lleva a otra página. */
function Atajo({ href, etiqueta, titulo, detalle }) {
  return (
    <a href={href} className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white px-5 py-4 no-underline hover:border-zinc-300">
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">{etiqueta}</span>
        <span className="font-titulo text-lg leading-tight font-bold tracking-tight">{titulo}</span>
        {detalle && <span className="font-dato text-sm font-medium text-zinc-500">{detalle}</span>}
      </span>
      <Flecha className="shrink-0 text-zinc-400" />
    </a>
  )
}

function Inicio({ fase, enCurso, proxima, entradas }) {
  const [afinado, setAfinado] = useState(false)
  const { pendientes } = separarDecisiones(D.decisiones)
  const ultima = entradas[0]
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <motion.h1
          animate={{ color: afinado ? 'var(--color-bien)' : 'var(--color-zinc-900)' }}
          transition={{ duration: 0.3 }}
          className="font-juego text-[clamp(3rem,13vw,5.5rem)] leading-none font-bold tracking-wide"
        >
          {D.proyecto.nombre}
        </motion.h1>
        <p className="max-w-xl text-xl leading-relaxed text-zinc-600">{D.proyecto.resumen}</p>
        <Sintonizador alAfinar={setAfinado} />
      </div>

      <section aria-labelledby="h-estado" className="flex flex-col gap-4">
        <h2 id="h-estado" className="font-titulo text-2xl font-bold tracking-tight">
          Dónde va el proyecto
        </h2>
        <Estado D={D} fase={fase} enCurso={enCurso} proxima={proxima} />
      </section>

      <section aria-labelledby="h-ultimo" className="flex flex-col gap-3">
        <h2 id="h-ultimo" className="font-titulo text-2xl font-bold tracking-tight">
          Lo último
        </h2>
        {ultima && <Atajo href="#/bitacora" etiqueta="Bitácora" titulo={ultima.titulo} detalle={cuando(ultima)} />}
        {pendientes.length > 0 && (
          <Atajo
            href="#/decisiones"
            etiqueta="Por decidir"
            titulo={pendientes[0].decision.replace(/^Pendiente:\s*/, '')}
            detalle={pendientes.length > 1 ? `y ${pendientes.length - 1} más` : undefined}
          />
        )}
        <Atajo href="#/juego" etiqueta="El juego" titulo="Cómo se juega y qué enseña cada zona" />
      </section>
    </div>
  )
}

export default function App() {
  const pagina = usePagina()
  const principal = useRef(null)
  const primeraVez = useRef(true)
  const hoy = new Date()
  const raiz = useMemo(() => conIds(D.metas), [])
  const proxima = useMemo(() => proximaMeta(raiz), [raiz])
  const enCurso = [...D.semanas].reverse().find((s) => deClave(s.inicio) <= hoy)
  const fase =
    D.fases.find((f) => hoy >= deClave(f.inicio) && hoy < sumarDias(deClave(f.fin), 1)) ??
    (hoy < deClave(D.fases[0].inicio) ? D.fases[0] : D.fases[D.fases.length - 1])
  const entradas = [...D.bitacora].sort(masNuevoPrimero)
  const p = D.proyecto
  const info = PAGINAS.find((x) => x.id === pagina)

  // Al cambiar de página: arriba del todo, título de la pestaña y foco al contenido (para lectores de pantalla).
  useEffect(() => {
    document.title = pagina === 'inicio' ? `${p.nombre}: registro del proyecto` : `${info.titulo} · ${p.nombre}`
    if (primeraVez.current) {
      primeraVez.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    principal.current?.focus({ preventScroll: true })
  }, [pagina, info, p.nombre])

  const contenido = {
    inicio: <Inicio fase={fase} enCurso={enCurso} proxima={proxima} entradas={entradas} />,
    plan: (
      <div className="flex flex-col gap-12">
        <Titulo titulo="Plan y metas" bajada="Qué sigue, cuánto falta y cómo se reparten las 32 semanas." />
        <section aria-labelledby="h-metas" className="flex flex-col gap-4">
          <h2 id="h-metas" className="font-titulo text-2xl font-bold tracking-tight">
            Árbol de metas
          </h2>
          <ArbolMetas raiz={raiz} proxima={proxima} />
        </section>
        <section aria-labelledby="h-ruta" className="flex flex-col gap-4">
          <h2 id="h-ruta" className="font-titulo text-2xl font-bold tracking-tight">
            Ruta de {D.semanas.length} semanas
          </h2>
          <Ruta D={D} fase={fase} enCurso={enCurso} />
        </section>
      </div>
    ),
    bitacora: (
      <div className="flex flex-col gap-8">
        <Titulo titulo="Bitácora" bajada="Lo que hice y aprendí, con fecha y hora." />
        <Bitacora entradas={entradas} />
      </div>
    ),
    decisiones: (
      <div className="flex flex-col gap-8">
        <Titulo titulo="Decisiones" bajada="Qué decidí y por qué. Si algo cambia, la vieja se queda para ver el camino." />
        <Decisiones decisiones={D.decisiones} />
      </div>
    ),
    juego: (
      <div className="flex flex-col gap-8">
        <Titulo titulo="El juego" bajada="Un plataformero donde no peleas: afinas el mundo para avanzar." />
        <Juego juego={D.juego} zonas={D.zonas} validacion={D.validacion} decisiones={D.decisiones} />
      </div>
    ),
  }

  return (
    <>
      <Cabecera nombre={p.nombre} />

      <main ref={principal} tabIndex={-1} aria-label={info.titulo} className="mx-auto max-w-2xl px-4 pt-6 pb-36 outline-none sm:px-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pagina}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
            transition={RESORTE.suave}
          >
            {contenido[pagina]}
          </motion.div>
        </AnimatePresence>

        <footer className="mt-16 flex flex-col gap-1 border-t border-zinc-200 pt-6 text-base text-zinc-500">
          <p>
            {p.nombre}, por {p.autor}, {p.escuela}.
          </p>
          <p>{p.competencia}.</p>
          {entradas[0] && <p>Última entrada en la bitácora: {larga(entradas[0].fecha)}.</p>}
        </footer>
      </main>

      <BarraAbajo actual={pagina} />
    </>
  )
}
