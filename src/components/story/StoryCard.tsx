import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { formatStoryText } from '@/utils/storyFormat'

interface StoryCardProps {
  title: string
  content: string
  tags: string[]
  destinyQuote: string
  epilogue: string
  isHidden?: boolean
  token: string
  destinyName: string
  onShare?: () => void
}

function StoryContent({ raw }: { raw: string }) {
  const segments = useMemo(() => formatStoryText(raw), [raw])

  return (
    <div className="space-y-2">
      {segments.map((seg, i) => {
        if (seg.type === 'dialogue') {
          return (
            <p key={i} className="text-amber-200/90 text-sm leading-loose font-serif pl-4 border-l-2 border-amber-500/20">
              {seg.text}
            </p>
          )
        }

        const paragraphs = seg.text.split(/(?<=[。！？])/).filter(s => s.trim())
        return (
          <p key={i} className="text-amber-100/75 text-sm leading-loose font-serif indent-[2em]">
            {paragraphs.join('')}
          </p>
        )
      })}
    </div>
  )
}

export default function StoryCard({
  title,
  content,
  tags,
  destinyQuote,
  epilogue,
  isHidden,
  token,
  destinyName,
  onShare,
}: StoryCardProps) {
  const [copied, setCopied] = useState(false)

  const extractQuote = () => {
    const match = content.match(/"(.+?)"/)
    if (match) return match[1]
    const sentences = content.split(/[。！？]/).filter((s) => s.length > 5 && s.length < 30)
    if (sentences.length > 0) return sentences[Math.floor(Math.random() * sentences.length)]
    return content.slice(0, 30) + '...'
  }

  const handleCopyQuote = () => {
    const quote = extractQuote()
    const text = `"${quote}" —— 我的命格是${destinyName}，来测测你的：${window.location.origin}${import.meta.env.BASE_URL}token?code=${token}`
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const epilogueSegments = useMemo(() => formatStoryText(epilogue), [epilogue])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {isHidden && (
        <div className="text-center mb-4">
          <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-700/20 border border-amber-500/30 rounded-full text-amber-300 text-xs font-serif font-bold tracking-wider">
            ✨ 隐藏款故事 ✨
          </span>
        </div>
      )}

      <h2 className="text-xl font-brush text-amber-100 text-center mb-2 tracking-wider">{title}</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tags.map((tag) => (
          <span key={tag} className="px-2.5 py-0.5 bg-amber-950/30 border border-amber-800/20 rounded-full text-amber-400/50 text-xs font-serif">
            {tag}
          </span>
        ))}
      </div>

      <div className="card-warm rounded-2xl p-6 mb-4">
        <StoryContent raw={content} />
      </div>

      <div className="card-ghost rounded-xl px-4 py-3 mb-4">
        <p className="text-amber-600/50 text-xs mb-2 font-serif">尾声</p>
        <div className="space-y-1">
          {epilogueSegments.map((seg, i) => {
            if (seg.type === 'dialogue') {
              return (
                <p key={i} className="text-amber-200/70 text-sm leading-loose font-serif pl-3 border-l-2 border-amber-500/15">
                  {seg.text}
                </p>
              )
            }
            return (
              <p key={i} className="text-amber-200/70 text-sm leading-loose font-serif indent-[2em]">
                {seg.text}
              </p>
            )
          })}
        </div>
      </div>

      <div className="card-glass rounded-xl px-4 py-3 mb-5">
        <p className="text-amber-300/50 text-xs text-center font-serif italic mb-2">
          {destinyQuote}
        </p>
        <button
          onClick={handleCopyQuote}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-serif py-1.5 rounded-lg hover:bg-amber-900/20 transition-colors"
          style={{ color: copied ? '#4ade80' : '#c9a96e88' }}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              已复制金句+Token，快去分享！
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              一键复制金句，分享给好友
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {onShare && (
          <button
            onClick={onShare}
            className="w-full py-3.5 bg-gradient-to-r from-amber-900/70 to-amber-800/50 border border-amber-600/30 rounded-xl text-amber-100 text-sm font-serif font-bold tracking-wider glow-button"
          >
            分享这个故事
          </button>
        )}
        <button
          className="w-full py-2 text-amber-600/30 text-xs font-serif hover:text-amber-500/50 transition-colors"
        >
          解锁番外 →
        </button>
      </div>
    </motion.div>
  )
}
