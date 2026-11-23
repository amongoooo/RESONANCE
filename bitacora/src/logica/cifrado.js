// Cifrado de la historia (para que el repo, que es público, no la deje leer sin contraseña).
// AES-GCM de 256 bits con la llave sacada de la contraseña por PBKDF2-SHA256. Funciona igual en el navegador
// (Web Crypto) y en Node (scripts/cifrar-historia.mjs), así el mismo código cifra y descifra.

const ITERACIONES = 250000
const texto = new TextEncoder()
const deTexto = new TextDecoder()

const aB64 = (bytes) => {
  let s = ''
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b)
  return btoa(s)
}
const deB64 = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))

const llave = async (clave, sal, iteraciones) => {
  const base = await crypto.subtle.importKey('raw', texto.encode(clave), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: sal, iterations: iteraciones, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, [
    'encrypt',
    'decrypt',
  ])
}

/** Cifra `contenido` (texto) con `clave`. Regresa un objeto listo para guardar como JSON. */
export const cifrar = async (contenido, clave) => {
  const sal = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const datos = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await llave(clave, sal, ITERACIONES), texto.encode(contenido))
  return { v: 1, iteraciones: ITERACIONES, sal: aB64(sal), iv: aB64(iv), datos: aB64(datos) }
}

/** Descifra lo que regresó `cifrar`. Si la contraseña no es la correcta, regresa null. */
export const descifrar = async (cifrado, clave) => {
  try {
    const k = await llave(clave, deB64(cifrado.sal), cifrado.iteraciones)
    const plano = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: deB64(cifrado.iv) }, k, deB64(cifrado.datos))
    return deTexto.decode(plano)
  } catch {
    return null
  }
}
