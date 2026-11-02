import { useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCw, Heart, CheckCircle2 } from 'lucide-react'
import type { Word } from '../data/vocabulary'
import { useLang } from '../i18n/LangContext'
import { meaning, otherMeaning, exampleText } from '../utils/words'
import SpeakButton from './SpeakButton'

interface Props {
  word: Word; index: number; total: number; fav: boolean; learned: boolean
  onPrev: () => void; onNext: () => void; onFav: () => void; onLearned: () => void
}

export default function Flashcard({ word: w, index, total, fav, learned, onPrev, onNext, onFav, onLearned }: Props) {
  const { t, lang } = useLang()
  const [flipped, setFlipped] = useState(false)
  const go = (fn: () => void) => () => { setFlipped(false); fn() }

  return (
    <div className="mx-auto max-w-md">
      <p className="mb-2 text-center text-sm text-slate-600" aria-live="polite">{index + 1} {t('cardOf')} {total}</p>
      <div className="card flex min-h-[18rem] flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-6xl font-bold text-red-700" lang="zh-CN">{w.hanzi}</p>
        <SpeakButton text={w.hanzi} />
        {flipped ? (
          <div className="space-y-1">
            <p className="text-xl">{w.pinyin}</p>
            <p className="text-lg font-semibold">{meaning(w, lang)}</p>
            <p className="text-slate-500">{otherMeaning(w, lang)}</p>
            <p lang="zh-CN" className="pt-2">{w.example.zh}</p>
            <p className="text-sm text-slate-600">{w.example.pinyin} — {exampleText(w, lang)}</p>
          </div>
        ) : (
          <button type="button" className="btn-ghost" onClick={() => setFlipped(true)}><RotateCw size={16} />{t('flip')}</button>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <button type="button" className="btn-ghost" onClick={go(onPrev)} aria-label={t('prev')}><ChevronLeft size={18} />{t('prev')}</button>
        <button type="button" onClick={onFav} aria-pressed={fav} aria-label={fav ? t('unfav') : t('fav')}
          className={`rounded-lg border p-2 ${fav ? 'border-red-600 bg-red-600 text-white' : 'border-red-200 text-red-700'}`}><Heart size={18} fill={fav ? 'currentColor' : 'none'} /></button>
        <button type="button" onClick={onLearned} aria-pressed={learned} aria-label={t('markLearned')}
          className={`rounded-lg border p-2 ${learned ? 'border-green-600 bg-green-600 text-white' : 'border-red-200 text-red-700'}`}><CheckCircle2 size={18} /></button>
        <button type="button" className="btn-primary" onClick={go(onNext)} aria-label={t('next')}>{t('next')}<ChevronRight size={18} /></button>
      </div>
    </div>
  )
}
