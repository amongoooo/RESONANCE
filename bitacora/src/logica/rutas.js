// Páginas de la bitácora. Cada una vive en su propia dirección con «#/», por ejemplo
// https://amongoooo.github.io/resonance/#/bitacora. Con «#» GitHub Pages no necesita
// configurar nada: siempre sirve el mismo index.html y la página se elige aquí.

export const PAGINAS = [
  { id: 'inicio', nombre: 'Inicio', titulo: 'Inicio' },
  { id: 'plan', nombre: 'Plan', titulo: 'Plan y metas' },
  { id: 'bitacora', nombre: 'Bitácora', titulo: 'Bitácora' },
  { id: 'decisiones', nombre: 'Decisiones', titulo: 'Decisiones' },
  { id: 'juego', nombre: 'El juego', titulo: 'El juego' },
]

// Las anclas de la página anterior (#estado, #metas…) siguen funcionando: llevan a su página nueva.
const ANTIGUAS = { estado: 'inicio', metas: 'plan', ruta: 'plan', validacion: 'juego' }

/** De «#/bitacora», «#bitacora» o «» a un id de página. Lo desconocido va a Inicio. */
export const paginaDeHash = (hash = '') => {
  const limpio = hash.replace(/^#\/?/, '').split(/[/?]/)[0].toLowerCase()
  if (PAGINAS.some((p) => p.id === limpio)) return limpio
  return ANTIGUAS[limpio] ?? 'inicio'
}

export const hashDePagina = (id) => (id === 'inicio' ? '#/' : `#/${id}`)
