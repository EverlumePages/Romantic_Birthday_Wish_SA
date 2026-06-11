import { useEffect, useState } from 'react'
import { config } from '../config'
import { sound } from '../lib/sound'

interface Props {
  onNext: () => void
  fireBurst: (x: number, y: number, amount?: number) => void
}

const CANDLE_COUNT = 3

/** A pink layer cake. Tap each candle to blow it out and make a wish. */
export default function CakeScene({ onNext, fireBurst }: Props) {
  const [out, setOut] = useState<boolean[]>(() => Array(CANDLE_COUNT).fill(false))
  const [hint, setHint] = useState(0)
  const allOut = out.every(Boolean)

  // cycle the floating wish hints while candles are still burning
  useEffect(() => {
    if (allOut) return
    const id = window.setInterval(() => setHint((h) => (h + 1) % config.wishHints.length), 2200)
    return () => window.clearInterval(id)
  }, [allOut])

  // celebrate once every candle is out
  useEffect(() => {
    if (!allOut) return
    sound.fanfare()
    const cx = window.innerWidth / 2
    const cy = window.innerHeight * 0.42
    fireBurst(cx, cy, 110)
    const t1 = window.setTimeout(() => fireBurst(cx - 120, cy, 60), 180)
    const t2 = window.setTimeout(() => fireBurst(cx + 120, cy, 60), 340)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [allOut, fireBurst])

  const blow = (i: number, e: React.MouseEvent | React.KeyboardEvent) => {
    if (out[i]) return
    sound.whoosh()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    fireBurst(rect.left + rect.width / 2, rect.top, 26)
    setOut((prev) => {
      const next = [...prev]
      next[i] = true
      return next
    })
  }

  return (
    <div className="scene cake-stage">
      <p className="eyebrow">{allOut ? 'wish made ✨' : 'first, the cake'}</p>

      <div className="wish-word" aria-live="polite">
        {allOut ? (
          <span key="done">Did you make a wish? 🤍</span>
        ) : (
          <span key={hint}>{config.wishHints[hint]}</span>
        )}
      </div>

      <div className="cake" role="group" aria-label="Birthday cake with candles">
        <div className="candles">
          {out.map((isOut, i) => (
            <div
              key={i}
              className={`candle${isOut ? ' out' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Candle ${i + 1}${isOut ? ' (out)' : ''}`}
              onClick={(e) => blow(i, e)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && blow(i, e)}
            >
              <span className="wick" />
              <span className="flame" />
              <span className="smoke" />
            </div>
          ))}
        </div>

        <div className="tier tier-top">
          <span className="icing" />
        </div>
        <div className="tier tier-bottom">
          <span className="icing" />
        </div>
        <div className="plate" />
      </div>

      <div className="row" style={{ marginTop: '1.4rem', minHeight: 56 }}>
        {allOut ? (
          <button className="btn" onClick={() => (sound.chime(), onNext())}>
            Read your letter →
          </button>
        ) : (
          <p className="tap-hint">tap the candles to blow them out</p>
        )}
      </div>
    </div>
  )
}
