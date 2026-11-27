// Apuntes (Registro > Apuntes): lo que aprendo, un archivo .md por tema en contenido/apuntes/ (formato en su LEEME.md).
// Cada archivo empieza así:
//
//   # Título del apunte
//   editado: 2026-11-27
//   etiquetas: diseño, unity
//
// y después va el texto en el mismo Markdown que musica.md.

/** Minúsculas y sin acentos, para buscar «mecanica» y encontrar «Mecánica». */
export const normalizar = (texto = '') =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

/** «../../contenido/apuntes/cinco-bloques.md» → «cinco-bloques». */
export const idDeRuta = (ruta) => ruta.split('/').pop().replace(/\.md$/i, '')

const CAMPO = /^(editado|etiquetas)\s*:\s*(.*)$/i
const FECHA = /^\d{4}-\d{2}-\d{2}$/

/**
 * Lee un apunte: { id, titulo, editado, etiquetas, cuerpo }.
 * El título es la primera línea con «# »; «editado:» y «etiquetas:» se leen en las líneas de arriba, antes del texto.
 * Sin título, usa el nombre del archivo; una fecha mal escrita queda en null.
 */
export function leerApunte(ruta, texto) {
  const lineas = texto.replace(/\r/g, '').split('\n')
  const apunte = { id: idDeRuta(ruta), titulo: null, editado: null, etiquetas: [], cuerpo: '' }
  let i = 0
  for (; i < lineas.length; i++) {
    const l = lineas[i].trim()
    if (!l) continue
    if (!apunte.titulo && l.startsWith('# ')) {
      apunte.titulo = l.slice(2).trim()
      continue
    }
    const campo = l.match(CAMPO)
    if (!campo) break
    const valor = campo[2].trim()
    if (campo[1].toLowerCase() === 'editado') apunte.editado = FECHA.test(valor) ? valor : null
    else apunte.etiquetas = valor.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
  }
  apunte.titulo ??= apunte.id.replace(/-/g, ' ')
  apunte.cuerpo = lineas.slice(i).join('\n').trim()
  return apunte
}

/** Lo editado más nuevo primero; si empatan, por título. Los que no tienen fecha van al final. */
export const ordenarApuntes = (apuntes) =>
  [...apuntes].sort((a, b) => (b.editado ?? '').localeCompare(a.editado ?? '') || a.titulo.localeCompare(b.titulo, 'es'))

/** Todos los apuntes de un import.meta.glob ({ ruta: texto }), sin el LEEME, ya ordenados. */
export const leerApuntes = (archivos) =>
  ordenarApuntes(
    Object.entries(archivos)
      .filter(([ruta]) => !/\/leeme\.md$/i.test(ruta))
      .map(([ruta, texto]) => leerApunte(ruta, texto)),
  )

/**
 * Los apuntes que tienen la etiqueta (si se pide) y todas las palabras buscadas, en el título, las etiquetas o el texto.
 * Sin importar mayúsculas ni acentos. Respeta el orden en que vienen.
 */
export function buscarApuntes(apuntes, consulta = '', etiqueta = null) {
  const palabras = normalizar(consulta).split(/\s+/).filter(Boolean)
  return apuntes.filter((a) => {
    if (etiqueta && !a.etiquetas.includes(etiqueta)) return false
    if (!palabras.length) return true
    const donde = normalizar(`${a.titulo}\n${a.etiquetas.join(' ')}\n${a.cuerpo}`)
    return palabras.every((p) => donde.includes(p))
  })
}

/** Primer párrafo del texto, sin marcas de Markdown y cortado a `largo` letras: la probadita de la tarjeta cerrada. */
export function resumen(cuerpo, largo = 140) {
  const parrafo =
    cuerpo
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !p.startsWith('#')) ?? ''
  const limpio = parrafo
    .replace(/^\s*(-|\d+\.)\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|`/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return limpio.length <= largo ? limpio : `${limpio.slice(0, largo).replace(/\s+\S*$/, '')}…`
}

/** El apunte que pide la dirección para abrirlo de una vez: «#/registro/apuntes?abrir=cinco-bloques» → «cinco-bloques». */
export const apuntePedido = (hash = '') => new URLSearchParams(hash.split('?')[1] ?? '').get('abrir')
