import type { Message, MessageFilters, SentimentType } from "../types"
import { API } from "../lib/constants"

export class MessageService {
  private apiUrl = API.MESSAGES

  async getMessages(filters?: MessageFilters): Promise<Message[]> {
    const queryParams = new URLSearchParams()
    if (filters?.startDate) queryParams.append("startDate", filters.startDate.toISOString())
    if (filters?.endDate) queryParams.append("endDate", filters.endDate.toISOString())
    if (filters?.sentiment) queryParams.append("sentiment", filters.sentiment)
    if (filters?.isStarred !== undefined) queryParams.append("isStarred", String(filters.isStarred))
    if (filters?.topic) queryParams.append("topic", filters.topic)
    if (filters?.painPoint) queryParams.append("painPoint", filters.painPoint)
    if (filters?.search) queryParams.append("search", filters.search)

    const url = `${this.apiUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch messages")
    return response.json()
  }

  async getMessagesByGroup(groupId: string, filters?: MessageFilters): Promise<Message[]> {
    const queryParams = new URLSearchParams()
    queryParams.append("groupId", groupId)
    if (filters?.startDate) queryParams.append("startDate", filters.startDate.toISOString())
    if (filters?.endDate) queryParams.append("endDate", filters.endDate.toISOString())
    if (filters?.sentiment) queryParams.append("sentiment", filters.sentiment)
    if (filters?.isStarred !== undefined) queryParams.append("isStarred", String(filters.isStarred))
    if (filters?.topic) queryParams.append("topic", filters.topic)
    if (filters?.search) queryParams.append("search", filters.search)

    const url = `${this.apiUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch messages for group ${groupId}`)
    return response.json()
  }

  async getMessagesByUser(userId: string, filters?: MessageFilters): Promise<Message[]> {
    const queryParams = new URLSearchParams()
    queryParams.append("userId", userId)
    if (filters?.startDate) queryParams.append("startDate", filters.startDate.toISOString())
    if (filters?.endDate) queryParams.append("endDate", filters.endDate.toISOString())
    if (filters?.sentiment) queryParams.append("sentiment", filters.sentiment)
    if (filters?.isStarred !== undefined) queryParams.append("isStarred", String(filters.isStarred))
    if (filters?.topic) queryParams.append("topic", filters.topic)
    if (filters?.search) queryParams.append("search", filters.search)

    const url = `${this.apiUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch messages for user ${userId}`)
    return response.json()
  }

  async getMessagesBySentiment(sentiment: SentimentType, filters?: MessageFilters): Promise<Message[]> {
    const queryParams = new URLSearchParams()
    queryParams.append("sentiment", sentiment)
    if (filters?.startDate) queryParams.append("startDate", filters.startDate.toISOString())
    if (filters?.endDate) queryParams.append("endDate", filters.endDate.toISOString())
    if (filters?.isStarred !== undefined) queryParams.append("isStarred", String(filters.isStarred))
    if (filters?.topic) queryParams.append("topic", filters.topic)
    if (filters?.search) queryParams.append("search", filters.search)

    const url = `${this.apiUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch messages with sentiment ${sentiment}`)
    return response.json()
  }

  async getMessagesByTopic(topic: string, filters?: MessageFilters): Promise<Message[]> {
    const queryParams = new URLSearchParams()
    queryParams.append("topic", topic)
    if (filters?.startDate) queryParams.append("startDate", filters.startDate.toISOString())
    if (filters?.endDate) queryParams.append("endDate", filters.endDate.toISOString())
    if (filters?.sentiment) queryParams.append("sentiment", filters.sentiment)
    if (filters?.isStarred !== undefined) queryParams.append("isStarred", String(filters.isStarred))
    if (filters?.search) queryParams.append("search", filters.search)

    const url = `${this.apiUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch messages with topic ${topic}`)
    return response.json()
  }

  async starMessage(id: string, isStarred: boolean): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}/star`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isStarred }),
    })

    if (!response.ok) throw new Error(`Failed to ${isStarred ? "star" : "unstar"} message ${id}`)
  }
}

// Singleton instance
export const messageService = new MessageService()
