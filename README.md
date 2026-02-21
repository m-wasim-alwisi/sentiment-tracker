النص الحالي جيد، لكن فيه فوضى بالتنسيق وتكرار غير ضروري. هذا إصدار نظيف، واضح، وقابل للاستخدام مباشرة:

---

# Social Media Sentiment Tracker

Real-time dashboard analyzes social media sentiment for any topic. Shows whether people are happy or angry using clean, interactive visuals.

## 🎯 Overview

Social Media Sentiment Tracker is a Next.js app that pulls data from Reddit (real) and Twitter (simulated), analyzes sentiment باستخدام NLP، ويعرض النتائج عبر لوحة تحكم تفاعلية لحظية.

## ✨ Features

* 🔍 Real-time topic search
* 📊 Interactive charts (pie + bar)
* 🎭 Mood score from -100 (very negative) to +100 (very positive)
* 📱 Live feed with sentiment labels
* 🔄 Auto-refresh every 30 seconds
* 📱 Fully responsive design
* 🎨 Modern UI (glassmorphism + animations)

## 🛠️ Tech Stack

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| Next.js 14    | App framework              |
| TypeScript    | Type safety                |
| Tailwind CSS  | Styling                    |
| Framer Motion | Animations                 |
| Recharts      | Charts                     |
| Sentiment.js  | Sentiment analysis (AFINN) |
| Lucide React  | Icons                      |

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/sentiment-tracker.git
cd sentiment-tracker
npm install
```

### Environment Setup

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
```

### Run the App

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

## 📁 Project Structure

```bash
sentiment-tracker/
├── app/
│   ├── api/analyze/route.ts
│   ├── globals.css
│   ├── layout.js
│   └── page.tsx
├── components/
│   ├── LiveFeed.tsx
│   ├── ScoreCard.tsx
│   ├── SentimentChart.tsx
│   └── TopicInput.tsx
├── lib/
│   ├── scraper.ts
│   └── sentiment.ts
├── types/
│   └── sentiment.d.ts
```

## 📡 API

### POST `/api/analyze`

Analyze sentiment for a topic.

**Request**

```json
{
  "topic": "iPhone 15",
  "platforms": ["twitter", "reddit"],
  "limit": 50
}
```

**Response**

```json
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
  "posts": [],
  "dataSource": {
    "reddit": "real API",
    "twitter": "simulated"
  }
}
```

## 📊 How It Works

1. User enters a topic
2. API (`/api/analyze`) fetches data
3. Reddit → real posts
4. Twitter → simulated data
5. Sentiment scoring باستخدام AFINN
6. Results displayed in dashboard

## 🔧 Configuration

### Environment Variables

| Variable             | Description      | Required |
| -------------------- | ---------------- | -------- |
| NEXT_PUBLIC_API_URL  | API base URL     | No       |
| REDDIT_CLIENT_ID     | Reddit client ID | No       |
| REDDIT_CLIENT_SECRET | Reddit secret    | No       |

### Enable Real Twitter Data

1. Get API access from developer.twitter.com
2. Add to `.env.local`:

```bash
TWITTER_BEARER_TOKEN=your_token
```

3. Update `lib/scraper.ts`

## 🤝 Contributing

* Fork the repo
* Create branch (`feature/your-feature`)
* Commit changes
* Push
* Open PR

## 📝 License

MIT License

## 🙏 Acknowledgments

* Sentiment.js
* Recharts
* Framer Motion
* Reddit API
* Tailwind CSS

## 📧 Contact

Your Name
Twitter: @yourtwitter
Email: [email@example.com](mailto:email@example.com)

Project:
[https://github.com/yourusername/sentiment-tracker](https://github.com/yourusername/sentiment-tracker)

---

لو بدك نرفع المستوى أكثر (README احترافي فعلاً)، الخطوة التالية تكون إضافة:

* badges (build, license, version)
* صور حقيقية للداشبورد
* demo link

قلّي، وأنا أجهزه لك بشكل جاهز للنشر.
