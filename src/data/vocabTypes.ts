export type Pos = 'n' | 'v' | 'adj' | 'adv' | 'pron' | 'num' | 'mw' | 'prep' | 'conj' | 'part' | 'int' | 'phr' | 'qw' | 'pn' | 'aux'

/** Compact row: [hanzi, pinyin, en, tg, pos, example, examplePinyin, exampleEn, exampleTg] */
export type VocabRow = readonly [string, string, string, string, Pos, string, string, string, string]
