import { loadJSON, saveJSON } from './storage'

export type ActivityKind = 'learned' | 'lesson' | 'quiz' | 'exam' | 'review'
export interface Activity { date: string; kind: ActivityKind; ref?: number }

const isActivities = (v: unknown): v is Activity[] =>
  Array.isArray(v) && v.every(a => typeof a === 'object' && a !== null && typeof (a as Activity).date === 'string' && typeof (a as Activity).kind === 'string')

export const getActivities = (): Activity[] => loadJSON<Activity[]>('activity', [], isActivities)

/** Real activity log used later for streaks and "recent activity". Capped at 300 entries. */
export function logActivity(kind: ActivityKind, ref?: number): void {
  const list = getActivities()
  list.push({ date: new Date().toISOString(), kind, ref })
  saveJSON('activity', list.slice(-300))
}
