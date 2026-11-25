import { useReducedMotion } from 'motion/react'
import { useSyncExternalStore } from 'react'
import { opciones, suscribirOpciones } from '../logica/opciones.js'

/** Los ajustes de quien visita la página (src/logica/opciones.js); se actualiza al cambiarlos. */
export function useOpciones() {
  return useSyncExternalStore(suscribirOpciones, opciones)
}

/** ¿Animaciones reducidas? Por Ajustes > Animaciones o por «reducir movimiento» del sistema. */
export function useReducido() {
  const sistema = useReducedMotion()
  return useOpciones().movimiento === 'reducido' || !!sistema
}
