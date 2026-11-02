/**
 * Recorded pronunciation files (optional).
 * Map a Chinese text to a URL of a real audio file, e.g. { '你好': `${import.meta.env.BASE_URL}audio/nihao.mp3` }.
 * It is empty on purpose: no audio files ship with the project, so speech synthesis is used.
 * Only add entries for files that really exist in /public/audio/.
 */
export const AUDIO_FILES: Record<string, string> = {}
