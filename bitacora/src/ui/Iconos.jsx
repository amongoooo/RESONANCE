// Íconos propios, 24 × 24, trazo de 2 px con puntas redondeadas (como los de teoria-musical). Siempre con texto al lado.
const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const Check = (p) => (
  <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
export const Bombilla = (p) => (
  <svg {...base} {...p}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></svg>
)
export const Sol = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
)
export const Luna = (p) => (
  <svg {...base} {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
)
export const Flecha = (p) => (
  <svg {...base} {...p}><path d="M9 6l6 6-6 6" /></svg>
)
export const Casa = (p) => (
  <svg {...base} {...p}><path d="M4 10.5L12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" /></svg>
)
/** Plan: un tronco con ramas. */
export const Ramas = (p) => (
  <svg {...base} {...p}><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="9" r="2" /><path d="M6 7v10M6 13c0-3 3-4 10-4" /></svg>
)
export const Libro = (p) => (
  <svg {...base} {...p}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z" /></svg>
)
/** Decisiones: un camino que se parte en dos. */
export const Cruce = (p) => (
  <svg {...base} {...p}><path d="M12 21v-7M12 14L6 8M12 14l6-6M6 8V4M6 4L3.5 6.5M6 4l2.5 2.5M18 8V4M18 4l-2.5 2.5M18 4l2.5 2.5" /></svg>
)
export const Onda = (p) => (
  <svg {...base} {...p}><path d="M2 12c1.5-6 3.5-6 5 0s3.5 6 5 0 3.5-6 5 0 3.5 6 5 0" /></svg>
)
export const Descargar = (p) => (
  <svg {...base} {...p}><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" /></svg>
)

/** ✓ blanco en un círculo verde: «hecho». */
export function MarcaBien({ tam = 22, className = '' }) {
  return (
    <span className={`inline-grid shrink-0 place-items-center rounded-full bg-bien-relleno text-blanco ${className}`} style={{ width: tam, height: tam }}>
      <Check width={tam * 0.68} height={tam * 0.68} strokeWidth={3} />
    </span>
  )
}
