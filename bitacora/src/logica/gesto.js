// El gesto de jalar una barra hacia arriba o hacia abajo (src/ui/Navegacion.jsx).
// Cada barra vive pegada a una orilla de la pantalla: «abajo» o «arriba».
//  - Hacia SU orilla: si la llevas lejos o la sueltas rápido, cambia de lado; si fue poco y lento, regresa.
//  - Hacia el centro de la pantalla: siempre regresa (rebota).

/** Decidido el 25 de nov. con la página de prueba: 30 px de lejos o 500 px por segundo. */
export const GESTO = {
  lejos: 30, //   px que hay que llevarla hacia la orilla
  rapido: 500, // px por segundo al soltarla hacia la orilla
  minimo: 6, //   px mínimos para que «rápido» cuente (un toque con temblor no la cambia)
}

/** +1 si la orilla está abajo (el dedo baja), −1 si está arriba (el dedo sube). */
export const haciaOrilla = (orilla) => (orilla === 'abajo' ? 1 : -1)

/**
 * ¿Cambia de lado o rebota? `dy`: cuánto se movió el dedo (+ hacia abajo). `velocidad`: px/s al soltar (+ hacia abajo).
 * Devuelve { cambia, porque: 'lejos' | 'rapido' | 'centro' | 'poco', d, vel } con d y vel medidos hacia la orilla.
 */
export function decidirGesto({ orilla, dy, velocidad = 0 }, g = GESTO) {
  const h = haciaOrilla(orilla)
  const d = dy * h
  const vel = velocidad * h
  if (d >= g.lejos) return { cambia: true, porque: 'lejos', d, vel }
  if (vel >= g.rapido && d >= g.minimo) return { cambia: true, porque: 'rapido', d, vel }
  return { cambia: false, porque: d < 0 ? 'centro' : 'poco', d, vel }
}

/** De 0 a 1: qué tanto se acerca el jalón a cambiar de lado (para que la otra barra se vaya escondiendo). */
export function progresoGesto({ orilla, dy }, g = GESTO) {
  const d = dy * haciaOrilla(orilla)
  return Math.max(0, Math.min(1, d / g.lejos))
}

/** Resistencia: entre más jalas, menos avanza, sin pasar nunca de `max` px. */
export function resistencia(d, factor, max) {
  const e = Math.abs(d) * factor
  return Math.sign(d) * (e / (1 + e / max))
}

/** Velocidad (px/s) con las muestras del puntero de los últimos ~100 ms: [{ t (ms), x, y }]. */
export function velocidadDe(muestras) {
  if (muestras.length < 2) return { vx: 0, vy: 0 }
  const a = muestras[0]
  const z = muestras[muestras.length - 1]
  const dt = Math.max(1, z.t - a.t) / 1000
  return { vx: (z.x - a.x) / dt, vy: (z.y - a.y) / dt }
}

/** Agrega una muestra y descarta las de hace más de `ventana` ms (deja al menos dos). */
export function anotarMuestra(muestras, m, ventana = 100) {
  muestras.push(m)
  while (muestras.length > 2 && m.t - muestras[0].t > ventana) muestras.shift()
  return muestras
}

/**
 * Salida de una barra: sigue la velocidad del dedo y ACELERA hasta quedar fuera de la pantalla (animación «Lanzada»).
 * Devuelve los cuadros clave para Motion, la duración en segundos y la velocidad con la que sale.
 */
export function salidaLanzada({ desde, hasta, velocidad, aceleracion = 9000, minima = 700, cuadros = 12 }) {
  const dir = Math.sign(hasta - desde) || 1
  const distancia = Math.abs(hasta - desde)
  const v0 = Math.max(Math.abs(velocidad), minima)
  // distancia = v0·t + ½·a·t²  →  t
  const t = distancia === 0 ? 0 : (-v0 + Math.sqrt(v0 * v0 + 2 * aceleracion * distancia)) / aceleracion
  const y = []
  for (let i = 0; i <= cuadros; i++) {
    const s = (t * i) / cuadros
    y.push(desde + dir * (v0 * s + 0.5 * aceleracion * s * s))
  }
  y[cuadros] = hasta
  return { y, duracion: t, salida: v0 + aceleracion * t }
}
