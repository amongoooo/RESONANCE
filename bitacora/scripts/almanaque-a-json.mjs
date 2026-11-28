// Copia el almanaque (el artifact de claude.ai, que es la fuente de verdad) a contenido/almanaque.json para la página.
// Uso: node scripts/almanaque-a-json.mjs <carpeta>  (la carpeta tiene entradas/*.json y globales/*.json, como las
// guarda ArtifactData con out_dir). La página lo muestra con la misma organización que el almanaque.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const carpeta = process.argv[2]
if (!carpeta) throw new Error('Falta la carpeta con entradas/ y globales/')

const leer = (sub) =>
  readdirSync(join(carpeta, sub))
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ id: f.replace(/\.json$/, ''), ...JSON.parse(readFileSync(join(carpeta, sub, f), 'utf8')) }))
    .sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999) || a.nombre.localeCompare(b.nombre))

const tomado = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Mexico_City' })
const almanaque = { tomado, bestiario: leer('entradas'), globales: leer('globales') }

writeFileSync(new URL('../contenido/almanaque.json', import.meta.url), JSON.stringify(almanaque, null, 1) + '\n')
console.log(`almanaque.json: ${almanaque.bestiario.length} en el bestiario y ${almanaque.globales.length} mecánicas globales`)
