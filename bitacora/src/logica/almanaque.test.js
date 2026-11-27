import { describe, expect, it } from 'vitest'
import almanaque from '../../contenido/almanaque.json'
import { adelanto, alternarTodos, apartadoActual, apartadosDe, bloquesDe, buscarEntradas, entradaPedida, hashEntrada, mecanicasDe, SECCIONES, usadaPor } from './almanaque.js'

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
  it('sabe en qué apartado vas según lo que ya pasó bajo la barra', () => {
    expect(apartadoActual([300, 900, 1500], 120)).toBe(0)
    expect(apartadoActual([-400, 80, 700], 120)).toBe(1)
    expect(apartadoActual([-900, -400, 100], 120)).toBe(2)
    expect(apartadoActual([-900, null, 100], 120)).toBe(2)
  })
  it('la fila de apartados: Vida solo en el bestiario, «Usada por» solo en las globales', () => {
    expect(apartadosDe(false).map(([k]) => k)).toEqual(['real', 'vida', 'juego', 'mecanicas', 'datos', 'avisos'])
    expect(apartadosDe(true).map(([k]) => k)).toContain('usos')
    expect(apartadosDe(true).map(([k]) => k)).not.toContain('vida')
  })
  it('da una línea de adelanto sin viñetas y cortada en una palabra', () => {
    expect(adelanto('- Uno.\n- Dos.')).toBe('Uno. · Dos.')
    const largo = adelanto('El bombo vive en claros del bosque donde el suelo suena hueco y la tribu se junta al atardecer a tocar', 40)
    expect(largo.endsWith('…')).toBe(true)
    expect(largo.length).toBeLessThanOrEqual(41)
    expect(adelanto(null)).toBe('')
  })
  it('abre todo si falta alguno y cierra todo si ya estaban abiertos', () => {
    expect([...alternarTodos(new Set(['a']), ['a', 'b'])].sort()).toEqual(['a', 'b'])
    expect([...alternarTodos(new Set(['a', 'b', 'x']), ['a', 'b'])]).toEqual(['x'])
  })
})
