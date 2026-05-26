import { motion } from 'framer-motion'
import { Share2, MessageCircle } from 'lucide-react'
import Button from '@/components/common/Button'

interface SharePanelProps {
  token: string
  destinyName: string
}

export default function SharePanel({ token, destinyName }: SharePanelProps) {
  const shareText = `我觉醒了【${destinyName}】命格！快来测测你的主角命格 👉`
  const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}token?code=${token}`

  const handleWechatShare = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).catch(() => {})
    alert('链接已复制，快去分享给好友吧！')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '主角命格测试',
          text: shareText,
          url: shareUrl,
        })
      } catch {}
    } else {
      handleWechatShare()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3 }}
      className="w-full space-y-3"
    >
      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1 flex items-center justify-center gap-2 font-serif"
          onClick={handleWechatShare}
        >
          <MessageCircle className="w-4 h-4" />
          复制链接
        </Button>
        <Button
          variant="primary"
          glow
          className="flex-1 flex items-center justify-center gap-2 font-serif"
          onClick={handleNativeShare}
        >
          <Share2 className="w-4 h-4" />
          分享给好友
        </Button>
      </div>
    </motion.div>
  )
}
