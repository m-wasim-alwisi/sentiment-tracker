'use client'

import { motion } from 'framer-motion'
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

const COLORS = {
  positive: '#22c55e',
  neutral: '#fbbf24',
  negative: '#ef4444'
}

const PLATFORM_COLORS = {
  twitter: '#1DA1F2',
  reddit: '#FF4500'
}

export default function SentimentChart({ data, platforms }) {
  // Prepare pie chart data
  const pieData = [
    { name: 'Positive', value: data.positivePercentage, color: COLORS.positive },
    { name: 'Neutral', value: data.neutralPercentage, color: COLORS.neutral },
    { name: 'Negative', value: data.negativePercentage, color: COLORS.negative }
  ]

  // Prepare bar chart data for platforms
  const barData = Object.entries(platforms).map(([platform, info]) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    score: info.moodScore?.moodScore || 0,
    posts: info.totalPosts || 0
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? entry.value : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-6">Sentiment Distribution</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-4">Overall Sentiment</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-slate-300">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-4">Platform Comparison</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  type="number" 
                  domain={[-100, 100]}
                  stroke="#64748b"
                  tick={{ fill: '#64748b' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="platform" 
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="score" 
                  radius={[0, 4, 4, 0]}
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Score Scale */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>-100 (Very Negative)</span>
          <span>0 (Neutral)</span>
          <span>+100 (Very Positive)</span>
        </div>
        <div className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
      </div>
    </motion.div>
  )
}