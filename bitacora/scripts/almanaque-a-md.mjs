// Pasa el almanaque (el artifact de claude.ai, que es la fuente de verdad) a contenido/almanaque.md para la página.
// Uso: node scripts/almanaque-a-md.mjs <carpeta>  (la carpeta tiene entradas/*.json y globales/*.json, como las
// guarda ArtifactData con out_dir). Cada ficha queda como una tarjeta («# Nombre»).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const carpeta = process.argv[2]
if (!carpeta) throw new Error('Falta la carpeta con entradas/ y globales/')

const leer = (sub) =>
  readdirSync(join(carpeta, sub))
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(carpeta, sub, f), 'utf8')))
    .map((d) => d.data ?? d)
    .sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))

const VIDA = [
  ['habitat', 'Dónde vive'],
  ['dia', 'Cuándo sale'],
  ['alimento', 'Qué come'],
  ['social', 'Con quién vive'],
  ['crias', 'Crías'],
  ['sonido', 'Cómo suena'],
  ['relaciones', 'Con otras especies'],
]

const texto = (t) => (t ?? '').trim()
const seccion = (titulo, cuerpo) => (texto(cuerpo) ? `## ${titulo}\n\n${texto(cuerpo)}\n` : '')

const ficha = (e) => {
  const linea = [e.tipo, e.zona && (e.zona === 'Todas' ? 'todas las zonas' : `zona ${e.zona}`), e.estado && `estado: **${e.estado}**`, e.semana].filter((x) => texto(x) && x !== '—').join(' · ')
  const partes = [`# ${e.nombre}`, '', linea, '', texto(e.resumen), '']
  if (texto(e.ensena)) partes.push(`**Enseña:** ${texto(e.ensena)}`, '')
  if (texto(e.inspira)) partes.push(`**Se inspira en:** ${texto(e.inspira)}`, '')
  partes.push(seccion('Lo real', e.real))
  partes.push(seccion('En el juego', e.juego))
  if (e.mecanicas?.length) partes.push(seccion('Mecánicas', e.mecanicas.map((m) => `- **${m.nombre}:** ${texto(m.descripcion)}`).join('\n')))
  if (e.vida) partes.push(seccion('Vida', VIDA.filter(([k]) => texto(e.vida[k])).map(([k, n]) => `- **${n}:** ${texto(e.vida[k])}`).join('\n')))
  partes.push(seccion('Estados', e.estados))
  if (e.datos?.length) partes.push(seccion('Datos', e.datos.map((d) => `- \`${d.campo}\`: ${d.valor}${d.unidad ? ` ${d.unidad}` : ''}${d.nota ? ` (${d.nota})` : ''}`).join('\n')))
  partes.push(seccion('Riesgos', e.riesgos))
  partes.push(seccion('Notas', e.notas))
  return partes.map((p) => (p.startsWith('## ') ? `\n${p}` : `${p}\n`)).join('\n').replace(/\n{3,}/g, '\n\n')
}

const entradas = leer('entradas')
const globales = leer('globales')
const hoy = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Mexico_City' })

const intro = `# Cómo leer el almanaque

Copia del [almanaque](https://claude.ai/artifact/6AAnoQvQ6wnz2gt2Q3qKrg) tomada el ${hoy}. El almanaque es la fuente de verdad; esta copia se vuelve a generar cuando cambia.

- Primero van las especies, los depredadores y los obstáculos; después las mecánicas que usa todo el juego.
- **Estado:** «idea» es solo una idea, «propuesta» espera el OK, «aprobada» ya está decidida y «fuera de la 1.0» queda para después.
- Lo que dice «por verificar» todavía no está confirmado en fuentes reales.
`

writeFileSync(new URL('../contenido/almanaque.md', import.meta.url), [intro, ...entradas.map(ficha), ...globales.map(ficha)].join('\n'))
console.log(`almanaque.md: ${entradas.length} especies y ${globales.length} mecánicas globales`)
