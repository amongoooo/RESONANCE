import { useEffect, useRef, useState } from 'react'
import almanaque from '../../contenido/almanaque.json'
import {
  adelanto,
  alternarTodos,
  apartadoActual,
  apartadosDe,
  BLOQUES,
  bloquesDe,
  buscarEntradas,
  entradaPedida,
  hashEntrada,
  mecanicasDe,
  porZona,
  SECCIONES,
  usadaPor,
  VIDA,
} from '../logica/almanaque.js'
import { corta } from '../logica/fechas.js'
import { Flecha } from '../ui/Iconos.jsx'
import { Contenido } from '../ui/Markdown.jsx'
import Pulsable from '../ui/Pulsable.jsx'
import { VIDRIO } from '../ui/vidrio.js'

// Juego > Almanaque: copia de solo lectura del almanaque (el artifact es la fuente de verdad), con su misma
// organización: Bestiario y Mecánicas globales, filtro por tipo, búsqueda, índice y una ficha por entrada.
// El índice se ve general o por zonas, en el orden del mapa (base del esquema del mapa).
// La ficha lleva una barra fija (nombre, tipo, estado y sus apartados) y desplegables para la vida y las mecánicas.
// En pantalla ancha hay dos paneles y un enlace de uno se abre en el otro; en el teléfono, uno solo con «Volver a…».

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

const ANCHO = '(min-width: 64rem)'
function useAncho() {
  const [ancho, setAncho] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(ANCHO).matches)
  useEffect(() => {
    const m = matchMedia(ANCHO)
    const cambio = () => setAncho(m.matches)
    m.addEventListener('change', cambio)
    return () => m.removeEventListener('change', cambio)
  }, [])
  return ancho
}

// Cada llegada a una ficha lleva su número: así la ficha se vuelve a montar (desplegables cerrados) y sabe si bajar.
let llegadas = 0
const llegada = (extra = {}) => ({ n: ++llegadas, bajar: true, ...extra })

const COLOR_ESTADO = {
  aprobada: 'border-bien bg-bien-suave text-bien-tinta',
  hecha: 'border-bien bg-bien-suave text-bien-tinta',
  'en Unity': 'border-bien bg-bien-suave text-bien-tinta',
  propuesta: 'border-fijate bg-fijate-suave text-fijate-tinta',
}
function Estado({ estado }) {
  return (
    <span className={`shrink-0 rounded-full border px-2.5 py-0.5 font-dato text-xs font-medium tracking-wide uppercase ${COLOR_ESTADO[estado] ?? 'border-zinc-300 text-zinc-600'}`}>
      {estado || 'sin estado'}
    </span>
  )
}

// Al llegar con un enlace o con la fila de apartados, la sección queda justo debajo de la barra fija de la ficha.
// En el teléfono se resta 0.5rem porque la página ya deja 1rem arriba (scroll-padding-top en index.css).
const BAJO_BARRA = 'scroll-mt-[calc(var(--alto-arriba,0px)+var(--alto-barra,7rem)-0.5rem)] lg:scroll-mt-[calc(var(--alto-barra,7rem)+0.5rem)]'

