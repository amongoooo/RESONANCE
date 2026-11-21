import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './': rutas relativas, así funciona en https://amongoooo.github.io/resonance/ sin depender del nombre del repo.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
