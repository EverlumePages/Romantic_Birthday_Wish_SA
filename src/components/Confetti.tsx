import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export interface ConfettiHandle {
  /** Fire a burst. Coordinates default to screen centre. */
  burst: (x?: number, y?: number, amount?: number) => void
  /** Continuous celebratory rain for a number of ms. */
  rain: (ms?: number) => void
}

interface Bit {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rot: number
  spin: number
  life: number
  maxLife: number
  shape: 'heart' | 'rect' | 'ribbon'
  color: string
}

const COLORS = ['#ffd9ec', '#ffb3d9', '#ff80bf', '#ff4da6', '#ff1493', '#cc0066']

function heart(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath()
  ctx.moveTo(0, s * 0.3)
  ctx.bezierCurveTo(0, s * 0.05, -s * 0.5, -s * 0.25, -s * 0.5, s * 0.05)
  ctx.bezierCurveTo(-s * 0.5, s * 0.4, -s * 0.1, s * 0.6, 0, s)
  ctx.bezierCurveTo(s * 0.1, s * 0.6, s * 0.5, s * 0.4, s * 0.5, s * 0.05)
  ctx.bezierCurveTo(s * 0.5, -s * 0.25, 0, s * 0.05, 0, s * 0.3)
  ctx.closePath()
}

/** A canvas overlay that fires physics-based pink confetti on demand. */
const Confetti = forwardRef<ConfettiHandle>(function Confetti(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bitsRef = useRef<Bit[]>([])
  const rafRef = useRef<number>(0)
  const runningRef = useRef(false)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const rainUntil = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctxRef.current = ctx

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      sizeRef.current = { w, h, dpr }
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const spawn = (x: number, y: number, amount: number, upward: boolean) => {
    const bits = bitsRef.current
    for (let i = 0; i < amount; i++) {
      const angle = upward
        ? -Math.PI / 2 + (Math.random() - 0.5) * 1.6
        : Math.random() * Math.PI * 2
      const speed = (upward ? 5 : 2) + Math.random() * 7
      const shapes: Bit['shape'][] = ['heart', 'rect', 'ribbon']
      bits.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (upward ? 2 : 0),
        size: 6 + Math.random() * 10,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 90 + Math.random() * 70,
        shape: shapes[(Math.random() * shapes.length) | 0],
        color: COLORS[(Math.random() * COLORS.length) | 0],
      })
    }
    ensureRunning()
  }

  const tick = () => {
    const ctx = ctxRef.current!
    const { w, h } = sizeRef.current
    const bits = bitsRef.current
    ctx.clearRect(0, 0, w, h)

    if (performance.now() < rainUntil.current && Math.random() < 0.9) {
      spawnNoStart(Math.random() * w, -20, 3)
    }

    for (let i = bits.length - 1; i >= 0; i--) {
      const b = bits[i]
      b.vy += 0.12 // gravity
      b.vx *= 0.99
      b.x += b.vx
      b.y += b.vy
      b.rot += b.spin
      b.life++
      if (b.life > b.maxLife || b.y > h + 40) {
        bits.splice(i, 1)
        continue
      }
      const fade = 1 - Math.max(0, b.life / b.maxLife - 0.6) / 0.4
      ctx.globalAlpha = Math.max(0, fade)
      ctx.save()
      ctx.translate(b.x, b.y)
      ctx.rotate(b.rot)
      ctx.fillStyle = b.color
      ctx.shadowBlur = 10
      ctx.shadowColor = b.color
      if (b.shape === 'heart') {
        heart(ctx, b.size)
        ctx.fill()
      } else if (b.shape === 'rect') {
        ctx.fillRect(-b.size / 2, -b.size / 4, b.size, b.size / 2)
      } else {
        ctx.fillRect(-b.size / 6, -b.size / 2, b.size / 3, b.size)
      }
      ctx.restore()
    }
    ctx.globalAlpha = 1
    ctx.shadowBlur = 0

    if (bits.length === 0 && performance.now() >= rainUntil.current) {
      runningRef.current = false
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const spawnNoStart = (x: number, y: number, amount: number) => {
    const bits = bitsRef.current
    for (let i = 0; i < amount; i++) {
      const shapes: Bit['shape'][] = ['heart', 'rect', 'ribbon']
      bits.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: 1 + Math.random() * 2,
        size: 6 + Math.random() * 10,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 160 + Math.random() * 80,
        shape: shapes[(Math.random() * shapes.length) | 0],
        color: COLORS[(Math.random() * COLORS.length) | 0],
      })
    }
  }

  const ensureRunning = () => {
    if (!runningRef.current) {
      runningRef.current = true
      rafRef.current = requestAnimationFrame(tick)
    }
  }

  useImperativeHandle(ref, () => ({
    burst: (x, y, amount = 70) => {
      const { w, h } = sizeRef.current
      spawn(x ?? w / 2, y ?? h / 2, amount, true)
    },
    rain: (ms = 2600) => {
      rainUntil.current = performance.now() + ms
      ensureRunning()
    },
  }))

  return <canvas ref={canvasRef} className="fx-canvas" style={{ zIndex: 5 }} aria-hidden />
})

export default Confetti
