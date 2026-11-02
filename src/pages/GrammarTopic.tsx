import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { GRAMMAR } from '../data/grammar'
import { saveGrammarScore, getGrammarScores } from '../utils/progress'
import { logActivity } from '../utils/activity'
import { shuffle } from '../utils/random'
import type { Question } from '../utils/questions'
import Breadcrumbs from '../components/Breadcrumbs'
import LevelBadge from '../components/LevelBadge'
import SpeakButton from '../components/SpeakButton'
import Quiz from '../components/Quiz'
import NotFound from '../components/NotFound'

export default function GrammarTopic() {
  const { id } = useParams()
  const n = Number(id)
  if (!Number.isInteger(n) || n < 1 || n > GRAMMAR.length) return <NotFound />
  return <TopicView key={n} n={n} />
}

function TopicView({ n }: { n: number }) {
  const { t, lang } = useLang()
  const topic = GRAMMAR[n - 1]
  const i = lang === 'tg' ? 0 : 1
  const [round, setRound] = useState(0)
  const [saved, setSaved] = useState(() => getGrammarScores()[n] ?? null)

  const questions: Question[] = useMemo(() => topic.practice.map((p, k) => ({
    id: `g${n}-${k}`,
    prompt: p.hint ? `${p.q} — ${p.hint[i]}` : p.q,
    options: shuffle(p.options),
    answer: p.answer,
    explanation: p.why[i]
  })), [topic, n, i, round]) // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (score: number, total: number) => {
    saveGrammarScore(n, score, total)
    logActivity('quiz', n)
    setSaved({ score, total })
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: t('crumbHome'), to: '/' }, { label: t('grammar'), to: '/grammar' }, { label: `${t('topic')} ${n}` }]} />
      <header>
        <p className="text-sm font-semibold text-gold-600">{t('topic')} {n}</p>
        <h1 className="text-3xl font-extrabold text-red-700"><span lang="zh-CN">{topic.zh}</span> — {topic.title[i]}</h1>
        <div className="mt-2"><LevelBadge level={topic.level} /></div>
        {saved && <p className="mt-1 text-green-700">✓ {t('score')}: {saved.score}/{saved.total}</p>}
      </header>

      <section className="card p-5">
        <p>{topic.explain[i]}</p>
        {topic.note && <p className="mt-3 rounded-xl bg-gold-100 p-3 text-sm"><strong>{t('levelExtra')}:</strong> {topic.note[i]}</p>}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-red-700">{t('examples')}</h2>
        <div className="space-y-3">
          {topic.ex.map(e => (
            <div key={e[0]} className="card flex items-start justify-between gap-3 p-4">
              <div>
                <p lang="zh-CN" className="text-xl font-semibold">{e[0]}</p>
                <p className="text-slate-600">{e[1]}</p>
                <p>{lang === 'tg' ? e[3] : e[2]}</p>
                <p className="text-sm text-slate-500">{lang === 'tg' ? e[2] : e[3]}</p>
              </div>
              <SpeakButton text={e[0]} />
            </div>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="mb-1 text-xl font-bold text-red-700">{t('grammarPractice')}</h2>
        <p className="mb-3 text-xs text-slate-500">{t('practiceNote')}</p>
        <Quiz key={`${round}-${lang}`} questions={questions} onFinish={onFinish} onRetry={() => setRound(r => r + 1)} />
      </section>

      <nav className="flex justify-between" aria-label="Topic navigation">
        {n > 1 ? <Link to={`/grammar/${n - 1}`} className="btn-ghost">← {t('topic')} {n - 1}</Link> : <span />}
        {n < GRAMMAR.length ? <Link to={`/grammar/${n + 1}`} className="btn-ghost">{t('topic')} {n + 1} →</Link> : <Link to="/grammar" className="btn-ghost">{t('backGrammar')}</Link>}
      </nav>
    </div>
  )
}
