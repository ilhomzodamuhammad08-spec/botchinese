import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { LESSONS } from '../data/lessons'
import { wordsForLesson } from '../data/vocabulary'
import { getCompletedLessons } from '../utils/progress'

export default function Lessons() {
  const { t, lang } = useLang()
  const completed = getCompletedLessons()
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-red-700">{t('lessonsTitle')}</h1>
      <p className="mb-6 text-slate-600">{t('lessonsSub')}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LESSONS.map(l => {
          const r = completed[l.id]
          return (
            <Link key={l.id} to={`/lessons/${l.id}`} className="card block p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gold-600">{t('lesson')} {l.id}</span>
                {r && <span className="flex items-center gap-1 text-sm text-green-700"><CheckCircle2 size={16} />{r.score}/{r.total}</span>}
              </div>
              <h2 className="mb-2 text-lg font-bold">{lang === 'tg' ? l.tg : l.en}</h2>
              <p lang="zh-CN" className="text-xl text-red-700">{wordsForLesson(l.id).map(w => w.hanzi).join(' ')}</p>
              <p className={`mt-2 text-sm ${r ? 'text-green-700' : 'text-slate-500'}`}>{r ? t('done') : t('notDone')}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
