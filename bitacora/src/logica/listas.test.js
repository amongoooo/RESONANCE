import { describe, expect, it } from 'vitest'
import { contarEtiquetas, idDecision, porMes, separarDecisiones } from './listas.js'
import { paginaDeHash } from './rutas.js'

describe('páginas', () => {
  it('elige la página por la dirección', () => {
    expect(paginaDeHash('#/bitacora')).toBe('bitacora')
    expect(paginaDeHash('')).toBe('inicio')
    expect(paginaDeHash('#/no-existe')).toBe('inicio')
  })
  it('las anclas viejas llevan a su página nueva', () => {
    expect(paginaDeHash('#metas')).toBe('plan')
    expect(paginaDeHash('#decisiones')).toBe('decisiones')
  })
})

describe('listas', () => {
  it('agrupa por mes, lo más nuevo primero', () => {
    const g = porMes([
      { fecha: '2026-11-20', titulo: 'a' },
      { fecha: '2026-12-02', titulo: 'b' },
      { fecha: '2026-11-23', hora: '01:00', titulo: 'c' },
    ])
    expect(g.map((x) => x.mes)).toEqual(['diciembre de 2026', 'noviembre de 2026'])
    expect(g[1].items.map((x) => x.titulo)).toEqual(['c', 'a'])
  })
  it('cuenta etiquetas', () => {
    expect(contarEtiquetas([{ etiquetas: ['audio', 'diseño'] }, { etiquetas: ['diseño'] }])).toEqual([
      { etiqueta: 'diseño', n: 2 },
      { etiqueta: 'audio', n: 1 },
    ])
  })
  it('separa decisiones pendientes, vigentes y cambiadas', () => {
    const { pendientes, vigentes, cambiadas } = separarDecisiones([
      { fecha: '2026-11-20', decision: 'Audio con FMOD' },
      { fecha: '2026-11-20', decision: 'Pendiente: 2D o 2.5D', pendiente: true },
      { fecha: '2026-11-23', hora: '01:01', decision: 'Audio sin FMOD', reemplaza: 'Audio con FMOD' },
    ])
    expect(pendientes).toHaveLength(1)
    expect(vigentes.map((d) => d.decision)).toEqual(['Audio sin FMOD'])
    expect(cambiadas[0].reemplazadaPor.decision).toBe('Audio sin FMOD')
  })
  it('hace ids limpios', () => {
    expect(idDecision({ decision: 'Música: el MIDI' })).toBe('d-musica-el-midi')
  })
})
