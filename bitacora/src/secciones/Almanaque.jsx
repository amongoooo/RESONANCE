import { useEffect, useRef, useState } from 'react'
import almanaque from '../../contenido/almanaque.json'
import { BLOQUES, bloquesDe, buscarEntradas, entradaPedida, hashEntrada, mecanicasDe, SECCIONES, usadaPor, VIDA } from '../logica/almanaque.js'
import { corta } from '../logica/fechas.js'
import { Contenido } from '../ui/Markdown.jsx'
import Pulsable from '../ui/Pulsable.jsx'

// Juego > Almanaque: copia de solo lectura del almanaque (el artifact es la fuente de verdad), con su misma
// organización: Bestiario y Mecánicas globales, filtro por tipo, búsqueda, índice y una ficha por entrada.

const t = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v))

// En el almanaque cada renglón es su propio párrafo; en Markdown hace falta una línea en blanco entre ellos.
const aMarkdown = (texto) =>
  t(texto)
    .split('\n')
    .map((l) => (l.trim().startsWith('- ') ? l : `${l}\n`))
    .join('\n')

function Texto({ texto }) {
  if (!t(texto).trim()) return <p className="text-base text-zinc-500 italic">Sin escribir todavía.</p>
  return <Contenido texto={aMarkdown(texto)} />
}

const COLOR_ESTADO = {
  aprobada: 'border-bien bg-bien-suave text-bien-tinta',
  hecha: 'border-bien bg-bien-suave text-bien-tinta',
  'en Unity': 'border-bien bg-bien-suave text-bien-tinta',
  propuesta: 'border-fijate bg-fijate-suave text-fijate-tinta',
}
function Estado({ estado }) {
  return (
    <span className={`rounded-full border px-2.5 py-0.5 font-dato text-xs font-medium tracking-wide uppercase ${COLOR_ESTADO[estado] ?? 'border-zinc-300 text-zinc-600'}`}>
      {estado || 'sin estado'}
    </span>
  )
}

function Seccion({ titulo, nota, children }) {
  return (
    <section className="flex flex-col gap-3 border-t border-zinc-100 pt-5">
      <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-titulo text-xl font-bold tracking-tight">
        {titulo}
        {nota && <small className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">{nota}</small>}
      </h3>
      {children}
    </section>
  )
}

/** Renglones «etiqueta · texto», como los bloques y la vida en el almanaque. */
function Renglones({ filas }) {
  return (
    <dl className="flex flex-col">
      {filas.map(([k, nombre, valor, vacio]) => (
        <div key={k} className="grid gap-1 border-t border-zinc-100 py-2.5 first:border-t-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <dt className={`pt-0.5 font-dato text-xs font-medium tracking-wider uppercase ${vacio ? 'text-zinc-400' : 'text-sky-600'}`}>{nombre}</dt>
          <dd className="min-w-0">{vacio ? <span className="text-base text-zinc-400 italic">No lo usa.</span> : <Texto texto={valor} />}</dd>
        </div>
      ))}
    </dl>
  )
}

function Enlace({ children, onClick }) {
  return (
    <Pulsable onClick={onClick} className="min-h-9 rounded-full border border-zinc-200 bg-white px-3 text-sm font-semibold text-sky-600">
      {children}
    </Pulsable>
  )
}

function Mecanica({ m, i, irA, globales }) {
  const { llenos } = bloquesDe(m)
  const nombreGlobal = (id) => t(globales.find((g) => g.id === id)?.nombre) || id
  return (
    <article className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4">
      <h4 className="flex flex-wrap items-baseline gap-2 font-titulo text-lg leading-tight font-bold tracking-tight">
        <span className="font-dato text-xs font-medium text-zinc-500">{String(i + 1).padStart(2, '0')}</span>
        {t(m.nombre) || 'Sin nombre'}
      </h4>
      {t(m.descripcion).trim() && <p className="text-base leading-snug text-zinc-700">{m.descripcion}</p>}
      {llenos.length ? (
        <Renglones filas={BLOQUES.map(([k, n]) => [k, n, m.bloques?.[k], !t(m.bloques?.[k]).trim()])} />
      ) : (
        <p className="text-sm text-zinc-500">Sin bloques escritos todavía.</p>
      )}
      {Array.isArray(m.usa) && m.usa.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">Usa</span>
          {m.usa.map((g) => (
            <Enlace key={g} onClick={() => irA('globales', g)}>
              {nombreGlobal(g)}
            </Enlace>
          ))}
        </div>
      )}
    </article>
  )
}

