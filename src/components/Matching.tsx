import { useEffect, useMemo, useRef, useState } from 'react'
import type { Word } from '../data/vocabulary'
import { useLang } from '../i18n/LangContext'
import { shuffle } from '../utils/random'
import { meaning } from '../utils/words'

export default function Matching({ words, onComplete }: { words: Word[]; onComplete: (mistakes: number) => void }) {
  const { t, lang } = useLang()
  const [round, setRound] = useState(0)
  const right = useMemo(() => shuffle(words), [words, round]) // eslint-disable-line react-hooks/exhaustive-deps
  const [selL, setSelL] = useState<number | null>(null)
  const [selR, setSelR] = useState<number | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [mistakes, setMistakes] = useState(0)
  const [wrongMsg, setWrongMsg] = useState(false)
  const reported = useRef(false)

  const pick = (side: 'L' | 'R', id: number) => {
    if (matched.has(id)) return
    const l = side === 'L' ? id : selL
    const r = side === 'R' ? id : selR
    if (l !== null && r !== null) {
      if (l === r) { setMatched(m => new Set(m).add(l)); setWrongMsg(false) }
      else { setMistakes(m => m + 1); setWrongMsg(true) }
      setSelL(null); setSelR(null)
    } else { setSelL(l); setSelR(r) }
  }

  useEffect(() => {
    if (words.length > 0 && matched.size === words.length && !reported.current) { reported.current = true; onComplete(mistakes) }
  }, [matched, words.length, mistakes, onComplete])

  const restart = () => { setMatched(new Set()); setMistakes(0); setSelL(null); setSelR(null); setWrongMsg(false); reported.current = false; setRound(r => r + 1) }
  const cls = (done: boolean, sel: boolean) =>
    `w-full rounded-xl border p-3 text-left transition ${done ? 'border-green-400 bg-green-50 text-green-800 opacity-70' : sel ? 'border-gold-600 bg-gold-100' : 'border-red-200 bg-white hover:bg-red-50'}`

  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">{t('matchInstr')}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">{words.map(w => (
          <button key={w.id} type="button" disabled={matched.has(w.id)} aria-pressed={selL === w.id} onClick={() => pick('L', w.id)} className={cls(matched.has(w.id), selL === w.id)}>
            <span lang="zh-CN" className="text-xl font-bold">{w.hanzi}</span> <span className="text-sm text-slate-500">{w.pinyin}</span>
          </button>))}
        </div>
        <div className="space-y-2">{right.map(w => (
          <button key={w.id} type="button" disabled={matched.has(w.id)} aria-pressed={selR === w.id} onClick={() => pick('R', w.id)} className={cls(matched.has(w.id), selR === w.id)}>
            <span className="text-sm">{meaning(w, lang)}</span>
          </button>))}
        </div>
      </div>
      <p className="mt-3 text-sm" role="status" aria-live="polite">
        {matched.size === words.length ? <span className="font-semibold text-green-700">{t('matchDone')}</span> : wrongMsg ? <span className="text-red-700">{t('matchWrong')}</span> : null}
        {' '}{t('mistakes')}: {mistakes}
      </p>
      <button type="button" className="btn-ghost mt-2" onClick={restart}>{t('retry')}</button>
    </div>
  )
}
