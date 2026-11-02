import { Heart, CheckCircle2 } from 'lucide-react'
import type { Word } from '../data/vocabulary'
import { POS_LABELS } from '../data/vocabulary'
import { useLang } from '../i18n/LangContext'
import { meaning, otherMeaning, exampleText, exampleOther } from '../utils/words'
import SpeakButton from './SpeakButton'

interface Props { word: Word; showTr: boolean; fav: boolean; learned: boolean; onFav: () => void; onLearned: () => void }

export default function WordCard({ word: w, showTr, fav, learned, onFav, onLearned }: Props) {
  const { t, lang } = useLang()
  return (
    <article className={`card flex flex-col gap-2 p-4 ${learned ? 'ring-2 ring-green-300' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-4xl font-bold text-red-700" lang="zh-CN">{w.hanzi}</p>
          <p className="text-lg text-slate-700">{w.pinyin}</p>
        </div>
        <SpeakButton text={w.hanzi} />
      </div>
      <span className="w-fit rounded-full bg-gold-100 px-2 py-0.5 text-xs text-gold-600">{POS_LABELS[w.pos][lang]}</span>
      {showTr && (
        <div>
          <p className="font-semibold">{meaning(w, lang)}</p>
          <p className="text-sm text-slate-500">{otherMeaning(w, lang)}</p>
        </div>
      )}
      <div className="rounded-xl bg-red-50 p-3 text-sm">
        <p className="mb-1 text-xs font-semibold uppercase text-gold-600">{t('example')}</p>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p lang="zh-CN" className="text-base">{w.example.zh}</p>
            <p className="text-slate-600">{w.example.pinyin}</p>
          </div>
          <SpeakButton text={w.example.zh} size={16} label={w.example.zh} />
        </div>
        {showTr && (<><p>{exampleText(w, lang)}</p><p className="text-slate-500">{exampleOther(w, lang)}</p></>)}
      </div>
      <div className="mt-auto flex gap-2 pt-2">
        <button type="button" onClick={onFav} aria-pressed={fav} aria-label={fav ? t('unfav') : t('fav')}
          className={`rounded-lg border p-2 ${fav ? 'border-red-600 bg-red-600 text-white' : 'border-red-200 text-red-700 hover:bg-red-100'}`}>
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
        </button>
        <button type="button" onClick={onLearned} aria-pressed={learned}
          className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm font-semibold ${learned ? 'border-green-600 bg-green-600 text-white' : 'border-red-200 text-red-700 hover:bg-red-100'}`}>
          <CheckCircle2 size={18} />{learned ? t('isLearned') : t('markLearned')}
        </button>
      </div>
    </article>
  )
}
