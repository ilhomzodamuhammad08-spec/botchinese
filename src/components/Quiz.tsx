import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import type { Question } from '../utils/questions'
import SpeakButton from './SpeakButton'

interface Props { questions: Question[]; onFinish: (score: number, total: number) => void; onRetry?: () => void }

export default function Quiz({ questions, onFinish, onRetry }: Props) {
  const { t } = useLang()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (questions.length === 0) return null
  if (done) {
    return (
      <div className="text-center" role="status">
        <p className="text-xl font-bold text-red-700">{t('score')}: {score}/{questions.length}</p>
        {onRetry && <button type="button" className="btn-ghost mt-3" onClick={onRetry}>{t('quizRetry')}</button>}
      </div>
    )
  }

  const q = questions[i]
  const answered = picked !== null
  const ok = picked === q.answer

  const choose = (opt: string) => {
    if (answered) return
    setPicked(opt)
    if (opt === q.answer) setScore(s => s + 1)
  }
  const next = () => {
    if (i + 1 >= questions.length) { setDone(true); onFinish(score, questions.length); return }
    setI(i + 1); setPicked(null)
  }

  return (
    <div>
      <p className="mb-1 text-sm text-slate-600">{t('question')} {i + 1} {t('cardOf')} {questions.length} · {t('score')}: {score}</p>
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-lg font-bold">{q.prompt}</h3>
        {q.speak && <SpeakButton text={q.speak} size={16} />}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map(opt => {
          const isAns = opt === q.answer
          const style = !answered ? 'border-red-200 bg-white hover:bg-red-50'
            : isAns ? 'border-green-500 bg-green-50' : opt === picked ? 'border-red-500 bg-red-50' : 'border-slate-200 opacity-60'
          return <button key={opt} type="button" disabled={answered} onClick={() => choose(opt)} className={`rounded-xl border p-3 text-left ${style}`}>{opt}</button>
        })}
      </div>
      {answered && (
        <div className={`mt-3 rounded-xl p-3 text-sm ${ok ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`} role="status" aria-live="polite">
          <p className="font-bold">{ok ? t('correct') : `${t('wrong')} ${t('correctAnswer')}: ${q.answer}`}</p>
          <p>{q.explanation}</p>
        </div>
      )}
      {answered && <button type="button" className="btn-primary mt-3" onClick={next}>{i + 1 >= questions.length ? t('finish') : t('checkNext')}</button>}
    </div>
  )
}
