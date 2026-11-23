import { cuando } from '../logica/fechas.js'
import { Bombilla, Check } from '../ui/Iconos.jsx'

export default function Decisiones({ decisiones }) {
  return (
    <ul className="flex flex-col gap-3">
      {decisiones.map((d) => (
        <li
          key={d.decision}
          className={`flex flex-col gap-1 rounded-3xl border px-5 py-4 ${d.pendiente ? 'border-fijate bg-fijate-suave' : 'border-zinc-200 bg-white'}`}
        >
          <span className="flex items-center gap-2 text-sm">
            {d.pendiente ? (
              <span className="flex items-center gap-1 font-bold text-fijate-tinta">
                <Bombilla width={18} height={18} /> Pendiente
              </span>
            ) : (
              <span className="flex items-center gap-1 font-bold text-bien-tinta">
                <Check width={18} height={18} strokeWidth={3} /> Decidido
              </span>
            )}
            <span className="font-dato font-medium text-zinc-500">{cuando(d)}</span>
          </span>
          <span className="font-titulo text-lg leading-tight font-bold tracking-tight">{d.decision.replace(/^Pendiente:\s*/, '')}</span>
          <span className="text-base leading-snug text-zinc-600">{d.porque}</span>
        </li>
      ))}
    </ul>
  )
}
