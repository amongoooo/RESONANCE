import { corta, diasEntre, larga, plazo } from '../logica/fechas.js'
import BarraProgreso from '../ui/BarraProgreso.jsx'
import { Bombilla } from '../ui/Iconos.jsx'
import { colorFase } from '../ui/color.js'

function Dato({ titulo, valor, detalle, children }) {
  return (
    <div className="flex flex-col gap-1 rounded-3xl border border-zinc-200 bg-white px-5 py-4">
      <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">{titulo}</span>
      <span className="font-titulo text-xl leading-tight font-bold tracking-tight">{valor}</span>
      {children}
      {detalle && <span className="text-base leading-snug text-zinc-600">{detalle}</span>}
    </div>
  )
}

export default function Estado({ D, fase, enCurso, proxima }) {
  const hechas = D.semanas.filter((s) => s.hecha).length
  const total = D.semanas.length
  const dias = diasEntre(new Date(), D.proyecto.congelamiento)
  const c = colorFase(fase.id)

  return (
    <div className="flex flex-col gap-4">
      {proxima && (
        <a
          href="#metas"
          className="flex items-start gap-3 rounded-3xl border-2 border-fijate bg-fijate-suave px-5 py-4 no-underline"
        >
          <Bombilla className="mt-0.5 shrink-0 text-fijate-tinta" />
          <span className="flex flex-col gap-1">
            <span className="text-sm font-semibold tracking-wider text-fijate-tinta uppercase">Próxima meta</span>
            <span className="font-titulo text-xl leading-tight font-bold tracking-tight text-zinc-900">{proxima.titulo}</span>
            <span className="text-base text-zinc-700">
              <strong className="text-fijate-tinta">{plazo(proxima.fecha)}</strong> ({larga(proxima.fecha)})
              {proxima.limite ? `. Límite duro: ${larga(proxima.limite)}.` : '.'}
            </span>
          </span>
        </a>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Dato titulo="Fase actual" valor={<span style={{ color: c.tinta }}>{fase.nombre}</span>} detalle={fase.meta} />
        <Dato titulo="Semanas completadas" valor={<span className="font-dato font-medium">{hechas} de {total}</span>}>
          <BarraProgreso valor={hechas / total} alto="h-2" className="my-1" etiqueta="Semanas completadas" />
        </Dato>
        <Dato
          titulo="Esta semana"
          valor={enCurso ? `Semana ${enCurso.n}` : `Arranca el ${corta(D.semanas[0].inicio)}`}
          detalle={enCurso ? enCurso.meta : D.semanas[0].meta}
        />
        <Dato
          titulo="Congelamiento de funciones"
          valor={<span className="font-dato font-medium">{dias > 0 ? `Faltan ${dias} días` : 'Ya pasó'}</span>}
          detalle={dias > 0 ? `Después del ${larga(D.proyecto.congelamiento)} no entra nada nuevo.` : 'Solo pulir y validar.'}
        />
      </div>
    </div>
  )
}
