declare module 'sentiment' {
  interface SentimentResult {
    score: number
    comparative: number
    calculation: Array<{ [word: string]: number }>
    tokens: string[]
    positive: string[]
    negative: string[]
  }

  class Sentiment {
    analyze(text: string, options?: object): SentimentResult
  }

  export = Sentiment
}