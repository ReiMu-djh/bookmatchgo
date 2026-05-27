import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { stories } from '@/data/stories'
import { destinyMap } from '@/data/destinies'
import { formatStoryText } from '@/utils/storyFormat'

type DestinyKey = keyof typeof destinyMap

const DESTINY_KEYS: DestinyKey[] = ['STRATEGIST', 'HOTBLOOD', 'COWARD', 'UNDERDOG', 'SLACKER', 'YANDERE', 'CHOSEN_ONE', 'VILLAIN']

function getComboKey(a: DestinyKey, b: DestinyKey): string {
  return [a, b].sort().join('_')
}

export default function StoryReview() {
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterKey, setFilterKey] = useState<DestinyKey | 'ALL'>('ALL')
  const [showHidden, setShowHidden] = useState(true)

  const filteredStories = useMemo(() => {
    let result = stories
    if (!showHidden) result = result.filter(s => !s.isHidden)
    if (filterKey !== 'ALL') {
      result = result.filter(s => s.destinyKeyA === filterKey || s.destinyKeyB === filterKey)
    }
    return result
  }, [filterKey, showHidden])

  const comboCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    stories.forEach(s => {
      const key = getComboKey(s.destinyKeyA, s.destinyKeyB)
      counts[key] = (counts[key] || 0) + 1
    })
    return counts
  }, [])

  const allCombos = useMemo(() => {
    const combos: { key: string; nameA: string; nameB: string; count: number }[] = []
    for (let i = 0; i < DESTINY_KEYS.length; i++) {
      for (let j = i + 1; j < DESTINY_KEYS.length; j++) {
        const a = DESTINY_KEYS[i]
        const b = DESTINY_KEYS[j]
        const key = getComboKey(a, b)
        combos.push({
          key,
          nameA: destinyMap[a].name,
          nameB: destinyMap[b].name,
          count: comboCounts[key] || 0,
        })
      }
    }
    return combos
  }, [comboCounts])

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 parchment-bg">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-amber-200/40 text-sm hover:text-amber-200/70 transition-colors font-serif"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <h1 className="text-lg font-brush text-amber-100 tracking-wider">故事总览</h1>
          <button
            onClick={() => setShowHidden(!showHidden)}
            className="flex items-center gap-1 text-amber-200/40 text-xs hover:text-amber-200/70 transition-colors font-serif"
          >
            {showHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {showHidden ? '含隐藏' : '仅普通'}
          </button>
        </div>

        <div className="mb-6">
          <p className="text-amber-200/40 text-xs font-serif mb-3">人格组合覆盖情况（目标：每组2-3个）</p>
          <div className="grid grid-cols-4 gap-2">
            {allCombos.map(combo => (
              <div
                key={combo.key}
                className={`rounded-lg px-2 py-1.5 text-center cursor-pointer transition-all ${
                  combo.count === 0
                    ? 'bg-red-900/20 border border-red-800/20'
                    : combo.count < 2
                    ? 'bg-amber-900/20 border border-amber-800/20'
                    : 'bg-green-900/20 border border-green-800/20'
                }`}
              >
                <p className="text-amber-200/60 text-[10px] font-serif">{combo.nameA}×{combo.nameB}</p>
                <p className={`text-xs font-bold font-serif ${
                  combo.count === 0 ? 'text-red-400/60' : combo.count < 2 ? 'text-amber-400/60' : 'text-green-400/60'
                }`}>
                  {combo.count}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-amber-200/40 text-xs font-serif mb-2">按人格筛选</p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterKey('ALL')}
              className={`px-2.5 py-1 rounded-full text-xs font-serif transition-colors ${
                filterKey === 'ALL' ? 'bg-amber-700/40 text-amber-100' : 'bg-amber-900/20 text-amber-200/40'
              }`}
            >
              全部
            </button>
            {DESTINY_KEYS.map(key => (
              <button
                key={key}
                onClick={() => setFilterKey(key)}
                className={`px-2.5 py-1 rounded-full text-xs font-serif transition-colors ${
                  filterKey === key ? 'bg-amber-700/40 text-amber-100' : 'bg-amber-900/20 text-amber-200/40'
                }`}
              >
                {destinyMap[key].name}
              </button>
            ))}
          </div>
        </div>

        <p className="text-amber-200/30 text-xs font-serif mb-3">
          共 {filteredStories.length} 个故事
          {filterKey !== 'ALL' && ` · ${destinyMap[filterKey].name}相关`}
        </p>

        <div className="space-y-3">
          {filteredStories.map(story => {
            const isExpanded = expandedId === story.id
            const dA = destinyMap[story.destinyKeyA]
            const dB = destinyMap[story.destinyKeyB]

            return (
              <motion.div
                key={story.id}
                layout
                className="card-warm rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : story.id)}
                  className="w-full text-left px-4 py-3 flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-amber-400/40" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-amber-400/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-serif font-bold"
                        style={{ backgroundColor: `${dA.primaryColor}cc`, color: dA.secondaryColor }}
                      >
                        {dA.name}
                      </span>
                      <span className="text-amber-400/30 text-[10px]">×</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-serif font-bold"
                        style={{ backgroundColor: `${dB.primaryColor}cc`, color: dB.secondaryColor }}
                      >
                        {dB.name}
                      </span>
                      {story.isHidden && (
                        <span className="px-1.5 py-0.5 bg-amber-500/20 rounded text-[10px] text-amber-300/60 font-serif">
                          隐藏
                        </span>
                      )}
                    </div>
                    <p className="text-amber-100/80 text-sm font-serif font-bold truncate">{story.title}</p>
                    <p className="text-amber-200/40 text-xs font-serif mt-0.5 truncate">{story.hook}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-4">
                        <div className="border-t border-amber-800/10 pt-3">
                          <p className="text-amber-600/50 text-xs font-serif mb-2">半段故事</p>
                          <div className="space-y-1.5">
                            {formatStoryText(story.halfStory).map((seg, i) => {
                              if (seg.type === 'dialogue') {
                                return (
                                  <p key={i} className="text-amber-200/80 text-xs leading-relaxed font-serif pl-3 border-l-2 border-amber-500/15">
                                    {seg.text}
                                  </p>
                                )
                              }
                              return (
                                <p key={i} className="text-amber-100/60 text-xs leading-relaxed font-serif indent-[2em]">
                                  {seg.text}
                                </p>
                              )
                            })}
                          </div>
                        </div>

                        <div>
                          <p className="text-amber-600/50 text-xs font-serif mb-2">完整故事</p>
                          <div className="space-y-1.5">
                            {formatStoryText(story.fullStory).map((seg, i) => {
                              if (seg.type === 'dialogue') {
                                return (
                                  <p key={i} className="text-amber-200/80 text-xs leading-relaxed font-serif pl-3 border-l-2 border-amber-500/15">
                                    {seg.text}
                                  </p>
                                )
                              }
                              return (
                                <p key={i} className="text-amber-100/60 text-xs leading-relaxed font-serif indent-[2em]">
                                  {seg.text}
                                </p>
                              )
                            })}
                          </div>
                        </div>

                        <div>
                          <p className="text-amber-600/50 text-xs font-serif mb-2">弹幕</p>
                          <p className="text-amber-300/50 text-xs font-serif italic">{story.danmaku}</p>
                        </div>

                        <div>
                          <p className="text-amber-600/50 text-xs font-serif mb-2">尾声</p>
                          <div className="space-y-1">
                            {formatStoryText(story.epilogue).map((seg, i) => {
                              if (seg.type === 'dialogue') {
                                return (
                                  <p key={i} className="text-amber-200/70 text-xs leading-relaxed font-serif pl-3 border-l-2 border-amber-500/10">
                                    {seg.text}
                                  </p>
                                )
                              }
                              return (
                                <p key={i} className="text-amber-200/50 text-xs leading-relaxed font-serif indent-[2em]">
                                  {seg.text}
                                </p>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {story.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-amber-950/30 border border-amber-800/20 rounded-full text-amber-400/40 text-[10px] font-serif">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => navigate(`/story?storyId=${story.id}`)}
                          className="w-full py-2 text-amber-400/40 text-xs font-serif hover:text-amber-300/60 transition-colors text-center"
                        >
                          查看完整页面 →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
