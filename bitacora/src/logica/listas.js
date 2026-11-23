// Cómo se ordenan y agrupan las entradas de bitácora y las decisiones.
import { masNuevoPrimero } from './fechas.js'

const MESES_LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

/** «noviembre de 2026» a partir de «2026-11-23». */
export const nombreMes = (fecha) => {
  const [y, m] = fecha.split('-').map(Number)
  return `${MESES_LARGOS[m - 1]} de ${y}`
}

/** Lista ordenada de lo más nuevo a lo más viejo, partida por mes: [{ mes, clave, items }]. */
export const porMes = (lista) => {
  const grupos = []
  for (const item of [...lista].sort(masNuevoPrimero)) {
    const clave = item.fecha.slice(0, 7)
    const ultimo = grupos[grupos.length - 1]
    if (ultimo?.clave === clave) ultimo.items.push(item)
    else grupos.push({ clave, mes: nombreMes(item.fecha), items: [item] })
  }
  return grupos
}

/** Etiquetas con cuántas entradas tiene cada una, de la más usada a la menos. */
export const contarEtiquetas = (entradas) => {
  const cuenta = new Map()
  for (const e of entradas) for (const t of e.etiquetas ?? []) cuenta.set(t, (cuenta.get(t) ?? 0) + 1)
  return [...cuenta].map(([etiqueta, n]) => ({ etiqueta, n })).sort((a, b) => b.n - a.n || a.etiqueta.localeCompare(b.etiqueta))
}

/**
 * Separa las decisiones en tres montones:
 *  - pendientes: las que tienen  pendiente: true
 *  - vigentes: las que valen hoy
 *  - cambiadas: las que otra decisión reemplazó (la nueva dice  reemplaza: "<texto de la vieja>")
 * A cada cambiada le pega `reemplazadaPor` (la decisión nueva) para poder enlazarla.
 */
export const separarDecisiones = (decisiones) => {
  const nuevaDe = new Map()
  for (const d of decisiones) if (d.reemplaza) nuevaDe.set(d.reemplaza, d)
  const orden = [...decisiones].sort(masNuevoPrimero)
  return {
    pendientes: orden.filter((d) => d.pendiente),
    vigentes: orden.filter((d) => !d.pendiente && !nuevaDe.has(d.decision)),
    cambiadas: orden.filter((d) => !d.pendiente && nuevaDe.has(d.decision)).map((d) => ({ ...d, reemplazadaPor: nuevaDe.get(d.decision) })),
  }
}

/** Un id corto para enlazar una decisión dentro de su página. */
export const idDecision = (d) =>
  'd-' +
  d.decision
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
