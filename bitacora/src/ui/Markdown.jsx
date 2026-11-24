// Markdown sencillo para los textos largos de la página (bitacora/contenido/*.md), sin librerías:
// # título, ## subtítulo, párrafos, listas con - o 1., sublistas con dos espacios, **negritas**, `código` y [enlaces](url).
// Un «# Título» parte el texto en secciones; `Markdown` las regresa ya separadas para ponerlas en tarjetas.

const enLinea = (texto, clave = 'l') => {
  const partes = []
  const patron = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let ultimo = 0
  let m
  let n = 0
  while ((m = patron.exec(texto))) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index))
    const k = `${clave}-${n++}`
    if (m[1]) partes.push(<strong key={k} className="font-bold text-zinc-900">{m[1]}</strong>)
    else if (m[2]) partes.push(<code key={k} className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-dato text-[0.9em]">{m[2]}</code>)
    else
      partes.push(
        <a key={k} href={m[4]} className="font-semibold text-sky-500 underline underline-offset-4">
          {m[3]}
        </a>,
      )
    ultimo = m.index + m[0].length
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo))
  return partes
}

/** Convierte líneas en bloques (párrafos, subtítulos, listas). */
const bloques = (lineas) => {
  const salida = []
  let i = 0
  while (i < lineas.length) {
    const l = lineas[i]
    if (!l.trim()) {
      i++
      continue
    }
    if (l.startsWith('## ')) {
      salida.push(
        <h3 key={i} className="mt-2 font-titulo text-lg font-bold tracking-tight">
          {enLinea(l.slice(3), `h${i}`)}
        </h3>,
      )
      i++
      continue
    }
    const lista = /^(\s*)(-|\d+\.)\s+/
    if (lista.test(l)) {
      const ordenada = /^\s*\d+\./.test(l)
      const items = []
      while (i < lineas.length && lista.test(lineas[i])) {
        const [, sangria, , ] = lineas[i].match(lista)
        const texto = lineas[i].replace(lista, '')
        if (sangria.length >= 2 && items.length) items[items.length - 1].hijos.push(texto)
        else items.push({ texto, hijos: [] })
        i++
      }
      const Lista = ordenada ? 'ol' : 'ul'
      salida.push(
        <Lista key={i} className={`flex flex-col gap-1.5 pl-6 ${ordenada ? 'list-decimal' : 'list-disc'} marker:text-zinc-400`}>
          {items.map((it, j) => (
            <li key={j} className="pl-1 text-lg leading-relaxed text-zinc-700">
              {enLinea(it.texto, `i${i}-${j}`)}
              {it.hijos.length > 0 && (
                <ul className="mt-1 flex list-[circle] flex-col gap-1 pl-6 marker:text-zinc-400">
                  {it.hijos.map((h, k) => (
                    <li key={k} className="text-base leading-relaxed text-zinc-600">
                      {enLinea(h, `s${i}-${j}-${k}`)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </Lista>,
      )
      continue
    }
    const parrafo = []
    while (i < lineas.length && lineas[i].trim() && !lineas[i].startsWith('#') && !lista.test(lineas[i])) parrafo.push(lineas[i++].trim())
    salida.push(
      <p key={i} className="text-lg leading-relaxed text-zinc-700">
        {enLinea(parrafo.join(' '), `p${i}`)}
      </p>,
    )
  }
  return salida
}

/** Parte el texto en secciones por «# Título»: [{ titulo, contenido }]. */
export const secciones = (texto) => {
  const partes = []
  for (const l of texto.replace(/\r/g, '').split('\n')) {
    if (l.startsWith('# ')) partes.push({ titulo: l.slice(2).trim(), lineas: [] })
    else (partes[partes.length - 1] ?? partes[partes.push({ titulo: null, lineas: [] }) - 1]).lineas.push(l)
  }
  return partes.map((p) => ({ titulo: p.titulo, contenido: bloques(p.lineas) }))
}

/** Un texto en Markdown como tarjetas, una por «# Título». */
export default function Markdown({ texto }) {
  return (
    <div className="flex flex-col gap-6">
      {secciones(texto).map((s, i) => (
        <section key={i} aria-label={s.titulo ?? undefined} className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white px-5 py-5">
          {s.titulo && <h2 className="font-titulo text-2xl font-extrabold tracking-tight">{s.titulo}</h2>}
          {s.contenido}
        </section>
      ))}
    </div>
  )
}
