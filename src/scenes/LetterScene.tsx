import { useRef } from 'react'
import { config } from '../config'
import { sound } from '../lib/sound'
import { useTypewriter } from '../hooks/useTypewriter'
import { useTilt } from '../hooks/useTilt'
import LetterImage from '../components/LetterImage'

interface Props {
  onNext: () => void
}

/** A glass letter card whose words type themselves out, one by one. */
export default function LetterScene({ onNext }: Props) {
  const tilt = useTilt(6)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastTick = useRef(0)

  const { counts, done } = useTypewriter(config.letter, {
    speed: 26,
    startDelay: 500,
    onType: () => {
      // keep the newest text in view, and tick a soft sound (throttled)
      const now = performance.now()
      if (now - lastTick.current > 90) {
        lastTick.current = now
        sound.sparkle()
      }
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
    },
  })

  const typing = counts.some(c => c > 0)

  return (
    <div className="scene">
      <p className="eyebrow">a letter for you</p>

      <div className={`letter-layout${typing ? ' letter-layout--typing' : ''}`}>
        <div className="letter-left">
          <div
            ref={tilt.ref}
            onPointerMove={tilt.onPointerMove}
            onPointerLeave={tilt.onPointerLeave}
            className="card letter-card"
          >
            <div className="letter-greeting">Dear {config.herName},</div>

            <div className="letter-scroll" ref={scrollRef}>
              {config.letter.map((para, i) => {
                const shown = counts[i] ?? 0
                if (shown === 0 && (i === 0 ? false : (counts[i - 1] ?? 0) < config.letter[i - 1].length)) {
                  return null
                }
                const isActive = shown > 0 && shown < para.length
                return (
                  <p className="letter-p" key={i}>
                    {para.slice(0, shown)}
                    {isActive && <span className="caret" />}
                  </p>
                )
              })}

              {done && <div className="letter-sign">{config.fromName} ♥</div>}
            </div>
          </div>
        </div>

        <div className={`letter-right${typing ? ' letter-right--visible' : ''}`}>
          <div className="letter-img-card">
            <LetterImage />
          </div>
        </div>
      </div>

      <div className="row" style={{ minHeight: 56 }}>
        {done ? (
          <button className="btn" onClick={() => (sound.chime(), onNext())}>
            One more thing →
          </button>
        ) : (
          <p className="tap-hint">writing…</p>
        )}
      </div>
    </div>
  )
}
