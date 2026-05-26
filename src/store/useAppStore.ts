import { create } from 'zustand'

type DestinyKey = 'STRATEGIST' | 'HOTBLOOD' | 'COWARD' | 'UNDERDOG' | 'SLACKER' | 'YANDERE' | 'CHOSEN_ONE' | 'VILLAIN'

interface QuizAnswer {
  questionId: string
  optionIndex: number
}

interface TokenRecord {
  token: string
  destinyKey: DestinyKey
  nickname: string
  createdAt: string
}

interface AppState {
  answers: QuizAnswer[]
  currentQuestion: number
  nickname: string
  resultToken: string | null
  resultDestinyKey: DestinyKey | null
  resultSubDestinyKey: DestinyKey | null
  friendToken: string | null
  friendNickname: string
  tokenRecords: TokenRecord[]
  unlockedStories: { tokenA: string; tokenB: string; storyId: string }[]

  setAnswer: (questionId: string, optionIndex: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  setNickname: (name: string) => void
  setResult: (token: string, destinyKey: DestinyKey, subDestinyKey: DestinyKey) => void
  setFriendToken: (token: string) => void
  setFriendNickname: (name: string) => void
  addTokenRecord: (record: TokenRecord) => void
  unlockStory: (tokenA: string, tokenB: string, storyId: string) => void
  resetQuiz: () => void
}

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

const saveToStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export const useAppStore = create<AppState>((set, get) => ({
  answers: [],
  currentQuestion: 0,
  nickname: loadFromStorage<string>('bm_nickname', ''),
  resultToken: null,
  resultDestinyKey: null,
  resultSubDestinyKey: null,
  friendToken: null,
  friendNickname: '',
  tokenRecords: loadFromStorage<TokenRecord[]>('bm_tokens', []),
  unlockedStories: loadFromStorage<{ tokenA: string; tokenB: string; storyId: string }[]>('bm_unlocked', []),

  setAnswer: (questionId, optionIndex) =>
    set(state => {
      const existing = state.answers.findIndex(a => a.questionId === questionId)
      const newAnswers = [...state.answers]
      if (existing >= 0) {
        newAnswers[existing] = { questionId, optionIndex }
      } else {
        newAnswers.push({ questionId, optionIndex })
      }
      return { answers: newAnswers }
    }),

  nextQuestion: () => set(state => ({ currentQuestion: state.currentQuestion + 1 })),
  prevQuestion: () => set(state => ({ currentQuestion: Math.max(0, state.currentQuestion - 1) })),

  setNickname: (name) => {
    saveToStorage('bm_nickname', name)
    set({ nickname: name })
  },

  setResult: (token, destinyKey, subDestinyKey) => {
    const nickname = get().nickname || '无名侠客'
    const record: TokenRecord = { token, destinyKey, nickname, createdAt: new Date().toISOString() }
    const newRecords = [...get().tokenRecords, record]
    saveToStorage('bm_tokens', newRecords)
    set({ resultToken: token, resultDestinyKey: destinyKey, resultSubDestinyKey: subDestinyKey, tokenRecords: newRecords })
  },

  setFriendToken: (token) => set({ friendToken: token }),
  setFriendNickname: (name) => set({ friendNickname: name }),

  addTokenRecord: (record) => {
    const newRecords = [...get().tokenRecords, record]
    saveToStorage('bm_tokens', newRecords)
    set({ tokenRecords: newRecords })
  },

  unlockStory: (tokenA, tokenB, storyId) => {
    const newUnlocked = [...get().unlockedStories, { tokenA, tokenB, storyId }]
    saveToStorage('bm_unlocked', newUnlocked)
    set({ unlockedStories: newUnlocked })
  },

  resetQuiz: () => set({ answers: [], currentQuestion: 0, resultToken: null, resultDestinyKey: null, resultSubDestinyKey: null }),
}))
