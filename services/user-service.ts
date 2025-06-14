import type { User, UserMetrics, Group, Message, MessageFilters, UserFilters, PainPoint } from "../types"
import { API } from "../lib/constants"

export class UserService {
  private apiUrl = API.USERS

  async getUsers(filters?: UserFilters): Promise<User[]> {
    const queryParams = new URLSearchParams()
    if (filters?.isTeamMember !== undefined) queryParams.append("isTeamMember", String(filters.isTeamMember))
    if (filters?.sentiment) queryParams.append("sentiment", filters.sentiment)
    if (filters?.responseSpeed) queryParams.append("responseSpeed", filters.responseSpeed)
    if (filters?.groupId) queryParams.append("groupId", filters.groupId)
    if (filters?.search) queryParams.append("search", filters.search)
    if (filters?.startDate) queryParams.append("startDate", filters.startDate.toISOString())
    if (filters?.endDate) queryParams.append("endDate", filters.endDate.toISOString())

    const url = `${this.apiUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch users")
    return response.json()
  }

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${this.apiUrl}/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch user ${id}`)
    return response.json()
  }

  async getUserMetrics(id: string): Promise<UserMetrics> {
    const response = await fetch(`${this.apiUrl}/${id}/metrics`)
    if (!response.ok) throw new Error(`Failed to fetch metrics for user ${id}`)
    return response.json()
  }

  async getUserGroups(id: string): Promise<Group[]> {
    const response = await fetch(`${this.apiUrl}/${id}/groups`)
    if (!response.ok) throw new Error(`Failed to fetch groups for user ${id}`)
    return response.json()
  }

  async getUserMessages(id: string, filters?: MessageFilters): Promise<Message[]> {
    const queryParams = new URLSearchParams()
    if (filters?.startDate) queryParams.append("startDate", filters.startDate.toISOString())
    if (filters?.endDate) queryParams.append("endDate", filters.endDate.toISOString())
    if (filters?.sentiment) queryParams.append("sentiment", filters.sentiment)
    if (filters?.isStarred !== undefined) queryParams.append("isStarred", String(filters.isStarred))
    if (filters?.topic) queryParams.append("topic", filters.topic)
    if (filters?.search) queryParams.append("search", filters.search)

    const url = `${this.apiUrl}/${id}/messages?${queryParams.toString()}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch messages for user ${id}`)
    return response.json()
  }

  async getUserPainPoints(id: string): Promise<PainPoint[]> {
    const response = await fetch(`${this.apiUrl}/${id}/pain-points`)
    if (!response.ok) throw new Error(`Failed to fetch pain points for user ${id}`)
    return response.json()
  }
}

// Singleton instance
export const userService = new UserService()
