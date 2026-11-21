import { motion } from 'motion/react'
import { RESORTE } from './movimiento.js'

/** Barra fina que avanza con un resorte. valor: 0 a 1. */
export default function BarraProgreso({ valor, color = 'var(--color-bien)', fondo = 'bg-zinc-100', alto = 'h-2.5', className = '', etiqueta }) {
  const v = Math.max(0, Math.min(1, valor))
  return (
    <div
      className={`${alto} overflow-hidden rounded-full ${fondo} ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      aria-label={etiqueta}
    >
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${v * 100}%` }}
        viewport={{ once: true }}
        animate={{ width: `${v * 100}%` }}
        transition={{ ...RESORTE.suave, delay: 0.15 }}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}
