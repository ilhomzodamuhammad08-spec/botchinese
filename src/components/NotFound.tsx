import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="card mx-auto max-w-xl p-8 text-center">
      <h1 className="mb-4 text-2xl font-bold text-red-700">404 — {t('notFound')}</h1>
      <Link to="/" className="btn-primary">{t('backHome')}</Link>
    </div>
  )
}
