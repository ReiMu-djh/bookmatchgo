import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import DestinyCard from '@/components/result/DestinyCard'
import ProtagonistCard from '@/components/result/ProtagonistCard'
import BookRecommend from '@/components/result/BookRecommend'
import TokenDisplay from '@/components/result/TokenDisplay'
import SharePanel from '@/components/result/SharePanel'
import { destinyMap } from '@/data/destinies'
import { stories } from '@/data/stories'
import { useAppStore } from '@/store/useAppStore'
import { parseToken, getDestinyKeyFromPrefix } from '@/utils/token'
import Button from '@/components/common/Button'

type DestinyKey = keyof typeof destinyMap

export default function Result() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { resultToken, resultDestinyKey, nickname } = useAppStore()
  const [friendToken, setFriendToken] = useState('')
  const [friendError, setFriendError] = useState('')

  const tokenFromUrl = searchParams.get('token')
  const token = tokenFromUrl || resultToken

  let destinyKey: DestinyKey | null = null
  let validToken = false
  let myNickname = nickname || '无名侠客'

  if (token) {
    const parsed = parseToken(token)
    if (parsed.valid) {
      const key = getDestinyKeyFromPrefix(parsed.destinyPrefix)
      if (key && key in destinyMap) {
        destinyKey = key
        validToken = true
        if (parsed.nickname) myNickname = parsed.nickname
      }
    }
  }

  if (!validToken && resultDestinyKey) {
    destinyKey = resultDestinyKey
    validToken = true
  }

  if (!validToken || !destinyKey || !token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 parchment-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertCircle className="w-12 h-12 text-amber-600/60 mx-auto mb-4" />
          <p className="text-amber-200/60 mb-6 font-serif">未找到命格结果</p>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </motion.div>
      </div>
    )
  }

  const destiny = destinyMap[destinyKey]

  const handleUnlockStory = () => {
    const trimmed = friendToken.trim()
    if (!trimmed) {
      setFriendError('请输入好友的Token码')
      return
    }

    const parsed = parseToken(trimmed)
    if (!parsed.valid) {
      setFriendError('Token格式不正确')
      return
    }

    const friendKey = getDestinyKeyFromPrefix(parsed.destinyPrefix) as DestinyKey | null
    if (!friendKey || !(friendKey in destinyMap)) {
      setFriendError('未识别的命格Token')
      return
    }

    if (trimmed === token) {
      setFriendError('不能输入自己的Token哦')
      return
    }

    const matchedStory = stories.find(
      (s) =>
        !s.isHidden &&
        ((s.destinyKeyA === destinyKey && s.destinyKeyB === friendKey) ||
          (s.destinyKeyA === friendKey && s.destinyKeyB === destinyKey))
    )

    if (matchedStory) {
      const friendNickname = parsed.nickname || '无名侠客'
      const isSwapped = matchedStory.destinyKeyA === friendKey
      const nameA = isSwapped ? friendNickname : myNickname
      const nameB = isSwapped ? myNickname : friendNickname
      navigate(`/story?storyId=${matchedStory.id}&nameA=${encodeURIComponent(nameA)}&nameB=${encodeURIComponent(nameB)}`)
    } else {
      setFriendError(`暂无${destinyMap[destinyKey].name}×${destinyMap[friendKey].name}的故事，敬请期待`)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-5 py-8"
      style={{
        background: `linear-gradient(180deg, ${destiny.primaryColor} 0%, #1a1410 70%)`,
      }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-5">
        <DestinyCard destinyKey={destinyKey} />

        <ProtagonistCard
          protagonists={destiny.protagonists}
          secondaryColor={destiny.secondaryColor}
          primaryColor={destiny.primaryColor}
          delay={2.0}
        />

        <BookRecommend
          books={destiny.books}
          secondaryColor={destiny.secondaryColor}
          primaryColor={destiny.primaryColor}
          delay={2.2}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="w-full"
        >
          <TokenDisplay token={token} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          className="w-full"
        >
          <SharePanel token={token} destinyName={destiny.name} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          className="w-full"
        >
          <div className="card-warm rounded-xl p-5">
            <p className="text-amber-200/60 text-xs font-serif mb-3 tracking-wider">
              输入好友的命格Token，解锁你们的宿命剧本
            </p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={friendToken}
                onChange={(e) => {
                  setFriendToken(e.target.value)
                  setFriendError('')
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlockStory()}
                placeholder="输入好友Token码"
                className="flex-1 bg-black/30 border border-amber-800/20 rounded-lg px-4 py-3 text-amber-100 text-sm font-mono placeholder:text-amber-600/40 focus:outline-none focus:border-amber-600/50 transition-colors tracking-wider"
              />
              <Button variant="primary" onClick={handleUnlockStory}>
                解锁剧本
              </Button>
            </div>
            {friendError && (
              <p className="text-red-400/70 text-xs font-serif">{friendError}</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
