import { useState, type ReactNode } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Languages } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import type { Key } from '../i18n/dict'

export const NAV: { to: string; key: Key }[] = [
  { to: '/', key: 'home' }, { to: '/lessons', key: 'lessons' }, { to: '/vocabulary', key: 'vocabulary' },
  { to: '/grammar', key: 'grammar' }, { to: '/listening', key: 'listening' },
  { to: '/practice', key: 'practice' }, { to: '/progress', key: 'progress' }
]

export default function Layout({ children }: { children: ReactNode }) {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const link = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-red-100'}`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-red-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-extrabold text-red-700" onClick={() => setOpen(false)}>
            ChinaMaster <span className="text-gold-600">中文大师</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map(n => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={link}>{t(n.key)}</NavLink>)}
          </nav>
          <div className="flex items-center gap-2">
            <button className="btn-ghost !px-3 !py-1.5 text-sm" aria-label={t('lang')}
              onClick={() => setLang(lang === 'tg' ? 'en' : 'tg')}>
              <Languages size={16} />{lang === 'tg' ? 'Тоҷикӣ' : 'English'}
            </button>
            <button className="rounded-lg p-2 hover:bg-red-100 lg:hidden" aria-label={t('menu')} aria-expanded={open}
              onClick={() => setOpen(o => !o)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-red-100 px-4 py-3 lg:hidden" aria-label="Mobile">
            {NAV.map(n => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={link} onClick={() => setOpen(false)}>{t(n.key)}</NavLink>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t border-red-100 bg-white py-6 text-center text-sm text-slate-600">
        <p className="font-semibold text-red-700">ChinaMaster 中文大师</p>
        <p>{t('footer')}</p>
        <p>© {new Date().getFullYear()} ChinaMaster</p>
      </footer>
    </div>
  )
}
