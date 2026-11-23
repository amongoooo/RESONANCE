import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { opciones, suscribirOpciones } from '../logica/opciones.js'
import { hashDe, PAGINAS, rutaDeHash } from '../logica/rutas.js'
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

/**
 * Barra fija abajo, al alcance del pulgar (como la de teoria-musical): la pestaña elegida crece y muestra su nombre;
 * las demás, solo su ícono (o todas con nombre: Ajustes > Nombres en la barra). Tocar la pestaña en la que ya estás
 * sube al principio.
 */
export function BarraAbajo({ ruta }) {
  const { nombres } = useOpciones()
  const todas = nombres === 'todas'
  if (ruta.vista) ultimaVista[ruta.pagina] = ruta.vista
  return (
    <nav aria-label="Páginas" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <LayoutGroup id="pestanas">
        <ul className={`pointer-events-auto flex w-full max-w-md items-center justify-between rounded-full p-1.5 ${VIDRIO}`}>
          {PAGINAS.map((p) => {
            const Icono = ICONOS[p.id]
            const activa = p.id === ruta.pagina
            const conNombre = activa || todas
            return (
              <motion.li key={p.id} layout transition={RESORTE.pulsar} className={todas ? 'min-w-0 flex-1' : 'shrink-0'}>
                <Pulsable
                  href={hashDe(p.id, ultimaVista[p.id])}
                  onClick={(e) => {
                    if (!activa) return
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: opciones().movimiento === 'reducido' ? 'auto' : 'smooth' })
                  }}
                  aria-current={activa ? 'page' : undefined}
                  aria-label={p.nombre}
                  className={`relative flex items-center justify-center rounded-full no-underline transition-colors duration-200 ${
                    todas ? 'h-14 flex-col gap-0.5 px-1' : activa ? 'h-12 gap-1.5 px-4' : 'size-12'
                  } ${activa ? 'text-zinc-900' : 'text-zinc-500'}`}
                >
                  {activa && (
                    <motion.span
                      layoutId="marca-pestana"
                      transition={RESORTE.pulsar}
                      className="absolute inset-0 rounded-full bg-white shadow-[0_1px_5px_rgb(16_18_28/0.18)] dark:bg-zinc-100"
                      aria-hidden="true"
                    />
                  )}
                  <motion.span layout="position" transition={RESORTE.pulsar} className="relative grid place-items-center">
                    <Icono width={activa ? 26 : 24} height={activa ? 26 : 24} strokeWidth={activa ? 2.3 : 2} />
                  </motion.span>
                  <AnimatePresence initial={false}>
                    {conNombre && (
                      <motion.span
                        key="nombre"
                        initial={todas ? false : { opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={RESORTE.pulsar}
                        className={`relative overflow-hidden whitespace-nowrap ${todas ? 'max-w-full truncate text-[0.75rem]' : 'text-sm'} ${activa ? 'font-bold' : 'font-semibold'}`}
                        aria-hidden="true"
                      >
                        {p.nombre}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Pulsable>
              </motion.li>
            )
          })}
        </ul>
      </LayoutGroup>
    </nav>
  )
}

/**
 * Barra de apartados arriba (como Oído | Ritmo | Letras en Entrenar de teoria-musical): píldora de vidrio pegada
 * arriba, con una marca blanca que se desliza al elegido.
 */
export function BarraVistas({ pagina, actual }) {
  const p = PAGINAS.find((x) => x.id === pagina)
  if (!p.vistas.length) return null
  return (
    <div className="pointer-events-none sticky top-0 z-30 mx-auto max-w-2xl px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:px-5">
      <LayoutGroup id={`vistas-${pagina}`}>
        <div role="tablist" aria-label={p.nombre} className={`pointer-events-auto flex h-12 w-full gap-1 rounded-full p-1 ${VIDRIO}`}>
          {p.vistas.map((v) => {
            const activa = v.id === actual
            return (
              <a
                key={v.id}
                href={hashDe(pagina, v.id)}
                role="tab"
                aria-selected={activa}
                className={`relative flex min-w-0 flex-1 items-center justify-center rounded-full px-2 text-base font-bold no-underline transition-colors ${activa ? 'text-zinc-900' : 'text-zinc-500'}`}
                style={{ touchAction: 'manipulation' }}
              >
                {activa && (
                  <motion.span
                    layoutId={`marca-${pagina}`}
                    transition={RESORTE.pulsar}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_4px_rgb(16_18_28/0.14)] dark:bg-zinc-100"
                  />
                )}
                <span className="relative truncate">{v.nombre}</span>
              </a>
            )
          })}
        </div>
      </LayoutGroup>
    </div>
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
