// Árbol de metas: cada nodo tiene `titulo` y, o bien `ramas` (sub-metas), o bien `hecho` (es un paso).
// El avance de una rama se calcula con sus pasos: si se cumplen más pasos, sube la barra de toda la rama.

export const esPaso = (nodo) => !nodo.ramas || nodo.ramas.length === 0

/** { hechos, total } contando los pasos (hojas) debajo de `nodo`. */
export const avance = (nodo) => {
  if (esPaso(nodo)) return { hechos: nodo.hecho ? 1 : 0, total: 1 }
  return nodo.ramas.reduce(
    (acc, r) => {
      const a = avance(r)
      return { hechos: acc.hechos + a.hechos, total: acc.total + a.total }
    },
    { hechos: 0, total: 0 },
  )
}

export const cumplida = (nodo) => {
  const { hechos, total } = avance(nodo)
  return total > 0 && hechos === total
}

/** Les pone un `id` estable a todos los nodos ("0", "0.1", "0.1.2"…) según su lugar en el árbol. */
export const conIds = (nodo, id = '0') => ({
  ...nodo,
  id,
  ramas: nodo.ramas ? nodo.ramas.map((r, i) => conIds(r, `${id}.${i}`)) : undefined,
})

/** La meta pendiente (con ramas y con fecha) que vence primero, sin contar la raíz. */
export const proximaMeta = (raiz) => {
  const candidatas = []
  const recorrer = (nodo, profundidad) => {
    if (esPaso(nodo)) return
    if (profundidad > 0 && nodo.fecha && !cumplida(nodo)) candidatas.push(nodo)
    nodo.ramas.forEach((r) => recorrer(r, profundidad + 1))
  }
  recorrer(raiz, 0)
  return candidatas.sort((a, b) => a.fecha.localeCompare(b.fecha))[0] ?? null
}
