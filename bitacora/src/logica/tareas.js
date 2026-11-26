// Metas diarias: las tareas de cada semana (contenido/tareas/AAAA-Sxx.md, formato en su LEEME.md) leídas por día.
// Cada tarea puede decir cuánto tiempo pide («· 45 min» o «· 1 h») y la página lo compara con el tiempo del día
// (datos.js > tiempo).

import { aClave, deClave, sumarDias } from './fechas.js'

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
export const DIAS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']

/** Lunes de la semana ISO `semana` del año ISO `anio` (la semana 1 es la que tiene el primer jueves del año). */
export function lunesDeSemana(anio, semana) {
  const cuatroEne = new Date(anio, 0, 4)
  const lunes1 = sumarDias(cuatroEne, -((cuatroEne.getDay() + 6) % 7))
  return sumarDias(lunes1, (semana - 1) * 7)
}

/** «2026-S48» de una fecha (clave o Date). */
export function claveSemana(fecha) {
  const d = typeof fecha === 'string' ? deClave(fecha) : new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
  const jueves = sumarDias(d, 3 - ((d.getDay() + 6) % 7))
  const anio = jueves.getFullYear()
  const semana = 1 + Math.round((jueves - lunesDeSemana(anio, 1)) / (7 * 864e5))
  return `${anio}-S${String(semana).padStart(2, '0')}`
}

/** Las 7 fechas (lunes a domingo) de una semana «2026-S48». */
export function diasDeSemana(clave) {
  const [anio, semana] = clave.split('-S').map(Number)
  const lunes = lunesDeSemana(anio, semana)
  return DIAS.map((_, i) => aClave(sumarDias(lunes, i)))
}

/** «45 min», «1 h», «1 h 30 min», «1.5 h» → minutos; si no es un tiempo, null. */
export function minutosDeTexto(t) {
  const m = t.trim().match(/^(?:(\d+(?:[.,]\d+)?)\s*h)?\s*(?:(\d+)\s*min)?$/i)
  if (!m || (!m[1] && !m[2])) return null
  return Math.round(parseFloat((m[1] ?? '0').replace(',', '.')) * 60 + Number(m[2] ?? 0))
}

const RENGLON = /^- \[( |x|X)\] (?:\(([^)]+)\) )?(.*)$/
const PASO = /^\s{2,}- \[( |x|X)\] (.*)$/

function leerTarea(hecha, categoria, resto) {
  const partes = resto.split(' · ')
  const t = { hecha, categoria: categoria ?? null, texto: partes[0].trim(), minutos: null, cuando: null, claude: false, pasos: [], nota: '' }
  for (const p of partes.slice(1).map((x) => x.trim())) {
    const min = minutosDeTexto(p)
    if (p === '@claude') t.claude = true
    else if (min !== null) t.minutos = min
    else t.cuando = t.cuando ? `${t.cuando} · ${p}` : p
  }
  // «@claude» pegado al final de la última parte.
  if (t.texto.endsWith('@claude')) {
    t.texto = t.texto.replace(/\s*@claude$/, '')
    t.claude = true
  }
  return t
}

/**
 * Lee un archivo de tareas. `clave`: «2026-S48». Devuelve { clave, nota, dias: [{ fecha, nota, tareas }] } con los
 * días en el orden del archivo; la fecha sale de la semana (el título «## mié 25 nov» solo dice qué día es).
 */
export function leerSemana(clave, texto) {
  const fechas = diasDeSemana(clave)
  const semana = { clave, nota: '', dias: [] }
  let dia = null
  let tarea = null
  for (const linea of texto.split('\n')) {
    const titulo = linea.match(/^## (\S+)\s+(\d+)\s+(\S+)/)
    if (titulo) {
      const fecha = fechas.find((f) => Number(f.slice(8)) === Number(titulo[2]) && MESES[Number(f.slice(5, 7)) - 1] === titulo[3].toLowerCase().slice(0, 3))
      dia = { fecha: fecha ?? null, titulo: linea.slice(3).trim(), nota: '', tareas: [] }
      semana.dias.push(dia)
      tarea = null
      continue
    }
    const r = linea.match(RENGLON)
    if (r && dia) {
      tarea = leerTarea(r[1] !== ' ', r[2], r[3])
      dia.tareas.push(tarea)
      continue
    }
    const p = linea.match(PASO)
    if (p && tarea) {
      tarea.pasos.push({ hecha: p[1] !== ' ', texto: p[2].trim() })
      continue
    }
    const suelta = linea.trim()
    if (!suelta || suelta.startsWith('#')) continue
    // Texto sangrado debajo de una tarea: es nota de esa tarea.
    if (tarea && /^\s{2,}/.test(linea)) {
      tarea.nota = tarea.nota ? `${tarea.nota} ${suelta}` : suelta
      continue
    }
    if (dia) dia.nota = dia.nota ? `${dia.nota} ${suelta}` : suelta
    else semana.nota = semana.nota ? `${semana.nota} ${suelta}` : suelta
  }
  return semana
}

/**
 * Cómo va un día contra el tiempo que tengo. `tiempo`: { minutos: 60, opcionales: ['sáb'] }.
 * Devuelve { planeado, pendiente, limite, opcional, sobra } (sobra < 0: se pasa del tiempo del día).
 */
export function resumenDia(dia, tiempo) {
  const nombre = DIAS[(deClave(dia.fecha).getDay() + 6) % 7]
  const opcional = tiempo.opcionales.includes(nombre)
  const planeado = dia.tareas.reduce((s, t) => s + (t.minutos ?? 0), 0)
  const pendiente = dia.tareas.reduce((s, t) => s + (t.hecha ? 0 : (t.minutos ?? 0)), 0)
  return { nombre, planeado, pendiente, limite: tiempo.minutos, opcional, sobra: tiempo.minutos - planeado }
}

/** La semana completa de lunes a domingo: los días sin tareas también aparecen (vacíos). */
export function semanaCompleta(semana) {
  return diasDeSemana(semana.clave).map(
    (fecha) => semana.dias.find((d) => d.fecha === fecha) ?? { fecha, titulo: null, nota: '', tareas: [] },
  )
}

/** «45 min», «1 h», «1 h 15 min». */
export const textoMinutos = (m) => {
  const h = Math.floor(m / 60)
  const r = m % 60
  return h ? (r ? `${h} h ${r} min` : `${h} h`) : `${r} min`
}
