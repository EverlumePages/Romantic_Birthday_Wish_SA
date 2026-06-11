/**
 * A tiny procedural sound engine — no audio files needed.
 * Generates a soft, looping music-box style ambience plus little
 * interaction chimes using the Web Audio API.
 */

type Maybe<T> = T | null

class SoundEngine {
  private ctx: Maybe<AudioContext> = null
  private master: Maybe<GainNode> = null
  private musicGain: Maybe<GainNode> = null
  private loopTimer: Maybe<number> = null
  private step = 0
  musicOn = false

  private ensure(): AudioContext {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new Ctx()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.9
      this.master.connect(this.ctx.destination)
      this.musicGain = this.ctx.createGain()
      this.musicGain.gain.value = 0
      this.musicGain.connect(this.master)
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }

  /** A single bell-like voice. */
  private voice(freq: number, t: number, dur: number, dest: AudioNode, peak = 0.25, type: OscillatorType = 'sine') {
    const ctx = this.ctx!
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    osc.connect(gain)
    gain.connect(dest)
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(peak, t + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.start(t)
    osc.stop(t + dur + 0.05)
  }

  /** Short sparkle for hover / small interactions. */
  sparkle() {
    const ctx = this.ensure()
    const t = ctx.currentTime
    this.voice(1320, t, 0.18, this.master!, 0.12, 'triangle')
    this.voice(1760, t + 0.04, 0.16, this.master!, 0.08, 'sine')
  }

  /** Warm chime for confirming an action (opening, advancing). */
  chime() {
    const ctx = this.ensure()
    const t = ctx.currentTime
    ;[523.25, 659.25, 783.99].forEach((f, i) => this.voice(f, t + i * 0.08, 0.9, this.master!, 0.16))
  }

  /** Soft breathy "blow" for extinguishing a candle. */
  whoosh() {
    const ctx = this.ensure()
    const t = ctx.currentTime
    const bufferSize = ctx.sampleRate * 0.4
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    const src = ctx.createBufferSource()
    src.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 900
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.linearRampToValueAtTime(0.22, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(this.master!)
    src.start(t)
    src.stop(t + 0.42)
  }

  /** Celebratory rising arpeggio for the finale / confetti. */
  fanfare() {
    const ctx = this.ensure()
    const t = ctx.currentTime
    ;[523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) =>
      this.voice(f, t + i * 0.09, 1.1, this.master!, 0.18, i % 2 ? 'sine' : 'triangle'),
    )
  }

  // ---- looping ambience (a gentle music-box pattern) ----

  private tick = () => {
    if (!this.ctx || !this.musicGain) return
    const t = this.ctx.currentTime + 0.05
    // A soft major pentatonic phrase that loops endlessly.
    const phrase = [0, 4, 7, 9, 12, 9, 7, 4, 0, 7, 4, 0, -3, 0, 4, 7]
    const root = 392.0 // G4
    const semis = phrase[this.step % phrase.length]
    const freq = root * Math.pow(2, semis / 12)
    this.voice(freq, t, 1.6, this.musicGain, 0.22, 'sine')
    // a faint lower octave pad every 4 steps
    if (this.step % 4 === 0) this.voice(freq / 2, t, 2.4, this.musicGain, 0.12, 'triangle')
    this.step++
  }

  startMusic() {
    const ctx = this.ensure()
    this.musicOn = true
    this.musicGain!.gain.cancelScheduledValues(ctx.currentTime)
    this.musicGain!.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2)
    if (this.loopTimer == null) {
      this.tick()
      this.loopTimer = window.setInterval(this.tick, 360)
    }
  }

  stopMusic() {
    this.musicOn = false
    if (this.ctx && this.musicGain) {
      this.musicGain.gain.cancelScheduledValues(this.ctx.currentTime)
      this.musicGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6)
    }
    if (this.loopTimer != null) {
      window.clearInterval(this.loopTimer)
      this.loopTimer = null
    }
  }

  toggleMusic(): boolean {
    if (this.musicOn) this.stopMusic()
    else this.startMusic()
    return this.musicOn
  }
}

export const sound = new SoundEngine()
