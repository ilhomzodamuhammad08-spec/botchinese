export interface LessonMeta { id: number; tg: string; en: string }

// Organizational titles; vocabulary is assigned from the HSK 2.0 list in Part 2.
export const LESSONS: LessonMeta[] = [
  { id: 1, tg: 'Салом ва ибораҳои асосӣ', en: 'Greetings and basic expressions' },
  { id: 2, tg: 'Ҷонишинҳо ва одамон', en: 'Pronouns and people' },
  { id: 3, tg: 'Рақамҳо ва синну сол', en: 'Numbers and age' },
  { id: 4, tg: 'Санаҳо ва вақт', en: 'Dates and time' },
  { id: 5, tg: 'Оила ва муносибатҳо', en: 'Family and relationships' },
  { id: 6, tg: 'Кишварҳо ва забонҳо', en: 'Countries and languages' },
  { id: 7, tg: 'Мактаб ва таҳсил', en: 'School and studying' },
  { id: 8, tg: 'Кор ва фаъолиятҳои рӯзмара', en: 'Work and everyday activities' },
  { id: 9, tg: 'Хӯрок ва нӯшокиҳо', en: 'Food and drinks' },
  { id: 10, tg: 'Харид ва пул', en: 'Shopping and money' },
  { id: 11, tg: 'Ҷойҳо ва нақлиёт', en: 'Places and transportation' },
  { id: 12, tg: 'Феълҳои маъмул', en: 'Common verbs' },
  { id: 13, tg: 'Тавсиф ва сифатҳо', en: 'Descriptions and adjectives' },
  { id: 14, tg: 'Калимаҳои саволӣ ва ибораҳо', en: 'Question words and common expressions' },
  { id: 15, tg: 'Такрор ва муошират', en: 'Review and practical communication' }
]

export const WORDS_PER_LESSON = 10
export const TOTAL_WORDS = 150
export const GRAMMAR_TOPICS = 24
