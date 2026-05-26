import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface TokenDisplayProps {
  token: string
}

export default function TokenDisplay({ token }: TokenDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = token
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      className="w-full"
    >
      <p className="text-amber-200/60 text-xs mb-2 text-center font-serif tracking-wider">你的命格Token</p>
      <div className="flex items-center gap-2 card-ghost rounded-xl px-4 py-3">
        <code className="flex-1 text-center text-amber-300 font-mono text-sm tracking-wider">
          {token}
        </code>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.85 }}
          className="p-1.5 rounded-lg hover:bg-amber-900/20 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400/80" />
          ) : (
            <Copy className="w-4 h-4 text-amber-500/60" />
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
