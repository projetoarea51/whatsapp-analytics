"use client"

import { useState, useEffect } from "react"
import type { PainPointsMessageListProps } from "../../types"
import { messageService } from "../../services/message-service"
import { formatDateTime } from "../../lib/utils"
import { SentimentBadge } from "../sentiment/SentimentBadge"
import { GroupLink } from "../groups/GroupLink"

export function PainPointsMessageList({ category, groupId, limit = 10 }: PainPointsMessageListProps) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        let data

        if (groupId) {
          data = await messageService.getMessagesByGroup(groupId, {
            painPoint: category,
            limit,
          })
        } else {
          data = await messageService.getMessages({
            painPoint: category,
            limit,
          })
        }

        setMessages(data)
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [category, groupId, limit])

  if (loading) {
    return <div className="p-4 text-center">Carregando mensagens...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Erro ao carregar mensagens</div>
  }

  if (messages.length === 0) {
    return <div className="p-4 text-center">Nenhuma mensagem encontrada para esta dor</div>
  }

  return (
    <div className="space-y-4 p-2">
      {messages.map((message) => (
        <div key={message.id} className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium">{message.sender.name}</div>
            <SentimentBadge sentiment={message.sentiment} size="sm" />
          </div>
          <div className="mb-2">{message.content}</div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div>{formatDateTime(message.timestamp)}</div>
            {!groupId && message.groupId && (
              <GroupLink group={{ id: message.groupId, name: message.groupName }} className="text-xs" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
