import { VOCAB_1 } from './vocab1'
import { VOCAB_2 } from './vocab2'
import { VOCAB_3 } from './vocab3'
import { LESSONS, WORDS_PER_LESSON, TOTAL_WORDS } from './lessons'
import type { Pos, VocabRow } from './vocabTypes'

export interface Word {
  id: number            // 1..150, stable key used for localStorage
  lesson: number        // 1..15
  category: string      // category key, see CATEGORIES
  hanzi: string
  pinyin: string
  en: string
  tg: string
  pos: Pos
  example: { zh: string; pinyin: string; en: string; tg: string }
}

export const POS_LABELS: Record<Pos, { en: string; tg: string }> = {
  n: { en: 'noun', tg: 'исм' }, v: { en: 'verb', tg: 'феъл' }, adj: { en: 'adjective', tg: 'сифат' },
  adv: { en: 'adverb', tg: 'зарф' }, pron: { en: 'pronoun', tg: 'ҷонишин' }, num: { en: 'numeral', tg: 'шумора' },
  mw: { en: 'measure word', tg: 'калимаи ҳисобӣ' }, prep: { en: 'preposition', tg: 'пешоянд' },
  conj: { en: 'conjunction', tg: 'пайвандак' }, part: { en: 'particle', tg: 'ҳиссача' },
  int: { en: 'interjection', tg: 'нидо' }, phr: { en: 'phrase', tg: 'ибора' },
  qw: { en: 'question word', tg: 'калимаи савол' }, pn: { en: 'proper noun', tg: 'исми хос' },
  aux: { en: 'auxiliary verb', tg: 'феъли ёрирасон' }
}

// One category per lesson (index = lesson - 1). Used for filtering.
export const CATEGORIES: { key: string; en: string; tg: string }[] = [
  { key: 'greetings', en: 'Greetings and expressions', tg: 'Салом ва ибораҳо' },
  { key: 'people', en: 'Pronouns and people', tg: 'Ҷонишинҳо ва одамон' },
  { key: 'numbers', en: 'Numbers', tg: 'Рақамҳо' },
  { key: 'time', en: 'Time and dates', tg: 'Вақт ва сана' },
  { key: 'family', en: 'Family', tg: 'Оила' },
  { key: 'language', en: 'Countries and languages', tg: 'Кишварҳо ва забонҳо' },
  { key: 'school', en: 'School', tg: 'Мактаб' },
  { key: 'work', en: 'Work and activities', tg: 'Кор ва фаъолият' },
  { key: 'food', en: 'Food and drinks', tg: 'Хӯрок ва нӯшокӣ' },
  { key: 'shopping', en: 'Shopping and money', tg: 'Харид ва пул' },
  { key: 'places', en: 'Places and transport', tg: 'Ҷойҳо ва нақлиёт' },
  { key: 'verbs', en: 'Common verbs', tg: 'Феълҳои маъмул' },
  { key: 'adjectives', en: 'Adjectives and adverbs', tg: 'Сифатҳо ва зарфҳо' },
  { key: 'questions', en: 'Question words and particles', tg: 'Калимаҳои савол ва ҳиссачаҳо' },
  { key: 'review', en: 'Review and everyday words', tg: 'Такрор ва калимаҳои рӯзмара' }
]

const ROWS: VocabRow[] = [...VOCAB_1, ...VOCAB_2, ...VOCAB_3]

export const VOCABULARY: Word[] = ROWS.map((r, i) => {
  const lesson = Math.floor(i / WORDS_PER_LESSON) + 1
  return {
    id: i + 1, lesson, category: CATEGORIES[lesson - 1]?.key ?? 'review',
    hanzi: r[0], pinyin: r[1], en: r[2], tg: r[3], pos: r[4],
    example: { zh: r[5], pinyin: r[6], en: r[7], tg: r[8] }
  }
})

export const wordsForLesson = (lesson: number): Word[] => VOCABULARY.filter(w => w.lesson === lesson)
export const wordById = (id: number): Word | undefined => VOCABULARY.find(w => w.id === id)

/** Returns a list of problems; an empty list means the dataset is valid. */
export function validateVocabulary(): string[] {
  const problems: string[] = []
  if (VOCABULARY.length !== TOTAL_WORDS) problems.push(`Expected ${TOTAL_WORDS} words, found ${VOCABULARY.length}`)
  const seen = new Set<string>()
  for (const w of VOCABULARY) {
    if (seen.has(w.hanzi)) problems.push(`Duplicate word: ${w.hanzi}`)
    seen.add(w.hanzi)
    if (![w.hanzi, w.pinyin, w.en, w.tg, w.example.zh, w.example.pinyin, w.example.en, w.example.tg].every(s => s.trim())) {
      problems.push(`Empty field in word ${w.id} (${w.hanzi})`)
    }
  }
  for (const l of LESSONS) {
    const n = wordsForLesson(l.id).length
    if (n !== WORDS_PER_LESSON) problems.push(`Lesson ${l.id} has ${n} words`)
  }
  return problems
}
