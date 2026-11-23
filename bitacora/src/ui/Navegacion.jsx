import { motion } from 'motion/react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { hashDePagina, PAGINAS, paginaDeHash } from '../logica/rutas.js'
import { Casa, Cruce, Descargar, Libro, Luna, Onda, Ramas, Sol } from './Iconos.jsx'
import { RESORTE } from './movimiento.js'
import Pulsable from './Pulsable.jsx'

// Vidrio (de teoria-musical, src/ui/vidrio.js): solo para lo que flota fijo sobre el contenido.
export const VIDRIO =
  'border border-blanco/70 bg-white/75 backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_0_0.5px_rgb(16_18_28/0.12),0_8px_28px_rgb(16_18_28/0.12),inset_0_1px_0_rgb(255_255_255/0.7)] dark:border-blanco/15 dark:shadow-[0_0_0_0.5px_rgb(0_0_0/0.45),0_8px_28px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.12)]'

const ICONOS = { inicio: Casa, plan: Ramas, bitacora: Libro, decisiones: Cruce, juego: Onda }

const suscribir = (aviso) => {
  window.addEventListener('hashchange', aviso)
  return () => window.removeEventListener('hashchange', aviso)
}

/** La página actual, sacada de la dirección (#/bitacora). Cambia con los enlaces y con «atrás». */
export function usePagina() {
  return useSyncExternalStore(suscribir, () => paginaDeHash(window.location.hash))
}

/** Barra fija abajo, al alcance del pulgar. En pantallas anchas flota centrada. */
export function BarraAbajo({ actual }) {
  return (
    <nav
      aria-label="Páginas"
      className="fixed inset-x-0 bottom-0 z-40 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-3 sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <ul className={`mx-auto flex max-w-xl items-stretch justify-between gap-0.5 rounded-[1.75rem] p-1 ${VIDRIO}`}>
        {PAGINAS.map((p) => {
          const Icono = ICONOS[p.id]
          const activa = p.id === actual
          return (
            <li key={p.id} className="relative min-w-0 flex-1">
              {activa && (
                <motion.span
                  layoutId="pestana-activa"
                  transition={RESORTE.pantalla}
                  className="absolute inset-0 rounded-3xl bg-zinc-900/[0.07] dark:bg-blanco/10"
                  aria-hidden="true"
                />
              )}
              <Pulsable
                href={hashDePagina(p.id)}
                aria-current={activa ? 'page' : undefined}
                className={`relative flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-3xl px-1 no-underline ${activa ? 'text-zinc-900' : 'text-zinc-500'}`}
              >
                <Icono width={24} height={24} strokeWidth={activa ? 2.4 : 2} />
                <span className={`max-w-full truncate text-[0.75rem] leading-tight ${activa ? 'font-bold' : 'font-semibold'}`}>{p.nombre}</span>
              </Pulsable>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function BotonTema() {
  const [oscuro, setOscuro] = useState(() => document.documentElement.classList.contains('dark'))
  const cambiar = () => {
    const html = document.documentElement
    html.classList.add('cambiando-tema')
    html.classList.toggle('dark', !oscuro)
    try {
      localStorage.setItem('resonancia:tema', oscuro ? 'claro' : 'oscuro')
    } catch {
      /* sin localStorage: solo dura esta visita */
    }
    setOscuro(!oscuro)
    setTimeout(() => html.classList.remove('cambiando-tema'), 300)
  }
  return (
    <Pulsable onClick={cambiar} aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} className="grid size-11 shrink-0 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100">
      {oscuro ? <Sol /> : <Luna />}
    </Pulsable>
  )
}

/**
 * Botón «Instalar» para Android (Chrome, Edge, Samsung Internet): solo aparece cuando el navegador
 * ofrece instalar la página como app. En iPhone se instala con Compartir → «Agregar a inicio».
 */
function BotonInstalar() {
  const [aviso, setAviso] = useState(null)
  useEffect(() => {
    const guardar = (e) => {
      e.preventDefault()
      setAviso(e)
    }
    const listo = () => setAviso(null)
    window.addEventListener('beforeinstallprompt', guardar)
    window.addEventListener('appinstalled', listo)
    return () => {
      window.removeEventListener('beforeinstallprompt', guardar)
      window.removeEventListener('appinstalled', listo)
    }
  }, [])
  if (!aviso) return null
  const instalar = async () => {
    aviso.prompt()
    await aviso.userChoice.catch(() => null)
    setAviso(null)
  }
  return (
    <Pulsable onClick={instalar} className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-4 text-base font-bold text-fondo">
      <Descargar width={20} height={20} /> Instalar
    </Pulsable>
  )
}

/** Cabecera de cada página: nombre del proyecto (lleva a Inicio), instalar y tema. No es fija. */
export function Cabecera({ nombre }) {
  return (
    <header className="mx-auto flex max-w-2xl items-center gap-2 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
      <a href="#/" className="mr-auto font-juego text-xl font-bold tracking-wide no-underline">
        {nombre}
      </a>
      <BotonInstalar />
      <BotonTema />
    </header>
  )
}
