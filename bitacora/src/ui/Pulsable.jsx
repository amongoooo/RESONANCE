import { motion } from 'motion/react'
import { HUNDIR, RESORTE } from './movimiento.js'

/** Botón o enlace que se hunde al tocarlo con un resorte (como Pulsable de teoria-musical). */
export default function Pulsable({ href, tipo = 'boton', disabled, children, ...props }) {
  const Comp = href ? motion.a : motion.button
  const extra = href ? { href } : { type: 'button', disabled }
  return (
    <Comp
      {...extra}
      {...props}
      whileTap={disabled ? undefined : { scale: HUNDIR[tipo] }}
      transition={RESORTE.pulsar}
      style={{ touchAction: 'manipulation', ...props.style }}
    >
      {children}
    </Comp>
  )
}
