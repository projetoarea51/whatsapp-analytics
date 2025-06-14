"use client"
import Link from "next/link"
import type { SentimentWidgetProps } from "../../types"
import { SENTIMENT_MAP } from "../../lib/constants"
import { ROUTES } from "../../lib/constants"

export function SentimentWidget({ distribution, onSentimentClick }: SentimentWidgetProps) {
  const sentiments = [
    {
      type: "positive" as const,
      emoji: SENTIMENT_MAP.positive.emoji,
      label: SENTIMENT_MAP.positive.label,
      percentage: distribution.positive,
    },
    {
      type: "neutral" as const,
      emoji: SENTIMENT_MAP.neutral.emoji,
      label: SENTIMENT_MAP.neutral.label,
      percentage: distribution.neutral,
    },
    {
      type: "negative" as const,
      emoji: SENTIMENT_MAP.negative.emoji,
      label: SENTIMENT_MAP.negative.label,
      percentage: distribution.negative,
    },
    {
      type: "confused" as const,
      emoji: SENTIMENT_MAP.confused.emoji,
      label: SENTIMENT_MAP.confused.label,
      percentage: distribution.confused,
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Sentimento</h3>
      <div className="grid grid-cols-4 gap-2">
        {sentiments.map((sentiment) => (
          <div
            key={sentiment.type}
            className="flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onSentimentClick?.(sentiment.type)}
          >
            <Link href={ROUTES.SENTIMENT(sentiment.type)} className="flex flex-col items-center">
              <div className="text-3xl mb-1">{sentiment.emoji}</div>
              <div className="text-sm font-medium">{sentiment.label}</div>
              <div className="text-xs text-gray-500">{sentiment.percentage.toFixed(1)}%</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
