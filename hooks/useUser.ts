"use client"

import { useState, useEffect } from "react"
import type { User, UserMetrics, Group, Message, PainPoint, MessageFilters } from "../types"
import { userService } from "../services/user-service"

export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const data = await userService.getUserById(id)
        setUser(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  return { user, loading, error }
}

export function useUserMetrics(id: string) {
  const [metrics, setMetrics] = useState<UserMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true)
        const data = await userService.getUserMetrics(id)
        setMetrics(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [id])

  return { metrics, loading, error }
}

export function useUserGroups(id: string) {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchGroups() {
      try {
        setLoading(true)
        const data = await userService.getUserGroups(id)
        setGroups(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [id])

  return { groups, loading, error }
}

export function useUserMessages(id: string, filters?: MessageFilters) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        const data = await userService.getUserMessages(id, filters)
        setMessages(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [id, filters])

  return { messages, loading, error }
}

export function useUserPainPoints(id: string) {
  const [painPoints, setPainPoints] = useState<PainPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPainPoints() {
      try {
        setLoading(true)
        const data = await userService.getUserPainPoints(id)
        setPainPoints(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchPainPoints()
  }, [id])

  return { painPoints, loading, error }
}