function Seccion({ id, titulo, nota, accion, children }) {
  return (
    <section id={id} className={`flex flex-col gap-3 border-t border-zinc-100 pt-5 ${BAJO_BARRA}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-titulo text-xl font-bold tracking-tight">
          {titulo}
          {nota && <small className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">{nota}</small>}
        </h3>
        {accion}
      </div>
      {children}
    </section>
  )
}

function AbrirTodo({ claves, abiertos, alternar }) {
  const todos = claves.length > 0 && claves.every((k) => abiertos.has(k))
  return (
    <Pulsable onClick={() => alternar(claves)} aria-expanded={todos} className="min-h-9 rounded-full bg-zinc-100 px-3.5 text-sm font-bold text-zinc-700">
      {todos ? 'Cerrar todo' : 'Abrir todo'}
    </Pulsable>
  )
}

/** Un bloque que se abre y se cierra (<details>): cerrado deja ver el título y una línea de adelanto. */
function Desplegable({ id, abierto, alCambiar, titulo, pie, children }) {
  return (
    <details
      id={id}
      open={abierto}
      onToggle={(ev) => ev.currentTarget.open !== abierto && alCambiar(ev.currentTarget.open)}
      className={`group rounded-2xl border border-zinc-200 bg-zinc-50 open:bg-white ${BAJO_BARRA}`}
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-start gap-3 rounded-2xl px-4 py-3 select-none [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          {titulo}
          {pie}
        </span>
        <Flecha className="mt-0.5 shrink-0 rotate-90 text-zinc-400 transition-transform group-open:-rotate-90 motion-reduce:transition-none" />
      </summary>
      <div className="flex flex-col gap-2 px-4 pb-4">{children}</div>
    </details>
  )
}

/** Renglones «etiqueta · texto», como los bloques en el almanaque. */
function Renglones({ filas }) {
  return (
    <dl className="flex flex-col">
      {filas.map(([k, nombre, valor, vacio]) => (
        <div key={k} className="grid gap-1 border-t border-zinc-100 py-2.5 first:border-t-0 @md:grid-cols-[9rem_minmax(0,1fr)] @md:gap-4">
          <dt className={`pt-0.5 font-dato text-xs font-medium tracking-wider uppercase ${vacio ? 'text-zinc-400' : 'text-sky-600'}`}>{nombre}</dt>
          <dd className="min-w-0">{vacio ? <span className="text-base text-zinc-400 italic">No lo usa.</span> : <Texto texto={valor} />}</dd>
        </div>
      ))}
    </dl>
  )
}

function Enlace({ children, onClick, ancho }) {
  return (
    <Pulsable
      onClick={onClick}
      title={ancho ? 'Se abre en el otro panel' : undefined}
      className="inline-flex min-h-9 items-center gap-1 rounded-full border border-zinc-200 bg-white pr-1.5 pl-3 text-left text-sm font-semibold text-sky-600"
    >
      {children}
      <Flecha width={16} height={16} className="shrink-0" />
    </Pulsable>
  )
}

function Mecanica({ m, i, id, abierto, alCambiar, seguir, ancho }) {
  const { llenos } = bloquesDe(m)
  const nombreGlobal = (g) => t(almanaque.globales.find((x) => x.id === g)?.nombre) || g
  const usa = Array.isArray(m.usa) ? m.usa : []
  return (
    <Desplegable
      id={id}
      abierto={abierto}
      alCambiar={alCambiar}
      titulo={
        <span className="flex flex-wrap items-baseline gap-x-2 font-titulo text-lg leading-tight font-bold tracking-tight">
          <span className="font-dato text-xs font-medium text-zinc-500">{String(i + 1).padStart(2, '0')}</span>
          {t(m.nombre) || 'Sin nombre'}
        </span>
      }
      pie={
        <>
          {t(m.descripcion).trim() && <span className="text-base leading-snug text-zinc-700">{m.descripcion}</span>}
          <span className="font-dato text-xs text-zinc-500 group-open:hidden">
            {llenos.length} de 5 bloques{usa.length ? ` · usa ${usa.length === 1 ? nombreGlobal(usa[0]) : `${usa.length} globales`}` : ''}
          </span>
        </>
      }
    >
      {llenos.length ? (
        <Renglones filas={BLOQUES.map(([k, n]) => [k, n, m.bloques?.[k], !t(m.bloques?.[k]).trim()])} />
      ) : (
        <p className="text-sm text-zinc-500">Sin bloques escritos todavía.</p>
      )}
      {usa.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-3">
          <span className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">Usa</span>
          {usa.map((g) => (
            <Enlace key={g} ancho={ancho} onClick={() => seguir('globales', g)}>
              {nombreGlobal(g)}
            </Enlace>
          ))}
        </div>
      )}
    </Desplegable>
  )
}

/** La ficha de una entrada. `lado` distingue los ids cuando hay dos paneles. */
function Ficha({ e, seccion, lado, llegada, scroller, ancho, seguir, volver }) {
  const esGlobal = seccion === 'globales'
  const mecs = mecanicasDe(e)
  const datos = Array.isArray(e.datos) ? e.datos : []
  const usos = esGlobal ? usadaPor(almanaque.bestiario, e.id) : []
  const apartados = apartadosDe(esGlobal)
  const stats = esGlobal
    ? [['Enseña', e.ensena], ['Base real', e.inspira], ['Cuándo', e.semana]]
    : [['Altura', e.altura], ['Enseña', e.ensena], ['Se inspira en', e.inspira], ['Cuándo', e.semana]]
  const idDe = (k) => `${lado}-${k}`
  const clavesVida = VIDA.map(([k]) => `vida-${k}`)
  const clavesMecs = mecs.map((_, i) => `mec-${i}`)

  const [abiertos, setAbiertos] = useState(() => new Set(llegada.abiertos ?? []))
  const [activo, setActivo] = useState(0)
  const fichaRef = useRef(null)
  const barraRef = useRef(null)
  const filaRef = useRef(null)
  const tituloRef = useRef(null)
  const quieto = useRef(0) // tras tocar un apartado, la fila no se mueve mientras la página baja hasta él

  const poner = (k, abierto) =>
    setAbiertos((a) => {
      const n = new Set(a)
      if (abierto) n.add(k)
      else n.delete(k)
      return n
    })
  const alternar = (claves) => setAbiertos((a) => alternarTodos(a, claves))

  // Deja un elemento arriba: en pantalla ancha dentro de su panel (y el par de paneles a la vista); en el teléfono, en la página.
  const alinear = (el, behavior = 'smooth') => {
    const s = scroller.current
    if (!el) return
    if (ancho && s) {
      const margen = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
      s.scrollTo({ top: s.scrollTop + el.getBoundingClientRect().top - s.getBoundingClientRect().top - margen, behavior })
      // Los paneles llenan la pantalla bajo la barra de arriba: la página baja hasta que quedan justo ahí.
      const dif = s.getBoundingClientRect().top - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--alto-arriba')) || 0)
      if (Math.abs(dif) > 1) window.scrollBy({ top: dif, behavior: 'instant' })
    } else el.scrollIntoView({ block: 'start', behavior })
  }

  // Alto de la barra fija, para que lo que se salta quede justo debajo.
  useEffect(() => {
    const barra = barraRef.current
    const ficha = fichaRef.current
    const medir = () => ficha.style.setProperty('--alto-barra', `${barra.offsetHeight}px`)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(barra)
    return () => ro.disconnect()
  }, [])

  // Al llegar: bajar a la ficha (o al bloque de donde se salió, al volver) y llevar el foco al nombre.
  useEffect(() => {
    if (!llegada.bajar) return
    const id = setTimeout(
      () => {
        alinear(llegada.irA ? document.getElementById(idDe(llegada.irA)) : fichaRef.current, llegada.irA ? 'instant' : 'smooth')
        if (llegada.foco) tituloRef.current?.focus({ preventScroll: true })
      },
      llegada.n === 0 ? 250 : 30,
    )
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // En qué apartado vas: el último que ya pasó por debajo de la barra (o el último, si ya no hay más que bajar).
  useEffect(() => {
    let cuadro = 0
    const medir = () => {
      const barra = barraRef.current
      if (!barra || Date.now() < quieto.current) return
      const s = ancho ? scroller.current : null
      const alFinal = s ? s.scrollTop + s.clientHeight >= s.scrollHeight - 4 : innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      const tops = apartados.map(([k]) => document.getElementById(idDe(k))?.getBoundingClientRect().top ?? null)
      const fichaAbajo = fichaRef.current.getBoundingClientRect().bottom > innerHeight
      setActivo(alFinal && fichaAbajo === false ? apartados.length - 1 : apartadoActual(tops, barra.getBoundingClientRect().bottom + 24))
    }
    const alMover = () => {
      cancelAnimationFrame(cuadro)
      cuadro = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', alMover, { capture: true, passive: true })
    window.addEventListener('resize', alMover)
    return () => {
      cancelAnimationFrame(cuadro)
      window.removeEventListener('scroll', alMover, { capture: true })
      window.removeEventListener('resize', alMover)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ancho])

  // La pastilla del apartado en que vas, siempre a la vista en su fila.
  useEffect(() => {
    const fila = filaRef.current
    const chip = fila?.children[activo]
    if (chip && (chip.offsetLeft < fila.scrollLeft || chip.offsetLeft + chip.offsetWidth > fila.scrollLeft + fila.clientWidth))
      fila.scrollTo({ left: chip.offsetLeft - 8, behavior: 'smooth' })
  }, [activo])

  // Al seguir un enlace se guarda de qué bloque salió, para «Volver a…».
  const desde = (clave) => (s, id, extra = {}) => seguir(s, id, { abiertos: [...abiertos], irA: clave, ...extra })

  return (
    <article ref={fichaRef} className="flex scroll-mt-[calc(var(--alto-arriba,0px)-0.5rem)] flex-col gap-5 rounded-3xl border border-zinc-200 bg-white px-4 pb-5 @md:px-5 lg:scroll-mt-0">
      <div ref={barraRef} className={`sticky top-[var(--alto-arriba,0px)] z-10 -mx-2 mt-2 flex flex-col gap-2 rounded-2xl px-3 pt-2.5 pb-2 before:absolute before:inset-x-0 before:bottom-full before:h-2.5 before:bg-white lg:top-0 ${VIDRIO}`}>
        {volver && (
          <Pulsable onClick={volver.ir} className="flex min-h-9 max-w-full items-center gap-1 self-start rounded-full bg-zinc-100 pr-3.5 pl-1.5 text-sm font-bold text-zinc-700">
            <Flecha width={18} height={18} className="shrink-0 rotate-180" />
            <span className="truncate">Volver a {volver.nombre}</span>
          </Pulsable>
        )}
        <div className="flex items-start gap-2">
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">
              {esGlobal ? `Global · ${t(e.tipo)}` : t(e.tipo)} · zona {t(e.zona)}
            </span>
            <h2 ref={tituloRef} tabIndex={-1} className="font-titulo text-2xl leading-tight font-extrabold tracking-tight">
              {t(e.nombre) || 'Sin nombre'}
            </h2>
          </div>
          <span className="pt-1">
            <Estado estado={e.estado} />
          </span>
        </div>
        <nav aria-label={`Apartados de ${t(e.nombre)}`}>
          <ul ref={filaRef} className="-mx-1 flex gap-0.5 overflow-x-auto px-1 [scrollbar-width:none]">
            {apartados.map(([k, nombre], i) => (
              <li key={k} className="shrink-0 grow">
                <Pulsable
                  onClick={() => {
                    quieto.current = Date.now() + 1200
                    setActivo(i)
                    alinear(document.getElementById(idDe(k)))
                  }}
                  aria-current={i === activo ? 'location' : undefined}
                  className={`min-h-9 w-full rounded-full px-1.5 text-[0.8125rem] font-semibold whitespace-nowrap ${i === activo ? 'bg-zinc-900 text-fondo' : 'text-zinc-600'}`}
                >
                  {nombre}
                </Pulsable>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <header className="flex flex-col gap-2">
        <p className="text-lg leading-relaxed text-zinc-700">{e.resumen}</p>
        {e.editado && <span className="font-dato text-xs text-zinc-500">editado {corta(e.editado)}</span>}
      </header>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-zinc-100 py-3 @lg:grid-cols-4">
        {stats.map(([k, v]) => (
          <div key={k} className="flex min-w-0 flex-col">
            <dt className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">{k}</dt>
            <dd className="text-base leading-snug font-semibold text-zinc-800">{t(v) || '—'}</dd>
          </div>
        ))}
      </dl>

      <Seccion id={idDe('real')} titulo="En el mundo real" nota="por verificar con fuentes">
        <Texto texto={e.real} />
      </Seccion>
      {!esGlobal && (
        <Seccion id={idDe('vida')} titulo="Vida" nota="su lore, con base real" accion={<AbrirTodo claves={clavesVida} abiertos={abiertos} alternar={alternar} />}>
          <div className="flex flex-col gap-2">
            {VIDA.map(([k, nombre]) => {
              const texto = t(e.vida?.[k])
              return (
                <Desplegable
                  key={k}
                  id={idDe(`vida-${k}`)}
                  abierto={abiertos.has(`vida-${k}`)}
                  alCambiar={(a) => poner(`vida-${k}`, a)}
                  titulo={<span className="font-titulo text-lg leading-tight font-bold tracking-tight">{nombre}</span>}
                  pie={
                    <span className={`truncate text-base group-open:hidden ${texto.trim() ? 'text-zinc-600' : 'text-zinc-400 italic'}`}>
                      {texto.trim() ? adelanto(texto, 140) : 'Sin escribir todavía.'}
                    </span>
                  }
                >
                  <Texto texto={texto} />
                </Desplegable>
              )
            })}
          </div>
        </Seccion>
      )}
      <Seccion id={idDe('juego')} titulo="En el juego">
        <Texto texto={e.juego} />
      </Seccion>
      <Seccion
        id={idDe('mecanicas')}
        titulo="Mecánicas"
        nota={mecs.length ? `${mecs.length} · con sus 5 bloques` : null}
        accion={mecs.length > 1 && <AbrirTodo claves={clavesMecs} abiertos={abiertos} alternar={alternar} />}
      >
        {mecs.length ? (
          <div className="flex flex-col gap-2">
            {mecs.map((m, i) => (
              <Mecanica
                key={i}
                m={m}
                i={i}
                id={idDe(`mec-${i}`)}
                abierto={abiertos.has(`mec-${i}`)}
                alCambiar={(a) => poner(`mec-${i}`, a)}
                seguir={desde(`mec-${i}`)}
                ancho={ancho}
              />
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
        <Seccion id={idDe('usos')} titulo="Usada por" nota={usos.length ? `${usos.length} mecánicas de criaturas` : null}>
          {usos.length ? (
            <ul className="flex flex-col gap-2">
              {usos.map(({ criatura, mecanica }, i) => {
                const n = mecanicasDe(criatura).indexOf(mecanica)
                return (
                  <li key={i} className="flex flex-wrap items-center gap-2 text-base text-zinc-700">
                    <Enlace ancho={ancho} onClick={() => desde('usos')('bestiario', criatura.id, { destino: { abiertos: [`mec-${n}`], irA: `mec-${n}` } })}>
                      {criatura.nombre}
                    </Enlace>
                    · {mecanica.nombre}
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-base text-zinc-500 italic">Ninguna criatura la usa todavía.</p>
          )}
        </Seccion>
      )}
      <Seccion id={idDe('datos')} titulo="Datos" nota="campos del ScriptableObject">
        {datos.length ? (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
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
      <Seccion id={idDe('avisos')} titulo="Avisos" nota="bloque de comunicación">
        <div className="grid gap-4 @lg:grid-cols-2">
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
    </article>
  )
}

/** Las tarjetas del índice: nombre, tipo y un punto con el estado. */
function Tarjetas({ entradas, actual, abrir }) {
  return (
    <ul className="grid grid-cols-2 gap-2 @lg:grid-cols-3" aria-label="Índice">
        {entradas.map((e) => {
          const activa = actual?.id === e.id
          return (
            <li key={e.id} className="min-w-0">
              <Pulsable
                aria-current={activa}
                onClick={() => abrir(e.id)}
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
  )
}

/** Un panel: su propio Bestiario | Globales, búsqueda, filtro, índice y ficha. En pantalla ancha, con su propio scroll. */
function Panel({ lado, p, elegir, seguir, volver, ancho, nombre }) {
  const scroller = useRef(null)
  const entradas = almanaque[p.seccion]
  const sec = SECCIONES.find((s) => s.id === p.seccion)
  const visibles = buscarEntradas(entradas, p.consulta, p.tipo)
  const actual = entradas.find((e) => e.id === p.id) ?? entradas[0]
  const cambiarSeccion = (s) => elegir({ ...p, seccion: s, id: almanaque[s][0]?.id, tipo: 'Todas', consulta: '', llegada: llegada({ bajar: false }) })
  const abrir = (id) => elegir({ ...p, id, llegada: llegada() })

  return (
    <section
      ref={scroller}
      aria-label={nombre}
      className="@container min-w-0 lg:h-[calc(100dvh-var(--alto-arriba,0px))] lg:overflow-y-auto lg:px-1.5 lg:pt-1 lg:pb-32"
    >
      <div className="flex flex-col gap-5">
        <div role="group" aria-label="Apartado" className="grid grid-cols-2 gap-1 rounded-full bg-zinc-100 p-1">
          {SECCIONES.map((s) => (
            <Pulsable
              key={s.id}
              aria-pressed={p.seccion === s.id}
              onClick={() => cambiarSeccion(s.id)}
              className={`min-h-11 rounded-full px-2 text-[0.9375rem] font-bold whitespace-nowrap @md:text-base ${p.seccion === s.id ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'}`}
            >
              {s.id === 'globales' ? (
                <>
                  <span className="@sm:hidden">Globales</span>
                  <span className="hidden @sm:inline">{s.nombre}</span>
                </>
              ) : (
                s.nombre
              )}{' '}
              <span className="font-dato text-sm font-medium text-zinc-500">{almanaque[s.id].length}</span>
            </Pulsable>
          ))}
        </div>

        <label className="flex flex-col">
          <span className="sr-only">Buscar en el almanaque</span>
          <input
            type="search"
            value={p.consulta}
            onChange={(ev) => elegir({ ...p, consulta: ev.target.value })}
            placeholder="Nombre, concepto, aviso…"
            enterKeyHint="search"
            className="min-h-12 rounded-2xl border border-zinc-200 bg-white px-4 text-lg outline-none focus:border-sky-500"
          />
        </label>

        <div role="group" aria-label="Vista" className="flex flex-wrap items-center gap-2">
          <span className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">Ver</span>
          {[
            ['general', 'General'],
            ['zonas', 'Por zonas'],
          ].map(([v, n]) => (
            <Pulsable
              key={v}
              aria-pressed={(p.vista ?? 'general') === v}
              onClick={() => elegir({ ...p, vista: v })}
              className={`min-h-9 rounded-full border px-3.5 text-sm font-bold ${(p.vista ?? 'general') === v ? 'border-zinc-900 bg-zinc-900 text-fondo' : 'border-zinc-200 bg-white text-zinc-700'}`}
            >
              {n}
            </Pulsable>
          ))}
        </div>

        <div role="group" aria-label="Filtrar por tipo" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] @md:mx-0 @md:flex-wrap @md:px-0">
          {['Todas', ...sec.tipos].map((tp) => {
            const n = tp === 'Todas' ? entradas.length : entradas.filter((e) => e.tipo === tp).length
            if (!n) return null
            const activo = p.tipo === tp
            return (
              <Pulsable
                key={tp}
                aria-pressed={activo}
                onClick={() => elegir({ ...p, tipo: tp })}
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
          p.vista === 'zonas' ? (
            <div className="flex flex-col gap-5" aria-label="Índice por zonas">
              {porZona(visibles).map(({ zona, entradas: es }) => (
                <section key={zona.id} aria-label={zona.nombre} className="flex flex-col gap-2">
                  <h3 className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 border-b border-zinc-200 pb-1.5 font-titulo text-lg font-bold tracking-tight">
                    {zona.nombre}
                    <span className="font-dato text-sm font-medium text-zinc-500">{es.length}</span>
                    {zona.nota && <small className="font-dato text-xs font-medium tracking-wider text-zinc-500 uppercase">{zona.nota}</small>}
                  </h3>
                  <Tarjetas entradas={es} actual={actual} abrir={abrir} />
                </section>
              ))}
            </div>
          ) : (
            <Tarjetas entradas={visibles} actual={actual} abrir={abrir} />
          )
        )}

        {actual && (
          <Ficha
            key={`${p.seccion}:${actual.id}:${p.llegada.n}`}
            e={actual}
            seccion={p.seccion}
            lado={lado}
            llegada={p.llegada}
            scroller={scroller}
            ancho={ancho}
            seguir={seguir}
            volver={volver}
          />
        )}
      </div>
    </section>
  )
}

