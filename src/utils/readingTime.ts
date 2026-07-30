const WORDS_PER_MINUTE = 220;

export function getReadingTime(content: string, override?: number) {
  if (override) return override;

  const words = content.trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
