interface StorySegment {
  type: 'narration' | 'dialogue'
  text: string
}

export function formatStoryText(raw: string): StorySegment[] {
  const segments: StorySegment[] = []
  const parts = raw.split(/(\"[^\"]*?\")/g)

  for (const part of parts) {
    if (!part) continue
    if (part.startsWith('"') && part.endsWith('"')) {
      segments.push({ type: 'dialogue', text: part })
    } else {
      const trimmed = part.trim()
      if (trimmed) {
        segments.push({ type: 'narration', text: trimmed })
      }
    }
  }

  return segments
}
