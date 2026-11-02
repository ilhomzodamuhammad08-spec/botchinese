import { useCallback, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { LESSONS } from '../data/lessons'
import { LESSON_GRAMMAR } from '../data/lessonContent'
import { VOCABULARY, wordsForLesson } from '../data/vocabulary'
import { completeLesson, getCompletedLessons } from '../utils/progress'
import { logActivity } from '../utils/activity'
import { meaningQuestions } from '../utils/questions'
import { useWordState } from '../utils/wordState'
import Breadcrumbs from '../components/Breadcrumbs'
import WordCard from '../components/WordCard'
import Matching from '../components/Matching'
import Quiz from '../components/Quiz'
import NotFound from '../components/NotFound'

export default function Lesson() {
  const { id } = useParams()
  const n = Number(id)
  if (!Number.isInteger(n) || n < 1 || n > LESSONS.length) return <NotFound />
  return <LessonView key={n} n={n} />
}

function LessonView({ n }: { n: number }) {
  const { t, lang } = useLang()
  const ws = useWordState()
  const meta = LESSONS[n - 1]
  const title = lang === 'tg' ? meta.tg : meta.en
  const words = useMemo(() => wordsForLesson(n), [n])
  const grammar = LESSON_GRAMMAR[n]

  const [round, setRound] = useState(0)
  const questions = useMemo(() => meaningQuestions(words, lang, VOCABULARY), [words, lang, round]) // eslint-disable-line react-hooks/exhaustive-deps
  const [matchDone, setMatchDone] = useState(false)
  const [quiz, setQuiz] = useState<{ score: number; total: number } | null>(null)
  const [result, setResult] = useState(() => getCompletedLessons()[n] ?? null)

  const onMatch = useCallback(() => setMatchDone(true), [])
  const ready = matchDone && quiz !== null

  const finishLesson = () => {
    if (!quiz) return
    completeLesson(n, quiz.score, quiz.total)
    logActivity('lesson', n)
    setResult(getCompletedLessons()[n] ?? null)
  }

  const objectives = lang === 'tg'
    ? [`Омӯхтани 10 калимаи нав дар мавзӯи «${title}»`, 'Гӯш кардан ва дуруст талаффуз кардани калимаҳо', 'Иҷрои машқи мувофиқкунӣ ва тести дарс']
    : [`Learn 10 new words on the topic “${title}”`, 'Listen to the words and practise the pronunciation', 'Complete the matching exercise and the lesson quiz']
  const intro = lang === 'tg'
    ? `Дар ин дарс шумо 10 калимаи HSK 1-ро аз мавзӯи «${title}» меомӯзед. Ҳар калимаро гӯш кунед, мисолро хонед ва баъд машқҳоро иҷро кунед.`
    : `In this lesson you learn 10 HSK 1 words on the topic “${title}”. Listen to each word, read the example, then complete the exercises.`

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: t('crumbHome'), to: '/' }, { label: t('lessons'), to: '/lessons' }, { label: `${t('lesson')} ${n}` }]} />
      <header>
        <p className="text-sm font-semibold text-gold-600">{t('lesson')} {n}</p>
        <h1 className="text-3xl font-extrabold text-red-700">{title}</h1>
        {result && <p className="mt-1 text-green-700">✓ {t('lessonDone')} {t('finalScore')}: {result.score}/{result.total}</p>}
      </header>

      <section className="card p-5">
        <h2 className="mb-2 text-xl font-bold text-red-700">{t('intro')}</h2>
        <p className="mb-3">{intro}</p>
        <h3 className="mb-1 font-semibold">{t('objectives')}</h3>
        <ul className="list-disc space-y-1 pl-5">{objectives.map(o => <li key={o}>{o}</li>)}</ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-red-700">{t('vocabCards')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {words.map(w => (
            <WordCard key={w.id} word={w} showTr fav={ws.favs.has(w.id)} learned={ws.learned.has(w.id)}
              onFav={() => ws.toggleFav(w.id)} onLearned={() => ws.toggleLearned(w.id)} />
          ))}
        </div>
      </section>

      {grammar && (
        <section className="card border-l-4 border-l-gold-400 p-5">
          <h2 className="mb-2 text-xl font-bold text-red-700">{t('grammarNote')}</h2>
          <p lang="zh-CN" className="mb-1 text-lg font-semibold">{grammar.zh}</p>
          <p>{lang === 'tg' ? grammar.tg : grammar.en}</p>
        </section>
      )}

      <section className="card p-5">
        <h2 className="mb-3 text-xl font-bold text-red-700">{t('matchTitle')}</h2>
        <Matching words={words} onComplete={onMatch} />
      </section>

      <section className="card p-5">
        <h2 className="mb-3 text-xl font-bold text-red-700">{t('quizTitle')}</h2>
        <p className="mb-3 text-xs text-slate-500">{t('practiceNote')}</p>
        <Quiz key={`${round}-${lang}`} questions={questions} onFinish={(score, total) => setQuiz({ score, total })}
          onRetry={() => { setQuiz(null); setRound(r => r + 1) }} />
      </section>

      <section className="card p-5 text-center">
        {!ready && !result && <p className="mb-3 text-slate-600">{t('completeNeeds')}</p>}
        {!result || ready ? (
          <button type="button" className="btn-primary" disabled={!ready} onClick={finishLesson}
            style={ready ? undefined : { opacity: 0.5, cursor: 'not-allowed' }}>{t('completeLesson')}</button>
        ) : null}
        {result && (
          <div className="mt-3">
            <p className="text-lg font-bold text-green-700">{t('lessonDone')} {t('finalScore')}: {result.score}/{result.total}</p>
            {n < LESSONS.length
              ? <Link to={`/lessons/${n + 1}`} className="btn-primary mt-3">{t('nextLesson')}</Link>
              : <p className="mt-2">{t('allDone')}</p>}
          </div>
        )}
      </section>

      <nav className="flex justify-between" aria-label="Lesson navigation">
        {n > 1 ? <Link to={`/lessons/${n - 1}`} className="btn-ghost">← {t('lesson')} {n - 1}</Link> : <span />}
        {n < LESSONS.length ? <Link to={`/lessons/${n + 1}`} className="btn-ghost">{t('lesson')} {n + 1} →</Link> : <Link to="/lessons" className="btn-ghost">{t('backLessons')}</Link>}
      </nav>
    </div>
  )
}
