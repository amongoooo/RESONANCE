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

/** ✓ blanco en un círculo verde: «hecho». */
export function MarcaBien({ tam = 22, className = '' }) {
  return (
    <span className={`inline-grid shrink-0 place-items-center rounded-full bg-bien-relleno text-blanco ${className}`} style={{ width: tam, height: tam }}>
      <Check width={tam * 0.68} height={tam * 0.68} strokeWidth={3} />
    </span>
  )
}
