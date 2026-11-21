import { describe, expect, it } from 'vitest'
import { avance, conIds, cumplida, proximaMeta } from './arbol.js'

const arbol = {
  titulo: 'Raíz',
  fecha: '2027-07-04',
  ramas: [
    { titulo: 'A', fecha: '2026-12-20', ramas: [{ titulo: 'a1', hecho: true }, { titulo: 'a2', hecho: false }] },
    { titulo: 'B', fecha: '2026-11-25', ramas: [{ titulo: 'b1', hecho: true }] },
    {
      titulo: 'C',
      fecha: '2027-01-10',
      ramas: [{ titulo: 'C1', fecha: '2026-12-01', ramas: [{ titulo: 'c1', hecho: false }, { titulo: 'c2', hecho: false }] }],
    },
  ],
}

describe('avance', () => {
  it('cuenta solo los pasos de toda la rama, en cualquier profundidad', () => {
    expect(avance(arbol)).toEqual({ hechos: 2, total: 5 })
    expect(avance(arbol.ramas[2])).toEqual({ hechos: 0, total: 2 })
  })
  it('una rama con todos sus pasos hechos está cumplida; una sin pasos, no', () => {
    expect(cumplida(arbol.ramas[1])).toBe(true)
    expect(cumplida(arbol.ramas[0])).toBe(false)
    expect(cumplida({ titulo: 'vacía', ramas: [] })).toBe(false)
  })
})

describe('proximaMeta', () => {
  it('es la pendiente que vence primero, aunque esté anidada, y salta las cumplidas', () => {
    expect(proximaMeta(arbol).titulo).toBe('C1')
  })
  it('sin metas pendientes con fecha no hay próxima', () => {
    expect(proximaMeta({ titulo: 'R', ramas: [{ titulo: 'x', hecho: true }] })).toBeNull()
  })
})

describe('conIds', () => {
  it('numera cada nodo según su lugar', () => {
    const t = conIds(arbol)
    expect(t.id).toBe('0')
    expect(t.ramas[2].ramas[0].ramas[1].id).toBe('0.2.0.1')
  })
})
