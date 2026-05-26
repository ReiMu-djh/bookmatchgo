import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface QuestionOption {
  text: string
  scores: Record<string, number>
}

interface QuestionCardProps {
  scene: string
  options: QuestionOption[]
  onOptionClick: (index: number) => void
  questionIndex: number
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function QuestionCard({ scene, options, onOptionClick, questionIndex }: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    setSelectedIndex(null)
  }, [questionIndex])

  const handleClick = (index: number) => {
    if (selectedIndex !== null) return
    setSelectedIndex(index)
    setTimeout(() => onOptionClick(index), 400)
  }

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4 }}
      className="w-full px-4"
    >
      <div
        className="rounded-xl p-6 mb-6"
        style={{
          background: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(160,120,60,0.12)',
          boxShadow: '0 2px 12px rgba(100,70,30,0.08)',
        }}
      >
        <p className="text-base leading-relaxed font-serif" style={{ color: '#3d2e1e' }}>{scene}</p>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index
          const isDisabled = selectedIndex !== null

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
              onClick={() => handleClick(index)}
              disabled={isDisabled}
              className="w-full flex items-center px-5 py-4 rounded-xl text-sm leading-relaxed font-serif transition-all duration-300"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(160,120,60,0.2), rgba(160,120,60,0.1))'
                  : 'rgba(255,255,255,0.45)',
                border: isSelected
                  ? '1.5px solid rgba(160,120,60,0.5)'
                  : '1px solid rgba(160,120,60,0.1)',
                color: isDisabled && !isSelected ? 'rgba(100,70,30,0.25)' : '#3d2e1e',
                boxShadow: isSelected ? '0 0 20px rgba(160,120,60,0.12)' : '0 1px 4px rgba(100,70,30,0.05)',
              }}
              whileHover={!isDisabled ? { scale: 1.02, x: 4 } : {}}
              whileTap={!isDisabled ? { scale: 0.97 } : {}}
            >
              <span
                className="w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-300"
                style={{
                  backgroundColor: isSelected ? 'rgba(160,120,60,0.25)' : 'rgba(160,120,60,0.08)',
                  border: isSelected ? '1.5px solid rgba(160,120,60,0.5)' : '1px solid rgba(160,120,60,0.15)',
                  color: isSelected ? '#5a3e1b' : 'rgba(100,70,30,0.5)',
                }}
              >
                {OPTION_LABELS[index]}
              </span>
              <span className="flex-1">{option.text}</span>
              {isSelected && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="float-right"
                  style={{ color: '#8b6914' }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
