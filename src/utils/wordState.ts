import { useCallback, useState } from 'react'
import { loadJSON, saveJSON } from './storage'
import { logActivity } from './activity'

const isNumArray = (v: unknown): v is number[] => Array.isArray(v) && v.every(x => typeof x === 'number')

export function getLearnedIds(): number[] { return loadJSON<number[]>('learned', [], isNumArray) }
export function getFavoriteIds(): number[] { return loadJSON<number[]>('favorites', [], isNumArray) }

/** Favorites and learned words, persisted in localStorage. */
export function useWordState() {
  const [favs, setFavs] = useState<Set<number>>(() => new Set(getFavoriteIds()))
  const [learned, setLearned] = useState<Set<number>>(() => new Set(getLearnedIds()))

  const toggleFav = useCallback((id: number) => {
    setFavs(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      saveJSON('favorites', [...next])
      return next
    })
  }, [])

  const toggleLearned = useCallback((id: number) => {
    setLearned(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else { next.add(id); logActivity('learned', id) }
      saveJSON('learned', [...next])
      return next
    })
  }, [])

  return { favs, learned, toggleFav, toggleLearned }
}
export type WordState = ReturnType<typeof useWordState>
