import { motion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { cambiarOpcion, opciones, suscribirOpciones } from '../logica/opciones.js'
import { hashDe, PAGINAS, rutaDeHash, vistaDe } from '../logica/rutas.js'
import Pildora from './Pildora.jsx'
import { Casa, Descargar, Engrane, Libro, Onda, Ramas } from './Iconos.jsx'
import { RESORTE } from './movimiento.js'
import Pulsable from './Pulsable.jsx'

// Vidrio (de teoria-musical, src/ui/vidrio.js): solo para lo que flota fijo sobre el contenido.
// La clase `vidrio` deja que Ajustes > Vidrio > Opaco lo vuelva sólido (src/index.css).
export const VIDRIO =
  'vidrio border border-blanco/70 bg-white/75 backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_0_0.5px_rgb(16_18_28/0.12),0_8px_28px_rgb(16_18_28/0.12),inset_0_1px_0_rgb(255_255_255/0.7)] dark:border-blanco/15 dark:shadow-[0_0_0_0.5px_rgb(0_0_0/0.45),0_8px_28px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.12)]'

const ICONOS = { inicio: Casa, plan: Ramas, registro: Libro, juego: Onda, ajustes: Engrane }

const suscribirHash = (aviso) => {
  window.addEventListener('hashchange', aviso)
  return () => window.removeEventListener('hashchange', aviso)
}
const hashActual = () => window.location.hash

/** La página y la vista actuales, sacadas de la dirección (#/registro/decisiones). Cambian con los enlaces y con «atrás». */
export function useRuta() {
  return rutaDeHash(useSyncExternalStore(suscribirHash, hashActual))
}

export function useOpciones() {
  return useSyncExternalStore(suscribirOpciones, opciones)
}

// Cada pestaña recuerda su última vista mientras la página esté abierta (como Aprender y Entrenar en teoria-musical).
const ultimaVista = {}

const subir = () => window.scrollTo({ top: 0, behavior: opciones().movimiento === 'reducido' ? 'auto' : 'smooth' })
const navegar = (hash) => {
  if (window.location.hash !== hash) window.location.hash = hash
}

/**
 * Las dos barras: las PÁGINAS (abajo, al alcance del pulgar) y, si la página tiene apartados, sus VISTAS (arriba,
 * como Entrenar en teoria-musical). Deslizar cualquiera de las dos hacia arriba o hacia abajo las intercambia
 * (Ajustes > Orden de las barras); deslizar otra vez las regresa.
 */
function useBarras(ruta) {
  const { nombres, barras } = useOpciones()
  const pagina = PAGINAS.find((x) => x.id === ruta.pagina)
  const vista = vistaDe(ruta)
  if (vista) ultimaVista[pagina.id] = vista.id
  const tieneVistas = pagina.vistas.length > 0
  const invertidas = tieneVistas && barras === 'invertidas'
  const alternar = () => cambiarOpcion('barras', barras === 'invertidas' ? 'normal' : 'invertidas')

  const paginas = (
    <Pildora
      items={PAGINAS.map((p) => ({ ...p, Icono: ICONOS[p.id] }))}
      activo={pagina.id}
      variante="pestanas"
      todas={nombres === 'todas'}
      etiqueta="Páginas"
      alIr={(p) => navegar(hashDe(p.id, ultimaVista[p.id]))}
      alRepetir={subir}
      alInvertir={tieneVistas ? alternar : undefined}
    />
  )
  const vistas = tieneVistas ? (
    <Pildora
      items={pagina.vistas}
      activo={vista.id}
      variante="vistas"
      etiqueta={pagina.nombre}
      alIr={(v) => navegar(hashDe(pagina.id, v.id))}
      alRepetir={subir}
      alInvertir={alternar}
    />
  ) : null
  return { arriba: invertidas ? paginas : vistas, abajo: invertidas ? vistas : paginas, arribaEsPaginas: invertidas }
}

/** Barra de arriba (pegada al subir la página). Su alto queda en --alto-arriba para lo que se pega debajo (el calendario). */
export function BarraArriba({ ruta }) {
  const { arriba, arribaEsPaginas } = useBarras(ruta)
  const caja = useRef(null)
  useLayoutEffect(() => {
    const el = caja.current
    const html = document.documentElement
    if (!el) return html.style.removeProperty('--alto-arriba')
    const medir = () => html.style.setProperty('--alto-arriba', `${el.offsetHeight}px`)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [arriba])
  if (!arriba) return null
  return (
    <div ref={caja} data-barra-arriba className="pointer-events-none sticky top-0 z-30 flex justify-center px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:px-5">
      <motion.div layoutId={arribaEsPaginas ? 'barra-paginas' : 'barra-vistas'} transition={RESORTE.pantalla} className={`flex w-full justify-center ${arribaEsPaginas ? 'max-w-md' : 'max-w-2xl'}`}>
        {arriba}
      </motion.div>
    </div>
  )
}

/** Barra fija abajo. */
export function BarraAbajo({ ruta }) {
  const { abajo, arribaEsPaginas } = useBarras(ruta)
  return (
    <nav aria-label="Navegación" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <motion.div layoutId={arribaEsPaginas ? 'barra-vistas' : 'barra-paginas'} transition={RESORTE.pantalla} className="flex w-full max-w-md justify-center">
        {abajo}
      </motion.div>
    </nav>
  )
}

// El aviso de «instalar» llega una sola vez; se guarda aquí para que lo usen la cabecera y Ajustes.
let avisoInstalar = null
const avisosInstalar = new Set()
const avisarInstalar = () => avisosInstalar.forEach((fn) => fn())
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    avisoInstalar = e
    avisarInstalar()
  })
  window.addEventListener('appinstalled', () => {
    avisoInstalar = null
    avisarInstalar()
  })
}

/** ¿Se puede instalar ahora? Y la función que lo hace. */
export function useInstalar() {
  const [, refrescar] = useState(0)
  useEffect(() => {
    const fn = () => refrescar((n) => n + 1)
    avisosInstalar.add(fn)
    return () => avisosInstalar.delete(fn)
  }, [])
  const instalada = typeof matchMedia !== 'undefined' && matchMedia('(display-mode: standalone)').matches
  const instalar = async () => {
    if (!avisoInstalar) return
    avisoInstalar.prompt()
    await avisoInstalar.userChoice.catch(() => null)
    avisoInstalar = null
    avisarInstalar()
  }
  return { puede: !!avisoInstalar, instalada, instalar }
}

/**
 * Botón «Instalar» para Android (Chrome, Edge, Samsung Internet): solo aparece cuando el navegador ofrece instalar
 * la página como app. En iPhone se instala con Compartir → «Agregar a inicio» (lo explica Ajustes).
 */
export function BotonInstalar({ className = '' }) {
  const { puede, instalar } = useInstalar()
  if (!puede) return null
  return (
    <Pulsable onClick={instalar} className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-4 text-base font-bold text-fondo ${className}`}>
      <Descargar width={20} height={20} /> Instalar
    </Pulsable>
  )
}

/** Cabecera de las páginas sin apartados (Inicio y Ajustes): nombre del proyecto e «Instalar». No es fija. */
export function Cabecera({ nombre }) {
  return (
    <header className="mx-auto flex max-w-2xl items-center gap-2 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
      <a href="#/" className="mr-auto flex min-h-11 items-center font-juego text-xl font-bold tracking-wide no-underline">
        {nombre}
      </a>
      <BotonInstalar />
    </header>
  )
}
