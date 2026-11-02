import { useLang } from '../i18n/LangContext'

export default function ComingSoon({ title }: { title: string }) {
  const { t } = useLang()
  return (
    <div className="card mx-auto max-w-xl p-8 text-center">
      <h1 className="mb-2 text-2xl font-bold text-red-700">{title}</h1>
      <p>{t('soon')}</p>
    </div>
  )
}
