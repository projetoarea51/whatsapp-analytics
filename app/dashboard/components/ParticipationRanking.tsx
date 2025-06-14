"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type Participant = {
  id: string
  name: string
  company: string
  role: string
  avatarUrl: string
  groups: string[]
  messageCount: number
  sentiment?: {
    type: "positive" | "neutral" | "negative" | "confused"
    label: string
  }
  responseTime?: {
    speed: "fast" | "normal" | "slow"
    averageTime: string
  }
}

// Dados de exemplo para prospects
const mockProspects: Participant[] = [
  {
    id: "1",
    name: "João Silva",
    company: "Acme Inc.",
    role: "Diretor Comercial",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Club", "GE - 124"],
    messageCount: 245,
    sentiment: { type: "positive", label: "Positivo" },
  },
  {
    id: "2",
    name: "Maria Oliveira",
    company: "XYZ Corp",
    role: "CEO",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Alumni"],
    messageCount: 189,
    sentiment: { type: "neutral", label: "Neutro" },
  },
  {
    id: "3",
    name: "Roberto Santos",
    company: "Tech Solutions",
    role: "CTO",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["GE - 124", "G4 Club"],
    messageCount: 156,
    sentiment: { type: "negative", label: "Negativo" },
  },
  {
    id: "4",
    name: "Camila Pereira",
    company: "Support Co",
    role: "Diretora de Marketing",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Alumni"],
    messageCount: 132,
    sentiment: { type: "confused", label: "Confuso" },
  },
  {
    id: "5",
    name: "Miguel Costa",
    company: "Dev Team Inc",
    role: "Gerente de Produto",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["GE - 124", "G4 Club"],
    messageCount: 98,
    sentiment: { type: "positive", label: "Positivo" },
  },
]

// Dados de exemplo para equipe
const mockTeam: Participant[] = [
  {
    id: "6",
    name: "Ana Souza",
    company: "Nossa Empresa",
    role: "Gerente de Vendas",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Club", "GE - 124"],
    messageCount: 312,
    responseTime: {
      speed: "fast",
      averageTime: "5m 12s",
    },
  },
  {
    id: "7",
    name: "Carlos Mendes",
    company: "Nossa Empresa",
    role: "Consultor de Vendas",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Alumni"],
    messageCount: 287,
    responseTime: {
      speed: "fast",
      averageTime: "7m 45s",
    },
  },
  {
    id: "8",
    name: "Fernanda Lima",
    company: "Nossa Empresa",
    role: "Atendimento ao Cliente",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["GE - 124", "G4 Club"],
    messageCount: 243,
    responseTime: {
      speed: "normal",
      averageTime: "15m 30s",
    },
  },
  {
    id: "9",
    name: "Ricardo Alves",
    company: "Nossa Empresa",
    role: "Consultor de Vendas",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Alumni"],
    messageCount: 198,
    responseTime: {
      speed: "slow",
      averageTime: "32m 18s",
    },
  },
  {
    id: "10",
    name: "Juliana Castro",
    company: "Nossa Empresa",
    role: "Gerente de Marketing",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["GE - 124", "G4 Club"],
    messageCount: 176,
    responseTime: {
      speed: "normal",
      averageTime: "18m 42s",
    },
  },
]

type ParticipationRankingProps = {
  type: "prospects" | "team"
}

export default function ParticipationRanking({ type }: ParticipationRankingProps) {
  const [participants] = useState<Participant[]>(type === "prospects" ? mockProspects : mockTeam)
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const totalPages = Math.ceil(participants.length / limit)

  // Função para determinar a URL do perfil com base no tipo
  const getProfileUrl = (id: string) => {
    return type === "prospects" ? `/client/${id}` : `/team/${id}`
  }

  const getSentimentBadgeClass = (sentimentType?: "positive" | "neutral" | "negative" | "confused") => {
    if (!sentimentType) return ""

    switch (sentimentType) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "neutral":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "confused":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return ""
    }
  }

  const getSpeedBadgeClass = (speed?: "fast" | "normal" | "slow") => {
    if (!speed) return ""

    switch (speed) {
      case "fast":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "normal":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "slow":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return ""
    }
  }

  const getSpeedEmoji = (speed?: "fast" | "normal" | "slow") => {
    if (!speed) return ""
    switch (speed) {
      case "fast":
        return "⚡"
      case "normal":
        return "🟡"
      case "slow":
        return "🐢"
      default:
        return ""
    }
  }

  const getSentimentEmoji = (sentimentType?: "positive" | "neutral" | "negative" | "confused") => {
    if (!sentimentType) return ""

    switch (sentimentType) {
      case "positive":
        return "😊"
      case "neutral":
        return "😐"
      case "negative":
        return "😠"
      case "confused":
        return "🤔"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="space-y-0">
        {participants.slice((page - 1) * limit, page * limit).map((participant, index) => (
          <div key={participant.id}>
            <div className="p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3 mb-1.5">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={participant.avatarUrl || "/placeholder.svg"} alt={participant.name} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Link href={getProfileUrl(participant.id)} className="text-sm font-normal hover:underline">
                      {participant.name}
                    </Link>

                    {type === "prospects" && participant.sentiment && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-normal px-2 py-0.5",
                          getSentimentBadgeClass(participant.sentiment.type),
                        )}
                      >
                        {getSentimentEmoji(participant.sentiment.type)} {participant.sentiment.label}
                      </Badge>
                    )}

                    {type === "team" && participant.responseTime && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-normal px-2 py-0.5",
                          getSpeedBadgeClass(participant.responseTime.speed),
                        )}
                      >
                        {getSpeedEmoji(participant.responseTime.speed)}{" "}
                        {participant.responseTime.speed === "fast"
                          ? "Rápido"
                          : participant.responseTime.speed === "normal"
                            ? "Normal"
                            : "Lento"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="outline" className="text-xs font-normal">
                      {participant.company}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-normal">
                      {participant.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-1.5">
                <div className="flex flex-wrap gap-1">
                  {participant.groups.slice(0, 2).map((group, idx) => (
                    <Link href={`/group/${encodeURIComponent(group)}`} key={idx}>
                      <Badge variant="outline" className="text-xs font-normal hover:bg-muted cursor-pointer">
                        {group}
                      </Badge>
                    </Link>
                  ))}
                  {participant.groups.length > 2 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{participant.groups.length - 2}
                    </Badge>
                  )}
                </div>
                <div className="text-right flex items-center gap-3">
                  {type === "team" && participant.responseTime && (
                    <div>
                      <div className="text-xs font-normal text-muted-foreground">Tempo médio</div>
                      <div className="text-sm font-normal">{participant.responseTime.averageTime}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-normal text-muted-foreground">Mensagens</div>
                    <div className="text-sm font-normal">{participant.messageCount}</div>
                  </div>
                </div>
              </div>
            </div>
            {index < participants.slice((page - 1) * limit, page * limit).length - 1 && <Separator className="my-1" />}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-normal">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
