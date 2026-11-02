import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle2, Headphones, ListChecks, Languages, Target } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { LESSONS, WORDS_PER_LESSON, TOTAL_WORDS, GRAMMAR_TOPICS } from '../data/lessons'
import { getCompletedLessons } from '../utils/progress'

export default function Home() {
  const { t, lang } = useLang()
  const completed = getCompletedLessons()
  const doneCount = Object.keys(completed).length

  const stats = [
    { icon: <BookOpen />, n: String(TOTAL_WORDS), label: t('statWords') },
    { icon: <ListChecks />, n: String(LESSONS.length), label: t('statLessons') },
    { icon: <Languages />, n: String(GRAMMAR_TOPICS), label: t('statGrammar') },
    { icon: <Headphones />, n: '✓', label: t('statListen') },
    { icon: <CheckCircle2 />, n: '✓', label: t('statQuiz') }
  ]

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-8 text-white md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-gold-400">{t('tagline')}</p>
            <h1 className="mb-4 text-3xl font-extrabold md:text-4xl">{t('heroTitle')}</h1>
            <p className="mb-6 text-red-50">{t('heroSub')}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/lessons" className="btn bg-gold-400 text-red-800 hover:bg-gold-100">{t('start')}</Link>
              <Link to="/vocabulary" className="btn border border-white text-white hover:bg-white/10">{t('explore')}</Link>
            </div>
          </div>
          <svg viewBox="0 0 200 160" className="mx-auto w-full max-w-xs" role="img" aria-label="Pagoda">
            <circle cx="150" cy="35" r="18" fill="#d4af37" opacity=".85" />
            <g fill="#fff" opacity=".95">
              <path d="M100 18 L130 42 H70Z" /><rect x="82" y="42" width="36" height="16" />
              <path d="M100 52 L140 80 H60Z" /><rect x="76" y="80" width="48" height="18" />
              <path d="M100 92 L150 124 H50Z" /><rect x="68" y="124" width="64" height="26" />
            </g>
            <rect x="0" y="150" width="200" height="10" fill="#850a1e" />
          </svg>
        </div>
      </section>

      <section aria-label="Statistics" className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {stats.map((s, i) => (
          <div key={i} className="card flex flex-col items-center p-4 text-center text-red-700">
            {s.icon}<span className="mt-1 text-2xl font-extrabold">{s.n}</span>
            <span className="text-sm text-slate-600">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="card flex items-center gap-4 p-5">
        <Target className="text-gold-600" />
        <div>
          <h2 className="font-bold text-red-700">{t('goal')}</h2>
          <p className="text-sm text-slate-600">
            {doneCount === 0 ? t('goalEmpty') : `${t('completedLessons')}: ${doneCount}/${LESSONS.length}`}
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-red-700">{t('roadmap')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LESSONS.map(l => {
            const from = (l.id - 1) * WORDS_PER_LESSON + 1
            const isDone = Boolean(completed[l.id])
            return (
              <article key={l.id} className="card flex flex-col p-5">
                <span className="text-sm font-semibold text-gold-600">{t('lesson')} {l.id}</span>
                <h3 className="mb-1 text-lg font-bold">{lang === 'tg' ? l.tg : l.en}</h3>
                <p className="text-sm text-slate-600">{t('words')}: {from}–{from + WORDS_PER_LESSON - 1}</p>
                <p className={`mb-3 text-sm ${isDone ? 'text-green-700' : 'text-slate-500'}`}>{isDone ? t('done') : t('notDone')}</p>
                <Link to={`/lessons/${l.id}`} className="btn-primary mt-auto">{t('startLesson')}</Link>
              </article>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-red-700">{t('how')}</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {(['how1', 'how2', 'how3'] as const).map((k, i) => (
            <li key={k} className="card p-5"><span className="mr-2 font-extrabold text-gold-600">{i + 1}.</span>{t(k)}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}
