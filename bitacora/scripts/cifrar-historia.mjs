// Cifra la historia para la página (Juego > Historia).
//
//   HISTORIA_CLAVE='la contraseña' node scripts/cifrar-historia.mjs <historia.md>
//   (o con npm, desde bitacora/:  HISTORIA_CLAVE='…' npm run cifrar -- <historia.md>)
//
// El texto original NO va en el repo (el repo es público): vive aparte (en los archivos privados del proyecto).
// Esto escribe solo la versión cifrada en contenido/historia.cifrada.json, que sí se sube.
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { cifrar, descifrar } from '../src/logica/cifrado.js'

const entrada = process.argv[2]
const clave = process.env.HISTORIA_CLAVE
if (!entrada || !clave) {
  console.error('Uso: HISTORIA_CLAVE=\'…\' node scripts/cifrar-historia.mjs <historia.md>')
  process.exit(1)
}

const contenido = await readFile(entrada, 'utf8')
const cifrado = await cifrar(contenido, clave)
if ((await descifrar(cifrado, clave)) !== contenido) throw new Error('El cifrado no regresó el mismo texto')

const salida = fileURLToPath(new URL('../contenido/historia.cifrada.json', import.meta.url))
await writeFile(salida, JSON.stringify(cifrado, null, 2) + '\n')
console.log(`Listo: ${salida} (${contenido.length} caracteres cifrados)`)
