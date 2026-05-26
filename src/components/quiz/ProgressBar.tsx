interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className="w-full px-4">
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(160,120,60,0.12)' }}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #8b6914, #c9a96e)',
          }}
        />
      </div>
    </div>
  )
}
