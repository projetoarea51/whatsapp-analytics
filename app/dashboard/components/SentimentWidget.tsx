"use client"

import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

type SentimentData = {
  emoji: string
  label: string
  percentage: number
  color: string
}

// Dados de exemplo para os sentimentos
const sentimentData: SentimentData[] = [
  { emoji: "😊", label: "Feliz", percentage: 35, color: "bg-green-500" },
  { emoji: "😐", label: "Neutro", percentage: 25, color: "bg-blue-500" },
  { emoji: "🤔", label: "Dúvida", percentage: 20, color: "bg-yellow-500" },
  { emoji: "😠", label: "Raiva", percentage: 15, color: "bg-red-500" },
  { emoji: "😢", label: "Triste", percentage: 5, color: "bg-purple-500" },
]

export default function SentimentWidget() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const router = useRouter()

  const handleSentimentClick = (sentiment: string) => {
    router.push(`/dashboard/sentiment/${encodeURIComponent(sentiment)}`)
  }

  return (
    <div className="space-y-3">
      {/* Emojis em linha com bordas */}
      <div className="flex justify-between items-center gap-1">
        {sentimentData.map((item) => (
          <div
            key={item.emoji}
            className="flex flex-col items-center justify-between border border-gray-200 dark:border-gray-700 border-opacity-40 dark:border-opacity-40 rounded-md p-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-[18%] h-auto"
            onClick={() => handleSentimentClick(item.label)}
          >
            <span className="text-xs font-medium text-center truncate w-full">{item.label}</span>
            <span className="text-xl my-1">{item.emoji}</span>
            <span className="text-xs font-medium">{item.percentage}%</span>
          </div>
        ))}
      </div>

      {/* Barras de percentual */}
      <div className="space-y-2">
        {sentimentData.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span>{item.label}</span>
              <span className="font-medium">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full">
              <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
