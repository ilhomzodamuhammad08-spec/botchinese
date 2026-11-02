import { loadJSON, saveJSON } from './storage'

export interface LessonResult { score: number; total: number; date: string }
export type CompletedLessons = Record<number, LessonResult>

const isRecord = (v: unknown): v is CompletedLessons => typeof v === 'object' && v !== null && !Array.isArray(v)

export const getCompletedLessons = (): CompletedLessons => loadJSON<CompletedLessons>('lessons', {}, isRecord)

export function completeLesson(n: number, score: number, total: number): void {
  const all = getCompletedLessons()
  all[n] = { score, total, date: new Date().toISOString() }
  saveJSON('lessons', all)
}

// Grammar practice results: best score per topic id.
export interface GrammarResult { score: number; total: number }
const isGrammarRecord = (v: unknown): v is Record<number, GrammarResult> => typeof v === 'object' && v !== null && !Array.isArray(v)

export const getGrammarResults = (): Record<number, GrammarResult> =>
  loadJSON<Record<number, GrammarResult>>('grammar', {}, isGrammarRecord)

export function saveGrammarResult(id: number, score: number, total: number): void {
  const all = getGrammarResults()
  const prev = all[id]
  if (!prev || score >= prev.score) all[id] = { score, total }
  saveJSON('grammar', all)
}

export interface GrammarScore { score: number; total: number }
export type GrammarScores = Record<number, GrammarScore>

export const getGrammarScores = (): GrammarScores => loadJSON<GrammarScores>('grammar', {}, isRecord as (v: unknown) => v is GrammarScores)

export function saveGrammarScore(topic: number, score: number, total: number): void {
  const all = getGrammarScores()
  all[topic] = { score, total }
  saveJSON('grammar', all)
}
