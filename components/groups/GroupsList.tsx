"use client"
import type { GroupsListProps } from "../../types"
import { GroupLink } from "./GroupLink"

export function GroupsList({ groups, onGroupClick, className = "" }: GroupsListProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      {groups.map((group) => (
        <div
          key={group.id}
          className="py-1 px-2 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => onGroupClick?.(group.id)}
        >
          <GroupLink group={group} />
          <div className="text-xs text-gray-500">
            {group.memberCount} membros • {group.messageCount} mensagens
          </div>
        </div>
      ))}
    </div>
  )
}
