import type { ResponseSpeedBadgeProps } from "../../types"
import { getResponseSpeedInfo } from "../../lib/utils"

export function ResponseSpeedBadge({
  speed,
  showEmoji = true,
  showLabel = true,
  size = "md",
}: ResponseSpeedBadgeProps) {
  const speedInfo = getResponseSpeedInfo(speed)

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]}`}
      style={{
        backgroundColor: speedInfo.color,
        color: "#ffffff",
      }}
    >
      {showEmoji && <span className="mr-1">{speedInfo.emoji}</span>}
      {showLabel && speedInfo.label}
    </span>
  )
}
