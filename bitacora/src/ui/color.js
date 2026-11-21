// Un color por fase del calendario (como «un color por área» en teoria-musical). Siempre va con el nombre de la fase.
const COLORES_FASE = ['azul', 'naranja', 'turquesa', 'rosa', 'indigo', 'celeste']

export const colorFase = (id) => {
  const c = COLORES_FASE[id % COLORES_FASE.length]
  return {
    base: `var(--color-${c})`,
    relleno: `var(--color-${c}-relleno)`,
    tinta: `var(--color-${c}-tinta)`,
    suave: `var(--color-${c}-suave)`,
  }
}
