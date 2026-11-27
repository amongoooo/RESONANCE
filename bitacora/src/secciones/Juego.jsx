import { corta } from '../logica/fechas.js'
import { separarDecisiones } from '../logica/listas.js'
import { useEffect, useState } from 'react'
import diseno from '../../contenido/diseno.md?raw'
import almanaque from '../../contenido/almanaque.md?raw'
import musica from '../../contenido/musica.md?raw'
import historiaCifrada from '../../contenido/historia.cifrada.json'
import { descifrar } from '../logica/cifrado.js'
import Pulsable from '../ui/Pulsable.jsx'
import { Bombilla, Flecha } from '../ui/Iconos.jsx'
import Markdown from '../ui/Markdown.jsx'

/** El juego, en seis apartados: idea (con lo que lo hace distinto, lo pendiente y las zonas), historia, música, almanaque, diseño y validación. */
export default function Juego({ vista, juego, zonas, zonasNota, validacion, decisiones, fases, semanas }) {
  if (vista === 'historia') return <Historia />
  if (vista === 'musica') return <Markdown texto={musica} />
  if (vista === 'almanaque') return <Markdown texto={almanaque} />
  if (vista === 'diseno') return <Markdown texto={diseno} />
  if (vista === 'validacion') return <Validacion validacion={validacion} fases={fases} semanas={semanas} />
  return <Idea juego={juego} decisiones={decisiones} zonas={zonas} zonasNota={zonasNota} />
}

// La contraseña se recuerda solo en este navegador si se pide («Recordar»). Si la historia se vuelve a cifrar
// con otra contraseña, la guardada deja de servir y se vuelve a pedir.
const CLAVE_GUARDADA = 'resonancia:historia'
const leerGuardada = () => {
  try {
    return localStorage.getItem(CLAVE_GUARDADA) ?? sessionStorage.getItem(CLAVE_GUARDADA)
  } catch {
    return null
  }
}

/** Historia: está cifrada en el repo (público); se lee con la contraseña. */
function Historia() {
  const [texto, setTexto] = useState(null)
  const [clave, setClave] = useState('')
  const [recordar, setRecordar] = useState(true)
  const [estado, setEstado] = useState('pidiendo') // pidiendo | probando | mal

  useEffect(() => {
    const guardada = leerGuardada()
    if (!guardada) return
    setEstado('probando')
    descifrar(historiaCifrada, guardada).then((t) => {
      if (t) setTexto(t)
      setEstado('pidiendo')
    })
  }, [])

  const abrir = async (e) => {
    e.preventDefault()
    if (!clave.trim()) return
    setEstado('probando')
    const t = await descifrar(historiaCifrada, clave.trim())
    if (!t) return setEstado('mal')
    try {
      ;(recordar ? localStorage : sessionStorage).setItem(CLAVE_GUARDADA, clave.trim())
    } catch {
      /* sin almacenamiento: se pedirá otra vez */
    }
    setTexto(t)
    setEstado('pidiendo')
  }

  const cerrar = () => {
    try {
      localStorage.removeItem(CLAVE_GUARDADA)
      sessionStorage.removeItem(CLAVE_GUARDADA)
    } catch {
      /* nada */
    }
    setTexto(null)
    setClave('')
  }

  if (texto)
    return (
      <div className="flex flex-col gap-4">
        <Markdown texto={texto} />
        <Pulsable onClick={cerrar} className="min-h-11 self-start rounded-full bg-zinc-100 px-4 text-base font-bold text-zinc-700">
          Cerrar con candado
        </Pulsable>
      </div>
    )

  return (
    <form onSubmit={abrir} className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white px-5 py-5">
      <span className="font-titulo text-xl font-bold tracking-tight">La historia tiene candado</span>
      <span className="text-base leading-snug text-zinc-600">Va cifrada para que nadie la lea antes de tiempo, ni siquiera en el repo. Escribe la contraseña para abrirla.</span>
      <label className="flex flex-col gap-1.5">
        <span className="sr-only">Contraseña</span>
        <input
          type="password"
          autoComplete="current-password"
          value={clave}
          onChange={(e) => {
            setClave(e.target.value)
            if (estado === 'mal') setEstado('pidiendo')
          }}
          placeholder="Contraseña"
          className={`min-h-12 rounded-2xl border bg-zinc-50 px-4 text-lg outline-none focus:border-sky-500 ${estado === 'mal' ? 'border-fijate' : 'border-zinc-200'}`}
        />
      </label>
      <label className="flex min-h-11 items-center gap-2 text-base text-zinc-700">
        <input type="checkbox" checked={recordar} onChange={(e) => setRecordar(e.target.checked)} className="size-5 accent-sky-500" />
        Recordar en este navegador
      </label>
      {estado === 'mal' && <span className="text-base font-semibold text-fijate-tinta">Esa no es. Revisa la contraseña e inténtalo otra vez.</span>}
      <Pulsable
        type="submit"
        disabled={estado === 'probando'}
        className="min-h-12 self-start rounded-full bg-zinc-900 px-5 text-base font-bold text-fondo disabled:opacity-60"
      >
        {estado === 'probando' ? 'Abriendo…' : 'Abrir'}
      </Pulsable>
    </form>
  )
}

