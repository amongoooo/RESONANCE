// Calendario de cuadritos de la Bitácora (como el de actividad de Claude Code o GitHub): una columna por semana
// (lunes arriba, domingo abajo) y un cuadrito por día. Más registros ese día, cuadrito más intenso.
import { aClave, deClave, sumarDias } from './fechas.js'

/** Lunes de la semana de `fecha`. */
const lunesDe = (fecha) => sumarDias(fecha, -((fecha.getDay() + 6) % 7))

/** Cuántos registros hubo cada día: { 'AAAA-MM-DD': { entradas, decisiones } }. */
export const contarPorDia = (entradas, decisiones = []) => {
  const dias = {}
  const sumar = (fecha, campo) => {
    dias[fecha] ??= { entradas: 0, decisiones: 0 }
    dias[fecha][campo]++
  }
  entradas.forEach((e) => sumar(e.fecha, 'entradas'))
  decisiones.forEach((d) => sumar(d.fecha, 'decisiones'))
  return dias
}

/** 0 (nada), 1, 2 o 3 (3 o más registros). */
export const nivel = (n) => (n <= 0 ? 0 : Math.min(3, n))

/**
 * Semanas de `desde` a `hasta` (claves «AAAA-MM-DD»). Cada semana es una lista de 7 días; los días fuera del rango
 * van como null (no se dibujan). También regresa dónde empieza cada mes, para poner su nombre debajo.
 */
export const armarCalendario = (desde, hasta, porDia = {}) => {
  const inicio = deClave(desde)
  const fin = deClave(hasta)
  const semanas = []
  const meses = []
  for (let lunes = lunesDe(inicio); lunes <= fin; lunes = sumarDias(lunes, 7)) {
    const semana = []
    for (let i = 0; i < 7; i++) {
      const d = sumarDias(lunes, i)
      if (d < inicio || d > fin) {
        semana.push(null)
        continue
      }
      const fecha = aClave(d)
      const c = porDia[fecha] ?? { entradas: 0, decisiones: 0 }
      const mes = fecha.slice(0, 7)
      if (meses[meses.length - 1]?.mes !== mes) meses.push({ mes, semana: semanas.length })
      semana.push({ fecha, mes, ...c, total: c.entradas + c.decisiones })
    }
    semanas.push(semana)
  }
  return { semanas, meses }
}
