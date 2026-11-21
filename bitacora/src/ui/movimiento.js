// Resortes y entradas, los mismos valores que teoria-musical (src/ui/movimiento.js). No inventar valores sueltos.
export const RESORTE = {
  pulsar: { type: 'spring', stiffness: 600, damping: 32, mass: 0.6 },
  suave: { type: 'spring', stiffness: 320, damping: 30 },
  pantalla: { type: 'spring', stiffness: 380, damping: 36, mass: 0.9 },
}

export const HUNDIR = { boton: 0.96, tarjeta: 0.98 }

/** Aparece subiendo 16 px. */
export const SUBE = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: RESORTE.suave,
}

/** Aparece al entrar en pantalla (una vez). */
export const AL_VERSE = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -60px 0px' },
  transition: RESORTE.suave,
}

/** Panel que se despliega (abrir y cerrar una rama). */
export const DESPLEGAR = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: RESORTE.suave,
}
