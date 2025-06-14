"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Message = {
  id: string
  content: string
  timestamp: Date
  sender: {
    name: string
    avatarUrl?: string
  }
  isOutgoing?: boolean
}

type PainPointData = {
  id: string
  name: string
  messages: Message[]
}

// Dados de exemplo para dores
const painPointsData: PainPointData[] = [
  {
    id: "p1",
    name: "Preço",
    messages: [
      {
        id: "m1",
        content: "O valor está muito acima do que esperávamos. Precisamos renegociar.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
        sender: {
          name: "João Silva",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m2",
        content: "Nosso orçamento é limitado e não conseguimos arcar com esse investimento no momento.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 dia atrás
        sender: {
          name: "Maria Oliveira",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
    ],
  },
  {
    id: "p2",
    name: "Suporte",
    messages: [
      {
        id: "m3",
        content: "Estamos esperando resposta do suporte há mais de 48 horas.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutos atrás
        sender: {
          name: "Roberto Santos",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m4",
        content: "O atendimento precisa melhorar, não conseguimos resolver nossos problemas.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
        sender: {
          name: "Camila Pereira",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
    ],
  },
  {
    id: "p3",
    name: "Produto",
    messages: [
      {
        id: "m5",
        content: "A funcionalidade prometida não está funcionando como deveria.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
        sender: {
          name: "Miguel Costa",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m6",
        content: "Encontramos vários bugs na última atualização do sistema.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
        sender: {
          name: "Ana Souza",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
    ],
  },
]

export default function GroupMessageFilter({ painPointName }: { painPointName: string | null }) {
  const [starredMessages, setStarredMessages] = useState<Set<string>>(new Set())

  const toggleStar = (messageId: string) => {
    setStarredMessages((prev) => {
      const newStarred = new Set(prev)
      if (newStarred.has(messageId)) {
        newStarred.delete(messageId)
      } else {
        newStarred.add(messageId)
      }
      return newStarred
    })
  }

  // Encontrar a dor selecionada
  const currentPainPoint = painPointName
    ? painPointsData.find((p) => p.name.toLowerCase() === painPointName.toLowerCase())
    : null
  const messages = currentPainPoint?.messages || []

  return (
    <div className="space-y-4">
      {/* Filtros como tags */}
      <div className="flex flex-wrap gap-2">
        {painPointsData.map((painPoint) => (
          <Badge
            key={painPoint.id}
            variant={painPointName === painPoint.name ? "default" : "outline"}
            className={cn("cursor-pointer text-sm py-1 px-3", painPointName === painPoint.name ? "bg-primary" : "")}
          >
            {painPoint.name}
          </Badge>
        ))}
      </div>

      {/* Mensagens estilo WhatsApp */}
      <div
        className="rounded-md p-3 space-y-3 max-h-[350px] overflow-y-auto"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAAtElEQVRIDe2UMQ6DMAxFMXTgGr0dR+AQHSvEyh04AGJlZOAAnKD8Iq8qRSRumoGWv8R27H+2lBZFPnmSPYVQ1ZTqvR9TSqO1di2K4gA+UmEKwxhzJdDzvJG5yTVTzDnfCRTLsqxUvfdXeZVJ4DdYBQTZYEzQDXYBQRIYE5jBISBIBGOCbtAFBAlgTGAGbUCQDYwJTGBuEORUhtU7xgS/g/MnEGSBMcHmYBMQJIIxwTdYBQRZYHzGE/iMdQyrJPUwAAAAAElFTkSuQmCC")`,
          backgroundColor: "#e5ddd5",
        }}
      >
        {painPointName === null ? (
          <div className="text-center py-8 text-muted-foreground">
            Selecione uma dor para ver as mensagens relacionadas
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Nenhuma mensagem encontrada para esta dor</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={cn("flex", message.isOutgoing ? "justify-end" : "justify-start")}>
              <div className="flex flex-col max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  {!message.isOutgoing && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={message.sender.avatarUrl || "/placeholder.svg"} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="text-xs font-medium">{message.sender.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(message.timestamp, "HH:mm", { locale: ptBR })}
                  </span>
                </div>
                <div
                  className={cn(
                    "relative px-3 py-2 rounded-lg text-sm",
                    message.isOutgoing ? "bg-[#dcf8c6] text-gray-800" : "bg-white text-gray-800",
                    "shadow-sm",
                  )}
                >
                  <div className="flex justify-between gap-2">
                    <p>{message.content}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 -mr-1 -mt-1 opacity-70 hover:opacity-100"
                      onClick={() => toggleStar(message.id)}
                    >
                      <Star
                        className={cn(
                          "h-3 w-3",
                          starredMessages.has(message.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-500",
                        )}
                      />
                      <span className="sr-only">
                        {starredMessages.has(message.id) ? "Desmarcar" : "Marcar"} mensagem
                      </span>
                    </Button>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <Badge className="text-[10px] py-0 px-1 h-4 bg-blue-500 text-white hover:bg-blue-600">
                      G4 Scale
                    </Badge>
                    <span className="text-[10px] text-gray-500">
                      {format(message.timestamp, "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
