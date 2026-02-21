/**
 * Sentiment Analysis Module
 */

import Sentiment from 'sentiment'

const sentiment = new Sentiment()

// Define interfaces
export interface SentimentAnalysisResult {
  text: string
  originalText: string
  score: number
  comparative: number
  normalizedScore: number
  moodScore: number
  classification: 'positive' | 'negative' | 'neutral' | 'very_positive' | 'very_negative'
  positiveWords: string[]
  negativeWords: string[]
  tokens: string[]
  confidence: number
}

export interface MoodScore {
  moodScore: number
  totalPosts: number
  positivePercentage: number
  negativePercentage: number
  neutralPercentage: number
  averagePolarity: number
  trend: string
}

export function analyzeText(text: string): SentimentAnalysisResult {
  const result = sentiment.analyze(text)
  
  // Normalize score from -5 to +5 -> -100 to +100
  const normalizedScore = Math.round((result.comparative / 0.5) * 100)
  const moodScore = Math.max(-100, Math.min(100, normalizedScore))
  
  // Classify sentiment
  let classification: 'positive' | 'negative' | 'neutral' | 'very_positive' | 'very_negative' = 'neutral'
  if (result.comparative > 0.5) classification = 'very_positive'
  else if (result.comparative > 0.1) classification = 'positive'
  else if (result.comparative < -0.5) classification = 'very_negative'
  else if (result.comparative < -0.1) classification = 'negative'
  
  return {
    text,
    originalText: text,
    score: result.score,
    comparative: result.comparative,
    normalizedScore,
    moodScore,
    classification,
    positiveWords: result.positive,
    negativeWords: result.negative,
    tokens: result.tokens,
    confidence: Math.abs(result.comparative)
  }
}

export function calculateMoodScore(analyses: SentimentAnalysisResult[]): MoodScore {
  if (!analyses || analyses.length === 0) {
    return {
      moodScore: 0,
      totalPosts: 0,
      positivePercentage: 0,
      negativePercentage: 0,
      neutralPercentage: 0,
      averagePolarity: 0,
      trend: 'stable'
    }
  }

  const total = analyses.length
  const positiveCount = analyses.filter(a => a.classification === 'positive' || a.classification === 'very_positive').length
  const negativeCount = analyses.filter(a => a.classification === 'negative' || a.classification === 'very_negative').length
  const neutralCount = analyses.filter(a => a.classification === 'neutral').length

  const averagePolarity = analyses.reduce((sum, a) => sum + a.comparative, 0) / total
  const moodScore = Math.round(averagePolarity * 100)

  let trend = 'stable'
  if (total >= 10) {
    const mid = Math.floor(total / 2)
    const firstHalf = analyses.slice(0, mid).reduce((sum, a) => sum + a.comparative, 0) / mid
    const secondHalf = analyses.slice(mid).reduce((sum, a) => sum + a.comparative, 0) / (total - mid)
    const diff = secondHalf - firstHalf
    
    if (diff > 0.1) trend = 'improving'
    else if (diff < -0.1) trend = 'declining'
  }

  return {
    moodScore,
    totalPosts: total,
    positivePercentage: Math.round((positiveCount / total) * 100),
    negativePercentage: Math.round((negativeCount / total) * 100),
    neutralPercentage: Math.round((neutralCount / total) * 100),
    averagePolarity: Math.round(averagePolarity * 1000) / 1000,
    trend
  }
}

export function getMoodEmoji(score: number): string {
  if (score >= 60) return '😄'
  if (score >= 30) return '🙂'
  if (score >= 10) return '😐'
  if (score >= -10) return '😕'
  if (score >= -30) return '😟'
  if (score >= -60) return '😠'
  return '🤬'
}

export function getMoodLabel(score: number): string {
  if (score >= 60) return 'Very Positive'
  if (score >= 30) return 'Positive'
  if (score >= 10) return 'Slightly Positive'
  if (score >= -10) return 'Neutral'
  if (score >= -30) return 'Slightly Negative'
  if (score >= -60) return 'Negative'
  return 'Very Negative'
}