import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  glow?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ variant = 'primary', glow = false, className, children, onClick, disabled, type }: ButtonProps) {
  const baseStyles = 'relative px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200 font-serif tracking-wider'

  const variants = {
    primary: 'bg-gradient-to-r from-amber-900/80 to-amber-800/60 text-amber-100 border border-amber-700/40 hover:from-amber-800/90 hover:to-amber-700/70 hover:border-amber-600/50 hover:shadow-lg hover:shadow-amber-900/20',
    secondary: 'bg-amber-950/40 text-amber-200/80 border border-amber-700/20 hover:bg-amber-900/40 hover:border-amber-600/30',
    ghost: 'bg-transparent text-amber-200/60 hover:text-amber-200 hover:bg-amber-950/20',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      whileHover={{ scale: 1.03, y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant],
        glow && 'glow-button',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
