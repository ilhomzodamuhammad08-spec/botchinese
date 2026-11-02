import { AUDIO_FILES } from '../data/audio'

export type SpeakResult = 'ok' | 'unsupported' | 'no-voice' | 'error'

const synth: SpeechSynthesis | null =
  typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null

export const isSpeechSupported = (): boolean => synth !== null

function findChineseVoice(): SpeechSynthesisVoice | null {
  if (!synth) return null
  const voices = synth.getVoices()
  const norm = (l: string) => l.toLowerCase().replace('_', '-')
  return voices.find(v => norm(v.lang) === 'zh-cn') ?? voices.find(v => norm(v.lang).startsWith('zh')) ?? null
}

function loadVoices(): Promise<void> {
  return new Promise(resolve => {
    if (!synth || synth.getVoices().length > 0) return resolve()
    const done = () => { synth.removeEventListener('voiceschanged', done); resolve() }
    synth.addEventListener('voiceschanged', done)
    window.setTimeout(done, 1000) // some browsers never fire the event
  })
}

function playFile(src: string): Promise<boolean> {
  return new Promise(resolve => {
    const audio = new Audio(src)
    audio.onerror = () => resolve(false)
    audio.play().then(() => resolve(true)).catch(() => resolve(false))
  })
}

/** Plays a recorded file if one is registered, otherwise uses Chinese speech synthesis. */
export async function speak(text: string): Promise<SpeakResult> {
  const file = AUDIO_FILES[text]
  if (file && (await playFile(file))) return 'ok'
  if (!synth) return 'unsupported'
  await loadVoices()
  const voice = findChineseVoice()
  if (!voice) return 'no-voice'
  return new Promise<SpeakResult>(resolve => {
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'zh-CN'
    u.voice = voice
    u.rate = 0.85
    u.onstart = () => resolve('ok')
    u.onerror = e => resolve(e.error === 'canceled' || e.error === 'interrupted' ? 'ok' : 'error')
    synth.speak(u)
    window.setTimeout(() => resolve('ok'), 1500)
  })
}
