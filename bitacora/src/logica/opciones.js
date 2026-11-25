// Ajustes de quien visita la página. Se guardan solo en su navegador (localStorage) y se aplican como clases en
// <html>, así el CSS hace casi todo. index.html lee lo mismo antes de pintar (sin destello). Si agregas una opción:
// ponla en OPCIONES con su valor por defecto y, si cambia el aspecto, en `aplicar` y en el script de index.html.

const CLAVE = 'resonancia:opciones'

export const OPCIONES = {
  tema: 'sistema', //     claro | oscuro | sistema
  letra: 'normal', //     normal | grande
  movimiento: 'normal', // normal | reducido
  vidrio: 'desenfoque', // desenfoque | opaco
  nombres: 'elegida', //  elegida (solo la pestaña elegida muestra su nombre) | todas
  abrir: 'inicio', //     inicio | ultima (la última página que viste)
  lado: 'abajo', //       abajo (páginas abajo, apartados arriba) | arriba (al revés; también jalando la barra)
  navegacion: 'barra', // barra | ruleta (carrusel: la opción del centro es la elegida)
}

/** Ajustes guardados por versiones anteriores de la página → los de ahora. */
export const migrar = (guardadas) => {
  const o = { ...guardadas }
  // «Orden de las barras» (hasta el 25 de nov.) pasó a ser «Lado de la barra».
  if ('barras' in o) {
    if (!o.lado) o.lado = o.barras === 'invertidas' ? 'arriba' : 'abajo'
    delete o.barras
  }
  return o
}

const leer = () => {
  try {
    const guardadas = migrar(JSON.parse(localStorage.getItem(CLAVE) ?? '{}'))
    // Tema de la versión anterior de la página (antes de Ajustes).
    const viejo = localStorage.getItem('resonancia:tema')
    if (!guardadas.tema && viejo) guardadas.tema = viejo
    return { ...OPCIONES, ...guardadas }
  } catch {
    return { ...OPCIONES }
  }
}

let actuales = typeof window === 'undefined' ? { ...OPCIONES } : leer()
const avisos = new Set()

const oscuroDelSistema = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches

/** Pone las clases en <html> según las opciones. */
export const aplicar = (o = actuales) => {
  const html = document.documentElement
  html.classList.toggle('dark', o.tema === 'oscuro' || (o.tema === 'sistema' && oscuroDelSistema()))
  html.classList.toggle('letra-grande', o.letra === 'grande')
  html.classList.toggle('opaco', o.vidrio === 'opaco')
}

export const opciones = () => actuales

export const suscribirOpciones = (fn) => {
  avisos.add(fn)
  return () => avisos.delete(fn)
}

export const cambiarOpcion = (nombre, valor) => {
  actuales = { ...actuales, [nombre]: valor }
  try {
    localStorage.setItem(CLAVE, JSON.stringify(actuales))
    localStorage.removeItem('resonancia:tema')
  } catch {
    /* sin localStorage: dura solo esta visita */
  }
  const html = document.documentElement
  html.classList.add('cambiando-tema')
  aplicar()
  setTimeout(() => html.classList.remove('cambiando-tema'), 300)
  avisos.forEach((fn) => fn())
}

/** Vuelve todo a como viene. */
export const restablecer = () => Object.entries(OPCIONES).forEach(([k, v]) => cambiarOpcion(k, v))

// Con «sistema», seguir al teléfono si cambia de claro a oscuro mientras la página está abierta.
if (typeof window !== 'undefined') {
  matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', () => actuales.tema === 'sistema' && aplicar())
}

// La última página vista (para «Al abrir: la última que viste»).
const CLAVE_ULTIMA = 'resonancia:ultima'
export const guardarUltima = (hash) => {
  try {
    localStorage.setItem(CLAVE_ULTIMA, hash)
  } catch {
    /* nada */
  }
}
export const leerUltima = () => {
  try {
    return localStorage.getItem(CLAVE_ULTIMA)
  } catch {
    return null
  }
}
