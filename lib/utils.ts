import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { SentimentType, ResponseSpeedType } from "@/types"

// Sentiment mapping
export const SENTIMENT_MAP = {
  positive: {
    emoji: "😊",
    label: "Positivo",
    color: "bg-green-500",
    textColor: "text-green-500",
  },
  neutral: {
    emoji: "😐",
    label: "Neutro",
    color: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
  negative: {
    emoji: "😔",
    label: "Negativo",
    color: "bg-red-500",
    textColor: "text-red-500",
  },
  confused: {
    emoji: "🤔",
    label: "Confuso",
    color: "bg-orange-500",
    textColor: "text-orange-500",
  },
}

// Response speed mapping
export const RESPONSE_SPEED_MAP = {
  fast: {
    emoji: "⚡",
    label: "Rápido",
    color: "bg-green-500",
    textColor: "text-green-500",
    thresholdSeconds: 300, // 5 minutes
  },
  normal: {
    emoji: "⏱️",
    label: "Normal",
    color: "bg-yellow-500",
    textColor: "text-yellow-500",
    thresholdSeconds: 1800, // 30 minutes
  },
  slow: {
    emoji: "🐢",
    label: "Lento",
    color: "bg-red-500",
    textColor: "text-red-500",
    thresholdSeconds: Number.POSITIVE_INFINITY,
  },
}

// Função para combinar classes do Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilitários para sentimento
export function getSentimentInfo(sentiment: SentimentType) {
  return SENTIMENT_MAP[sentiment]
}

export function getSentimentColor(sentiment: SentimentType): string {
  return SENTIMENT_MAP[sentiment].color
}

export function getSentimentEmoji(sentiment: SentimentType): string {
  return SENTIMENT_MAP[sentiment].emoji
}

export function getSentimentLabel(sentiment: SentimentType): string {
  return SENTIMENT_MAP[sentiment].label
}

// Utilitários para velocidade de resposta
export function getResponseSpeedInfo(speed: ResponseSpeedType) {
  return RESPONSE_SPEED_MAP[speed]
}

export function getResponseSpeedColor(speed: ResponseSpeedType): string {
  return RESPONSE_SPEED_MAP[speed].color
}

export function getResponseSpeedEmoji(speed: ResponseSpeedType): string {
  return RESPONSE_SPEED_MAP[speed].emoji
}

export function getResponseSpeedLabel(speed: ResponseSpeedType): string {
  return RESPONSE_SPEED_MAP[speed].label
}

export function calculateResponseSpeed(responseTimeSeconds: number): ResponseSpeedType {
  if (responseTimeSeconds <= RESPONSE_SPEED_MAP.fast.thresholdSeconds) {
    return "fast"
  } else if (responseTimeSeconds <= RESPONSE_SPEED_MAP.normal.thresholdSeconds) {
    return "normal"
  } else {
    return "slow"
  }
}

// Função para formatar data e hora
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Função para formatar apenas a data
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

// Função para formatar apenas a hora
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Função para formatar segundos em formato legível
export function formatSeconds(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
  } else {
    const hours = Math.floor(seconds / 3600)
    const remainingMinutes = Math.floor((seconds % 3600) / 60)
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }
}

// Função para truncar texto
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Função para gerar cores aleatórias consistentes
export function getConsistentColor(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 70%, 50%)`
}

// Função para calcular a diferença entre duas datas em dias
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000 // horas*minutos*segundos*milissegundos
  const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay))
  return diffDays
}

// Função para verificar se uma data é hoje
export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

// Função para verificar se uma data é ontem
export function isYesterday(date: Date): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  )
}

// Função para formatar data relativa (hoje, ontem, etc.)
export function formatRelativeDate(date: Date): string {
  if (isToday(date)) {
    return `Hoje, ${formatTime(date)}`
  } else if (isYesterday(date)) {
    return `Ontem, ${formatTime(date)}`
  } else {
    return formatDateTime(date)
  }
}
