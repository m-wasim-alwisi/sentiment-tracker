'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { useIsMounted } from '@/hooks/useIsMounted'

interface TopicInputProps {
  value: string
  onChange: (topic: string) => void
  loading: boolean
}

export default function TopicInput({ value, onChange, loading }: TopicInputProps) {
  const [inputValue, setInputValue] = useState<string>(value)
  const isMounted = useIsMounted()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onChange(inputValue.trim())
    }
  }

  const handleQuickTopic = (topic: string) => {
    setInputValue(topic)
    onChange(topic)
  }

  const quickTopics = [
    'iPhone 15',
    'Tesla',
    'Bitcoin',
    'ChatGPT',
    'Super Bowl',
    'Star Wars'
  ]

  // Only render motion components after mount
  const MotionDiv = isMounted ? motion.div : 'div'
  const MotionButton = isMounted ? motion.button : 'button'

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a topic to analyze..."
          className="w-full px-6 py-4 pl-14 rounded-xl bg-slate-800/50 border border-slate-700 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none 
                     transition-all text-lg placeholder-slate-500 text-white"
          disabled={loading}
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 
                     bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 
                     disabled:cursor-not-allowed rounded-lg text-sm font-medium
                     transition-colors flex items-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze
            </>
          )}
        </button>
      </form>

      {/* Quick Topic Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-slate-500 py-1">Quick topics:</span>
        {quickTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleQuickTopic(topic)}
            disabled={loading}
            className={`px-3 py-1 rounded-full text-sm transition-all
              ${value === topic 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
              } disabled:opacity-50 cursor-pointer`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  )
}