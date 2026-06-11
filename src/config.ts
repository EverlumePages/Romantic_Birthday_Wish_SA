/**
 * 💗  EDIT THIS FILE  💗
 * Everything personal lives here. Change the names, the letter, the little
 * "reasons", and the experience updates everywhere. Nothing else needs touching.
 */

export const config = {
  /** Her name — shown big on the title and in the letter. */
  herName: 'My Love',

  /** How you sign the letter. */
  fromName: 'Yours, always',

  /** Optional: how old she's turning. Set to null to hide the number. */
  turningAge: null as number | null,

  /** The tiny line under the big title on the opening screen. */
  intro: 'A little something I made, just for you.',

  /** Words that float up over the cake while she makes a wish. */
  wishHints: ['Close your eyes', 'Make a wish', 'I hope it comes true'],

  /**
   * The love letter. Each string is its own paragraph and is typed out
   * one character at a time. Keep it from the heart.
   */
  letter: [
    `Happy birthday, my love.`,
    `From the moment you walked into my life, every ordinary day started to feel like something worth remembering. You are the softest part of my world and the bravest person I know.`,
    `Today the whole world gets a little brighter, because today is the day it got you. I just wanted to stop time for a second and tell you how impossibly lucky I am.`,
    `Thank you for your laugh, for your patience, for the way you look at me like I'm something special. I promise to keep choosing you — today, and on every birthday after this one.`,
  ],

  /** Sweet little reasons that scroll across the finale. Add as many as you like. */
  reasons: [
    'your smile',
    'the way you say my name',
    'your hugs',
    'how you light up a room',
    'your kindness',
    'your laugh',
    'every quiet moment with you',
    'simply you',
  ],

  /** The final big line. */
  finale: 'Happy Birthday',
} as const

export type AppConfig = typeof config
