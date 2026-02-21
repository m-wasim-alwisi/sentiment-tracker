Social Media Sentiment Tracker
A real-time dashboard that monitors and analyzes social media sentiment about any topic, displaying whether people are happy or angry using beautiful visualizations.


🎯 Overview
Social Media Sentiment Tracker is a Next.js application that scrapes social media platforms (Reddit and simulated Twitter data), analyzes the sentiment of posts using natural language processing, and displays the results through an interactive, real-time dashboard.

✨ Features
🔍 Real-time Topic Search - Analyze any topic by entering a search term
📊 Interactive Visualizations - Pie charts and bar charts showing sentiment distribution
🎭 Mood Scoring - Overall mood score from -100 (very negative) to +100 (very positive)
📱 Live Feed - See recent posts with sentiment indicators
🔄 Auto-refresh - Data updates automatically every 30 seconds
📱 Responsive Design - Works on desktop and mobile devices
🎨 Beautiful UI - Modern glassmorphism design with smooth animations
🛠️ Tech Stack
Technology

Purpose

Next.js 14

React framework with App Router

TypeScript

Type-safe development

Tailwind CSS

Styling and responsive design

Framer Motion

Smooth animations

Recharts

Data visualization

Sentiment.js

AFINN-based sentiment analysis

Lucide React

Icon library

🚀 Getting Started
Prerequisites
Node.js 18+
npm or yarn
Installation
Clone the repository

bash

Copy code
git clone https://github.com/yourusername/sentiment-tracker.git
cd sentiment-tracker
Install dependencies

bash

Copy code
npm install
Set up environment variables

bash

Copy code
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
Start the development server

bash

Copy code
npm run dev
Open your browser Navigate to http://localhost:3000

📁 Project Structure

Copy code
sentiment-tracker/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts       # API endpoint for sentiment analysis
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.tsx               # Main dashboard page
├── components/
│   ├── LiveFeed.tsx           # Real-time posts feed
│   ├── ScoreCard.tsx          # Big mood score display
│   ├── SentimentChart.tsx     # Pie and bar charts
│   └── TopicInput.tsx         # Search input component
├── lib/
│   ├── scraper.ts             # Social media data scraper
│   └── sentiment.ts           # Sentiment analysis logic
├── types/
│   └── sentiment.d.ts         # TypeScript declarations
├── package.json
├── tailwind.config.js
└── tsconfig.json
📡 API Endpoints
POST /api/analyze
Analyze sentiment for a specific topic.

Request:

json

Copy code
{
  "topic": "iPhone 15",
  "platforms": ["twitter", "reddit"],
  "limit": 50
}
Response:

json

Copy code
{
  "query": "iPhone 15",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "overallMood": {
    "moodScore": 45,
    "totalPosts": 50,
    "positivePercentage": 55,
    "negativePercentage": 20,
    "neutralPercentage": 25,
    "trend": "stable"
  },
  "moodEmoji": "🙂",
  "moodLabel": "Positive",
  "posts": [...],
  "dataSource": {
    "reddit": "real API",
    "twitter": "simulated"
  }
}
🎨 Screenshots
Dashboard Overview

Sentiment Analysis

Live Feed

📊 How It Works

Copy code
┌─────────────────────────────────────────────────────────────────┐
│                        User Enters Topic                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js API Route                             │
│                    /api/analyze                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
┌─────────────────────────┐    ┌─────────────────────────┐
│   Reddit API            │    │   Simulated Twitter     │
│   (Real Data)           │    │   (Demo Data)           │
│                         │    │                         │
│   • Search posts        │    │   • Template-based      │
│   • Get title/body      │    │   • Random sentiment    │
│   • Engagement metrics  │    │   • Realistic-looking   │
└─────────────────────────┘    └─────────────────────────┘
              │                             │
              └──────────────┬──────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Sentiment Analysis                            │
│                    (AFINN-165 Word List)                         │
│                                                                 │
│   "Love this product!" → Score: +3 → Positive                   │
│   "Terrible service"   → Score: -3 → Negative                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Dashboard Display                             │
│                                                                 │
│   • Mood Score (-100 to +100)                                   │
│   • Pie Chart (Positive/Neutral/Negative)                       │
│   • Bar Chart (Platform Comparison)                             │
│   • Live Feed (Recent Posts)                                    │
└─────────────────────────────────────────────────────────────────┘
🔧 Configuration
Environment Variables
Variable

Description

Required

NEXT_PUBLIC_API_URL

API base URL

No (defaults to localhost:3000)

REDDIT_CLIENT_ID

Reddit API client ID

No (for real Reddit data)

REDDIT_CLIENT_SECRET

Reddit API secret

No (for real Reddit data)

Adding Real Twitter Data
To use real Twitter data instead of simulated data:

Apply for Twitter API access at developer.twitter.com
Create a project and app
Add your credentials to .env.local:
env

Copy code
TWITTER_BEARER_TOKEN=your_bearer_token
Update lib/scraper.ts to use the real API
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Sentiment.js - AFINN-based sentiment analysis
Recharts - Beautiful React charts
Framer Motion - Production-ready animations
Reddit API - Real social media data
Tailwind CSS - Utility-first CSS framework
📧 Contact
Your Name - @yourtwitter - email@example.com

Project Link: https://github.com/yourusername/sentiment-tracker

<div align="center">
⭐ Star this repo if you found it useful! ⭐
</div>
Made with ❤️ by [Your Name]