import { useEffect } from 'react'
import { config } from '../config'
import { sound } from '../lib/sound'

interface Props {
  onReplay: () => void
  fireRain: (ms?: number) => void
  fireBurst: (x: number, y: number, amount?: number) => void
}

/** The closing celebration: shimmering title, her name, and endless reasons. */
export default function FinaleScene({ onReplay, fireRain, fireBurst }: Props) {
  useEffect(() => {
    sound.fanfare()
    fireRain(4200)
    const w = window.innerWidth
    const h = window.innerHeight
    const shots = [
      window.setTimeout(() => fireBurst(w * 0.25, h * 0.5, 70), 120),
      window.setTimeout(() => fireBurst(w * 0.75, h * 0.5, 70), 360),
      window.setTimeout(() => fireBurst(w * 0.5, h * 0.35, 90), 620),
    ]
    return () => shots.forEach(clearTimeout)
  }, [fireRain, fireBurst])

  const ageLine =
    config.turningAge != null ? `${config.turningAge} looks beautiful on you.` : 'Another year, more in love with you.'

  return (
    <div className="scene finale">
      <p className="eyebrow">and so —</p>

      <h1 className="finale-title">{config.finale}</h1>
      <div className="finale-name">{config.herName} ♥</div>
      <p className="lead">{ageLine}</p>

      <div className="reasons" aria-label="all the little reasons">
        <div className="reasons-track">
          {[...config.reasons, ...config.reasons].map((r, i) => (
            <span className="reason-chip" key={i}>
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="row" style={{ marginTop: '1.2rem' }}>
        <button className="btn-ghost btn" onClick={() => (sound.sparkle(), fireBurst(window.innerWidth / 2, window.innerHeight / 2, 80))}>
          ♥ more confetti
        </button>
        <button className="btn-ghost btn" onClick={onReplay}>
          ↺ from the top
        </button>
      </div>
    </div>
  )
}