function Ficha({ e, seccion, irA }) {
  const esGlobal = seccion === 'globales'
  const mecs = mecanicasDe(e)
  const datos = Array.isArray(e.datos) ? e.datos : []
  const usos = esGlobal ? usadaPor(almanaque.bestiario, e.id) : []
  const vida = VIDA.filter(([k]) => t(e.vida?.[k]).trim())
  const stats = esGlobal
    ? [['Enseña', e.ensena], ['Base real', e.inspira], ['Cuándo', e.semana]]
    : [['Altura', e.altura], ['Enseña', e.ensena], ['Se inspira en', e.inspira], ['Cuándo', e.semana]]
  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <span className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">
          {esGlobal ? `Mecánica global · ${t(e.tipo)}` : t(e.tipo)} · zona {t(e.zona)}
        </span>
        <h2 className="font-titulo text-3xl leading-tight font-extrabold tracking-tight">{t(e.nombre) || 'Sin nombre'}</h2>
        <p className="text-lg leading-relaxed text-zinc-700">{e.resumen}</p>
        <div className="flex flex-wrap gap-2">
          <Estado estado={e.estado} />
          {e.editado && <span className="rounded-full border border-zinc-200 px-2.5 py-0.5 font-dato text-xs text-zinc-500">editado {corta(e.editado)}</span>}
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-zinc-100 py-3 sm:grid-cols-4">
        {stats.map(([k, v]) => (
          <div key={k} className="flex min-w-0 flex-col">
            <dt className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">{k}</dt>
            <dd className="text-base leading-snug font-semibold text-zinc-800">{t(v) || '—'}</dd>
          </div>
        ))}
      </dl>

      <Seccion titulo="En el mundo real" nota="por verificar con fuentes">
        <Texto texto={e.real} />
      </Seccion>
      {!esGlobal && (
        <Seccion titulo="Vida" nota="su lore, con base real">
          {vida.length ? <Renglones filas={vida.map(([k, n]) => [k, n, e.vida[k]])} /> : <Texto texto="" />}
        </Seccion>
      )}
      <Seccion titulo="En el juego">
        <Texto texto={e.juego} />
      </Seccion>
      <Seccion titulo="Mecánicas" nota={mecs.length ? `${mecs.length} · con sus 5 bloques` : null}>
        {mecs.length ? (
          <div className="flex flex-col gap-3">
            {mecs.map((m, i) => (
              <Mecanica key={i} m={m} i={i} irA={irA} globales={almanaque.globales} />
            ))}
          </div>
        ) : (
          <Texto texto="" />
        )}
      </Seccion>
      <Seccion titulo="Estados" nota="la máquina de estados">
        <Texto texto={e.estados} />
      </Seccion>
      {esGlobal && (
        <Seccion titulo="Usada por" nota={usos.length ? `${usos.length} mecánicas de criaturas` : null}>
          {usos.length ? (
            <ul className="flex flex-col gap-2">
              {usos.map(({ criatura, mecanica }, i) => (
                <li key={i} className="flex flex-wrap items-center gap-2 text-base text-zinc-700">
                  <Enlace onClick={() => irA('bestiario', criatura.id)}>{criatura.nombre}</Enlace>· {mecanica.nombre}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base text-zinc-500 italic">Ninguna criatura la usa todavía.</p>
          )}
        </Seccion>
      )}
      <Seccion titulo="Datos" nota="campos del ScriptableObject">
        {datos.length ? (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead className="bg-zinc-50 font-dato text-xs tracking-wider text-zinc-500 uppercase">
                <tr>
                  {['Campo', 'Valor', 'Unidad', 'Nota'].map((c) => (
                    <th key={c} className="px-3 py-2 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datos.map((d, i) => (
                  <tr key={i} className="border-t border-zinc-100 align-top">
                    <td className="px-3 py-2 font-dato">{d.campo}</td>
                    <td className="px-3 py-2 font-dato whitespace-nowrap tabular-nums">{d.valor}</td>
                    <td className="px-3 py-2 text-zinc-600">{d.unidad}</td>
                    <td className="px-3 py-2 text-zinc-600">{d.nota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-base text-zinc-500 italic">Sin datos todavía.</p>
        )}
      </Seccion>
      <Seccion titulo="Avisos" nota="bloque de comunicación">
        <div className="grid gap-4 sm:grid-cols-2">
          {[['Manda', e.avisosManda], ['Escucha', e.avisosEscucha]].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1.5">
              <span className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">{k}</span>
              <Texto texto={v} />
            </div>
          ))}
        </div>
      </Seccion>
      <Seccion titulo="Riesgos">
        <Texto texto={e.riesgos} />
      </Seccion>
      <Seccion titulo="Notas">
        <Texto texto={e.notas} />
      </Seccion>
      <p className="border-t border-zinc-100 pt-4 text-sm text-zinc-500">Los valores de «Datos» son de partida, sin medir en Unity. Lo que está en «propuesta» espera el OK.</p>
    </div>
  )
}

export default function Almanaque() {
  const pedida = entradaPedida(window.location.hash)
  const [seccion, setSeccion] = useState(pedida?.seccion ?? 'bestiario')
  const [seleccion, setSeleccion] = useState(pedida?.id ?? almanaque[pedida?.seccion ?? 'bestiario'][0]?.id)
  const [tipo, setTipo] = useState('Todas')
  const [consulta, setConsulta] = useState('')
  const fichaRef = useRef(null)
  const entradas = almanaque[seccion]
  const sec = SECCIONES.find((s) => s.id === seccion)
  const visibles = buscarEntradas(entradas, consulta, tipo)
  const actual = entradas.find((e) => e.id === seleccion) ?? entradas[0]

  const irA = (s, id, bajar = true) => {
    if (s !== seccion) {
      setSeccion(s)
      setTipo('Todas')
      setConsulta('')
    }
    setSeleccion(id)
    history.replaceState(null, '', hashEntrada(s, id))
    if (bajar) setTimeout(() => fichaRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }), 50)
  }

  useEffect(() => {
    if (pedida) setTimeout(() => fichaRef.current?.scrollIntoView({ block: 'start' }), 250)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <p className="text-base leading-snug text-zinc-600">
        Copia del <a href="https://claude.ai/artifact/6AAnoQvQ6wnz2gt2Q3qKrg" className="font-semibold text-sky-500 underline underline-offset-4">almanaque</a> tomada el{' '}
        <span className="font-dato">{corta(almanaque.tomado)}</span>: cada especie, regla y obstáculo con su ficha técnica. El almanaque es la fuente de verdad.
      </p>

      <div role="group" aria-label="Apartado" className="grid grid-cols-2 gap-1 rounded-full bg-zinc-100 p-1">
        {SECCIONES.map((s) => (
          <Pulsable
            key={s.id}
            aria-pressed={seccion === s.id}
            onClick={() => irA(s.id, almanaque[s.id][0]?.id, false)}
            className={`min-h-11 rounded-full px-2 text-[0.9375rem] font-bold whitespace-nowrap sm:text-base ${seccion === s.id ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'}`}
          >
            {s.nombre} <span className="font-dato text-sm font-medium text-zinc-500">{almanaque[s.id].length}</span>
          </Pulsable>
        ))}
      </div>

      <label className="flex flex-col">
        <span className="sr-only">Buscar en el almanaque</span>
        <input
          type="search"
          value={consulta}
          onChange={(ev) => setConsulta(ev.target.value)}
          placeholder="Nombre, concepto, aviso…"
          enterKeyHint="search"
          className="min-h-12 rounded-2xl border border-zinc-200 bg-white px-4 text-lg outline-none focus:border-sky-500"
        />
      </label>

      <div role="group" aria-label="Filtrar por tipo" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {['Todas', ...sec.tipos].map((tp) => {
          const n = tp === 'Todas' ? entradas.length : entradas.filter((e) => e.tipo === tp).length
          if (!n) return null
          const activo = tipo === tp
          return (
            <Pulsable
              key={tp}
              aria-pressed={activo}
              onClick={() => setTipo(tp)}
              className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-base font-semibold ${activo ? 'border-zinc-900 bg-zinc-900 text-fondo' : 'border-zinc-200 bg-white text-zinc-700'}`}
            >
              {tp}
              <span className={`font-dato text-sm ${activo ? 'opacity-70' : 'text-zinc-500'}`}>{n}</span>
            </Pulsable>
          )
        })}
      </div>

      {visibles.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-zinc-300 px-5 py-4 text-lg text-zinc-600">Nada coincide con la búsqueda.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Índice">
          {visibles.map((e) => {
            const activa = actual?.id === e.id
            return (
              <li key={e.id} className="min-w-0">
                <Pulsable
                  aria-current={activa}
                  onClick={() => irA(seccion, e.id)}
                  className={`flex h-full w-full flex-col items-start gap-1 rounded-2xl border-2 px-3 py-2.5 text-left ${activa ? 'border-zinc-900 bg-white' : 'border-transparent bg-white'}`}
                >
                  <span className="font-titulo text-base leading-tight font-bold tracking-tight">{e.nombre}</span>
                  <span className="flex flex-wrap items-center gap-1.5 font-dato text-xs text-zinc-500">
                    {e.tipo}
                    <span
                      aria-label={`estado: ${e.estado}`}
                      className={`size-2 rounded-full ${['aprobada', 'hecha', 'en Unity'].includes(e.estado) ? 'bg-bien' : e.estado === 'propuesta' ? 'bg-fijate' : 'bg-zinc-300'}`}
                    />
                  </span>
                </Pulsable>
              </li>
            )
          })}
        </ul>
      )}

      {actual && (
        <article ref={fichaRef} aria-live="polite" className="scroll-mt-28 rounded-3xl border border-zinc-200 bg-white px-5 py-5">
          <Ficha e={actual} seccion={seccion} irA={irA} />
        </article>
      )}
    </div>
  )
}
