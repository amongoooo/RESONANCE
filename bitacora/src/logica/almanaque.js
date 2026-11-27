// El almanaque en la página: la misma organización que el artifact (Bestiario y Mecánicas globales, filtro por tipo,
// búsqueda y una ficha por entrada), solo para leer. Los datos salen de contenido/almanaque.json.

export const SECCIONES = [
  { id: 'bestiario', nombre: 'Bestiario', tipos: ['Protagonista', 'Tribu', 'Depredador', 'Neutra'] },
  { id: 'globales', nombre: 'Mecánicas globales', tipos: ['Sistema', 'Regla', 'Obstáculo', 'Progresión', 'Mundo'] },
]

export const VIDA = [
  ['habitat', 'Dónde vive'],
  ['alimento', 'Qué come'],
  ['dia', 'Su día'],
  ['social', 'Vida social'],
  ['crias', 'Crías y ciclo de vida'],
  ['sonido', 'Cómo usa el sonido'],
  ['relaciones', 'Con quién se relaciona'],
]

export const BLOQUES = [
  ['entrada', 'Entrada'],
  ['deteccion', 'Detección'],
  ['estado', 'Estado y lógica'],
  ['transformacion', 'Transformación'],
  ['comunicacion', 'Comunicación'],
]

const t = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v))
const plano = (v) => t(v).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Las mecánicas de una entrada (las viejas tenían un solo juego de bloques). */
export const mecanicasDe = (e) => {
  if (Array.isArray(e.mecanicas)) return e.mecanicas
  const b = e.bloques || {}
  return BLOQUES.some(([k]) => t(b[k]).trim()) ? [{ nombre: 'Mecánica principal', descripcion: '', bloques: { ...b } }] : []
}

/** Los bloques de una mecánica que tienen algo escrito y los que no usa. */
export const bloquesDe = (m) => {
  const lleno = ([k]) => t(m.bloques?.[k]).trim()
  return { llenos: BLOQUES.filter(lleno), vacios: BLOQUES.filter((b) => !lleno(b)) }
}

/** Filtra por tipo («Todas» = sin filtro) y por palabras, sin importar acentos. */
export const buscarEntradas = (entradas, consulta = '', tipo = 'Todas') => {
  const palabras = plano(consulta).split(/\s+/).filter(Boolean)
  return entradas.filter((e) => {
    if (tipo !== 'Todas' && e.tipo !== tipo) return false
    const todo = plano(
      [e.nombre, e.resumen, e.ensena, e.inspira, e.tipo, e.zona, e.avisosManda, e.avisosEscucha, ...Object.values(e.vida || {}), ...mecanicasDe(e).map((m) => `${t(m.nombre)} ${t(m.descripcion)}`)].join(' '),
    )
    return palabras.every((p) => todo.includes(p))
  })
}

/** Qué mecánicas de criaturas usan una mecánica global: [{ criatura, mecanica }]. */
export const usadaPor = (bestiario, idGlobal) =>
  bestiario.flatMap((c) => mecanicasDe(c).filter((m) => Array.isArray(m.usa) && m.usa.includes(idGlobal)).map((m) => ({ criatura: c, mecanica: m })))

/** De «#/juego/almanaque?g=checkpoint» a { seccion, id }; sin pedido, null. */
export const entradaPedida = (hash = '') => {
  const q = new URLSearchParams(hash.split('?')[1] ?? '')
  if (q.get('g')) return { seccion: 'globales', id: q.get('g') }
  if (q.get('e')) return { seccion: 'bestiario', id: q.get('e') }
  return null
}

export const hashEntrada = (seccion, id) => `#/juego/almanaque?${seccion === 'globales' ? 'g' : 'e'}=${encodeURIComponent(id)}`

/**
 * Los apartados de la ficha que van en la fila de la barra fija, en orden. Cada uno marca dónde empieza;
 * lo que va entre dos (Estados, Riesgos, Notas…) cuenta como parte del anterior.
 */
export const apartadosDe = (esGlobal) =>
  esGlobal
    ? [['real', 'Real'], ['juego', 'Juego'], ['mecanicas', 'Mecánicas'], ['usos', 'Usos'], ['datos', 'Datos'], ['avisos', 'Avisos']]
    : [['real', 'Real'], ['vida', 'Vida'], ['juego', 'Juego'], ['mecanicas', 'Mecánicas'], ['datos', 'Datos'], ['avisos', 'Avisos']]

/**
 * En qué apartado vas: el último cuyo comienzo ya pasó por debajo de la barra fija.
 * `tops` son las posiciones de cada apartado en pantalla (null si no está); antes del primero, el primero.
 */
export const apartadoActual = (tops, limite) => {
  let actual = 0
  tops.forEach((top, i) => {
    if (top != null && top <= limite) actual = i
  })
  return actual
}

/** Una línea de adelanto para un bloque cerrado: el texto sin viñetas ni saltos, cortado en una palabra. */
export const adelanto = (texto, max = 90) => {
  const plano1 = t(texto)
    .split('\n')
    .map((l) => l.trim().replace(/^[-*]\s+/, ''))
    .filter(Boolean)
    .join(' · ')
    .replace(/\*\*|__|`/g, '')
  if (plano1.length <= max) return plano1
  const corte = plano1.slice(0, max)
  const espacio = corte.lastIndexOf(' ')
  return `${(espacio > max * 0.6 ? corte.slice(0, espacio) : corte).replace(/[\s·,;:.]+$/, '')}…`
}

/** Abrir o cerrar todos: si ya están todos abiertos, se cierran; si falta alguno, se abren todos. */
export const alternarTodos = (abiertos, claves) => {
  const todos = claves.length > 0 && claves.every((k) => abiertos.has(k))
  const nuevo = new Set(abiertos)
  claves.forEach((k) => (todos ? nuevo.delete(k) : nuevo.add(k)))
  return nuevo
}
