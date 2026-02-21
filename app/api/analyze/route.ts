import { NextResponse } from 'next/server'
import { scrapeTopic, type ScrapedPost, type ScrapedData } from '@/lib/scraper'
import { analyzeText, calculateMoodScore, getMoodEmoji, getMoodLabel, type SentimentAnalysisResult, type MoodScore } from '@/lib/sentiment'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, platforms = ['twitter', 'reddit'], limit = 50 } = body

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    // Scrape social media data
    const data: ScrapedData = await scrapeTopic(topic, limit)

    // Analyze sentiment for each post
    const allAnalyses: SentimentAnalysisResult[] = []
    const platformResults: Record<string, any> = {}

    // Analyze Twitter posts
    if (platforms.includes('twitter') && data.platforms.twitter?.length > 0) {
      const twitterAnalyses: SentimentAnalysisResult[] = data.platforms.twitter.map((post: ScrapedPost) => {
        return analyzeText(post.text)
      })
      
      platformResults.twitter = {
        analyses: twitterAnalyses,
        moodScore: calculateMoodScore(twitterAnalyses),
        totalPosts: twitterAnalyses.length
      }
      
      allAnalyses.push(...twitterAnalyses)
    }

    // Analyze Reddit posts (REAL DATA!)
    if (platforms.includes('reddit') && data.platforms.reddit?.length > 0) {
      const redditAnalyses: SentimentAnalysisResult[] = data.platforms.reddit.map((post: ScrapedPost) => {
        const fullText = post.title && post.text 
          ? `${post.title} ${post.text}` 
          : post.text || post.title || ''
        return analyzeText(fullText)
      })
      
      platformResults.reddit = {
        analyses: redditAnalyses,
        moodScore: calculateMoodScore(redditAnalyses),
        totalPosts: redditAnalyses.length
      }
      
      allAnalyses.push(...redditAnalyses)
    }

    // Calculate overall mood
    const overallMood = calculateMoodScore(allAnalyses)
    const moodEmoji = getMoodEmoji(overallMood.moodScore)
    const moodLabel = getMoodLabel(overallMood.moodScore)

    // Get posts from both platforms for the live feed
    const posts: ScrapedPost[] = []

    // Add Twitter posts
    if (data.platforms.twitter) {
      data.platforms.twitter.forEach((post: ScrapedPost) => {
        posts.push({
          ...post,
          sentimentCategory: post.sentimentCategory || 'neutral'
        })
      })
    }

    // Add Reddit posts
    if (data.platforms.reddit) {
      data.platforms.reddit.forEach((post: ScrapedPost) => {
        posts.push({
          ...post,
          sentimentCategory: post.sentimentCategory || 'neutral'
        })
      })
    }

    // Limit to 20 posts
    const limitedPosts = posts.slice(0, 20)

    return NextResponse.json({
      query: topic,
      timestamp: data.timestamp,
      overallMood,
      platforms: platformResults,
      moodEmoji,
      moodLabel,
      posts: limitedPosts,
      dataSource: {
        reddit: 'real API',
        twitter: 'simulated (requires API key)'
      }
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze sentiment' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Use POST to analyze a topic',
    example: {
      topic: 'iPhone 15',
      platforms: ['twitter', 'reddit'],
      limit: 50
    }
  })
}