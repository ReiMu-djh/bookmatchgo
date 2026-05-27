import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Swords, BookOpen, Sparkles, ChevronRight } from 'lucide-react'
import Button from '@/components/common/Button'
import { destinies } from '@/data/destinies'
import { generateToken } from '@/utils/token'

const DESTINY_ICONS: Record<string, string> = {
  STRATEGIST: '筹', HOTBLOOD: '烈', COWARD: '隐', UNDERDOG: '逆',
  SLACKER: '逸', YANDERE: '执', CHOSEN_ONE: '命', VILLAIN: '枭',
}

const QUICK_TESTS = [
  { label: '苟道 × 热血', keyA: 'COWARD' as const, nameA: '老白' },
  { label: '权谋 × 病娇', keyA: 'STRATEGIST' as const, nameA: '沈墨' },
  { label: '摆烂 × 天命', keyA: 'SLACKER' as const, nameA: '李无为' },
  { label: '逆袭 × 反派', keyA: 'UNDERDOG' as const, nameA: '林尘' },
]

export default function Home() {
  const navigate = useNavigate()
  const [showQuickTest, setShowQuickTest] = useState(false)

  const handleQuickTest = (keyA: string, nameA: string) => {
    const tokenA = generateToken(keyA as any, nameA)
    navigate(`/result?token=${encodeURIComponent(tokenA)}`)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden parchment-light">
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
            style={{
              background: 'linear-gradient(135deg, rgba(160,120,60,0.15), rgba(160,120,60,0.05))',
              border: '1px solid rgba(160,120,60,0.2)',
              boxShadow: '0 0 40px rgba(160,120,60,0.08)',
            }}
          >
            <BookOpen className="w-7 h-7" style={{ color: '#8b6914' }} />
          </motion.div>

          <h1 className="text-5xl font-brush mb-3 tracking-widest" style={{ color: '#5a3e1b' }}>
            测测你是哪种主角
          </h1>

          <p className="text-base font-serif tracking-wider" style={{ color: '#8b7355' }}>
            每个网文里都有你的影子
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full mb-10"
        >
          <Button
            glow
            className="w-full text-lg py-4 font-serif tracking-widest"
            onClick={() => navigate('/quiz')}
          >
            <span className="flex items-center justify-center gap-2">
              <Swords className="w-5 h-5" />
              觉醒命格
            </span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-full mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="ink-divider w-10" />
            <span className="text-sm font-serif tracking-widest" style={{ color: '#8b7355' }}>八大命格</span>
            <div className="ink-divider w-10" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {destinies.map((d, i) => (
              <motion.div
                key={d.key}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.06, duration: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 py-4 px-2 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.3)',
                  border: '1px solid rgba(160,120,60,0.1)',
                }}
                onClick={() => navigate('/quiz')}
              >
                <motion.span
                  className="w-10 h-10 flex items-center justify-center rounded-full text-base font-serif font-bold border"
                  style={{
                    color: d.secondaryColor,
                    borderColor: `${d.secondaryColor}66`,
                    backgroundColor: `${d.primaryColor}cc`,
                    boxShadow: `0 0 12px ${d.secondaryColor}30`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 8px ${d.secondaryColor}20`,
                      `0 0 20px ${d.secondaryColor}40`,
                      `0 0 8px ${d.secondaryColor}20`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  {DESTINY_ICONS[d.key]}
                </motion.span>
                <span
                  className="text-xs font-serif font-bold tracking-wider"
                  style={{ color: d.primaryColor }}
                >
                  {d.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="w-full"
        >
          <button
            onClick={() => setShowQuickTest(!showQuickTest)}
            className="w-full flex items-center justify-center gap-1.5 text-sm font-serif tracking-wider mb-3 py-2 transition-colors"
            style={{ color: '#b09060' }}
          >
            <Sparkles className="w-4 h-4" />
            测试入口
            <motion.span
              animate={{ rotate: showQuickTest ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.span>
          </button>

          <AnimatePresence>
            {showQuickTest && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(160,120,60,0.12)',
                  }}
                >
                  {QUICK_TESTS.map((t, i) => (
                    <motion.button
                      key={t.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleQuickTest(t.keyA, t.nameA)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/40 transition-colors group"
                    >
                      <span className="text-sm font-serif" style={{ color: '#5a3e1b' }}>{t.label}</span>
                      <span className="text-xs font-serif group-hover:text-amber-700/70 transition-colors flex items-center gap-1" style={{ color: '#a08050' }}>
                        体验
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </motion.button>
                  ))}
                  <p className="text-xs font-serif text-center pt-1" style={{ color: '#b09060' }}>
                    ⚙ 开发测试用，后续删除
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-xs font-serif mt-8 tracking-wider"
          style={{ color: '#b09060' }}
        >
          已有 12,345 人觉醒命格
        </motion.p>
      </div>
    </div>
  )
}
