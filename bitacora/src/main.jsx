import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App.jsx'
import { aplicar } from './logica/opciones.js'
import { useOpciones } from './ui/Navegacion.jsx'
import './index.css'

aplicar()

/** Animaciones: «reducidas» en Ajustes, o «reducir movimiento» del sistema, quitan desplazamientos y rebotes. */
function Raiz() {
  const { movimiento } = useOpciones()
  return (
    <MotionConfig reducedMotion={movimiento === 'reducido' ? 'always' : 'user'}>
      <App />
    </MotionConfig>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Raiz />
  </StrictMode>,
)

// App instalable (Android) y sin internet: solo en la página publicada, no mientras se programa.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}))
}