// La vista (General o Por zonas) se recuerda en este navegador; si no se puede, empieza en General.
const CLAVE_VISTA = 'almanaque-vista'
const leerVista = () => {
  try {
    return localStorage.getItem(CLAVE_VISTA) === 'zonas' ? 'zonas' : 'general'
  } catch {
    return 'general'
  }
}
const guardarVista = (v) => {
  try {
    localStorage.setItem(CLAVE_VISTA, v)
  } catch {
    // sin almacenamiento: no pasa nada
  }
}

const otraSeccion = (s) => (s === 'bestiario' ? 'globales' : 'bestiario')
const nombreDe = (s, id) => t(almanaque[s].find((e) => e.id === id)?.nombre) || id

export default function Almanaque() {
  const ancho = useAncho()
  const [paneles, setPaneles] = useState(() => {
    const vista = leerVista()
    const pedida = entradaPedida(window.location.hash)
    const a = pedida ?? { seccion: 'bestiario', id: almanaque.bestiario[0]?.id }
    const s2 = otraSeccion(a.seccion)
    return [
      { ...a, vista, tipo: 'Todas', consulta: '', llegada: { n: 0, bajar: !!pedida } },
      { seccion: s2, id: almanaque[s2][0]?.id, vista, tipo: 'Todas', consulta: '', llegada: { n: 0, bajar: false } },
    ]
  })
  // En el teléfono, de dónde se vino al seguir un enlace (para «Volver a…»).
  const [pila, setPila] = useState([])

  // La dirección sigue al panel izquierdo (o al único), para poder compartir la ficha.
  const [izq] = paneles
  const primera = useRef(true)
  useEffect(() => {
    if (primera.current) {
      primera.current = false
      return
    }
    history.replaceState(null, '', hashEntrada(izq.seccion, izq.id))
  }, [izq.seccion, izq.id])

  const poner = (i, p) => {
    if (p.vista) guardarVista(p.vista)
    setPaneles((ps) => ps.map((x, j) => (j === i ? p : x)))
  }

  // Elegir a mano (índice, filtro, búsqueda, Bestiario | Globales) olvida el camino de «Volver».
  const elegir = (i) => (p) => {
    if (i === 0 && p.llegada !== paneles[0].llegada) setPila([])
    poner(i, p)
  }

  // Un enlace de un panel abre su destino en el otro; en el teléfono, en el mismo, guardando de dónde se vino.
  const seguir = (i) => (s, id, { abiertos, irA, destino = {} }) => {
    const vista = (ancho ? paneles[1 - i] : paneles[0]).vista
    const nuevo = { seccion: s, id, vista, tipo: 'Todas', consulta: '', llegada: llegada({ foco: true, ...destino }) }
    if (ancho) return poner(1 - i, nuevo)
    setPila((pl) => [...pl, { ...paneles[0], llegada: llegada({ abiertos, irA, foco: true }) }])
    poner(0, nuevo)
  }

  const previa = pila.at(-1)
  const volver =
    !ancho && previa
      ? {
          nombre: nombreDe(previa.seccion, previa.id),
          ir: () => {
            setPila((pl) => pl.slice(0, -1))
            poner(0, previa)
          },
        }
      : null

  return (
    <div className="flex flex-col gap-5">
      <p className="max-w-2xl text-base leading-snug text-zinc-600">
        Copia del <a href="https://claude.ai/artifact/6AAnoQvQ6wnz2gt2Q3qKrg" className="font-semibold text-sky-500 underline underline-offset-4">almanaque</a> tomada el{' '}
        <span className="font-dato">{corta(almanaque.tomado)}</span>: cada especie, regla y obstáculo con su ficha técnica. El almanaque es la fuente de verdad.
        <span className="hidden lg:inline"> Hay dos paneles para comparar: lo que tocas en uno se abre en el otro.</span>
      </p>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-5">
        <Panel lado="izq" nombre={ancho ? 'Panel izquierdo' : undefined} p={paneles[0]} elegir={elegir(0)} seguir={seguir(0)} volver={volver} ancho={ancho} />
        {ancho && <Panel lado="der" nombre="Panel derecho" p={paneles[1]} elegir={elegir(1)} seguir={seguir(1)} volver={null} ancho={ancho} />}
      </div>
    </div>
  )
}
