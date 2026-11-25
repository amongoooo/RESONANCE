import { describe, expect, it } from 'vitest'
import { migrar, OPCIONES } from './opciones.js'

describe('ajustes guardados', () => {
  it('«Orden de las barras» pasa a «Lado de la barra»', () => {
    expect(migrar({ barras: 'invertidas' })).toEqual({ lado: 'arriba' })
    expect(migrar({ barras: 'normal', tema: 'oscuro' })).toEqual({ lado: 'abajo', tema: 'oscuro' })
    expect(migrar({ lado: 'abajo', barras: 'invertidas' })).toEqual({ lado: 'abajo' })
    expect(migrar({ navegacion: 'ruleta' })).toEqual({ navegacion: 'ruleta' })
  })
  it('por defecto: barra, abajo', () => {
    expect(OPCIONES).toMatchObject({ lado: 'abajo', navegacion: 'barra' })
    expect(OPCIONES).not.toHaveProperty('barras')
  })
})
