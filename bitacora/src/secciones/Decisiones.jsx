import { cuando } from '../logica/fechas.js'
import { idDecision, separarDecisiones } from '../logica/listas.js'
import { Bombilla, Check, Flecha } from '../ui/Iconos.jsx'

const limpiar = (texto) => texto.replace(/^Pendiente:\s*/, '')

function Tarjeta({ d, tipo }) {
  const estilos = {
    pendiente: 'border-2 border-fijate bg-fijate-suave',
    vigente: 'border border-zinc-200 bg-white',
    cambiada: 'border border-dashed border-zinc-300 bg-transparent',
  }
  return (
    <li id={idDecision(d)} className={`flex scroll-mt-6 flex-col gap-1.5 rounded-3xl px-5 py-4 ${estilos[tipo]}`}>
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {tipo === 'pendiente' && (
          <span className="flex items-center gap-1 font-bold text-fijate-tinta">
            <Bombilla width={18} height={18} /> Por decidir
          </span>
        )}
        {tipo === 'vigente' && (
          <span className="flex items-center gap-1 font-bold text-bien-tinta">
            <Check width={18} height={18} strokeWidth={3} /> Decidido
          </span>
        )}
        {tipo === 'cambiada' && <span className="font-bold text-zinc-500">Ya no aplica</span>}
        <span className="font-dato font-medium text-zinc-500">{cuando(d)}</span>
      </span>
      <span className={`font-titulo text-lg leading-tight font-bold tracking-tight ${tipo === 'cambiada' ? 'text-zinc-500 line-through decoration-zinc-300' : ''}`}>{limpiar(d.decision)}</span>
      <span className="text-base leading-snug text-zinc-600">{d.porque}</span>
      {d.reemplaza && tipo !== 'cambiada' && (
        <a href="#/decisiones" onClick={irA(d.reemplaza)} className="mt-1 text-sm font-semibold text-zinc-500 underline underline-offset-4">
          Cambia una decisión anterior
        </a>
      )}
      {d.reemplazadaPor && (
        <a href="#/decisiones" onClick={irA(d.reemplazadaPor.decision)} className="mt-1 flex items-center gap-1 text-base font-semibold text-sky-500 no-underline">
          La cambió: {limpiar(d.reemplazadaPor.decision)} ({cuando(d.reemplazadaPor)}) <Flecha width={18} height={18} className="shrink-0" />
        </a>
      )}
    </li>
  )
}

// Saltar a otra decisión sin cambiar la dirección (la dirección elige la página).
const irA = (decision) => (ev) => {
  ev.preventDefault()
  document.getElementById(idDecision({ decision }))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Grupo({ titulo, detalle, lista, tipo }) {
  if (lista.length === 0) return null
  return (
    <section aria-label={titulo} className="flex flex-col gap-3">
      <h2 className="flex items-baseline gap-2 font-titulo text-xl font-bold tracking-tight">
        {titulo} <span className="font-dato text-base font-medium text-zinc-500">{lista.length}</span>
      </h2>
      {detalle && <p className="-mt-1 text-base text-zinc-600">{detalle}</p>}
      <ul className="flex flex-col gap-3">
        {lista.map((d) => (
          <Tarjeta key={d.decision} d={d} tipo={tipo} />
        ))}
      </ul>
    </section>
  )
}

/** Decisiones en tres montones: lo que falta decidir, lo que vale hoy y lo que cambió (con el porqué del cambio). */
export default function Decisiones({ decisiones }) {
  const { pendientes, vigentes, cambiadas } = separarDecisiones(decisiones)
  return (
    <div className="flex flex-col gap-10">
      <Grupo titulo="Por decidir" lista={pendientes} tipo="pendiente" />
      <Grupo titulo="Vigentes" detalle="Lo que vale hoy, lo más nuevo primero." lista={vigentes} tipo="vigente" />
      <Grupo titulo="Cambiaron" detalle="Se quedan aquí para que se vea por qué cambió el plan." lista={cambiadas} tipo="cambiada" />
    </div>
  )
}
