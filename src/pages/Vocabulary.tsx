import { useEffect, useMemo, useState } from 'react'
import { Search, Shuffle, List, Layers, Eye, EyeOff, RotateCcw, BookMarked } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { CATEGORIES, VOCABULARY } from '../data/vocabulary'
import { normalize } from '../utils/words'
import { shuffle } from '../utils/random'
import { useWordState } from '../utils/wordState'
import WordCard from '../components/WordCard'
import Flashcard from '../components/Flashcard'

type Filter = 'all' | 'fav' | 'learned' | 'unlearned'

export default function Vocabulary() {
  const { t, lang } = useLang()
  const ws = useWordState()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [flt, setFlt] = useState<Filter>('all')
  const [showTr, setShowTr] = useState(true)
  const [mode, setMode] = useState<'list' | 'flash'>('list')
  const [order, setOrder] = useState<number[] | null>(null)
  const [idx, setIdx] = useState(0)

  const filtered = useMemo(() => {
    const nq = normalize(q)
    let list = VOCABULARY.filter(w => {
      if (cat !== 'all' && w.category !== cat) return false
      if (flt === 'fav' && !ws.favs.has(w.id)) return false
      if (flt === 'learned' && !ws.learned.has(w.id)) return false
      if (flt === 'unlearned' && ws.learned.has(w.id)) return false
      if (!nq) return true
      return [w.hanzi, w.pinyin, w.en, w.tg].some(f => normalize(f).includes(nq))
    })
    if (order) {
      const pos = new Map(order.map((id, i) => [id, i]))
      list = [...list].sort((a, b) => (pos.get(a.id) ?? 0) - (pos.get(b.id) ?? 0))
    }
    return list
  }, [q, cat, flt, order, ws.favs, ws.learned])

  useEffect(() => { setIdx(0) }, [q, cat, flt, order])
  const safeIdx = Math.min(idx, Math.max(filtered.length - 1, 0))
  const current = filtered[safeIdx]
  const step = (d: number) => setIdx(i => (filtered.length ? (Math.min(i, filtered.length - 1) + d + filtered.length) % filtered.length : 0))

  const startReview = () => { setFlt('unlearned'); setMode('flash'); setIdx(0) }
  const filterBtn = (f: Filter, label: string) => (
    <button key={f} type="button" aria-pressed={flt === f} onClick={() => setFlt(f)}
      className={`rounded-full border px-3 py-1 text-sm ${flt === f ? 'border-red-600 bg-red-600 text-white' : 'border-red-200 bg-white text-red-700 hover:bg-red-100'}`}>{label}</button>
  )

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-red-700">{t('vocabulary')}</h1>
      <p className="mb-4 text-slate-600">{ws.learned.size}/{VOCABULARY.length} {t('learnedCount')}</p>

      <div className="card mb-4 space-y-3 p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">{t('searchPh')}</span>
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={t('searchPh')}
              className="w-full rounded-xl border border-red-200 py-2 pl-10 pr-3" />
          </label>
          <label>
            <span className="sr-only">{t('allCats')}</span>
            <select value={cat} onChange={e => setCat(e.target.value)} className="w-full rounded-xl border border-red-200 bg-white px-3 py-2">
              <option value="all">{t('allCats')}</option>
              {CATEGORIES.map(c => <option key={c.key} value={c.key}>{lang === 'tg' ? c.tg : c.en}</option>)}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterBtn('all', t('fAll'))}{filterBtn('fav', t('fFav'))}{filterBtn('learned', t('fLearned'))}{filterBtn('unlearned', t('fUnlearned'))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-ghost !py-1.5 text-sm" onClick={() => setMode(mode === 'list' ? 'flash' : 'list')}>
            {mode === 'list' ? <><Layers size={16} />{t('flashMode')}</> : <><List size={16} />{t('listMode')}</>}
          </button>
          <button type="button" className="btn-ghost !py-1.5 text-sm" onClick={() => setShowTr(s => !s)}>
            {showTr ? <><EyeOff size={16} />{t('hideTr')}</> : <><Eye size={16} />{t('showTr')}</>}
          </button>
          <button type="button" className="btn-ghost !py-1.5 text-sm" onClick={() => setOrder(shuffle(VOCABULARY.map(w => w.id)))}><Shuffle size={16} />{t('shuffle')}</button>
          {order && <button type="button" className="btn-ghost !py-1.5 text-sm" onClick={() => setOrder(null)}><RotateCcw size={16} />{t('origOrder')}</button>}
          <button type="button" className="btn-primary !py-1.5 text-sm" onClick={startReview}><BookMarked size={16} />{t('reviewMode')}</button>
        </div>
        <p className="text-sm text-slate-500" aria-live="polite">{filtered.length} {t('results')}</p>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-8 text-center text-slate-600">
          <p>{flt === 'learned' && !q && cat === 'all' ? t('noLearned') : t('noResults')}</p>
        </div>
      ) : mode === 'flash' && current ? (
        <Flashcard key={current.id} word={current} index={safeIdx} total={filtered.length}
          fav={ws.favs.has(current.id)} learned={ws.learned.has(current.id)}
          onPrev={() => step(-1)} onNext={() => step(1)} onFav={() => ws.toggleFav(current.id)} onLearned={() => ws.toggleLearned(current.id)} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(w => (
            <WordCard key={w.id} word={w} showTr={showTr} fav={ws.favs.has(w.id)} learned={ws.learned.has(w.id)}
              onFav={() => ws.toggleFav(w.id)} onLearned={() => ws.toggleLearned(w.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
