import { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { destinyMap } from '@/data/destinies'
import { stories } from '@/data/stories'
import { parseToken, getDestinyKeyFromPrefix } from '@/utils/token'
import { useAppStore } from '@/store/useAppStore'
import HalfStoryCard from '@/components/story/HalfStoryCard'
import Button from '@/components/common/Button'

type DestinyKey = keyof typeof destinyMap

const DESTINY_ICONS: Record<string, string> = {
  STRATEGIST: '筹', HOTBLOOD: '烈', COWARD: '隐', UNDERDOG: '逆',
  SLACKER: '逸', YANDERE: '执', CHOSEN_ONE: '命', VILLAIN: '枭',
}

export default function TokenInput() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setFriendToken } = useAppStore()

  const friendToken = searchParams.get('code') || ''

  const parsed = useMemo(() => {
    if (!friendToken) return null
    return parseToken(friendToken)
  }, [friendToken])

  const friendDestinyKey = useMemo(() => {
    if (!parsed || !parsed.valid) return null
    return getDestinyKeyFromPrefix(parsed.destinyPrefix) as DestinyKey | null
  }, [parsed])

  const friendDestiny = friendDestinyKey ? destinyMap[friendDestinyKey] : null

  const matchedStory = useMemo(() => {
    if (!friendDestinyKey) return null
    return stories.find(
      (s) =>
        !s.isHidden &&
        (s.destinyKeyA === friendDestinyKey || s.destinyKeyB === friendDestinyKey)
    )
  }, [friendDestinyKey])

  useEffect(() => {
    if (friendToken) {
      setFriendToken(friendToken)
    }
  }, [friendToken, setFriendToken])

  if (!parsed || !parsed.valid || !friendDestiny || !friendDestinyKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 parchment-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertCircle className="w-12 h-12 text-amber-600/60 mx-auto mb-4" />
          <p className="text-amber-200/60 mb-2 font-serif">命格Token无效</p>
          <p className="text-amber-200/30 text-sm mb-6 font-serif">请检查Token码是否正确</p>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 parchment-bg">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-amber-200/40 text-xs mb-3 font-serif tracking-wider">你的好友觉醒了</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 font-serif text-xl font-bold"
              style={{
                color: friendDestiny.secondaryColor,
                borderColor: `${friendDestiny.secondaryColor}44`,
                backgroundColor: `${friendDestiny.primaryColor}88`,
              }}
            >
              {DESTINY_ICONS[friendDestinyKey]}
            </span>
            <h2
              className="text-2xl font-brush tracking-widest"
              style={{ color: friendDestiny.secondaryColor }}
            >
              {friendDestiny.name}
            </h2>
          </div>
          <p className="text-amber-200/50 text-sm font-serif">{friendDestiny.description}</p>
        </motion.div>

        {matchedStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <p className="text-amber-600/40 text-xs text-center mb-4 font-serif tracking-wider">
              你们的故事预告
            </p>
            <HalfStoryCard
              title={matchedStory.title}
              hook={matchedStory.hook}
              halfStory={matchedStory.halfStory}
              tags={matchedStory.tags}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full"
        >
          <Button
            glow
            className="w-full py-4 font-serif tracking-wider"
            onClick={() => navigate('/quiz')}
          >
            测测你的命格，解锁完整故事
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
