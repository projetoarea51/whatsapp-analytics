import type { SentimentBadgeProps } from "../../types"
import { getSentimentInfo } from "../../lib/utils"

export function SentimentBadge({ sentiment, showEmoji = true, showLabel = true, size = "md" }: SentimentBadgeProps) {
  const sentimentInfo = getSentimentInfo(sentiment)

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]}`}
      style={{
        backgroundColor: sentimentInfo.color,
        color: "#ffffff",
      }}
    >
      {showEmoji && <span className="mr-1">{sentimentInfo.emoji}</span>}
      {showLabel && sentimentInfo.label}
    </span>
  )
}
