'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Twitter, MessageCircle, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'

// Define types
export interface SentimentPost {
  id: string
  text: string
  author: string
  platform: 'twitter' | 'reddit'
  likes?: number
  retweets?: number
  comments?: number
  upvotes?: number
  timestamp: string
  sentimentCategory: string
}

interface PlatformData {
  analyses: Array<{
    originalPost: SentimentPost
    classification: string
    comparative: number
    confidence: number
  }>
  moodScore: {
    moodScore: number
    totalPosts: number
    positivePercentage: number
    negativePercentage: number
    neutralPercentage: number
    averagePolarity: number
    trend: string
  }
  totalPosts: number
}

interface LiveFeedProps {
  posts: SentimentPost[]
  platforms: {
    twitter: PlatformData
    reddit: PlatformData
  }
  loading: boolean
}

export default function LiveFeed({ posts = [], platforms, loading }: LiveFeedProps) {
  const [activeTab, setActiveTab] = useState<string>('all')

  const getSentimentIcon = (sentimentCategory: string) => {
    switch (sentimentCategory) {
      case 'positive': 
      case 'very_positive': 
        return <ThumbsUp className="w-4 h-4 text-green-400" />
      case 'negative': 
      case 'very_negative': 
        return <ThumbsDown className="w-4 h-4 text-red-400" />
      default: 
        return <Minus className="w-4 h-4 text-yellow-400" />
    }
  }

  const getSentimentLabel = (sentimentCategory: string) => {
    switch (sentimentCategory) {
      case 'very_positive': return 'Very Positive'
      case 'positive': return 'Positive'
      case 'neutral': return 'Neutral'
      case 'negative': return 'Negative'
      case 'very_negative': return 'Very Negative'
      default: return 'Neutral'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4" />
      case 'reddit': return <MessageCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-400'
      case 'reddit': return 'text-orange-500'
      default: return 'text-slate-400'
    }
  }

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(p => p.platform === activeTab)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Live Feed</h3>
        
        {/* Platform Tabs */}
        <div className="flex gap-2">
          {['all', 'twitter', 'reddit'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all cursor-pointer
                ${activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-700/50 text-slate-400 hover:text-white'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No posts available</p>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 
                         hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Platform Icon */}
                  <div className={`flex-shrink-0 ${getPlatformColor(post.platform)}`}>
                    {getPlatformIcon(post.platform)}
                  </div>
                  
                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm text-slate-400">@{post.author}</span>
                      {getSentimentIcon(post.sentimentCategory)}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                        {getSentimentLabel(post.sentimentCategory)}
                      </span>
                    </div>
                    
                    <p className="text-slate-200 text-sm line-clamp-2">
                      {post.text}
                    </p>
                    
                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                      {post.likes !== undefined && (
                        <span>❤️ {post.likes}</span>
                      )}
                      {post.retweets !== undefined && (
                        <span>🔄 {post.retweets}</span>
                      )}
                      {post.upvotes !== undefined && (
                        <span>⬆️ {post.upvotes}</span>
                      )}
                      {post.comments !== undefined && (
                        <span>💬 {post.comments}</span>
                      )}
                      <span className="text-slate-600">
                        {new Date(post.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Scroll hint */}
      {filteredPosts.length > 10 && (
        <div className="text-center mt-4 text-xs text-slate-500">
          Scroll for more posts ↑
        </div>
      )}
    </motion.div>
  )
}