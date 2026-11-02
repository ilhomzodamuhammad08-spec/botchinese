import type { Word } from '../data/vocabulary'
import type { Lang } from '../i18n/dict'

export const meaning = (w: Word, lang: Lang): string => (lang === 'tg' ? w.tg : w.en)
export const otherMeaning = (w: Word, lang: Lang): string => (lang === 'tg' ? w.en : w.tg)
export const exampleText = (w: Word, lang: Lang): string => (lang === 'tg' ? w.example.tg : w.example.en)
export const exampleOther = (w: Word, lang: Lang): string => (lang === 'tg' ? w.example.en : w.example.tg)

/** Lower-case and strip diacritics so "ni" finds "nǐ" and Latin/Cyrillic variants compare fairly. */
export const normalize = (s: string): string => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
