import { animate, motion, useMotionValue } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { decidirGesto, haciaOrilla, progresoGesto, resistencia, salidaLanzada } from '../logica/gesto.js'
import { cambiarOpcion, opciones } from '../logica/opciones.js'
import { hashDe, PAGINAS, rutaDeHash, vistaDe } from '../logica/rutas.js'
import Pildora, { REBOTE } from './Pildora.jsx'
import Ruleta from './Ruleta.jsx'
import { Casa, Descargar, Engrane, Libro, Onda, Ramas } from './Iconos.jsx'
import { RESORTE } from './movimiento.js'
import Pulsable from './Pulsable.jsx'
import { useOpciones, useReducido } from './useOpciones.js'

export { useOpciones }
export { VIDRIO } from './vidrio.js'

const ICONOS = { inicio: Casa, plan: Ramas, registro: Libro, juego: Onda, ajustes: Engrane }
const PESTANAS = PAGINAS.map((p) => ({ ...p, Icono: ICONOS[p.id] }))

const suscribirHash = (aviso) => {
  window.addEventListener('hashchange', aviso)
  return () => window.removeEventListener('hashchange', aviso)
}
const hashActual = () => window.location.hash

/** La página y la vista actuales, sacadas de la dirección (#/registro/decisiones). Cambian con los enlaces y con «atrás». */
export function useRuta() {
  return rutaDeHash(useSyncExternalStore(suscribirHash, hashActual))
}

// Cada pestaña recuerda su última vista mientras la página esté abierta (como Aprender y Entrenar en teoria-musical).
const ultimaVista = {}

const subir = () => window.scrollTo({ top: 0, behavior: opciones().movimiento === 'reducido' ? 'auto' : 'smooth' })
const navegar = (hash) => {
  if (window.location.hash !== hash) window.location.hash = hash
}

// ---------------------------------------------------------------------------------------------------------------
// LAS DOS BARRAS. Las PÁGINAS van del lado que diga Ajustes > Lado de la barra (abajo, al alcance del pulgar, o
// arriba) y, si la página tiene apartados, sus VISTAS van del lado contrario.
//  - Jalar una barra hacia su orilla (lejos o rápido, src/logica/gesto.js) la manda al otro lado: mientras la jalas,
//    la otra barra se va escondiendo; al soltar, las dos salen de la pantalla por su orilla y entran por la contraria.
//    Jalarla hacia el centro, o poco y lento, la hace rebotar.
//  - Al cambiar de página, la barra de apartados se esconde por su orilla y vuelve a salir con los apartados nuevos.
//  - Animación «Lanzada» (elegida el 25 de nov.): sale acelerando y entra frenando con un rebote chiquito.
//    Con animaciones reducidas, las barras solo se desvanecen y aparecen.
// ---------------------------------------------------------------------------------------------------------------

/** Entrada: frena y se asienta con un rebote chiquito. */
const ENTRADA = { type: 'spring', stiffness: 300, damping: 21, mass: 0.9 }
/** px de más para que la sombra también quede fuera. */
const MARGEN = 40
const opuesto = (lado) => (lado === 'abajo' ? 'arriba' : 'abajo')

/** Posición (y) en la que la barra queda completa fuera de la pantalla por su orilla. Se mide con su contenedor, que no se mueve. */
const fuera = (el, orilla) => {
  const c = el.parentElement.getBoundingClientRect()
  return orilla === 'abajo' ? window.innerHeight - c.top + MARGEN : -(c.bottom + MARGEN)
}
/** Tan lejos que queda fuera de la vista en cualquiera de los dos contenedores (para el momento del cambio). */
const muyLejos = (orilla) => haciaOrilla(orilla) * (window.innerHeight + 400)

function useBarraAnimada() {
  return { y: useMotionValue(0), o: useMotionValue(1), ref: useRef(null) }
}

/** Sale por su orilla acelerando desde la velocidad del dedo. Devuelve la velocidad con la que salió. */
async function salir(b, orilla, velocidad, reducir) {
  const el = b.ref.current
  if (!el) return velocidad
  if (reducir) {
    await animate(b.o, 0, { duration: 0.12 })
    return velocidad
  }
  const { y, duracion, salida } = salidaLanzada({ desde: b.y.get(), hasta: fuera(el, orilla), velocidad })
  if (duracion > 0) await animate(b.y, y, { duration: duracion, ease: 'linear' })
  return salida
}

