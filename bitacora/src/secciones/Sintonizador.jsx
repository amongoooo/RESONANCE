import { useEffect, useRef, useState } from 'react'
import Pulsable from '../ui/Pulsable.jsx'

// El mini juego de la portada: iguala tu onda (celeste, «lo que suena ahora») con la silueta gris.
// Mismo funcionamiento que la página anterior: cursor, dedo o flechas; sonido solo con el botón.
const W = 240
const H = 96
const MEDIO = H / 2
const ALTO = H * 0.4
const hz = (c) => Math.round(c * 110)

const leerColores = () => {
  const css = getComputedStyle(document.documentElement)
  const v = (n) => css.getPropertyValue(n).trim()
  return { panel: v('--color-white'), cuadro: v('--color-zinc-100'), tinta: v('--color-zinc-900'), yo: v('--color-sky-500'), bien: v('--color-bien') }
}

export default function Sintonizador({ alAfinar }) {
  const lienzo = useRef(null)
  const estado = useRef({ yo: { ciclos: 1.6, amp: 0.3 }, meta: { ciclos: 3, amp: 0.6 }, fase: 0, afinado: false, colores: null })
  const audio = useRef({ ctx: null, osc: null, vol: null })
  const [lectura, setLectura] = useState({ ciclos: 1.6, amp: 0.3 })
  const [mensaje, setMensaje] = useState('Mueve el cursor o el dedo sobre el panel hasta que tu onda cubra la silueta. También funciona con las flechas.')
  const [afinado, setAfinado] = useState(false)
  const [afinadas, setAfinadas] = useState(0)
  const [sonando, setSonando] = useState(false)

  const dibujar = () => {
    const c = lienzo.current
    if (!c) return
    const ctx = c.getContext('2d')
    const s = estado.current
    const C = s.colores ?? (s.colores = leerColores())
    ctx.fillStyle = C.panel
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = C.cuadro
    for (let x = 0; x < W; x += 12) ctx.fillRect(x, 0, 1, H)
    for (let y = 0; y < H; y += 12) ctx.fillRect(0, y, W, 1)
    ctx.fillStyle = C.tinta
    ctx.globalAlpha = 0.16
    for (let x = 0; x < W; x++) {
      const y = MEDIO - s.meta.amp * ALTO * Math.sin((2 * Math.PI * s.meta.ciclos * x) / W + s.fase)
      ctx.fillRect(x, Math.round(y) - 3, 1, 7)
    }
    ctx.globalAlpha = 1
    ctx.fillStyle = s.afinado ? C.bien : C.yo
    for (let x = 0; x < W; x++) {
      const y = MEDIO - s.yo.amp * ALTO * Math.sin((2 * Math.PI * s.yo.ciclos * x) / W + s.fase)
      ctx.fillRect(x, Math.round(y) - 1, 1, 2)
    }
  }

  // Bucle de animación (quieto con «reducir movimiento») y colores al cambiar de tema.
  useEffect(() => {
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches
    let id
    const bucle = () => {
      estado.current.fase += 0.05
      dibujar()
      id = requestAnimationFrame(bucle)
    }
    dibujar()
    if (!quieto) id = requestAnimationFrame(bucle)
    const obs = new MutationObserver(() => {
      estado.current.colores = null
      dibujar()
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      cancelAnimationFrame(id)
      obs.disconnect()
      const a = audio.current
      if (a.osc) a.osc.stop()
    }
  }, [])

  const actualizarSonido = () => {
    const { ctx, osc, vol } = audio.current
    if (!osc) return
    const s = estado.current
    osc.frequency.setTargetAtTime(hz(s.yo.ciclos), ctx.currentTime, 0.03)
    vol.gain.setTargetAtTime(0.05 * s.yo.amp, ctx.currentTime, 0.03)
  }

  const acorde = () => {
    const { ctx, osc } = audio.current
    if (!ctx || !osc) return
    const t = ctx.currentTime
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'triangle'
    o.frequency.value = hz(estado.current.meta.ciclos) * 1.5
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.03)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
    o.connect(g).connect(ctx.destination)
    o.start(t)
    o.stop(t + 1)
  }

  const nuevaMeta = () => {
    const s = estado.current
    let c, a
    do {
      c = 1.5 + Math.random() * 3.5
      a = 0.3 + Math.random() * 0.6
    } while (Math.abs(c - s.yo.ciclos) < 0.6 && Math.abs(a - s.yo.amp) < 0.2)
    s.meta = { ciclos: c, amp: a }
    s.afinado = false
    setAfinado(false)
    alAfinar?.(false)
    setMensaje('Nueva silueta: iguala su frecuencia (qué tan apretada) y su amplitud (qué tan alta).')
    dibujar()
  }

  const revisar = () => {
    const s = estado.current
    setLectura({ ...s.yo })
    actualizarSonido()
    if (!s.afinado && Math.abs(s.yo.ciclos - s.meta.ciclos) < 0.12 && Math.abs(s.yo.amp - s.meta.amp) < 0.07) {
      s.afinado = true
      setAfinado(true)
      alAfinar?.(true)
      setAfinadas((n) => {
        setMensaje(n === 0 ? '¡Afinado! Así se juega RESONANCIA. Viene otra onda.' : `¡Afinado! Llevas ${n + 1}. Viene otra.`)
        return n + 1
      })
      acorde()
      setTimeout(nuevaMeta, 1600)
    }
    dibujar()
  }

  const mover = (ev) => {
    const r = lienzo.current.getBoundingClientRect()
    const fx = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width))
    const fy = Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height))
    estado.current.yo = { ciclos: 1 + 5 * fx, amp: Math.max(0.1, 1 - fy) }
    revisar()
  }

  const tecla = (ev) => {
    const pasos = { ArrowLeft: [-0.05, 0], ArrowRight: [0.05, 0], ArrowUp: [0, 0.03], ArrowDown: [0, -0.03] }
    const d = pasos[ev.key]
    if (!d) return
    ev.preventDefault()
    const yo = estado.current.yo
    estado.current.yo = { ciclos: Math.min(6, Math.max(1, yo.ciclos + d[0])), amp: Math.min(1, Math.max(0.1, yo.amp + d[1])) }
    revisar()
  }

  const alternarSonido = () => {
    const a = audio.current
    if (a.osc) {
      a.vol.gain.setTargetAtTime(0, a.ctx.currentTime, 0.02)
      a.osc.stop(a.ctx.currentTime + 0.1)
      a.osc = null
      setSonando(false)
      return
    }
    a.ctx = a.ctx || new (window.AudioContext || window.webkitAudioContext)()
    a.ctx.resume()
    a.osc = a.ctx.createOscillator()
    a.vol = a.ctx.createGain()
    a.osc.type = 'sine'
    a.vol.gain.value = 0
    a.osc.connect(a.vol).connect(a.ctx.destination)
    a.osc.start()
    actualizarSonido()
    setSonando(true)
  }

  return (
    <figure className="m-0 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_10px_30px_rgb(16_18_28/0.06)]">
      <canvas
        ref={lienzo}
        width={W}
        height={H}
        tabIndex={0}
        role="img"
        aria-label="Sintonizador: una onda objetivo en gris y tu onda en celeste. Mueve el cursor o usa las flechas para igualarlas."
        onPointerMove={mover}
        onPointerDown={(ev) => {
          lienzo.current.setPointerCapture(ev.pointerId)
          mover(ev)
        }}
        onKeyDown={tecla}
        className="block aspect-[240/96] w-full cursor-crosshair border-b border-zinc-200 [image-rendering:pixelated]"
        style={{ touchAction: 'none' }}
      />
      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4">
        <span aria-live="polite" className={`min-w-[16rem] flex-1 text-base leading-snug ${afinado ? 'font-bold text-bien-tinta' : 'text-zinc-600'}`}>
          {mensaje}
        </span>
        <span className="font-dato text-sm font-medium tabular-nums text-zinc-500">
          {hz(lectura.ciclos)} Hz · {Math.round(lectura.amp * 100)} %{afinadas > 0 ? ` · ${afinadas} ✓` : ''}
        </span>
        <Pulsable
          onClick={alternarSonido}
          aria-pressed={sonando}
          className={`min-h-11 rounded-2xl px-4 text-base font-bold ${sonando ? 'bg-sky-500 text-blanco' : 'bg-zinc-100 text-zinc-900'}`}
        >
          {sonando ? 'Silenciar' : 'Escuchar'}
        </Pulsable>
      </figcaption>
    </figure>
  )
}
