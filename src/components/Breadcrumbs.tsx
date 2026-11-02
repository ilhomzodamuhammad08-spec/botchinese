import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>/</span>}
            {it.to ? <Link to={it.to} className="text-red-700 underline-offset-2 hover:underline">{it.label}</Link>
              : <span aria-current="page" className="font-semibold">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
