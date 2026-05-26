import type { DestinyKey } from '@/data/destinies'

const PRIORITY: DestinyKey[] = ['COWARD', 'SLACKER', 'UNDERDOG', 'STRATEGIST', 'YANDERE', 'HOTBLOOD', 'VILLAIN', 'CHOSEN_ONE']

export function calculateDestiny(
  answers: { questionId: string; optionIndex: number }[],
  questions: { id: string; options: { scores: Partial<Record<DestinyKey, number>> }[] }[]
): { destinyKey: DestinyKey; subDestinyKey: DestinyKey; scores: Record<DestinyKey, number> } {
  const scores: Record<DestinyKey, number> = {
    STRATEGIST: 0, HOTBLOOD: 0, COWARD: 0, UNDERDOG: 0,
    SLACKER: 0, YANDERE: 0, CHOSEN_ONE: 0, VILLAIN: 0
  }

  for (const answer of answers) {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question) continue
    const option = question.options[answer.optionIndex]
    if (!option) continue
    for (const [key, value] of Object.entries(option.scores)) {
      scores[key as DestinyKey] = (scores[key as DestinyKey] || 0) + value
    }
  }

  const sorted = [...PRIORITY].sort((a, b) => scores[b] - scores[a])
  return {
    destinyKey: sorted[0],
    subDestinyKey: sorted[1],
    scores
  }
}
