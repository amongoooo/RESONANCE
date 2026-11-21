import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import D from './datos.js'
import { conIds, proximaMeta } from './logica/arbol.js'
import { deClave, larga, sumarDias } from './logica/fechas.js'
import ArbolMetas from './secciones/ArbolMetas.jsx'
import Bitacora from './secciones/Bitacora.jsx'
import Decisiones from './secciones/Decisiones.jsx'
import Estado from './secciones/Estado.jsx'
import Juego from './secciones/Juego.jsx'
import Ruta from './secciones/Ruta.jsx'
import Sintonizador from './secciones/Sintonizador.jsx'
import { Luna, Sol } from './ui/Iconos.jsx'
import { AL_VERSE, RESORTE, SUBE } from './ui/movimiento.js'
import Pulsable from './ui/Pulsable.jsx'

const SECCIONES = [
  ['estado', 'Estado'],
  ['metas', 'Metas'],
  ['ruta', 'Ruta'],
  ['bitacora', 'Bitácora'],
  ['decisiones', 'Decisiones'],
  ['juego', 'El juego'],
]

// Vidrio (de teoria-musical, src/ui/vidrio.js): solo para lo que flota fijo sobre el contenido.
const VIDRIO =
  'border border-blanco/70 bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_0_0.5px_rgb(16_18_28/0.12),0_8px_28px_rgb(16_18_28/0.10),inset_0_1px_0_rgb(255_255_255/0.7)] dark:border-blanco/15 dark:shadow-[0_0_0_0.5px_rgb(0_0_0/0.45),0_8px_28px_rgb(0_0_0/0.45),inset_0_1px_0_rgb(255_255_255/0.12)]'

function BotonTema() {
  const [oscuro, setOscuro] = useState(() => document.documentElement.classList.contains('dark'))
  const cambiar = () => {
    const html = document.documentElement
    html.classList.add('cambiando-tema')
    html.classList.toggle('dark', !oscuro)
    try {
      localStorage.setItem('resonancia:tema', oscuro ? 'claro' : 'oscuro')
    } catch {
      /* sin localStorage: solo dura esta visita */
    }
    setOscuro(!oscuro)
    setTimeout(() => html.classList.remove('cambiando-tema'), 300)
  }
  return (
    <Pulsable onClick={cambiar} aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} className="grid size-11 shrink-0 place-items-center rounded-full text-zinc-700">
      {oscuro ? <Sol /> : <Luna />}
    </Pulsable>
  )
}

function Seccion({ id, titulo, children }) {
  return (
    <motion.section id={id} aria-labelledby={`h-${id}`} {...AL_VERSE} className="flex flex-col gap-5">
      <h2 id={`h-${id}`} className="font-titulo text-3xl font-bold tracking-tight">
        {titulo}
      </h2>
      {children}
    </motion.section>
  )
}

export default function App() {
  const [afinado, setAfinado] = useState(false)
  const hoy = new Date()
  const raiz = useMemo(() => conIds(D.metas), [])
  const proxima = useMemo(() => proximaMeta(raiz), [raiz])
  const enCurso = [...D.semanas].reverse().find((s) => deClave(s.inicio) <= hoy)
  const fase =
    D.fases.find((f) => hoy >= deClave(f.inicio) && hoy < sumarDias(deClave(f.fin), 1)) ??
    (hoy < deClave(D.fases[0].inicio) ? D.fases[0] : D.fases[D.fases.length - 1])
  const entradas = [...D.bitacora].sort((a, b) => b.fecha.localeCompare(a.fecha))
  const p = D.proyecto

  return (
    <>
      <a href="#estado" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-2xl focus:bg-white focus:px-4 focus:py-2">
        Saltar al contenido
      </a>

      {/* Cabecera de vidrio: flota sobre el contenido */}
      <header className="sticky top-0 z-40 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <nav aria-label="Secciones" className={`mx-auto flex max-w-2xl items-center gap-1 rounded-full py-1 pr-1 pl-4 ${VIDRIO}`}>
          <a href="#inicio" className="shrink-0 font-juego text-lg font-bold tracking-wide no-underline">
            {p.nombre}
          </a>
          <ul className="flex min-w-0 flex-1 gap-1 overflow-x-auto px-2 [scrollbar-width:none]">
            {SECCIONES.map(([id, nombre]) => (
              <li key={id} className="shrink-0">
                <a href={`#${id}`} className="flex min-h-11 items-center rounded-full px-3 text-base font-semibold text-zinc-600 no-underline hover:bg-zinc-100 hover:text-zinc-900">
                  {nombre}
                </a>
              </li>
            ))}
          </ul>
          <BotonTema />
        </nav>
      </header>

      <div className="mx-auto flex max-w-2xl flex-col gap-14 px-5 pt-10 pb-16">
        <motion.header id="inicio" {...SUBE} className="flex flex-col gap-5">
          <motion.h1
            animate={{ color: afinado ? 'var(--color-bien)' : 'var(--color-zinc-900)' }}
            transition={{ duration: 0.3 }}
            className="font-juego text-[clamp(3rem,13vw,5.5rem)] leading-none font-bold tracking-wide"
          >
            {p.nombre}
          </motion.h1>
          <p className="max-w-xl text-xl leading-relaxed text-zinc-600">{p.resumen}</p>
          <Sintonizador alAfinar={setAfinado} />
        </motion.header>

        <main className="flex flex-col gap-14">
          <Seccion id="estado" titulo="Dónde va el proyecto">
            <Estado D={D} fase={fase} enCurso={enCurso} proxima={proxima} />
          </Seccion>
          <Seccion id="metas" titulo="Árbol de metas">
            <ArbolMetas raiz={raiz} proxima={proxima} />
          </Seccion>
          <Seccion id="ruta" titulo={`Ruta de ${D.semanas.length} semanas`}>
            <Ruta D={D} fase={fase} enCurso={enCurso} />
          </Seccion>
          <Seccion id="bitacora" titulo="Bitácora">
            <Bitacora entradas={entradas} />
          </Seccion>
          <Seccion id="decisiones" titulo="Decisiones">
            <Decisiones decisiones={D.decisiones} />
          </Seccion>
          <Seccion id="juego" titulo="El juego">
            <Juego zonas={D.zonas} validacion={D.validacion} />
          </Seccion>
        </main>

        <motion.footer {...AL_VERSE} transition={RESORTE.suave} className="flex flex-col gap-1 border-t border-zinc-200 pt-6 text-base text-zinc-500">
          <p>
            {p.nombre}, por {p.autor}, {p.escuela}.
          </p>
          <p>{p.competencia}.</p>
          {entradas[0] && <p>Última entrada en la bitácora: {larga(entradas[0].fecha)}.</p>}
        </motion.footer>
      </div>
    </>
  )
}
