import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { formatStoryText } from '@/utils/storyFormat'

interface HalfStoryCardProps {
  title: string
  hook: string
  halfStory: string
  tags: string[]
}

export default function HalfStoryCard({ title, hook, halfStory, tags }: HalfStoryCardProps) {
  const segments = useMemo(() => formatStoryText(halfStory), [halfStory])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h3 className="text-lg font-brush text-amber-100 text-center mb-2 tracking-wider">{title}</h3>

      <p className="text-amber-200/50 text-xs text-center mb-4 font-serif italic">"{hook}"</p>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="px-2.5 py-0.5 bg-amber-950/30 border border-amber-800/20 rounded-full text-amber-400/50 text-xs font-serif">
            {tag}
          </span>
        ))}
      </div>

      <div className="relative card-warm rounded-2xl p-6 overflow-hidden">
        <div className="space-y-2">
          {segments.map((seg, i) => {
            if (seg.type === 'dialogue') {
              return (
                <p key={i} className="text-amber-200/80 text-sm leading-loose font-serif pl-4 border-l-2 border-amber-500/15">
                  {seg.text}
                </p>
              )
            }
            return (
              <p key={i} className="text-amber-100/65 text-sm leading-loose font-serif indent-[2em]">
                {seg.text}
              </p>
            )
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1410] to-transparent flex items-end justify-center pb-4">
          <div className="flex items-center gap-1.5 text-amber-400/40 text-xs font-serif">
            <Lock className="w-3.5 h-3.5" />
            测出你的命格，解锁完整故事
          </div>
        </div>
      </div>
    </motion.div>
  )
}
