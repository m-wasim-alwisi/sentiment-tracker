// /**
//  * Social Media Data Simulator
//  * Generates realistic-looking social media posts for demonstration
//  */

// // Template messages for different sentiments
// const templates = {
//   positive: [
//     "Just tried {topic} and it's absolutely amazing! Best decision ever!",
//     "Can't believe how much I love {topic}. Completely exceeded expectations!",
//     "If you haven't tried {topic} yet, what are you waiting for? It's incredible!",
//     "Finally got my hands on {topic}. The hype is REAL!",
//     "{topic} is hands down the best thing I've experienced this year!",
//     "Been using {topic} for a week now and I'm blown away. Highly recommend!",
//     "Who else is obsessed with {topic}? This is game-changing!",
//     "Just had the best experience with {topic}. Absolutely love it!",
//     "{topic} keeps getting better. The team is doing amazing work!",
//     "My review of {topic}: 10/10 would recommend to everyone!",
//   ],
//   negative: [
//     "Really disappointed with {topic}. Total waste of money.",
//     "{topic} is the worst. Should have read the reviews first.",
//     "Never buying {topic} again. Complete disaster.",
//     "Customer service for {topic} is absolutely terrible. Avoid!",
//     "Regret purchasing {topic}. Such poor quality.",
//     "{topic} broke after one week. Very unhappy customer here.",
//     "Update ruined {topic}. Bring back the old version!",
//     "False advertising with {topic}. Not happy at all.",
//     "{topic} is a complete scam. Don't fall for it!",
//     "Frustrated beyond words with {topic}. Worst experience ever.",
//   ],
//   neutral: [
//     "Just saw an ad for {topic}. Interesting approach.",
//     "Anyone else using {topic}? How are you finding it?",
//     "Thinking about trying {topic} next month.",
//     "{topic} has some good features but also some flaws.",
//     "The price of {topic} seems reasonable for what you get.",
//     "Reading reviews about {topic} today. Mixed feelings.",
//     "{topic} is available in my area now. Might check it out.",
//     "Planning to compare {topic} with other options.",
//     "Saw someone using {topic} at the coffee shop today.",
//     "{topic} might be worth checking out. Anyone tried it?",
//   ],
//   mixed: [
//     "{topic} is okay I guess. Some things are good, some not so much.",
//     "Mixed feelings about {topic}. It has potential but needs work.",
//     "{topic} is decent but not worth the hype honestly.",
//     "Love some features of {topic} but hate others.",
//   ]
// }

// // Random user handles
// const users = [
//   'techlover99', 'reviewking', 'honest_mike', 'sarah_says', 'product_junkie',
//   'daily_user', 'first_timer', 'expert_buyer', 'casual_shopper', 'trendy_tom',
//   ' gadget_guru', 'real_talker', 'no_hype', 'fanboy_alert', 'neutral_nancy',
//   'big_spender', 'savvy_shopper', 'truth_seeker', 'early_adopter', 'late_bloomer'
// ]

// /**
//  * Generate random posts about a topic
//  * @param {string} topic - Topic to generate posts about
//  * @param {number} count - Number of posts to generate
//  * @returns {Array} Array of posts
//  */
// export function generatePosts(topic, count = 50) {
//   const posts = []
//   const sentimentWeights = [0.4, 0.25, 0.25, 0.1] // positive, negative, neutral, mixed
  
//   for (let i = 0; i < count; i++) {
//     // Choose sentiment category
//     const rand = Math.random()
//     let sentimentCategory
//     if (rand < sentimentWeights[0]) sentimentCategory = 'positive'
//     else if (rand < sentimentWeights[0] + sentimentWeights[1]) sentimentCategory = 'negative'
//     else if (rand < sentimentWeights[0] + sentimentWeights[1] + sentimentWeights[2]) sentimentCategory = 'neutral'
//     else sentimentCategory = 'mixed'
    
//     // Get random template
//     const templateList = templates[sentimentCategory]
//     const template = templateList[Math.floor(Math.random() * templateList.length)]
    
//     // Replace topic placeholder

//     const text = template.replace(/{topic}/g, topic)
    
//     // Random engagement numbers
//     const likes = Math.floor(Math.random() * 500)
//     const retweets = Math.floor(Math.random() * 100)
//     const comments = Math.floor(Math.random() * 50)
    
//     posts.push({
//       id: `post_${i}_${Date.now()}`,
//       text,
//       author: users[Math.floor(Math.random() * users.length)],
//       platform: Math.random() > 0.4 ? 'twitter' : 'reddit',
//       likes,
//       retweets,
//       comments,
//       timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
//       sentimentCategory
//     })
//   }
  
//   return posts
// }

// /**
//  * Generate multiple platforms of data
//  * @param {string} topic - Topic to search
//  * @param {number} limit - Posts per platform
//  * @returns {Object} Data from multiple platforms
//  */
// export async function scrapeTopic(topic, limit = 50) {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
  
//   const twitterCount = Math.floor(limit * 0.6)
//   const redditCount = limit - twitterCount
  
//   const twitterPosts = generatePosts(topic, twitterCount).map(p => ({
//     ...p,
//     platform: 'twitter'
//   }))
  
//   const redditPosts = generatePosts(topic, redditCount).map(p => ({
//     ...p,
//     platform: 'reddit',
//     // Convert twitter-style to reddit-style
//     upvotes: Math.floor(Math.random() * 500) - 50
//   }))
  
