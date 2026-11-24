import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './': rutas relativas, así funciona en https://amongoooo.github.io/resonance/ sin depender del nombre del repo.
// Versión que se ve en Ajustes > Acerca de: fecha y hora (CDMX) de cuando se compiló.
const ahora = new Date(Date.now() - 6 * 36e5).toISOString()
const VERSION = `${ahora.slice(0, 10)} ${ahora.slice(11, 16)}`

export default defineConfig({
  base: './',
  define: { __VERSION__: JSON.stringify(VERSION) },
  plugins: [react(), tailwindcss()],
})