function Idea({ juego, decisiones, zonas, zonasNota }) {
  const { pendientes } = separarDecisiones(decisiones)
  return (
    <div className="flex flex-col gap-10">
      <p className="text-xl leading-relaxed text-zinc-700">{juego.idea}</p>

      {pendientes.length > 0 && (
        <a href="#/registro/decisiones" className="flex items-start gap-3 rounded-3xl border-2 border-fijate bg-fijate-suave px-5 py-4 no-underline">
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

      <Zonas zonas={zonas} nota={zonasNota} />
    </div>
  )
}

function Zonas({ zonas, nota }) {
  const principales = zonas.filter((z) => !z.extra)
  const extras = zonas.filter((z) => z.extra)
  return (
    <div className="flex flex-col gap-3">
      <section aria-labelledby="h-zonas" className="flex flex-col gap-3">
        <h2 id="h-zonas" className="font-titulo text-xl font-bold tracking-tight">
          Las zonas
        </h2>
        {nota && <p className="-mt-1 rounded-2xl bg-fijate-suave px-4 py-2.5 text-base leading-snug text-fijate-tinta">{nota}</p>}
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

    </div>
  )
}

function Validacion({ validacion, fases, semanas }) {
  const fase = fases[fases.length - 1]
  const suyas = semanas.filter((s) => s.fase === fase.id)
  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="h-validacion" className="flex flex-col gap-2 rounded-3xl bg-zinc-900 px-5 py-5 text-white">
        <h2 id="h-validacion" className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
          Pregunta de investigación
        </h2>
        <p className="font-titulo text-xl leading-snug font-bold tracking-tight">{validacion.pregunta}</p>
        <p className="text-lg leading-relaxed text-zinc-300">{validacion.resultados ?? validacion.estado}</p>
      </section>
      <section aria-labelledby="h-pasos" className="flex flex-col gap-3">
        <h2 id="h-pasos" className="font-titulo text-xl font-bold tracking-tight">
          Cuándo
        </h2>
        <p className="-mt-1 text-base text-zinc-600">
          Fase «{fase.nombre}», del <span className="font-dato">{corta(fase.inicio)}</span> al <span className="font-dato">{corta(fase.fin)}</span>.
        </p>
        <ol className="flex flex-col rounded-3xl border border-zinc-200 bg-white px-5 py-2">
          {suyas.map((s) => (
            <li key={s.n} className="flex flex-col border-t border-zinc-100 py-2.5 first:border-t-0">
              <span className="text-sm text-zinc-500">
                <strong className="text-zinc-700">Semana {s.n}</strong> · <span className="font-dato">{corta(s.inicio)}</span>
              </span>
              <span className="text-base leading-snug text-zinc-800">{s.meta}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
