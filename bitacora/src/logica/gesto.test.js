import { describe, expect, it } from 'vitest'
import { anotarMuestra, decidirGesto, GESTO, progresoGesto, resistencia, salidaLanzada, velocidadDe } from './gesto.js'

describe('jalar la barra', () => {
  it('abajo: hacia abajo lejos (30 px o más) cambia de lado', () => {
    expect(decidirGesto({ orilla: 'abajo', dy: 30 })).toMatchObject({ cambia: true, porque: 'lejos' })
    expect(decidirGesto({ orilla: 'abajo', dy: 29, velocidad: 100 })).toMatchObject({ cambia: false, porque: 'poco' })
  })
  it('abajo: poquito pero rápido (500 px/s o más) también cambia', () => {
    expect(decidirGesto({ orilla: 'abajo', dy: 12, velocidad: 500 })).toMatchObject({ cambia: true, porque: 'rapido' })
    expect(decidirGesto({ orilla: 'abajo', dy: 12, velocidad: 499 })).toMatchObject({ cambia: false })
  })
  it('un temblor rápido de menos de 6 px no cuenta', () => {
    expect(decidirGesto({ orilla: 'abajo', dy: 5, velocidad: 2000 }).cambia).toBe(false)
  })
  it('hacia el centro siempre rebota, por lejos o rápido que sea', () => {
    expect(decidirGesto({ orilla: 'abajo', dy: -200, velocidad: -3000 })).toMatchObject({ cambia: false, porque: 'centro' })
    expect(decidirGesto({ orilla: 'arriba', dy: 200, velocidad: 3000 })).toMatchObject({ cambia: false, porque: 'centro' })
  })
  it('arriba es al revés: hacia arriba cambia', () => {
    expect(decidirGesto({ orilla: 'arriba', dy: -30 })).toMatchObject({ cambia: true, porque: 'lejos' })
    expect(decidirGesto({ orilla: 'arriba', dy: -10, velocidad: -800 })).toMatchObject({ cambia: true, porque: 'rapido' })
  })
  it('acepta otro umbral', () => {
    expect(decidirGesto({ orilla: 'abajo', dy: 30 }, { ...GESTO, lejos: 40 }).cambia).toBe(false)
  })
})

describe('la otra barra se va escondiendo', () => {
  it('avanza de 0 a 1 al acercarse al umbral, y no se mueve hacia el centro', () => {
    expect(progresoGesto({ orilla: 'abajo', dy: 15 })).toBe(0.5)
    expect(progresoGesto({ orilla: 'abajo', dy: 90 })).toBe(1)
    expect(progresoGesto({ orilla: 'abajo', dy: -40 })).toBe(0)
    expect(progresoGesto({ orilla: 'arriba', dy: -15 })).toBe(0.5)
  })
})

describe('resistencia y velocidad', () => {
  it('entre más jalas, menos avanza, sin pasar del máximo', () => {
    expect(resistencia(0, 0.8, 70)).toBe(0)
    expect(resistencia(10, 0.8, 70)).toBeLessThan(10)
    expect(resistencia(10000, 0.8, 70)).toBeLessThan(70)
    expect(resistencia(-50, 0.8, 70)).toBe(-resistencia(50, 0.8, 70))
  })
  it('mide la velocidad con las últimas muestras', () => {
    const m = []
    anotarMuestra(m, { t: 0, x: 0, y: 0 })
    anotarMuestra(m, { t: 150, x: 0, y: 10 }) // vieja: se descarta al llegar la siguiente
    anotarMuestra(m, { t: 200, x: 5, y: 60 })
    anotarMuestra(m, { t: 250, x: 10, y: 110 })
    expect(m).toHaveLength(3)
    expect(velocidadDe(m)).toEqual({ vx: 100, vy: 1000 })
    expect(velocidadDe([{ t: 0, x: 0, y: 0 }])).toEqual({ vx: 0, vy: 0 })
  })
})

describe('salida «Lanzada»', () => {
  it('acelera hasta llegar justo fuera de la pantalla', () => {
    const { y, duracion, salida } = salidaLanzada({ desde: 0, hasta: 100, velocidad: 700 })
    expect(y[0]).toBe(0)
    expect(y.at(-1)).toBe(100)
    expect(duracion).toBeGreaterThan(0)
    expect(salida).toBeGreaterThan(700)
    // Cada tramo recorre más que el anterior: va acelerando.
    const tramos = y.slice(1).map((v, i) => v - y[i])
    tramos.slice(1, -1).forEach((t, i) => expect(t).toBeGreaterThan(tramos[i]))
  })
  it('hacia arriba también, y con un dedo lento arranca al menos a 700 px/s', () => {
    const lenta = salidaLanzada({ desde: 0, hasta: -100, velocidad: 0 })
    const rapida = salidaLanzada({ desde: 0, hasta: -100, velocidad: -2000 })
    expect(lenta.y.at(-1)).toBe(-100)
    expect(lenta.y[1]).toBeLessThan(0)
    expect(rapida.duracion).toBeLessThan(lenta.duracion)
  })
})
