import Link from "next/link"
import type { UserListItemProps } from "../../types"
import { ROUTES } from "../../lib/constants"
import { SentimentBadge } from "../sentiment/SentimentBadge"
import { ResponseSpeedBadge } from "../speed/ResponseSpeedBadge"
import { formatDateTime } from "../../lib/utils"

export function UserListItem({
  user,
  metrics,
  showGroups = false,
  showMetrics = true,
  showSentiment = false,
  showResponseTime = false,
}: UserListItemProps) {
  return (
    <div className="flex items-center p-3 border-b last:border-b-0">
      <div className="flex-shrink-0 mr-3">
        {user.avatarUrl ? (
          <img src={user.avatarUrl || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-medium">{user.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="flex-grow">
        <Link href={ROUTES.PROFILE(user.id)} className="font-medium hover:text-blue-600 hover:underline">
          {user.name}
        </Link>

        <div className="text-sm text-gray-500">
          {user.role} {user.company && `• ${user.company}`}
        </div>

        {showMetrics && metrics && (
          <div className="flex flex-wrap gap-2 mt-1">
            {metrics.messageCount > 0 && (
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{metrics.messageCount} mensagens</span>
            )}

            {showResponseTime && metrics.avgResponseTime && (
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Resposta: {metrics.avgResponseTime}</span>
            )}

            {metrics.lastActive && (
              <span className="text-xs text-gray-500">Ativo: {formatDateTime(metrics.lastActive)}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 ml-2 flex flex-col items-end gap-2">
        {showSentiment && metrics?.sentiment && (
          <SentimentBadge sentiment={metrics.sentiment} size="sm" showLabel={false} />
        )}

        {metrics?.responseSpeed && <ResponseSpeedBadge speed={metrics.responseSpeed} size="sm" showLabel={false} />}
      </div>
    </div>
  )
}
