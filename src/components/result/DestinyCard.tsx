import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { destinyMap } from '@/data/destinies'
import type { DestinyKey } from '@/data/destinies'

interface DestinyCardProps {
  destinyKey: DestinyKey
}

export default function DestinyCard({ destinyKey }: DestinyCardProps) {
  const destiny = destinyMap[destinyKey]
  const cpDestiny = destinyMap[destiny.cpDestinyKey]
  const [revealed, setRevealed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${destiny.primaryColor} 0%, ${destiny.primaryColor}ee 40%, ${destiny.secondaryColor}22 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${destiny.secondaryColor}88 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${destiny.secondaryColor}44 0%, transparent 40%)
          `,
        }}
      />

      <AnimatePresence>
        {!revealed && (
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${destiny.primaryColor} 0%, ${destiny.primaryColor}dd 100%)`,
            }}
            onClick={() => setRevealed(true)}
          >
            <motion.div
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(90deg, ${destiny.primaryColor} 0%, ${destiny.primaryColor}dd 49.5%, transparent 49.5%, transparent 50.5%, ${destiny.primaryColor}dd 50.5%, ${destiny.primaryColor} 100%)`,
                transformOrigin: 'center',
              }}
            />

            <motion.div
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="absolute inset-0 z-20"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${destiny.secondaryColor}15 50%, transparent 100%)`,
                transformOrigin: 'center',
              }}
            />

            <motion.div
              className="relative z-40 flex flex-col items-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 20px ${destiny.secondaryColor}20`,
                    `0 0 60px ${destiny.secondaryColor}50`,
                    `0 0 20px ${destiny.secondaryColor}20`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-28 h-28 flex items-center justify-center rounded-full border-2 mb-5"
                style={{
                  borderColor: `${destiny.secondaryColor}55`,
                  backgroundColor: `${destiny.primaryColor}cc`,
                }}
              >
                <motion.span
                  className="text-6xl font-serif font-bold"
                  style={{
                    color: destiny.secondaryColor,
                    textShadow: `0 0 40px ${destiny.secondaryColor}88`,
                  }}
                  animate={{
                    textShadow: [
                      `0 0 20px ${destiny.secondaryColor}44`,
                      `0 0 50px ${destiny.secondaryColor}88`,
                      `0 0 20px ${destiny.secondaryColor}44`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {destiny.icon}
                </motion.span>
              </motion.div>

              <motion.p
                className="text-xl font-brush tracking-widest"
                style={{ color: `${destiny.secondaryColor}cc` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                点击揭晓命格
              </motion.p>
            </motion.div>

            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full z-40"
                style={{
                  background: destiny.secondaryColor,
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: revealed ? 1 : 0, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex items-center justify-between mb-4"
        >
          <span className="text-white/40 text-xs font-serif tracking-widest">主角命格鉴定</span>
          <span className="text-white/25 text-xs font-mono">BOOKMATCH</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: revealed ? 1 : 0, rotate: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 12 }}
          className="flex justify-center mb-3"
        >
          <motion.div
            className="w-20 h-20 flex items-center justify-center rounded-full border-2 font-serif text-4xl font-bold"
            style={{
              color: destiny.secondaryColor,
              borderColor: `${destiny.secondaryColor}55`,
              backgroundColor: `${destiny.primaryColor}cc`,
              textShadow: `0 0 30px ${destiny.secondaryColor}66`,
            }}
            animate={{
              boxShadow: [
                `0 0 20px ${destiny.secondaryColor}15`,
                `0 0 40px ${destiny.secondaryColor}30`,
                `0 0 20px ${destiny.secondaryColor}15`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {destiny.icon}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="text-center mb-1"
        >
          <span
            className="text-sm font-serif tracking-[0.3em]"
            style={{ color: `${destiny.secondaryColor}88` }}
          >
            「{destiny.title}」
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: revealed ? 1 : 0, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-center text-4xl font-brush mb-2 tracking-[0.2em]"
          style={{ color: destiny.secondaryColor }}
        >
          {destiny.name}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: revealed ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="h-px mx-auto mb-4"
          style={{
            width: '60%',
            background: `linear-gradient(90deg, transparent, ${destiny.secondaryColor}66, transparent)`,
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="text-center text-white/90 text-sm leading-relaxed mb-4 font-serif px-2"
        >
          {destiny.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="text-center mb-5"
        >
          <p
            className="text-lg font-brush tracking-widest"
            style={{ color: destiny.secondaryColor }}
          >
            「{destiny.verdict}」
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
          className="mb-5 px-4"
        >
          <p
            className="text-center text-sm font-serif italic leading-relaxed"
            style={{ color: `${destiny.secondaryColor}bb` }}
          >
            {destiny.quote}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ delay: 1.9, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-1.5 mb-4"
        >
          {destiny.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs border font-serif"
              style={{
                borderColor: `${destiny.secondaryColor}33`,
                color: `${destiny.secondaryColor}cc`,
                backgroundColor: `${destiny.secondaryColor}10`,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ delay: 2.1, duration: 0.4 }}
          className="ink-divider mb-3"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ delay: 2.2, duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs font-serif">命定宿敌</span>
            <span
              className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-serif font-bold border"
              style={{
                color: cpDestiny.secondaryColor,
                borderColor: `${cpDestiny.secondaryColor}44`,
                backgroundColor: `${cpDestiny.primaryColor}88`,
              }}
            >
              {cpDestiny.icon}
            </span>
            <span
              className="text-sm font-serif font-bold"
              style={{ color: cpDestiny.secondaryColor }}
            >
              {cpDestiny.name}
            </span>
          </div>
          <span className="text-white/25 text-xs font-serif">⚔️</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
