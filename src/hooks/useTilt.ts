import { useCallback, useRef } from 'react'

/**
 * Gives an element a subtle 3D tilt that follows the pointer.
 * Returns props to spread onto the element you want to tilt.
 */
export function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<number>(0)

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`
      })
    },
    [max],
  )

  const reset = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
  }, [])

  return { ref, onPointerMove, onPointerLeave: reset }
}
