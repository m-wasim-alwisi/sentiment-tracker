'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import SentimentChart from '@/components/SentimentChart'
import LiveFeed, { type SentimentPost } from '@/components/LiveFeed'
import ScoreCard from '@/components/ScoreCard'
import TopicInput from '@/components/TopicInput'
import ClientOnly from '@/components/ClientOnly'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, TrendingUp, MessageCircle, RefreshCw } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Define types for sentiment data
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

interface SentimentData {
  query: string
  timestamp: string
  overallMood: {
    moodScore: number
    totalPosts: number
    positivePercentage: number
    negativePercentage: number
    neutralPercentage: number
    averagePolarity: number
    trend: string
  }
  platforms: {
    twitter: PlatformData
    reddit: PlatformData
  }
  moodEmoji: string
  moodLabel: string
  posts: SentimentPost[]
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
        <p className="text-slate-400">Loading dashboard...</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [topic, setTopic] = useState<string>('iPhone 15')
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true)

  const fetchSentiment = useCallback(async (topicName: string = topic) => {
    if (!topicName.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post<SentimentData>(`${API_URL}/api/analyze`, {
        topic: topicName,
        platforms: ['twitter', 'reddit'],
        limit: 50
      })
      
      setSentimentData(response.data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching sentiment:', err)
      setError('Failed to analyze sentiment. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [topic])

  // Initial fetch
  useEffect(() => {
    fetchSentiment()
  }, [fetchSentiment])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return
    
    const interval = setInterval(() => {
      fetchSentiment()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [autoRefresh, fetchSentiment])

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic)
    fetchSentiment(newTopic)
  }

  const handleRefresh = () => {
    fetchSentiment()
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                🎭 Sentiment Tracker
              </h1>
              <p className="text-slate-400 mt-2">
                Real-time social media mood analysis
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 live-indicator' : 'bg-slate-500'}`} />
                {autoRefresh ? 'Live' : 'Paused'}
              </div>
              
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </motion.div>
        </header>

        {/* Topic Input - Client Only */}
        <ClientOnly fallback={<LoadingSkeleton />}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <TopicInput 
              value={topic}
              onChange={handleTopicChange}
              loading={loading}
            />
          </motion.div>
        </ClientOnly>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Dashboard Grid - Client Only */}
        <ClientOnly fallback={<LoadingSkeleton />}>
          {sentimentData ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Score Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <ScoreCard 
                  moodScore={sentimentData.overallMood.moodScore}
                  moodLabel={sentimentData.moodLabel}
                  moodEmoji={sentimentData.moodEmoji}
                  totalPosts={sentimentData.overallMood.totalPosts}
                  trend={sentimentData.overallMood.trend}
                  positive={sentimentData.overallMood.positivePercentage}
                  negative={sentimentData.overallMood.negativePercentage}
                  neutral={sentimentData.overallMood.neutralPercentage}
                />
              </motion.div>

              {/* Charts */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
              >
                <SentimentChart 
                  data={sentimentData.overallMood}
                  platforms={sentimentData.platforms}
                />
              </motion.div>

              {/* Live Feed */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-3"
              >
                <LiveFeed 
                  posts={sentimentData.posts}
                  platforms={sentimentData.platforms}
                  loading={loading}
                />
              </motion.div>
            </div>
          ) : (
            <LoadingSkeleton />
          )}
        </ClientOnly>

        {/* Footer Stats */}
        <ClientOnly>
          {lastUpdated && (
            <motion.footer 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Data from Twitter & Reddit</span>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Updates every 30 seconds</span>
              </div>
            </motion.footer>
          )}
        </ClientOnly>
      </div>
    </main>
  )
}