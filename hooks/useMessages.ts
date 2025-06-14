"use client"

import { useState, useEffect } from "react"
import type { Message, MessageFilters, SentimentType } from "../types"
import { messageService } from "../services/message-service"

export function useMessages(filters?: MessageFilters) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        const data = await messageService.getMessages(filters)
        setMessages(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [filters])

  return { messages, loading, error }
}

export function useMessagesBySentiment(sentiment: SentimentType, filters?: MessageFilters) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        const data = await messageService.getMessagesBySentiment(sentiment, filters)
        setMessages(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [sentiment, filters])

  return { messages, loading, error }
}

export function useMessagesByTopic(topic: string, filters?: MessageFilters) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        const data = await messageService.getMessagesByTopic(topic, filters)
        setMessages(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [topic, filters])

  return { messages, loading, error }
}

export function useStarMessage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const starMessage = async (id: string, isStarred: boolean) => {
    try {
      setLoading(true)
      await messageService.starMessage(id, isStarred)
      setError(null)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      return false
    } finally {
      setLoading(false)
    }
  }

  return { starMessage, loading, error }
}
