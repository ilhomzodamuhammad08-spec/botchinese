import type { Word } from '../data/vocabulary'
import type { Lang } from '../i18n/dict'
import { shuffle } from './random'
import { meaning } from './words'

export interface Question {
  id: string
  prompt: string
  options: string[]
  answer: string
  explanation: string
  speak?: string
}

/** Multiple-choice questions generated from the real vocabulary; directions alternate. */
export function meaningQuestions(words: Word[], lang: Lang, pool: Word[]): Question[] {
  return shuffle(words).map((w, i) => {
    const m = meaning(w, lang)
    const explanation = `${w.hanzi} (${w.pinyin}) — ${m}. ${w.example.zh} (${lang === 'tg' ? w.example.tg : w.example.en})`
    if (i % 2 === 0) {
      const wrong = shuffle(pool.filter(x => x.id !== w.id && meaning(x, lang) !== m)).slice(0, 3).map(x => meaning(x, lang))
      return {
        id: `m${w.id}`, speak: w.hanzi, answer: m, explanation,
        prompt: lang === 'tg' ? `«${w.hanzi}» чӣ маъно дорад?` : `What does “${w.hanzi}” mean?`,
        options: shuffle([m, ...wrong])
      }
    }
    const wrong = shuffle(pool.filter(x => x.id !== w.id && x.hanzi !== w.hanzi)).slice(0, 3).map(x => x.hanzi)
    return {
      id: `h${w.id}`, answer: w.hanzi, explanation,
      prompt: lang === 'tg' ? `Кадом калима маънои «${m}»-ро дорад?` : `Which word means “${m}”?`,
      options: shuffle([w.hanzi, ...wrong])
    }
  })
}
