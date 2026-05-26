import { motion } from 'framer-motion'
import type { Protagonist } from '@/data/destinies'

const CATEGORY_LABELS: Record<string, string> = {
  webnovel: '网文',
  classic: '经典',
  anime: '动漫',
  game: '游戏',
}

const CATEGORY_ICONS: Record<string, string> = {
  webnovel: '📖',
  classic: '📚',
  anime: '🎬',
  game: '🎮',
}

interface ProtagonistCardProps {
  protagonists: Protagonist[]
  secondaryColor: string
  primaryColor: string
  delay?: number
}

export default function ProtagonistCard({
  protagonists,
  secondaryColor,
  primaryColor,
  delay = 0,
}: ProtagonistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="w-full card-warm rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-serif" style={{ color: `${secondaryColor}cc` }}>
          与你最相似的主角
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${secondaryColor}44, transparent)` }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {protagonists.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 * (i + 1), duration: 0.4 }}
            className="relative pl-4 py-2"
            style={{
              borderLeft: `2px solid ${i === 0 ? secondaryColor : `${secondaryColor}33`}`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs px-1.5 py-0.5 rounded font-serif"
                style={{
                  backgroundColor: `${primaryColor}88`,
                  color: `${secondaryColor}bb`,
                  border: `1px solid ${secondaryColor}22`,
                }}
              >
                {CATEGORY_ICONS[p.category]} {CATEGORY_LABELS[p.category]}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span
                className="text-base font-brush tracking-wider"
                style={{
                  color: i === 0 ? secondaryColor : `${secondaryColor}cc`,
                  textShadow: i === 0 ? `0 0 20px ${secondaryColor}44` : 'none',
                }}
              >
                {p.name}
              </span>
              <span
                className="text-xs font-serif"
                style={{ color: `${secondaryColor}88` }}
              >
                · {p.source}
              </span>
            </div>
            <p
              className="text-xs font-serif italic leading-relaxed"
              style={{ color: `${secondaryColor}99` }}
            >
              "{p.quote}"
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
