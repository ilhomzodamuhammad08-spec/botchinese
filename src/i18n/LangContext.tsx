import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { loadJSON, saveJSON } from '../utils/storage'
import { dict, type Lang, type Key } from './dict'

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }
const LangCtx = createContext<Ctx | null>(null)

const isLang = (v: unknown): v is Lang => v === 'tg' || v === 'en'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => loadJSON<Lang>('lang', 'tg', isLang))
  useEffect(() => { saveJSON('lang', lang); document.documentElement.lang = lang }, [lang])
  const t = (k: Key) => dict[lang][k]
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
}

export function useLang(): Ctx {
  const c = useContext(LangCtx)
  if (!c) throw new Error('useLang must be used inside LangProvider')
  return c
}
