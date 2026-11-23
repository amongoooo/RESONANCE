// Páginas de la bitácora. Cada una vive en su propia dirección con «#/», por ejemplo
// https://amongoooo.github.io/resonance/#/registro/decisiones. Con «#» GitHub Pages no necesita
// configurar nada: siempre sirve el mismo index.html y la página se elige aquí.
//
// Las pestañas de abajo son las PÁGINAS; las que tienen apartados (vistas) los muestran en una barra arriba,
// como Entrenar en teoria-musical (Oído | Ritmo | Letras).

const TODAS = [
  { id: 'inicio', nombre: 'Inicio', vistas: [] },
  {
    id: 'plan',
    nombre: 'Plan',
    vistas: [
      { id: 'metas', nombre: 'Metas', bajada: 'Qué sigue y cuánto falta para cada meta.' },
      { id: 'ruta', nombre: 'Ruta', bajada: 'Las 32 semanas, por fase.' },
    ],
  },
  {
    id: 'registro',
    nombre: 'Registro',
    vistas: [
      { id: 'bitacora', nombre: 'Bitácora', bajada: 'Lo que hice y aprendí, con fecha y hora.' },
      { id: 'decisiones', nombre: 'Decisiones', bajada: 'Qué decidí y por qué. Si algo cambia, la vieja se queda para ver el camino.' },
    ],
  },
  {
    id: 'juego',
    nombre: 'Juego',
    vistas: [
      { id: 'idea', nombre: 'Idea', bajada: 'Un plataformero donde no peleas: afinas el mundo para avanzar.' },
      { id: 'historia', nombre: 'Historia', bajada: 'El mundo, quién eres y por qué está en silencio, capa por capa.' },
      { id: 'musica', nombre: 'Música', bajada: 'La historia real de la música que inspira cada zona, con sus fuentes.' },
      { id: 'diseno', nombre: 'Diseño', bajada: 'Cómo suena y cómo se ve: la música y el estilo visual.' },
      { id: 'validacion', nombre: 'Validación', corto: 'Validar', bajada: 'Cómo se va a comprobar que el juego enseña.' },
    ],
  },
  { id: 'ajustes', nombre: 'Ajustes', vistas: [] },
]

/** Orden de la barra de abajo, de izquierda a derecha: Inicio al centro, al alcance del pulgar. */
export const PAGINAS = ['juego', 'plan', 'inicio', 'registro', 'ajustes'].map((id) => TODAS.find((p) => p.id === id))

// Direcciones viejas (anclas de la página anterior y las primeras de esta) → su página y vista nuevas.
const ANTIGUAS = {
  estado: ['inicio'],
  metas: ['plan', 'metas'],
  ruta: ['plan', 'ruta'],
  bitacora: ['registro', 'bitacora'],
  decisiones: ['registro', 'decisiones'],
  validacion: ['juego', 'validacion'],
  historia: ['juego', 'historia'],
  configuracion: ['ajustes'],
}

/**
 * De «#/registro/decisiones», «#/plan», «#bitacora» o «» a { pagina, vista }.
 * Lo desconocido va a Inicio; una vista que no existe va a la primera de su página (vista: null).
 */
export const rutaDeHash = (hash = '') => {
  const [a = '', b = ''] = hash.replace(/^#\/?/, '').split('?')[0].toLowerCase().split('/')
  const pagina = PAGINAS.find((p) => p.id === a)
  if (pagina) return { pagina: pagina.id, vista: pagina.vistas.some((v) => v.id === b) ? b : null }
  const vieja = ANTIGUAS[a]
  return vieja ? { pagina: vieja[0], vista: vieja[1] ?? null } : { pagina: 'inicio', vista: null }
}

/** La vista que toca mostrar: la pedida o la primera de la página. */
export const vistaDe = ({ pagina, vista }) => {
  const p = PAGINAS.find((x) => x.id === pagina)
  return p.vistas.find((v) => v.id === vista) ?? p.vistas[0] ?? null
}

export const hashDe = (pagina, vista) => (pagina === 'inicio' ? '#/' : vista ? `#/${pagina}/${vista}` : `#/${pagina}`)