/** Entra por su orilla y frena hasta su lugar. */
async function entrar(b, orilla, velocidad, reducir) {
  const el = b.ref.current
  if (!el) return
  if (reducir) {
    b.y.set(0)
    await animate(b.o, 1, { duration: 0.16 })
    return
  }
  b.o.set(1)
  b.y.set(fuera(el, orilla))
  await animate(b.y, 0, { ...ENTRADA, velocity: -haciaOrilla(orilla) * Math.min(Math.abs(velocidad), 1400) })
}

// Ajustes > Lado de la barra pide el cambio aquí para que use la misma animación que el gesto.
let pedidor = null
export const pedirLado = (lado) => (pedidor ? pedidor(lado) : cambiarOpcion('lado', lado))

/** Las dos barras: la de arriba (pegada al subir la página; su alto queda en --alto-arriba) y la fija de abajo. */
export function Barras({ ruta }) {
  const { nombres, lado, navegacion } = useOpciones()
  const reducir = useReducido()
  const pagina = PAGINAS.find((x) => x.id === ruta.pagina)
  const vista = vistaDe(ruta)
  if (vista) ultimaVista[pagina.id] = vista.id

  // La página cuyos apartados se ven: cambia a la nueva mientras la barra de apartados está escondida.
  const [mostrada, setMostrada] = useState(pagina.id)
  const P = useBarraAnimada()
  const V = useBarraAnimada()
  const ahora = useRef({})
  ahora.current = { pagina: pagina.id, lado, reducir }
  const mostradaRef = useRef(mostrada)

  // Las animaciones van en fila (una termina antes de que empiece la otra); mientras tanto no se puede jalar.
  const ocupado = useRef(0)
  const fila = useRef(Promise.resolve())
  const enFila = (tarea) => {
    ocupado.current++
    fila.current = fila.current
      .then(tarea)
      .catch((e) => console.error(e))
      .finally(() => ocupado.current--)
    return fila.current
  }
  // Promesas que se cumplen cuando React ya pintó el cambio (para medir la barra en su lugar nuevo).
  const tras = useRef([])
  useLayoutEffect(() => {
    const pendientes = tras.current
    tras.current = []
    pendientes.forEach((fn) => fn())
  })
  const trasPintar = () => new Promise((listo) => tras.current.push(listo))

  const cambiarLado = (velocidad = 900) =>
    enFila(async () => {
      const { lado: l, reducir: r } = ahora.current
      const barras = [
        [P, l],
        [V, opuesto(l)],
      ].filter(([b]) => b.ref.current)
      const salidas = await Promise.all(barras.map(([b, o]) => salir(b, o, velocidad, r)))
      if (!r) barras.forEach(([b, o]) => b.y.set(muyLejos(o)))
      const pintado = trasPintar()
      cambiarOpcion('lado', opuesto(l))
      await pintado
      await Promise.all(barras.map(([b, o], i) => entrar(b, opuesto(o), salidas[i], r)))
    })

  useEffect(() => {
    pedidor = (l) => l !== ahora.current.lado && cambiarLado()
    return () => {
      pedidor = null
    }
  })

  // Al cambiar de página, la barra de apartados se esconde y vuelve a salir con los apartados de la página nueva.
  useEffect(() => {
    if (pagina.id === mostradaRef.current) return
    enFila(async () => {
      if (ahora.current.pagina === mostradaRef.current) return
      const r = ahora.current.reducir
      const orilla = opuesto(ahora.current.lado)
      await salir(V, orilla, 600, r)
      const nueva = ahora.current.pagina
      if (nueva !== mostradaRef.current) {
        if (r) V.o.set(0)
        else V.y.set(muyLejos(orilla))
        const pintado = trasPintar()
        mostradaRef.current = nueva
        setMostrada(nueva)
        await pintado
      }
      await entrar(V, orilla, 600, r)
    })
  }, [pagina.id])

  // El jalón vertical (lo detectan Pildora y Ruleta; la regla está en src/logica/gesto.js).
  const jalon = useRef(null)
  const jalar = (cual) => (fase, { dy, vy }) => {
    if (ocupado.current) return false
    const { lado: l, reducir: r } = ahora.current
    const [propia, otra, orilla] = cual === 'paginas' ? [P, V, l] : [V, P, opuesto(l)]
    if (fase === 'mover') {
      if (!jalon.current) {
        propia.y.stop()
        otra.y.stop()
        jalon.current = { otraFuera: otra.ref.current ? fuera(otra.ref.current, opuesto(orilla)) : 0 }
      }
      // Hacia su orilla se deja llevar; hacia el centro casi no se mueve.
      const haciaFuera = dy * haciaOrilla(orilla) > 0
      if (!r) propia.y.set(haciaFuera ? resistencia(dy, 0.8, 70) : resistencia(dy, 0.4, 14))
      // La otra barra se va escondiendo por su orilla: avisa que van a cambiar de lugar.
      const p = progresoGesto({ orilla, dy })
      if (otra.ref.current) {
        if (r) otra.o.set(1 - 0.6 * p)
        else otra.y.set(p * 0.7 * jalon.current.otraFuera)
      }
      return decidirGesto({ orilla, dy, velocidad: vy }).cambia
    }
    jalon.current = null
    if (fase === 'soltar' && decidirGesto({ orilla, dy, velocidad: vy }).cambia) return cambiarLado(Math.abs(vy))
    animate(propia.y, 0, r ? { duration: 0.15 } : { ...REBOTE, velocity: vy })
    animate(otra.y, 0, RESORTE.suave)
    animate(otra.o, 1, { duration: 0.15 })
  }

  const Nav = navegacion === 'ruleta' ? Ruleta : Pildora
  const pagM = PAGINAS.find((p) => p.id === mostrada)
  const vistaM = mostrada === pagina.id ? vista : (pagM.vistas.find((v) => v.id === ultimaVista[mostrada]) ?? pagM.vistas[0])

  const paginas = (
    <motion.div ref={P.ref} style={{ y: P.y, opacity: P.o }} className="flex w-full max-w-md justify-center">
      <Nav
        items={PESTANAS}
        activo={pagina.id}
        variante="pestanas"
        todas={nombres === 'todas'}
        etiqueta="Páginas"
        alIr={(p) => navegar(hashDe(p.id, ultimaVista[p.id]))}
        alRepetir={subir}
        alJalar={jalar('paginas')}
      />
    </motion.div>
  )
  const vistas = pagM.vistas.length > 0 && (
    <motion.div ref={V.ref} style={{ y: V.y, opacity: V.o }} className={`flex w-full justify-center ${lado === 'abajo' ? 'max-w-2xl' : 'max-w-md'}`}>
      <Nav
        key={mostrada}
        items={pagM.vistas}
        activo={vistaM.id}
        variante="vistas"
        etiqueta={pagM.nombre}
        alIr={(v) => navegar(hashDe(mostrada, v.id))}
        alRepetir={subir}
        alJalar={jalar('vistas')}
      />
    </motion.div>
  )
  const arriba = lado === 'arriba' ? paginas : vistas
  const abajo = lado === 'arriba' ? vistas : paginas

  // Alto de la barra de arriba en --alto-arriba, para lo que se pega debajo (el calendario de la bitácora).
  const cajaArriba = useRef(null)
  const hayArriba = !!arriba
  useLayoutEffect(() => {
    const el = cajaArriba.current
    const html = document.documentElement
    if (!el) {
      html.style.removeProperty('--alto-arriba')
      return
    }
    const medir = () => html.style.setProperty('--alto-arriba', `${el.offsetHeight}px`)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [hayArriba])

  const nombre = (barra) => (barra === paginas ? 'Navegación' : 'Apartados')
  return (
    <>
      {arriba && (
        <nav ref={cajaArriba} aria-label={nombre(arriba)} data-barra-arriba className="pointer-events-none sticky top-0 z-30 flex justify-center px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:px-5">
          {arriba}
        </nav>
      )}
      {/* La de abajo va al final del documento: después del contenido al leer con teclado o lector de pantalla. */}
      {createPortal(
        abajo && (
          <nav aria-label={nombre(abajo)} className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {abajo}
          </nav>
        ),
        document.body,
      )}
    </>
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
