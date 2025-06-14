"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Users, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Link from "next/link"

type GroupData = {
  id: string
  name: string
  teamMembers: {
    id: string
    name: string
    avatarUrl?: string
  }[]
  sentiment: "positive" | "neutral" | "negative" | "confused"
  sentimentSince: Date
  responseTime: string
  responseSpeed: "fast" | "normal" | "slow"
  messageCount: number
}

// Dados de exemplo
const mockGroups: GroupData[] = [
  {
    id: "1",
    name: "Grupo de Marketing",
    teamMembers: [
      { id: "1", name: "Ana Souza", avatarUrl: "/woman-with-glasses.png" },
      { id: "2", name: "Carlos Silva", avatarUrl: "/thoughtful-man.png" },
      { id: "3", name: "Mariana Costa" },
    ],
    sentiment: "positive",
    sentimentSince: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    responseTime: "5m 23s",
    responseSpeed: "fast",
    messageCount: 234,
  },
  {
    id: "2",
    name: "Suporte ao Cliente",
    teamMembers: [
      { id: "2", name: "Carlos Silva", avatarUrl: "/thoughtful-man.png" },
      { id: "4", name: "Pedro Alves" },
    ],
    sentiment: "negative",
    sentimentSince: new Date(Date.now() - 1000 * 60 * 60 * 12),
    responseTime: "15m 47s",
    responseSpeed: "slow",
    messageCount: 187,
  },
  {
    id: "3",
    name: "Vendas B2B",
    teamMembers: [
      { id: "1", name: "Ana Souza", avatarUrl: "/woman-with-glasses.png" },
      { id: "5", name: "Juliana Mendes", avatarUrl: "/diverse-woman-portrait.png" },
    ],
    sentiment: "neutral",
    sentimentSince: new Date(Date.now() - 1000 * 60 * 60 * 48),
    responseTime: "8m 12s",
    responseSpeed: "normal",
    messageCount: 156,
  },
  {
    id: "4",
    name: "Feedback de Produto",
    teamMembers: [
      { id: "3", name: "Mariana Costa" },
      { id: "6", name: "Roberto Gomes" },
    ],
    sentiment: "confused",
    sentimentSince: new Date(Date.now() - 1000 * 60 * 60 * 6),
    responseTime: "10m 35s",
    responseSpeed: "normal",
    messageCount: 98,
  },
  {
    id: "5",
    name: "Parceiros Estratégicos",
    teamMembers: [
      { id: "2", name: "Carlos Silva", avatarUrl: "/thoughtful-man.png" },
      { id: "5", name: "Juliana Mendes", avatarUrl: "/diverse-woman-portrait.png" },
      { id: "6", name: "Roberto Gomes" },
    ],
    sentiment: "positive",
    sentimentSince: new Date(Date.now() - 1000 * 60 * 60 * 72),
    responseTime: "4m 45s",
    responseSpeed: "fast",
    messageCount: 143,
  },
]

export default function GroupsOverview() {
  const [groups] = useState<GroupData[]>(mockGroups)

  const getSentimentBadgeClass = (sentimentType: "positive" | "neutral" | "negative" | "confused") => {
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

  const getSpeedBadgeClass = (speed: "fast" | "normal" | "slow") => {
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

  const getSpeedEmoji = (speed: "fast" | "normal" | "slow") => {
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

  const getSentimentEmoji = (sentimentType: "positive" | "neutral" | "negative" | "confused") => {
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

  const getSentimentLabel = (sentimentType: "positive" | "neutral" | "negative" | "confused") => {
    switch (sentimentType) {
      case "positive":
        return "Positivo"
      case "neutral":
        return "Neutro"
      case "negative":
        return "Negativo"
      case "confused":
        return "Confuso"
      default:
        return ""
    }
  }

  const getSpeedLabel = (speed: "fast" | "normal" | "slow") => {
    switch (speed) {
      case "fast":
        return "Rápido"
      case "normal":
        return "Normal"
      case "slow":
        return "Lento"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="space-y-0">
        {groups.map((group, index) => (
          <div key={group.id}>
            <div className="p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Link href={`/group/${group.id}`} className="text-sm font-normal hover:underline">
                      {group.name}
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={cn("text-xs font-normal px-2 py-0.5", getSentimentBadgeClass(group.sentiment))}
                    >
                      {getSentimentEmoji(group.sentiment)} {getSentimentLabel(group.sentiment)}
                    </Badge>

                    <Badge
                      variant="outline"
                      className={cn("text-xs font-normal px-2 py-0.5", getSpeedBadgeClass(group.responseSpeed))}
                    >
                      {getSpeedEmoji(group.responseSpeed)} {getSpeedLabel(group.responseSpeed)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-1.5 space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>Equipe:</span>
                  <div className="flex -space-x-1 mr-1">
                    {group.teamMembers.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="h-6 w-6 border border-background">
                        {member.avatarUrl ? (
                          <AvatarImage src={member.avatarUrl || "/placeholder.svg"} alt={member.name} />
                        ) : (
                          <AvatarFallback className="text-[10px]">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    ))}
                    {group.teamMembers.length > 3 && (
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarFallback className="text-[10px] bg-muted">
                          +{group.teamMembers.length - 3}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <span>
                    {group.teamMembers
                      .slice(0, 2)
                      .map((m) => m.name.split(" ")[0])
                      .join(", ")}
                    {group.teamMembers.length > 2 && ` e mais ${group.teamMembers.length - 2}`}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>TMR: {group.responseTime}</span>
                  </div>

                  <div className="text-right">
                    <span>Sentimento há {formatDistanceToNow(group.sentimentSince, { locale: ptBR })}</span>
                  </div>
                </div>
              </div>
            </div>
            {index < groups.length - 1 && <Separator className="my-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}