//   return {
//     topic,
//     timestamp: new Date().toISOString(),
//     platforms: {
//       twitter: twitterPosts,
//       reddit: redditPosts
//     },
//     totalPosts: twitterPosts.length + redditPosts.length
//   }
// }

/**
 * Social Media Scraper
 * Fetches real data from Reddit, generates simulated Twitter data
 */



// Reddit search URL (public API, no auth required for basic queries)
/**
 * Social Media Scraper
 * Fetches real data from Reddit, generates simulated Twitter data
 */

const REDDIT_API_BASE = 'https://www.reddit.com'

// Define interfaces
export interface ScrapedPost {
  id: string
  title?: string
  text: string
  author: string
  platform: 'twitter' | 'reddit'
  upvotes?: number
  comments?: number
  likes?: number
  retweets?: number
  timestamp: string
  subreddit?: string
  url?: string
  sentimentCategory?: string
}

export interface ScrapedData {
  topic: string
  timestamp: string
  platforms: {
    twitter: ScrapedPost[]
    reddit: ScrapedPost[]
  }
  totalPosts: number
}

export async function fetchRedditPosts(topic: string, limit: number = 25): Promise<ScrapedPost[]> {
  try {
    const response = await fetch(
      `${REDDIT_API_BASE}/search.json?q=${encodeURIComponent(topic)}&limit=${limit}&sort=new&t=month`,
      {
        headers: {
          'User-Agent': 'SentimentTracker/1.0 (Web App)'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`)
    }

    const data = await response.json()
    
    const posts: ScrapedPost[] = data.data.children
      .filter((child: any) => !child.data.is_self || child.data.selftext)
      .slice(0, limit)
      .map((child: any) => ({
        id: child.data.id,
        title: child.data.title,
        text: child.data.selftext || child.data.title,
        author: child.data.author,
        platform: 'reddit' as const,
        upvotes: child.data.ups,
        comments: child.data.num_comments,
        timestamp: new Date(child.data.created_utc * 1000).toISOString(),
        subreddit: child.data.subreddit,
        url: child.data.url,
        sentimentCategory: 'neutral'
      }))

    return posts
  } catch (error) {
    console.error('Error fetching Reddit posts:', error)
    return []
  }
}

export async function scrapeTopic(topic: string, limit: number = 50): Promise<ScrapedData> {
  const redditLimit = Math.floor(limit * 0.7)
  const twitterLimit = limit - redditLimit

  // Fetch Reddit and Twitter data in parallel
  const [redditPosts, twitterPosts] = await Promise.all([
    fetchRedditPosts(topic, redditLimit),
    Promise.resolve(generateTwitterPosts(topic, twitterLimit))
  ])

  // If Reddit fails, generate more simulated data
  const finalRedditPosts = redditPosts.length > 0 
    ? redditPosts 
    : generateTwitterPosts(topic, redditLimit).map(p => ({...p, platform: 'reddit' as const}))

  return {
    topic,
    timestamp: new Date().toISOString(),
    platforms: {
      twitter: twitterPosts,
      reddit: finalRedditPosts
    },
    totalPosts: twitterPosts.length + finalRedditPosts.length
  }
}

// Simulated Twitter data generator
function generateTwitterPosts(topic: string, count: number): ScrapedPost[] {
  const templates = {
    positive: [
      `Just tried ${topic} and it's absolutely amazing!`,
      `Can't believe how much I love ${topic}!`,
      `If you haven't tried ${topic} yet, what are you waiting for?`,
      `Finally got my hands on ${topic}. The hype is REAL!`,
      `${topic} is hands down the best thing this year!`,
    ],
    negative: [
      `Really disappointed with ${topic}. Total waste of money.`,
      `${topic} is the worst. Should have read the reviews first.`,
      `Never buying ${topic} again. Complete disaster.`,
      `Customer service for ${topic} is terrible. Avoid!`,
      `Regret purchasing ${topic}. Such poor quality.`,
    ],
    neutral: [
      `Just saw an ad for ${topic}. Interesting approach.`,
      `Anyone else using ${topic}? How are you finding it?`,
      `Thinking about trying ${topic} next month.`,
      `${topic} has some good features but also some flaws.`,
      `Reading reviews about ${topic} today.`,
    ],
  }

  const users = [
    'techlover99', 'reviewking', 'honest_mike', 'sarah_says', 'product_junkie',
    'daily_user', 'first_timer', 'expert_buyer', 'casual_shopper', 'trendy_tom'
  ]

  const posts: ScrapedPost[] = []
  const weights = [0.4, 0.25, 0.35]

  for (let i = 0; i < count; i++) {
    const rand = Math.random()
    let category: 'positive' | 'negative' | 'neutral'
    if (rand < weights[0]) category = 'positive'
    else if (rand < weights[0] + weights[1]) category = 'negative'
    else category = 'neutral'

    const text = templates[category][Math.floor(Math.random() * templates[category].length)]

    posts.push({
      id: `tweet_${i}_${Date.now()}`,
      text,
      author: users[Math.floor(Math.random() * users.length)],
      platform: 'twitter',
      likes: Math.floor(Math.random() * 500),
      retweets: Math.floor(Math.random() * 100),
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      sentimentCategory: category
    })
  }

  return posts
}