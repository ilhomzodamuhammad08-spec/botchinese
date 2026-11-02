import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import { speak } from '../utils/speech'
import { useLang } from '../i18n/LangContext'

export default function SpeakButton({ text, label, size = 20 }: { text: string; label?: string; size?: number }) {
  const { t } = useLang()
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const onClick = async () => {
    setBusy(true)
    const r = await speak(text)
    setBusy(false)
    setMsg(r === 'ok' ? '' : r === 'unsupported' ? t('speakUnsupported') : r === 'no-voice' ? t('speakNoVoice') : t('speakError'))
  }

  return (
    <span className="inline-flex flex-col items-start">
      <button type="button" onClick={onClick} aria-label={`${t('listen')}: ${label ?? text}`}
        className={`rounded-full bg-red-100 p-2 text-red-700 transition hover:bg-red-600 hover:text-white ${busy ? 'animate-pulse' : ''}`}>
        <Volume2 size={size} />
      </button>
      {msg && <span role="status" className="mt-1 max-w-[18rem] text-xs text-red-700">{msg}</span>}
    </span>
  )
}
