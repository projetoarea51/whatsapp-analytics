"use client"

import { useState, useEffect } from "react"
import type { Group, GroupMetrics, GroupMember, Message, PainPoint, MessageFilters } from "../types"
import { groupService } from "../services/group-service"

export function useGroup(id: string) {
  const [group, setGroup] = useState<Group | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchGroup() {
      try {
        setLoading(true)
        const data = await groupService.getGroupById(id)
        setGroup(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchGroup()
  }, [id])

  return { group, loading, error }
}

export function useGroupMetrics(id: string) {
  const [metrics, setMetrics] = useState<GroupMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true)
        const data = await groupService.getGroupMetrics(id)
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

export function useGroupMembers(id: string) {
  const [members, setMembers] = useState<GroupMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true)
        const data = await groupService.getGroupMembers(id)
        setMembers(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [id])

  return { members, loading, error }
}

export function useGroupMessages(id: string, filters?: MessageFilters) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        const data = await groupService.getGroupMessages(id, filters)
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

export function useGroupPainPoints(id: string) {
  const [painPoints, setPainPoints] = useState<PainPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPainPoints() {
      try {
        setLoading(true)
        const data = await groupService.getGroupPainPoints(id)
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
