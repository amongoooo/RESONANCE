import { describe, expect, it } from 'vitest'
import { apuntePedido, buscarApuntes, idDeRuta, leerApunte, leerApuntes, normalizar, ordenarApuntes, resumen } from './apuntes.js'

const BOMBO = `# Los 5 bloques de una mecánica
editado: 2026-11-27
etiquetas: Diseño, mecánicas , unity

Toda mecánica se arma con cinco bloques.

## Ejemplo: el bombo
- **Entrada:** el reloj.`

describe('leer un apunte', () => {
  it('saca título, fecha, etiquetas y texto', () => {
    const a = leerApunte('../../contenido/apuntes/cinco-bloques.md', BOMBO)
    expect(a.id).toBe('cinco-bloques')
    expect(a.titulo).toBe('Los 5 bloques de una mecánica')
    expect(a.editado).toBe('2026-11-27')
    expect(a.etiquetas).toEqual(['diseño', 'mecánicas', 'unity'])
    expect(a.cuerpo.startsWith('Toda mecánica')).toBe(true)
    expect(a.cuerpo).toContain('## Ejemplo: el bombo')
  })
  it('aguanta archivos a medias: sin título, sin fecha o con la fecha mal escrita', () => {
    expect(leerApunte('x/sin-titulo.md', 'Solo texto.')).toEqual({ id: 'sin-titulo', titulo: 'sin titulo', editado: null, etiquetas: [], cuerpo: 'Solo texto.' })
    expect(leerApunte('x/a.md', '# A\neditado: 27 nov\n\nHola').editado).toBeNull()
    expect(leerApunte('x/a.md', '\r\n# A\r\nEtiquetas:\r\n\r\nHola')).toMatchObject({ titulo: 'A', etiquetas: [], cuerpo: 'Hola' })
  })
  it('«editado:» dentro del texto no es un campo', () => {
    const a = leerApunte('x/a.md', '# A\n\nUn párrafo.\neditado: 2026-01-01')
    expect(a.editado).toBeNull()
    expect(a.cuerpo).toContain('editado: 2026-01-01')
  })
  it('el id sale del nombre del archivo', () => {
    expect(idDeRuta('../../contenido/apuntes/Estudio-de-tiles.MD')).toBe('Estudio-de-tiles')
  })
})

describe('ordenar', () => {
  it('lo editado más nuevo primero, luego por título y lo que no tiene fecha al final', () => {
    const orden = ordenarApuntes([
      { titulo: 'Zeta', editado: '2026-11-20' },
      { titulo: 'Sin fecha', editado: null },
      { titulo: 'Beta', editado: '2026-11-27' },
      { titulo: 'Álamo', editado: '2026-11-27' },
    ]).map((a) => a.titulo)
    expect(orden).toEqual(['Álamo', 'Beta', 'Zeta', 'Sin fecha'])
  })
  it('lee todos los archivos sin el LEEME', () => {
    const lista = leerApuntes({
      '../../contenido/apuntes/LEEME.md': '# Cómo agregar un apunte',
      '../../contenido/apuntes/viejo.md': '# Viejo\neditado: 2026-11-01',
      '../../contenido/apuntes/nuevo.md': '# Nuevo\neditado: 2026-11-26',
    })
    expect(lista.map((a) => a.id)).toEqual(['nuevo', 'viejo'])
  })
})

describe('buscar', () => {
  const apuntes = leerApuntes({
    'a/bloques.md': BOMBO,
    'a/tiles.md': '# Estudio de tiles\neditado: 2026-11-25\netiquetas: arte\n\nShovel Knight y Celeste.',
    'a/ritmo.md': '# Para escuchar: el ritmo\neditado: 2026-11-26\netiquetas: música\n\nEl bombo cae en el «1».',
  })
  const ids = (l) => l.map((a) => a.id)
  it('sin nada que buscar, regresa todo en el mismo orden', () => {
    expect(ids(buscarApuntes(apuntes, '  '))).toEqual(['bloques', 'ritmo', 'tiles'])
  })
  it('sin importar mayúsculas ni acentos, en título, etiquetas y texto', () => {
    expect(ids(buscarApuntes(apuntes, 'MECANICA'))).toEqual(['bloques'])
    expect(ids(buscarApuntes(apuntes, 'musica'))).toEqual(['ritmo'])
    expect(ids(buscarApuntes(apuntes, 'celeste'))).toEqual(['tiles'])
    expect(ids(buscarApuntes(apuntes, 'bombo'))).toEqual(['bloques', 'ritmo'])
  })
  it('todas las palabras tienen que estar', () => {
    expect(ids(buscarApuntes(apuntes, 'bombo reloj'))).toEqual(['bloques'])
    expect(ids(buscarApuntes(apuntes, 'bombo tiles'))).toEqual([])
  })
  it('filtra por etiqueta, y junto con la búsqueda', () => {
    expect(ids(buscarApuntes(apuntes, '', 'arte'))).toEqual(['tiles'])
    expect(ids(buscarApuntes(apuntes, 'bombo', 'música'))).toEqual(['ritmo'])
  })
  it('normaliza', () => {
    expect(normalizar('Ñandú Árbol')).toBe('nandu arbol')
  })
})

describe('tarjeta y dirección', () => {
  it('el resumen es el primer párrafo sin marcas, cortado en una palabra', () => {
    expect(resumen('## Sub\n\n**Hola** [mundo](https://x.y) y `código`.')).toBe('Hola mundo y código.')
    expect(resumen('uno dos tres cuatro', 12)).toBe('uno dos…')
    expect(resumen('')).toBe('')
  })
  it('lee qué apunte abrir de la dirección', () => {
    expect(apuntePedido('#/registro/apuntes?abrir=para-escuchar-el-ritmo')).toBe('para-escuchar-el-ritmo')
    expect(apuntePedido('#/registro/apuntes')).toBeNull()
  })
})
