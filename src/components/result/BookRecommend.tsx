import { motion } from 'framer-motion'
import type { BookRecommendation } from '@/data/destinies'

const ANGLE_ICONS: Record<string, string> = {
  '最像你': '📖',
  '你最需要': '💡',
  '你会意外喜欢': '✨',
}

interface BookRecommendProps {
  books: BookRecommendation[]
  secondaryColor: string
  primaryColor: string
  delay?: number
}

export default function BookRecommend({
  books,
  secondaryColor,
  primaryColor,
  delay = 0,
}: BookRecommendProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="w-full card-glass rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-serif" style={{ color: `${secondaryColor}cc` }}>
          为你推荐
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${secondaryColor}44, transparent)` }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {books.map((book, i) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 * (i + 1), duration: 0.4 }}
            className="rounded-lg p-3"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}66 0%, ${primaryColor}33 100%)`,
              border: `1px solid ${i === 0 ? `${secondaryColor}33` : `${secondaryColor}15`}`,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-sm">{ANGLE_ICONS[book.angle] || '📖'}</span>
              <span
                className="text-xs font-serif tracking-wider"
                style={{ color: `${secondaryColor}bb` }}
              >
                {book.angle}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className="text-base font-brush tracking-wider"
                style={{
                  color: i === 0 ? secondaryColor : `${secondaryColor}cc`,
                  textShadow: i === 0 ? `0 0 20px ${secondaryColor}44` : 'none',
                }}
              >
                《{book.title}》
              </span>
              <span
                className="text-xs font-serif"
                style={{ color: `${secondaryColor}88` }}
              >
                {book.author}
              </span>
            </div>
            <p
              className="text-xs font-serif leading-relaxed"
              style={{ color: `${secondaryColor}99` }}
            >
              {book.reason}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
