import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { GRAMMAR, type GrammarLevel } from '../data/grammar'
import { getGrammarScores } from '../utils/progress'
import LevelBadge from '../components/LevelBadge'

export default function Grammar() {
  const { t, lang } = useLang()
  const [flt, setFlt] = useState<'all' | GrammarLevel>('all')
  const scores = getGrammarScores()
  const list = GRAMMAR.filter(g => flt === 'all' || g.level === flt)
  const idx = lang === 'tg' ? 0 : 1
  const btn = (f: 'all' | GrammarLevel, label: string) => (
    <button key={f} type="button" aria-pressed={flt === f} onClick={() => setFlt(f)}
      className={`rounded-full border px-3 py-1 text-sm ${flt === f ? 'border-red-600 bg-red-600 text-white' : 'border-red-200 bg-white text-red-700 hover:bg-red-100'}`}>{label}</button>
  )
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-red-700">{t('grammarTitle')}</h1>
      <p className="mb-4 text-slate-600">{t('grammarSub')}</p>
      <p className="card mb-4 border-l-4 border-l-gold-400 p-4 text-sm">{t('levelNote')}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {btn('all', t('fAll'))}{btn('core', t('levelCore'))}{btn('mixed', t('levelMixed'))}{btn('extra', t('levelExtra'))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(g => {
          const s = scores[g.id]
          return (
            <Link key={g.id} to={`/grammar/${g.id}`} className="card block p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-gold-600">{t('topic')} {g.id}</span>
                {s && <span className="flex items-center gap-1 text-sm text-green-700"><CheckCircle2 size={16} />{s.score}/{s.total}</span>}
              </div>
              <p lang="zh-CN" className="text-xl font-bold text-red-700">{g.zh}</p>
              <h2 className="mb-2 font-semibold">{g.title[idx]}</h2>
              <LevelBadge level={g.level} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
