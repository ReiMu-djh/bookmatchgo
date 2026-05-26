import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User } from 'lucide-react'
import { stories } from '@/data/stories'
import { destinyMap } from '@/data/destinies'
import StoryCard from '@/components/story/StoryCard'
import { useAppStore } from '@/store/useAppStore'
import Button from '@/components/common/Button'

type DestinyKey = keyof typeof destinyMap

const DESTINY_QUOTES: Record<string, string> = {
  STRATEGIST: '权谋型：这步棋，我三年前就布好了',
  HOTBLOOD: '热血型：先打再说！冷静是什么？',
  COWARD: '苟道型：已蹲好角落，你们先打',
  UNDERDOG: '逆袭型：踩我？你记住了',
  SLACKER: '摆烂型：认真是不可能认真的',
  YANDERE: '病娇型：你只能看我一个人',
  CHOSEN_ONE: '天命型：掉崖就突破，怪我咯？',
  VILLAIN: '反派型：规则？那是什么？',
}

function replaceNames(
  text: string,
  defaultNameA: string,
  defaultNameB: string,
  nameA: string,
  nameB: string
): string {
  let result = text
  if (nameA && nameA !== defaultNameA) {
    result = result.split(defaultNameA).join(nameA)
  }
  if (nameB && nameB !== defaultNameB) {
    result = result.split(defaultNameB).join(nameB)
  }
  return result
}

export default function Story() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const storyId = searchParams.get('storyId')
  const nameA = searchParams.get('nameA') || ''
  const nameB = searchParams.get('nameB') || ''
  const { resultToken, resultDestinyKey } = useAppStore()

  const showHidden = useMemo(() => Math.random() < 0.15, [])

  const story = useMemo(() => {
    if (!storyId) return null
    const found = stories.find((s) => s.id === storyId)
    if (!found) return null
    if (found.isHidden && !showHidden) return null
    return found
  }, [storyId, showHidden])

  const renderedStory = useMemo(() => {
    if (!story) return null
    const dA = story.defaultNameA || ''
    const dB = story.defaultNameB || ''
    const a = nameA || dA
    const b = nameB || dB
    return {
      title: replaceNames(story.title, dA, dB, a, b),
      hook: replaceNames(story.hook, dA, dB, a, b),
      halfStory: replaceNames(story.halfStory, dA, dB, a, b),
      fullStory: replaceNames(story.fullStory, dA, dB, a, b),
      danmaku: replaceNames(story.danmaku, dA, dB, a, b),
      epilogue: replaceNames(story.epilogue, dA, dB, a, b),
    }
  }, [story, nameA, nameB])

  if (!story || !renderedStory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 parchment-bg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-amber-200/60 mb-6 font-serif">故事未找到</p>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </motion.div>
      </div>
    )
  }

  const destinyQuote = `${DESTINY_QUOTES[story.destinyKeyA] || ''}  ·  ${DESTINY_QUOTES[story.destinyKeyB] || ''}`

  const destinyName = resultDestinyKey ? destinyMap[resultDestinyKey].name : ''
  const token = resultToken || ''

  const handleShare = () => {
    const shareText = `【${renderedStory.title}】${renderedStory.hook}`
    const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}story?storyId=${story.id}`
    if (navigator.share) {
      navigator.share({ title: renderedStory.title, text: shareText, url: shareUrl }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).catch(() => {})
      alert('链接已复制！')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 parchment-bg">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-amber-200/40 text-sm hover:text-amber-200/70 transition-colors font-serif"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
        </motion.div>

        <StoryCard
          title={renderedStory.title}
          content={renderedStory.fullStory}
          tags={story.tags}
          destinyQuote={destinyQuote}
          epilogue={renderedStory.epilogue}
          isHidden={story.isHidden}
          token={token}
          destinyName={destinyName}
          onShare={handleShare}
        />

        {resultToken && resultDestinyKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <button
              onClick={() => navigate(`/result?token=${resultToken}`)}
              className="w-full flex items-center justify-center gap-2 py-3 text-amber-400/40 text-sm font-serif hover:text-amber-300/60 transition-colors"
            >
              <User className="w-4 h-4" />
              回到我的命格 →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
