import { describe, expect, it } from 'vitest'
import { aClave, deClave, diasEntre, larga, plazo } from './fechas.js'

describe('fechas', () => {
  it('ida y vuelta sin correrse de día', () => {
    expect(aClave(deClave('2026-11-25'))).toBe('2026-11-25')
    expect(larga('2027-05-01')).toBe('1 may 2027')
  })
  it('cuenta días de calendario, aunque sea de noche', () => {
    expect(diasEntre(new Date(2026, 10, 20, 23, 50), '2026-11-25')).toBe(5)
  })
  it('dice el plazo en palabras', () => {
    const hoy = new Date(2026, 10, 20)
    expect(plazo('2026-11-25', hoy)).toBe('Faltan 5 días')
    expect(plazo('2026-11-21', hoy)).toBe('Falta 1 día')
    expect(plazo('2026-11-20', hoy)).toBe('Es hoy')
    expect(plazo('2026-11-18', hoy)).toBe('Se pasó por 2 días')
  })
})
