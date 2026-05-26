import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DanmakuItem {
  id: number
  text: string
  top: number
  duration: number
}

interface DanmakuProps {
  messages: string[]
}

export default function Danmaku({ messages }: DanmakuProps) {
  const [items, setItems] = useState<DanmakuItem[]>([])
  let counter = 0

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem: DanmakuItem = {
        id: counter++,
        text: messages[Math.floor(Math.random() * messages.length)],
        top: Math.random() * 60 + 5,
        duration: Math.random() * 4 + 6,
      }
      setItems((prev) => [...prev.slice(-15), newItem])
    }, 800)

    return () => clearInterval(interval)
  }, [messages])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ x: '100vw', opacity: 0.7 }}
            animate={{ x: '-100%', opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: item.duration, ease: 'linear' }}
            className="absolute whitespace-nowrap text-amber-300/50 text-xs font-serif"
            style={{ top: `${item.top}%` }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
