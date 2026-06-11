import { useState } from 'react'
import { config } from '../config'
import { sound } from '../lib/sound'

interface Props {
  onNext: () => void
}

/** The opening: a glowing title and a wax-sealed envelope she taps to open. */
export default function IntroScene({ onNext }: Props) {
  const [opening, setOpening] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    sound.chime()
    window.setTimeout(onNext, 1150)
  }

  return (
    <div className="scene">
      <p className="eyebrow">A birthday wish, made by hand</p>

      <h1 className="title-script shimmer">{config.herName}</h1>

      <p className="lead">{config.intro}</p>

      <div
        className="envelope-wrap float"
        role="button"
        tabIndex={0}
        aria-label="Open the envelope"
        onClick={open}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
        onMouseEnter={() => !opening && sound.sparkle()}
      >
        <div className={`envelope${opening ? ' opening' : ''}`}>
          <div className="env-body" />
          <div className="env-letter">♥</div>
          <div className="env-pocket" />
          <div className="env-flap" />
          <div className="env-seal">♥</div>
        </div>
      </div>

      <p className="tap-hint">{opening ? 'opening…' : 'tap to open'}</p>
    </div>
  )
}
