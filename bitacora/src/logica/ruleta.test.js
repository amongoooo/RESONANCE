import { describe, expect, it } from 'vitest'
import { caminoCorto, conTope, desplazamiento, destino, envolver, indiceCentral, limitar, lugaresDe, modulo } from './ruleta.js'

describe('ruleta: dar la vuelta', () => {
  it('después de la última sigue la primera, y antes de la primera la última', () => {
    expect(modulo(5, 5)).toBe(0)
    expect(modulo(-1, 5)).toBe(4)
    expect(modulo(-6, 5)).toBe(4)
    expect(indiceCentral(13.4, 5)).toBe(3)
    expect(indiceCentral(-0.6, 5)).toBe(4)
  })
  it('envolver deja todo entre −m/2 y m/2', () => {
    expect(envolver(0, 10)).toBe(0)
    expect(envolver(3, 10)).toBe(3)
    expect(envolver(-6, 10)).toBe(4)
    expect(envolver(7, 10)).toBe(-3)
  })
})

describe('ruleta: tope o infinita', () => {
  it('con tope si todas caben a la vista', () => {
    expect(conTope(2, 104, 366)).toBe(true) // Plan, Registro: 2 apartados
    expect(conTope(5, 104, 366)).toBe(false) // Juego: 5 apartados
    expect(conTope(5, 92, 448)).toBe(false) // las 5 páginas, aun en la barra más ancha
  })
  it('infinita: repite opciones para que el salto pase fuera de la vista', () => {
    expect(lugaresDe(2, 104, 366, true)).toBe(2)
    const l = lugaresDe(5, 92, 366, false)
    expect(l % 5).toBe(0)
    expect((l * 92) / 2).toBeGreaterThan(366 / 2 + 92) // la mitad de la vuelta queda más allá de la orilla
  })
  it('cada lugar sabe qué tan lejos del centro está', () => {
    expect(desplazamiento(0, 0, 10, false)).toBe(0)
    expect(desplazamiento(9, 0, 10, false)).toBe(-1) // el último queda justo a la izquierda
    expect(desplazamiento(1, 0, 2, true)).toBe(1)
    expect(desplazamiento(0, 1, 2, true)).toBe(-1)
  })
})

describe('ruleta: dónde se detiene', () => {
  it('sigue girando con el impulso y para en una opción', () => {
    expect(destino({ pos: 2, velocidad: 0, n: 5, tope: false })).toBe(2)
    expect(destino({ pos: 2.3, velocidad: 0, n: 5, tope: false })).toBe(2)
    expect(destino({ pos: 2, velocidad: 20, n: 5, tope: false })).toBe(7) // 20 opciones/s × 0.24 s ≈ 5 más
    expect(destino({ pos: 0, velocidad: -10, n: 5, tope: false })).toBe(-2)
  })
  it('con tope no pasa de la primera ni de la última', () => {
    expect(destino({ pos: 1, velocidad: 30, n: 2, tope: true })).toBe(1)
    expect(destino({ pos: 0, velocidad: -30, n: 2, tope: true })).toBe(0)
    expect(limitar(-0.4, 2, true)).toBe(0)
    expect(limitar(-0.4, 2, false)).toBe(-0.4)
  })
  it('para llegar a una opción toma el camino corto', () => {
    expect(caminoCorto(7, 0, 5, false)).toBe(5) // de la 2 a la 0: dos hacia atrás
    expect(caminoCorto(7, 4, 5, false)).toBe(9) // de la 2 a la 4: dos hacia adelante
    expect(caminoCorto(0, 4, 5, false)).toBe(-1) // de la primera a la última: una hacia atrás
    expect(indiceCentral(caminoCorto(-3, 1, 5, false), 5)).toBe(1)
    expect(caminoCorto(0.2, 1, 2, true)).toBe(1)
  })
})
