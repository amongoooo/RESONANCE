import { describe, expect, it } from 'vitest'
import almanaque from '../../contenido/almanaque.json'
import { bloquesDe, buscarEntradas, entradaPedida, hashEntrada, mecanicasDe, SECCIONES, usadaPor } from './almanaque.js'

const bombo = { id: 'bombo', nombre: 'El bombo', tipo: 'Tribu', resumen: 'Golpea el suelo', mecanicas: [{ nombre: 'Pisotón', descripcion: 'Golpe grave', bloques: { entrada: 'El reloj', comunicacion: 'Manda «sonó algo»' }, usa: ['reloj-musical'] }] }
const enjambre = { id: 'enjambre', nombre: 'El enjambre', tipo: 'Depredador', resumen: 'Caza por oído', vida: { dia: 'Sale al atardecer' }, bloques: {} }

describe('almanaque', () => {
  it('busca sin acentos, por palabras y por tipo', () => {
    expect(buscarEntradas([bombo, enjambre], 'pisoton')).toEqual([bombo])
    expect(buscarEntradas([bombo, enjambre], 'atardecer')).toEqual([enjambre])
    expect(buscarEntradas([bombo, enjambre], '', 'Depredador')).toEqual([enjambre])
    expect(buscarEntradas([bombo, enjambre], 'golpe grave', 'Tribu')).toEqual([bombo])
  })
  it('separa los bloques escritos de los que no usa', () => {
    const { llenos, vacios } = bloquesDe(mecanicasDe(bombo)[0])
    expect(llenos.map(([k]) => k)).toEqual(['entrada', 'comunicacion'])
    expect(vacios).toHaveLength(3)
    expect(mecanicasDe(enjambre)).toEqual([])
  })
  it('sabe qué criaturas usan una mecánica global', () => {
    expect(usadaPor([bombo, enjambre], 'reloj-musical').map((u) => u.criatura.id)).toEqual(['bombo'])
    expect(usadaPor([bombo, enjambre], 'mapa')).toEqual([])
  })
  it('lee y arma la dirección de una entrada', () => {
    expect(entradaPedida(hashEntrada('globales', 'checkpoint'))).toEqual({ seccion: 'globales', id: 'checkpoint' })
    expect(entradaPedida('#/juego/almanaque?e=bombo')).toEqual({ seccion: 'bestiario', id: 'bombo' })
    expect(entradaPedida('#/juego/almanaque')).toBeNull()
  })
  it('la copia del almanaque trae las dos secciones con tipos conocidos', () => {
    for (const s of SECCIONES) {
      expect(almanaque[s.id].length).toBeGreaterThan(0)
      for (const e of almanaque[s.id]) expect(s.tipos).toContain(e.tipo)
    }
  })
})
