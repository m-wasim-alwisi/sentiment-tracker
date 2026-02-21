'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, ThumbsUp, ThumbsDown, MinusCircle } from 'lucide-react'

export default function ScoreCard({ 
  moodScore, 
  moodLabel, 
  moodEmoji, 
  totalPosts, 
  trend,
  positive,
  negative,
  neutral
}) {
  // Calculate circle progress
  const circleProgress = ((moodScore + 100) / 200) * 553 // 553 is circumference

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-400" />
      default: return <Minus className="w-4 h-4 text-yellow-400" />
    }
  }

  const getTrendText = (trend) => {
    switch (trend) {
      case 'improving': return 'Improving 📈'
      case 'declining': return 'Declining 📉'
      default: return 'Stable ➡️'
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6"
    >
      {/* Main Score Display */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">{moodEmoji}</div>
        <h2 className="text-2xl font-bold text-white mb-1">{moodLabel}</h2>
        <p className="text-slate-400 text-sm">Overall Sentiment</p>
      </div>

      {/* Big Score Circle */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={553}
            initial={{ strokeDashoffset: 553 }}
            animate={{ strokeDashoffset: 553 - circleProgress }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Score text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-5xl font-bold text-white"
            >
              {moodScore}
            </motion.span>
            <span className="block text-slate-500 text-sm">Mood Score</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <ThumbsUp className="w-5 h-5 mx-auto mb-1 text-green-400" />
          <p className="text-2xl font-bold text-green-400">{positive}%</p>
          <p className="text-xs text-slate-400">Positive</p>
        </div>
        
        <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <MinusCircle className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
          <p className="text-2xl font-bold text-yellow-400">{neutral}%</p>
          <p className="text-xs text-slate-400">Neutral</p>
        </div>
        
        <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <ThumbsDown className="w-5 h-5 mx-auto mb-1 text-red-400" />
          <p className="text-2xl font-bold text-red-400">{negative}%</p>
          <p className="text-xs text-slate-400">Negative</p>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Posts analyzed:</span>
          <span className="text-white font-medium">{totalPosts.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          {getTrendIcon(trend)}
          <span className="text-sm text-slate-300">{getTrendText(trend)}</span>
        </div>
      </div>
    </motion.div>
  )
}