import { LayoutGroup, motion } from 'motion/react'
import { useState } from 'react'
import { aClave, corta, sumarDias } from '../logica/fechas.js'
import { claveSemana, leerSemana, resumenDia, semanaCompleta, textoMinutos } from '../logica/tareas.js'
import { MarcaBien } from '../ui/Iconos.jsx'
import { RESORTE } from '../ui/movimiento.js'

// Metas diarias (Plan > Ruta): las tareas de esta semana y la siguiente, día por día, contra el tiempo del día
// (datos.js > tiempo). Las tareas vienen de contenido/tareas/AAAA-Sxx.md (formato en su LEEME.md).

const ARCHIVOS = import.meta.glob('../../contenido/tareas/*.md', { query: '?raw', import: 'default', eager: true })
const SEMANAS = Object.fromEntries(
  Object.entries(ARCHIVOS)
    .map(([ruta, texto]) => [ruta.match(/(\d{4}-S\d{2})\.md$/)?.[1], texto])
    .filter(([clave]) => clave)
    .map(([clave, texto]) => [clave, leerSemana(clave, texto)]),
)

const NOMBRE_DIA = { lun: 'Lunes', mar: 'Martes', mié: 'Miércoles', jue: 'Jueves', vie: 'Viernes', sáb: 'Sábado', dom: 'Domingo' }

function Casilla({ hecha, tam = 22 }) {
  return hecha ? (
    <MarcaBien tam={tam} className="mt-0.5" />
  ) : (
    <span className="mt-0.5 shrink-0 rounded-full border-2 border-zinc-300" style={{ width: tam, height: tam }} aria-hidden="true" />
  )
}

/** Barrita del día: lo planeado contra el tiempo del día. */
function Barra({ planeado, hecho, limite, pasa }) {
  const ancho = (m) => `${Math.min(100, (m / Math.max(limite, planeado)) * 100)}%`
  return (
    <span className="relative block h-1.5 w-full overflow-hidden rounded-full bg-zinc-100" aria-hidden="true">
      <span className={`absolute inset-y-0 left-0 rounded-full ${pasa ? 'bg-fijate' : 'bg-zinc-300'}`} style={{ width: ancho(planeado) }} />
      <span className="absolute inset-y-0 left-0 rounded-full bg-bien" style={{ width: ancho(hecho) }} />
    </span>
  )
}

