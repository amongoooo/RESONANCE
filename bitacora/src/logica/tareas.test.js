import { describe, expect, it } from 'vitest'
import { claveSemana, diasDeSemana, leerSemana, minutosDeTexto, resumenDia, semanaCompleta, textoMinutos } from './tareas.js'

const TIEMPO = { minutos: 60, opcionales: ['sáb'] }

describe('semanas', () => {
  it('la semana 48 de 2026 va del lunes 23 al domingo 29 de nov.', () => {
    expect(diasDeSemana('2026-S48')).toEqual(['2026-11-23', '2026-11-24', '2026-11-25', '2026-11-26', '2026-11-27', '2026-11-28', '2026-11-29'])
    expect(claveSemana('2026-11-25')).toBe('2026-S48')
    expect(claveSemana('2026-11-29')).toBe('2026-S48')
    expect(claveSemana('2026-11-30')).toBe('2026-S49')
  })
  it('las semanas que cruzan de año', () => {
    expect(claveSemana('2027-01-01')).toBe('2026-S53')
    expect(diasDeSemana('2026-S53')[0]).toBe('2026-12-28')
    expect(claveSemana('2027-01-04')).toBe('2027-S01')
  })
})

describe('tiempo de una tarea', () => {
  it('entiende minutos y horas', () => {
    expect(minutosDeTexto('45 min')).toBe(45)
    expect(minutosDeTexto('1 h')).toBe(60)
    expect(minutosDeTexto('1 h 30 min')).toBe(90)
    expect(minutosDeTexto('1,5 h')).toBe(90)
    expect(minutosDeTexto('tarde')).toBeNull()
    expect(minutosDeTexto('18:00')).toBeNull()
  })
  it('lo escribe corto', () => {
    expect(textoMinutos(45)).toBe('45 min')
    expect(textoMinutos(60)).toBe('1 h')
    expect(textoMinutos(75)).toBe('1 h 15 min')
  })
})

const ARCHIVO = `Nota de la semana.
Sigue la nota.

## jue 26 nov
- [ ] (juego) Importar la plantilla · 30 min · @claude
  - [x] Filtro Point
  - [ ] Cortar en 16
  Si se ve borrosa, revisa la compresión.
- [x] (arte) Sala de prueba · 30 min · tarde
Si no alcanza, pasa al viernes.

## sáb 28 nov
- [ ] (historia) Enemigos de la zona 1 · 45 min
- [ ] Sin categoría ni tiempo @claude
`

describe('leer un archivo de tareas', () => {
  const s = leerSemana('2026-S48', ARCHIVO)
  it('la nota de la semana y los días con su fecha', () => {
    expect(s.nota).toBe('Nota de la semana. Sigue la nota.')
    expect(s.dias.map((d) => d.fecha)).toEqual(['2026-11-26', '2026-11-28'])
    expect(s.dias[0].nota).toBe('Si no alcanza, pasa al viernes.')
  })
  it('cada tarea con categoría, tiempo, cuándo, @claude y pasos', () => {
    const [a, b] = s.dias[0].tareas
    expect(a).toMatchObject({ hecha: false, categoria: 'juego', texto: 'Importar la plantilla', minutos: 30, claude: true })
    expect(a.pasos).toEqual([
      { hecha: true, texto: 'Filtro Point' },
      { hecha: false, texto: 'Cortar en 16' },
    ])
    expect(a.nota).toBe('Si se ve borrosa, revisa la compresión.')
    expect(b).toMatchObject({ hecha: true, categoria: 'arte', minutos: 30, cuando: 'tarde', claude: false })
    expect(s.dias[1].tareas[1]).toMatchObject({ categoria: null, texto: 'Sin categoría ni tiempo', minutos: null, claude: true })
  })
  it('suma el día contra la hora diaria; el sábado es opcional', () => {
    expect(resumenDia(s.dias[0], TIEMPO)).toMatchObject({ nombre: 'jue', planeado: 60, pendiente: 30, sobra: 0, opcional: false })
    expect(resumenDia(s.dias[1], TIEMPO)).toMatchObject({ nombre: 'sáb', planeado: 45, opcional: true })
    expect(resumenDia({ fecha: '2026-11-27', tareas: [{ minutos: 50 }, { minutos: 25 }] }, TIEMPO).sobra).toBe(-15)
  })
  it('la semana completa tiene los 7 días, también los vacíos', () => {
    const c = semanaCompleta(s)
    expect(c).toHaveLength(7)
    expect(c[0]).toMatchObject({ fecha: '2026-11-23', tareas: [] })
    expect(c[3].tareas).toHaveLength(2)
  })
})

describe('los archivos de verdad', () => {
  const archivos = import.meta.glob('../../contenido/tareas/*.md', { query: '?raw', import: 'default', eager: true })
  it('cada día tiene fecha de su semana y cada tarea su texto', () => {
    const semanas = Object.entries(archivos).filter(([r]) => /\d{4}-S\d{2}\.md$/.test(r))
    expect(semanas.length).toBeGreaterThan(0)
    for (const [ruta, texto] of semanas) {
      const s = leerSemana(ruta.match(/(\d{4}-S\d{2})\.md$/)[1], texto)
      for (const d of s.dias) {
        expect(d.fecha, `${ruta}: «${d.titulo}» no es un día de esa semana`).not.toBeNull()
        d.tareas.forEach((t) => expect(t.texto.length).toBeGreaterThan(0))
      }
    }
  })
})
