// Fechas como "AAAA-MM-DD" en hora local (igual que habitos-app, lib/dates.js):
// así nada se corre un día por la zona horaria.

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export const aClave = (fecha) => {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export const deClave = (clave) => {
  const [y, m, d] = clave.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const sumarDias = (fecha, dias) => {
  const d = new Date(fecha)
  d.setDate(d.getDate() + dias)
  return d
}

/** Días de `desde` a `hasta` (claves o Date), contando días de calendario. */
export const diasEntre = (desde, hasta) => {
  const a = typeof desde === 'string' ? deClave(desde) : desde
  const b = typeof hasta === 'string' ? deClave(hasta) : hasta
  const A = new Date(a.getFullYear(), a.getMonth(), a.getDate())
  const B = new Date(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((B - A) / 864e5)
}

export const corta = (clave) => {
  const d = deClave(clave)
  return `${d.getDate()} ${MESES[d.getMonth()]}`
}

export const larga = (clave) => {
  const d = deClave(clave)
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`
}

/** «Faltan 4 días», «Falta 1 día», «Es hoy», «Se pasó por 2 días». */
export const plazo = (clave, hoy = new Date()) => {
  const n = diasEntre(hoy, clave)
  if (n > 1) return `Faltan ${n} días`
  if (n === 1) return 'Falta 1 día'
  if (n === 0) return 'Es hoy'
  return n === -1 ? 'Se pasó por 1 día' : `Se pasó por ${-n} días`
}

/** «23 nov 2026 · 00:55» si trae hora; si no, solo la fecha. Para bitácora y decisiones. */
export const cuando = ({ fecha, hora }) => (hora ? `${larga(fecha)} · ${hora}` : larga(fecha))

/** Orden de lo más nuevo a lo más viejo, por fecha y luego por hora (sin hora cuenta como el inicio del día). */
export const masNuevoPrimero = (a, b) => `${b.fecha} ${b.hora ?? '00:00'}`.localeCompare(`${a.fecha} ${a.hora ?? '00:00'}`)
