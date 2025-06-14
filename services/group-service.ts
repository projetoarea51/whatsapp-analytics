import type { Group, GroupMetrics, GroupMember, Message, MessageFilters, PainPoint } from "../types"
import { API } from "../lib/constants"

export class GroupService {
  private apiUrl = API.GROUPS

  async getGroups(): Promise<Group[]> {
    const response = await fetch(this.apiUrl)
    if (!response.ok) throw new Error("Failed to fetch groups")
    return response.json()
  }

  async getGroupById(id: string): Promise<Group> {
    const response = await fetch(`${this.apiUrl}/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch group ${id}`)
    return response.json()
  }

  async getGroupMetrics(id: string): Promise<GroupMetrics> {
    const response = await fetch(`${this.apiUrl}/${id}/metrics`)
    if (!response.ok) throw new Error(`Failed to fetch metrics for group ${id}`)
    return response.json()
  }

  async getGroupMembers(id: string): Promise<GroupMember[]> {
    const response = await fetch(`${this.apiUrl}/${id}/members`)
    if (!response.ok) throw new Error(`Failed to fetch members for group ${id}`)
    return response.json()
  }

  async getGroupMessages(id: string, filters?: MessageFilters): Promise<Message[]> {
    const queryParams = new URLSearchParams()
    if (filters?.startDate) queryParams.append("startDate", filters.startDate.toISOString())
    if (filters?.endDate) queryParams.append("endDate", filters.endDate.toISOString())
    if (filters?.sentiment) queryParams.append("sentiment", filters.sentiment)
    if (filters?.isStarred !== undefined) queryParams.append("isStarred", String(filters.isStarred))
    if (filters?.topic) queryParams.append("topic", filters.topic)
    if (filters?.search) queryParams.append("search", filters.search)

    const url = `${this.apiUrl}/${id}/messages?${queryParams.toString()}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch messages for group ${id}`)
    return response.json()
  }

  async getGroupPainPoints(id: string): Promise<PainPoint[]> {
    const response = await fetch(`${this.apiUrl}/${id}/pain-points`)
    if (!response.ok) throw new Error(`Failed to fetch pain points for group ${id}`)
    return response.json()
  }
}

// Singleton instance
export const groupService = new GroupService()
