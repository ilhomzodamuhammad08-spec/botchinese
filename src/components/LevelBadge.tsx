import { useLang } from '../i18n/LangContext'
import type { GrammarLevel } from '../data/grammar'

export default function LevelBadge({ level }: { level: GrammarLevel }) {
  const { t } = useLang()
  const style = level === 'core' ? 'bg-green-100 text-green-800' : level === 'mixed' ? 'bg-gold-100 text-gold-600' : 'bg-slate-100 text-slate-700'
  const label = level === 'core' ? t('levelCore') : level === 'mixed' ? t('levelMixed') : t('levelExtra')
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${style}`}>{label}</span>
}