function Dia({ dia, tiempo, hoy }) {
  const r = resumenDia(dia, tiempo)
  const esHoy = dia.fecha === hoy
  const paso = dia.fecha < hoy
  const pendientes = dia.tareas.filter((t) => !t.hecha)
  const todoHecho = dia.tareas.length > 0 && pendientes.length === 0
  const pasa = !r.opcional && r.sobra < 0
  // Un día que ya pasó y quedó completo se ve en una sola línea.
  const compacto = paso && todoHecho
  return (
    <li className={`flex flex-col gap-2.5 border-t border-zinc-100 px-5 py-4 first:border-t-0 ${esHoy ? 'bg-fijate-suave' : ''}`}>
      <div className="flex items-baseline gap-2">
        <span className={`font-titulo text-lg leading-tight font-bold tracking-tight ${paso && !esHoy ? 'text-zinc-500' : ''}`}>{NOMBRE_DIA[r.nombre]}</span>
        <span className="font-dato text-sm font-medium text-zinc-500">{corta(dia.fecha)}</span>
        {esHoy && <span className="text-sm font-bold text-fijate-tinta">hoy</span>}
        {r.opcional && <span className="text-sm font-semibold text-zinc-500">opcional</span>}
        {r.planeado > 0 && (
          <span className="ml-auto font-dato text-sm font-medium text-zinc-500">
            {textoMinutos(r.planeado)}
            {!r.opcional && <span className="text-zinc-400"> de {textoMinutos(r.limite)}</span>}
          </span>
        )}
      </div>

      {r.planeado > 0 && !compacto && <Barra planeado={r.planeado} hecho={r.planeado - r.pendiente} limite={r.limite} pasa={pasa} />}
      {pasa && <p className="text-base leading-snug font-semibold text-fijate-tinta">Se pasa de {textoMinutos(r.limite)} por {textoMinutos(-r.sobra)}: mueve algo a otro día.</p>}
      {paso && !esHoy && pendientes.length > 0 && <p className="text-base leading-snug font-semibold text-fijate-tinta">Quedó pendiente: pásalo a otro día.</p>}

      {dia.tareas.length === 0 ? (
        <p className="text-base text-zinc-400">Sin metas.</p>
      ) : compacto ? (
        <p className="flex items-center gap-2 text-base text-zinc-500">
          <MarcaBien tam={20} /> {dia.tareas.length === 1 ? '1 tarea hecha' : `${dia.tareas.length} tareas hechas`}
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {dia.tareas.map((t, i) => (
            <li key={i} className="flex items-start gap-3">
              <Casilla hecha={t.hecha} />
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className={`text-base leading-snug ${t.hecha ? 'text-zinc-500' : ''}`}>
                  <span className="sr-only">{t.hecha ? 'Hecha: ' : 'Pendiente: '}</span>
                  {t.texto}
                </span>
                {(t.categoria || t.minutos) && (
                  <span className="flex flex-wrap gap-x-2 text-sm text-zinc-500">
                    {t.categoria && <span className="font-semibold">{t.categoria}</span>}
                    {t.minutos && <span className="font-dato font-medium">{textoMinutos(t.minutos)}</span>}
                  </span>
                )}
                {t.pasos.length > 0 && !t.hecha && (
                  <ul className="mt-1 flex flex-col gap-1.5">
                    {t.pasos.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm leading-snug text-zinc-600">
                        <Casilla hecha={p.hecha} tam={16} />
                        <span className={p.hecha ? 'text-zinc-500' : ''}>{p.texto}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      {dia.nota && !compacto && <p className="text-base leading-snug text-zinc-600">{dia.nota}</p>}
    </li>
  )
}

export default function MetasDiarias({ tiempo, hoy = new Date() }) {
  const claveHoy = aClave(hoy)
  const opciones = [
    { id: 'esta', nombre: 'Esta semana', semana: SEMANAS[claveSemana(hoy)] },
    { id: 'siguiente', nombre: 'La siguiente', semana: SEMANAS[claveSemana(sumarDias(hoy, 7))] },
  ].filter((o) => o.semana)
  const [elegida, setElegida] = useState(opciones[0]?.id)
  const actual = opciones.find((o) => o.id === elegida) ?? opciones[0]
  const opcionales = tiempo.opcionales.map((d) => NOMBRE_DIA[d]?.toLowerCase()).join(' y ')

  return (
    <section aria-labelledby="h-dia" className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 id="h-dia" className="font-titulo text-2xl font-bold tracking-tight">
          Día por día
        </h2>
        <p className="text-base leading-snug text-zinc-600">
          {textoMinutos(tiempo.minutos)} al día para el juego{opcionales && `; el ${opcionales} es opcional`}. Si te sobra tiempo, adelanta lo del día siguiente.
        </p>
      </div>

      {!actual ? (
        <p className="text-base text-zinc-500">Todavía no hay metas para esta semana.</p>
      ) : (
        <>
          {opciones.length > 1 && (
            <LayoutGroup id="metas-semana">
              <div role="radiogroup" aria-label="Semana" className="flex w-full gap-1 rounded-full bg-zinc-100 p-1">
                {opciones.map((o) => {
                  const activo = o.id === actual.id
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={activo}
                      onClick={() => setElegida(o.id)}
                      className={`relative flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-2 text-base font-bold transition-colors ${activo ? 'text-zinc-900' : 'text-zinc-500'}`}
                      style={{ touchAction: 'manipulation' }}
                    >
                      {activo && (
                        <motion.span layoutId="marca-metas-semana" transition={RESORTE.pulsar} className="absolute inset-0 rounded-full bg-white shadow-[0_1px_4px_rgb(16_18_28/0.14)]" />
                      )}
                      <span className="relative truncate">{o.nombre}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
          )}
          {actual.semana.nota && <p className="px-1 text-base leading-snug text-zinc-600">{actual.semana.nota}</p>}
          <ol className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white">
            {semanaCompleta(actual.semana).map((d) => (
              <Dia key={d.fecha} dia={d} tiempo={tiempo} hoy={claveHoy} />
            ))}
          </ol>
        </>
      )}
    </section>
  )
}
