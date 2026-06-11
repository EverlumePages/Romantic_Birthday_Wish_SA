import { useCallback, useRef, useState } from 'react'
import HeartField from './components/HeartField'
import Confetti, { type ConfettiHandle } from './components/Confetti'
import IntroScene from './scenes/IntroScene'
import CakeScene from './scenes/CakeScene'
import LetterScene from './scenes/LetterScene'
import FinaleScene from './scenes/FinaleScene'
import { sound } from './lib/sound'

type SceneId = 'intro' | 'cake' | 'letter' | 'finale'
const ORDER: SceneId[] = ['intro', 'cake', 'letter', 'finale']
const EXIT_MS = 520

export default function App() {
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const confettiRef = useRef<ConfettiHandle>(null)
  const transitioning = useRef(false)

  const fireBurst = useCallback(
    (x: number, y: number, amount?: number) => confettiRef.current?.burst(x, y, amount),
    [],
  )
  const fireRain = useCallback((ms?: number) => confettiRef.current?.rain(ms), [])

  const goTo = useCallback((target: number) => {
    if (transitioning.current || target < 0 || target >= ORDER.length) return
    transitioning.current = true
    setExiting(true)
    window.setTimeout(() => {
      setIndex(target)
      setExiting(false)
      transitioning.current = false
    }, EXIT_MS)
  }, [])

  const next = useCallback(() => goTo(index + 1), [goTo, index])

  // Start the music on the very first interaction (a real user gesture),
  // so autoplay policies are satisfied. The user can always toggle it off.
  const startMusicOnce = useCallback(() => {
    if (!sound.musicOn) {
      sound.startMusic()
      setMusicOn(true)
    }
  }, [])

  const toggleMusic = useCallback(() => setMusicOn(sound.toggleMusic()), [])

  const replay = useCallback(() => goTo(0), [goTo])

  const current = ORDER[index]

  return (
    <div className="stage">
      <div className="aurora" />
      <HeartField />
      <Confetti ref={confettiRef} />
      <div className="vignette" />

      {/* music toggle */}
      <div className="corner right">
        <button
          className="icon-btn"
          onClick={toggleMusic}
          aria-label={musicOn ? 'Mute music' : 'Play music'}
          title={musicOn ? 'Mute music' : 'Play music'}
        >
          {musicOn ? (
            <span className="eq">
              <span />
              <span />
              <span />
              <span />
            </span>
          ) : (
            <span className="eq paused">
              <span />
              <span />
              <span />
              <span />
            </span>
          )}
        </button>
      </div>

      <div className="scene-layer">
        <div key={index} className={exiting ? 'scene-exit' : 'scene-enter'}>
          {current === 'intro' && (
            <IntroScene
              onNext={() => {
                startMusicOnce()
                next()
              }}
            />
          )}
          {current === 'cake' && <CakeScene onNext={next} fireBurst={fireBurst} />}
          {current === 'letter' && <LetterScene onNext={next} />}
          {current === 'finale' && <FinaleScene onReplay={replay} fireRain={fireRain} fireBurst={fireBurst} />}
        </div>
      </div>

      {/* progress dots */}
      <div className="progress" aria-hidden>
        {ORDER.map((id, i) => (
          <span key={id} className={`dot${i === index ? ' active' : ''}${i < index ? ' done' : ''}`} />
        ))}
      </div>
    </div>
  )
}
