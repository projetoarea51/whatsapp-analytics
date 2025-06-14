"use client"

import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

type Conversation = {
  id: string
  date: string
  group: string
  message: string
  sentiment: string
  isMarked?: boolean
}

type ConversationHistoryProps = {
  conversations: Conversation[]
  formatDate: (date: string) => string
  onToggleMark?: (id: string) => void
  showMarkButton?: boolean
}

export function ConversationHistory({
  conversations,
  formatDate,
  onToggleMark,
  showMarkButton = false,
}: ConversationHistoryProps) {
  // Get sentiment badge class
  const getSentimentBadgeClass = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "neutral":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "confused":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return ""
    }
  }

  // Get sentiment emoji
  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "😊"
      case "neutral":
        return "😐"
      case "negative":
        return "😠"
      case "confused":
        return "🤔"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-0 divide-y">
      {conversations.map((conv) => (
        <div key={conv.id} className="p-4">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{conv.group}</Badge>
              <span className="text-xs text-muted-foreground">{formatDate(conv.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getSentimentBadgeClass(conv.sentiment)}>
                {getSentimentEmoji(conv.sentiment)}
              </Badge>
              {showMarkButton && onToggleMark && (
                <button
                  onClick={() => onToggleMark(conv.id)}
                  className={`text-muted-foreground hover:text-yellow-500 ${conv.isMarked ? "text-yellow-500" : ""}`}
                >
                  <Star className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <p className="text-sm">{conv.message}</p>
        </div>
      ))}
    </div>
  )
}
