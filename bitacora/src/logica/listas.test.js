import { describe, expect, it } from 'vitest'
import { contarEtiquetas, idDecision, porMes, separarDecisiones } from './listas.js'
import { hashDe, rutaDeHash, vistaDe } from './rutas.js'

describe('páginas', () => {
  it('elige página y apartado por la dirección', () => {
    expect(rutaDeHash('#/registro/decisiones')).toEqual({ pagina: 'registro', vista: 'decisiones' })
    expect(rutaDeHash('#/plan')).toEqual({ pagina: 'plan', vista: null })
    expect(rutaDeHash('')).toEqual({ pagina: 'inicio', vista: null })
    expect(rutaDeHash('#/no-existe')).toEqual({ pagina: 'inicio', vista: null })
  })
  it('sin apartado (o uno que no existe) muestra el primero', () => {
    expect(vistaDe(rutaDeHash('#/plan')).id).toBe('metas')
    expect(vistaDe(rutaDeHash('#/juego/nada')).id).toBe('idea')
    expect(vistaDe(rutaDeHash('#/ajustes'))).toBeNull()
  })
  it('las direcciones viejas llevan a su lugar nuevo', () => {
    expect(rutaDeHash('#metas')).toEqual({ pagina: 'plan', vista: 'metas' })
    expect(rutaDeHash('#/decisiones')).toEqual({ pagina: 'registro', vista: 'decisiones' })
    expect(rutaDeHash('#bitacora')).toEqual({ pagina: 'registro', vista: 'bitacora' })
  })
  it('arma direcciones', () => {
    expect(hashDe('inicio')).toBe('#/')
    expect(hashDe('registro', 'bitacora')).toBe('#/registro/bitacora')
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

import { armarCalendario, contarPorDia, nivel } from './calendario.js'

describe('calendario de cuadritos', () => {
  const porDia = contarPorDia([{ fecha: '2026-11-20' }, { fecha: '2026-11-23' }, { fecha: '2026-11-23' }], [{ fecha: '2026-11-23' }])
  it('cuenta registros por día', () => {
    expect(porDia['2026-11-23']).toEqual({ entradas: 2, decisiones: 1 })
    expect(nivel(0)).toBe(0)
    expect(nivel(7)).toBe(3)
  })
  it('no muestra días antes del inicio ni después de hoy', () => {
    const { semanas } = armarCalendario('2026-11-20', '2026-11-24', porDia)
    // 20 nov 2026 es viernes: la primera semana empieza el lunes 16, con lunes a jueves vacíos.
    expect(semanas).toHaveLength(2)
    expect(semanas[0].slice(0, 4)).toEqual([null, null, null, null])
    expect(semanas[0][4].fecha).toBe('2026-11-20')
    expect(semanas[1][0].fecha).toBe('2026-11-23')
    expect(semanas[1][0].total).toBe(3)
    expect(semanas[1][2]).toBeNull()
  })
  it('marca dónde empieza cada mes', () => {
    const { meses } = armarCalendario('2026-11-20', '2027-01-05')
    expect(meses.map((m) => m.mes)).toEqual(['2026-11', '2026-12', '2027-01'])
    expect(meses[0].semana).toBe(0)
  })
})

import { cifrar, descifrar } from './cifrado.js'

describe('historia cifrada', () => {
  it('se descifra solo con la contraseña correcta', async () => {
    const c = await cifrar('# Capa 1\nhola ñandú', 'clave buena')
    expect(c.datos).not.toContain('hola')
    expect(await descifrar(c, 'clave buena')).toBe('# Capa 1\nhola ñandú')
    expect(await descifrar(c, 'otra')).toBeNull()
  })
})
