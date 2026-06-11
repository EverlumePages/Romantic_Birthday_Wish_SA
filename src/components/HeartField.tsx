import { useEffect, useRef } from 'react'

/** Draws a heart centred at (0,0) sized `s` on the given context. */
function heartPath(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath()
  ctx.moveTo(0, s * 0.3)
  ctx.bezierCurveTo(0, s * 0.05, -s * 0.5, -s * 0.25, -s * 0.5, s * 0.05)
  ctx.bezierCurveTo(-s * 0.5, s * 0.4, -s * 0.1, s * 0.6, 0, s)
  ctx.bezierCurveTo(s * 0.1, s * 0.6, s * 0.5, s * 0.4, s * 0.5, s * 0.05)
  ctx.bezierCurveTo(s * 0.5, -s * 0.25, 0, s * 0.05, 0, s * 0.3)
  ctx.closePath()
}

interface Heart {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  phase: number
  rot: number
  spin: number
  alpha: number
  hue: number // lightness within pink
  kind: 'heart' | 'spark'
}

const PINKS = [
  [255, 209, 236],
  [255, 179, 217],
  [255, 128, 191],
  [255, 77, 166],
  [255, 20, 147],
]

/**
 * A full-screen canvas of hearts gently rising, with twinkling sparkles.
 * Entirely shades of hot pink. Pauses when the tab is hidden.
 */
export default function HeartField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let hearts: Heart[] = []
    let raf = 0

    const make = (initial: boolean): Heart => {
      const isSpark = Math.random() < 0.45
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 40,
        size: isSpark ? 1.5 + Math.random() * 2.5 : 10 + Math.random() * 26,
        speed: (isSpark ? 0.25 : 0.35) + Math.random() * 0.9,
        drift: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.02,
        alpha: isSpark ? 0.5 + Math.random() * 0.5 : 0.25 + Math.random() * 0.5,
        hue: Math.floor(Math.random() * PINKS.length),
        kind: isSpark ? 'spark' : 'heart',
      }
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.floor((w * h) / 22000) + 24
      if (hearts.length === 0) hearts = Array.from({ length: target }, () => make(true))
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.016
      for (const p of hearts) {
        p.y -= p.speed
        p.x += Math.sin(t + p.phase) * p.drift * 0.4
        p.rot += p.spin
        if (p.y < -50) Object.assign(p, make(false))

        const [r, g, b] = PINKS[p.hue]
        if (p.kind === 'spark') {
          const tw = 0.5 + 0.5 * Math.sin(t * 3 + p.phase)
          ctx.globalAlpha = p.alpha * tw
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(${r},${g},${b},0.9)`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.globalAlpha = p.alpha
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.scale(1, 1)
          ctx.shadowBlur = 16
          ctx.shadowColor = `rgba(255,20,147,0.6)`
          ctx.fillStyle = `rgb(${r},${g},${b})`
          heartPath(ctx, p.size)
          ctx.fill()
          ctx.restore()
        }
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden />
}
