import { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from '@/components/quiz/ProgressBar'
import QuestionCard from '@/components/quiz/QuestionCard'
import Button from '@/components/common/Button'
import { questions } from '@/data/questions'
import { useAppStore } from '@/store/useAppStore'
import { calculateDestiny } from '@/utils/scoring'
import { generateToken } from '@/utils/token'

export default function Quiz() {
  const navigate = useNavigate()
  const [showNickname, setShowNickname] = useState(false)
  const [nicknameInput, setNicknameInput] = useState('')
  const [initialized, setInitialized] = useState(false)
  const {
    answers,
    currentQuestion,
    nickname,
    setAnswer,
    nextQuestion,
    setNickname,
    setResult,
    resetQuiz,
  } = useAppStore()

  const totalQuestions = questions.length
  const question = questions[currentQuestion]

  useEffect(() => {
    if (answers.length >= totalQuestions && currentQuestion >= totalQuestions - 1) {
      setShowNickname(true)
    }
    setInitialized(true)
  }, [])

  const handleOptionClick = useCallback(
    (optionIndex: number) => {
      setAnswer(question.id, optionIndex)

      if (currentQuestion < totalQuestions - 1) {
        setTimeout(() => {
          nextQuestion()
        }, 500)
      } else {
        setTimeout(() => {
          setShowNickname(true)
        }, 500)
      }
    },
    [question, currentQuestion, totalQuestions, setAnswer, nextQuestion]
  )

  const handleNicknameSubmit = () => {
    const name = nicknameInput.trim() || nickname || '无名侠客'
    setNickname(name)

    const allAnswers = [...answers]
    const result = calculateDestiny(allAnswers, questions)
    const token = generateToken(result.destinyKey, name)
    setResult(token, result.destinyKey, result.subDestinyKey)

    navigate(`/result?token=${token}`)
  }

  const handleRestart = () => {
    resetQuiz()
    setShowNickname(false)
    setNicknameInput('')
  }

  if (!initialized) return null

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-12 parchment-light">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center gap-6"
      >
        <AnimatePresence mode="wait">
          {showNickname ? (
            <motion.div
              key="nickname"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full px-4 flex flex-col items-center gap-6 pt-12"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full" style={{ background: 'rgba(160,120,60,0.12)', border: '1px solid rgba(160,120,60,0.2)' }}>
                <span className="text-2xl font-serif" style={{ color: '#8b6914' }}>名</span>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-brush mb-2 tracking-wider" style={{ color: '#5a3e1b' }}>道友请留名</h2>
                <p className="text-sm font-serif" style={{ color: '#8b7355' }}>你的名字将写入宿命剧本</p>
              </div>

              <div
                className="w-full rounded-xl p-5"
                style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(160,120,60,0.12)' }}
              >
                <input
                  type="text"
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNicknameSubmit()}
                  placeholder={nickname || "输入你的道号..."}
                  maxLength={8}
                  autoFocus
                  className="w-full bg-white/60 border border-amber-700/15 rounded-lg px-4 py-3 text-center text-lg font-serif placeholder:text-amber-700/30 focus:outline-none focus:border-amber-600/40 transition-colors tracking-wider"
                  style={{ color: '#3d2e1e' }}
                />
                <p className="text-xs text-center mt-2 font-serif" style={{ color: '#a08050' }}>最多8个字，不填则用"无名侠客"</p>
              </div>

              <Button
                glow
                className="w-full py-4 text-lg font-serif tracking-widest"
                onClick={handleNicknameSubmit}
              >
                揭晓命格
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -60 }}
              className="w-full flex flex-col items-center gap-6"
            >
              {answers.length > 0 && (
                <motion.button
                  onClick={handleRestart}
                  className="text-xs font-serif tracking-wider self-end w-full mb-[-8px]"
                  style={{ color: '#a08050' }}
                  whileHover={{ color: '#8b6914' }}
                >
                  ← 重新开始
                </motion.button>
              )}

              <ProgressBar current={currentQuestion + 1} total={totalQuestions} />

              <QuestionCard
                scene={question.scene}
                options={question.options}
                onOptionClick={handleOptionClick}
                questionIndex={currentQuestion}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs font-serif tracking-wider"
                style={{ color: '#a08050' }}
              >
                第 {currentQuestion + 1} / {totalQuestions} 题
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
