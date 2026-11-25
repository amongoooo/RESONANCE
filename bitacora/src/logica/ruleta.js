// La ruleta de navegación (src/ui/Ruleta.jsx). `pos` es un número sin fin: 0 = la primera opción al centro,
// 1 = la segunda, 2.5 = a medio camino entre la tercera y la cuarta… Cada opción calcula su lugar a partir de él.
//  - Si TODAS las opciones caben a la vista, la ruleta tiene TOPE: no gira más allá de la primera ni de la última.
//  - Si no caben, es INFINITA: lo que sale por un lado entra por el otro.

/** Índice de 0 a n−1, también para números negativos (−1 → n−1). */
export const modulo = (i, n) => ((i % n) + n) % n

/** Lleva `v` al rango −m/2 … m/2 dándole la vuelta: así lo que sale por un lado entra por el otro. */
export const envolver = (v, m) => modulo(v + m / 2, m) - m / 2

/** ¿Caben todas a la vista? Entonces la ruleta lleva tope. */
export const conTope = (n, ancho, visible) => n * ancho <= visible

/**
 * Cuántos lugares dibujar. Con tope, uno por opción. Infinita, las opciones se repiten las veces necesarias para
 * que el salto de un lado al otro pase siempre fuera de la vista.
 */
export const lugaresDe = (n, ancho, visible, tope) => (tope ? n : Math.ceil((visible / ancho + 2) / n) * n)

/** Qué tan lejos del centro está el lugar `s` (en opciones): 0 = al centro, −1 = una a la izquierda… */
export const desplazamiento = (s, pos, lugares, tope) => (tope ? s - pos : envolver(s - pos, lugares))

/** La opción que queda al centro. */
export const indiceCentral = (pos, n) => modulo(Math.round(pos), n)

/** Con tope, `pos` no pasa de la primera ni de la última. */
export const limitar = (pos, n, tope) => (tope ? Math.max(0, Math.min(n - 1, pos)) : pos)

/**
 * Dónde se detiene al soltarla: sigue girando según la velocidad (opciones por segundo) y para justo en una opción.
 * `inercia` (s): entre más alta, más lejos llega con el mismo impulso.
 */
export const destino = ({ pos, velocidad = 0, inercia = 0.24, n, tope }) => limitar(Math.round(pos + velocidad * inercia), n, tope)

/** El `pos` más cercano a `pos` que deja la opción `i` al centro (el camino corto, en cualquier sentido). */
export function caminoCorto(pos, i, n, tope) {
  if (tope) return i
  const base = Math.round(pos)
  return base + envolver(i - modulo(base, n), n)
}
