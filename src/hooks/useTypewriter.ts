import { useEffect, useRef, useState } from 'react'

interface Options {
  /** ms per character */
  speed?: number
  /** ms pause inserted between paragraphs */
  paragraphPause?: number
  /** delay before typing starts */
  startDelay?: number
  /** fired once everything is typed */
  onDone?: () => void
  /** fired each time a non-space character is committed (for sound) */
  onType?: () => void
}

/**
 * Types an array of paragraphs out one character at a time.
 * Returns how much of each paragraph is currently visible.
 */
export function useTypewriter(paragraphs: readonly string[], opts: Options = {}) {
  const { speed = 32, paragraphPause = 550, startDelay = 300, onDone, onType } = opts
  const [counts, setCounts] = useState<number[]>(() => paragraphs.map(() => 0))
  const [done, setDone] = useState(false)
  const cbRef = useRef({ onDone, onType })
  cbRef.current = { onDone, onType }

  useEffect(() => {
    let para = 0
    let char = 0
    let cancelled = false
    const timers: number[] = []

    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)))

    const run = async () => {
      await wait(startDelay)
      while (para < paragraphs.length && !cancelled) {
        const text = paragraphs[para]
        if (char < text.length) {
          char++
          const p = para
          const c = char
          setCounts((prev) => {
            const next = [...prev]
            next[p] = c
            return next
          })
          if (text[char - 1] !== ' ') cbRef.current.onType?.()
          await wait(speed)
        } else {
          para++
          char = 0
          await wait(paragraphPause)
        }
      }
      if (!cancelled) {
        setDone(true)
        cbRef.current.onDone?.()
      }
    }

    void run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paragraphs, speed, paragraphPause, startDelay])

  return { counts, done }
}
