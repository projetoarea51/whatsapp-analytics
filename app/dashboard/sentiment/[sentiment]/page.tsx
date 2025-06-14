"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Star } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import LoadingSkeleton from "@/_components/LoadingSkeleton"

type SentimentMessage = {
  id: string
  content: string
  timestamp: Date
  group: {
    id: string
    name: string
  }
  sender: {
    id: string
    name: string
    avatarUrl?: string
  }
  sentiment: {
    emoji: string
    label: string
  }
}

// Dados de exemplo para mensagens por sentimento
const mockSentimentMessages: Record<string, SentimentMessage[]> = {
  Feliz: [
    {
      id: "1",
      content: "Estou muito satisfeito com o atendimento da equipe. Vocês são excelentes!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
      group: {
        id: "g1",
        name: "G4 Scale",
      },
      sender: {
        id: "s1",
        name: "João Silva",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "😊",
        label: "Feliz",
      },
    },
    {
      id: "2",
      content: "O produto superou todas as minhas expectativas. Parabéns pelo trabalho!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
      group: {
        id: "g2",
        name: "G4 Club",
      },
      sender: {
        id: "s2",
        name: "Maria Oliveira",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "😊",
        label: "Feliz",
      },
    },
    {
      id: "3",
      content: "Acabei de receber a proposta e estou muito animado para começarmos a parceria!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
      group: {
        id: "g3",
        name: "GE - 124",
      },
      sender: {
        id: "s3",
        name: "Roberto Santos",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "😊",
        label: "Feliz",
      },
    },
  ],
  Neutro: [
    {
      id: "4",
      content: "Preciso de mais informações sobre o produto antes de tomar uma decisão.",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutos atrás
      group: {
        id: "g1",
        name: "G4 Scale",
      },
      sender: {
        id: "s4",
        name: "Camila Pereira",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "😐",
        label: "Neutro",
      },
    },
    {
      id: "5",
      content: "Vou analisar a proposta e retorno em breve com minha decisão.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
      group: {
        id: "g2",
        name: "G4 Club",
      },
      sender: {
        id: "s5",
        name: "Miguel Costa",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "😐",
        label: "Neutro",
      },
    },
  ],
  Dúvida: [
    {
      id: "6",
      content: "Como funciona exatamente o processo de implementação? Não ficou claro para mim.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutos atrás
      group: {
        id: "g3",
        name: "GE - 124",
      },
      sender: {
        id: "s6",
        name: "Ana Souza",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "🤔",
        label: "Dúvida",
      },
    },
    {
      id: "7",
      content: "Qual é o prazo de entrega? Precisamos implementar isso o quanto antes.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hora atrás
      group: {
        id: "g1",
        name: "G4 Scale",
      },
      sender: {
        id: "s7",
        name: "Carlos Mendes",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "🤔",
        label: "Dúvida",
      },
    },
  ],
  Raiva: [
    {
      id: "8",
      content: "Estou muito insatisfeito com o atraso na entrega. Isso é inaceitável!",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
      group: {
        id: "g2",
        name: "G4 Club",
      },
      sender: {
        id: "s8",
        name: "Fernanda Lima",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "😠",
        label: "Raiva",
      },
    },
    {
      id: "9",
      content: "Já é a terceira vez que o sistema falha esta semana. Isso está prejudicando nosso trabalho!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 horas atrás
      group: {
        id: "g3",
        name: "GE - 124",
      },
      sender: {
        id: "s9",
        name: "Ricardo Alves",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "😠",
        label: "Raiva",
      },
    },
  ],
  Triste: [
    {
      id: "10",
      content: "Infelizmente não conseguiremos continuar com o projeto devido a restrições orçamentárias.",
      timestamp: new Date(Date.now() - 1000 * 60 * 50), // 50 minutos atrás
      group: {
        id: "g1",
        name: "G4 Scale",
      },
      sender: {
        id: "s10",
        name: "Juliana Castro",
        avatarUrl: "/placeholder-user.jpg",
      },
      sentiment: {
        emoji: "😢",
        label: "Triste",
      },
    },
  ],
}

export default function SentimentPage() {
  const params = useParams()
  const router = useRouter()
  const sentiment = decodeURIComponent(params.sentiment as string)
  const [messages, setMessages] = useState<SentimentMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [starredMessages, setStarredMessages] = useState<Set<string>>(new Set())

  // Dados de exemplo para grupos
  const groups = [
    { id: "all", name: "Todos os Grupos" },
    { id: "g1", name: "G4 Scale" },
    { id: "g2", name: "G4 Club" },
    { id: "g3", name: "GE - 124" },
  ]

  useEffect(() => {
    // Simular carregamento de dados
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        // Em uma implementação real, isso seria uma chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Obter mensagens para o sentimento selecionado
        const sentimentMessages = mockSentimentMessages[sentiment] || []
        setMessages(sentimentMessages)
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [sentiment])

  // Filtrar mensagens por grupo
  const filteredMessages =
    selectedGroup === "all" ? messages : messages.filter((message) => message.group.id === selectedGroup)

  // Obter o emoji correspondente ao sentimento
  const sentimentEmoji = messages[0]?.sentiment.emoji || getSentimentEmoji(sentiment)

  function getSentimentEmoji(sentimentLabel: string): string {
    switch (sentimentLabel) {
      case "Feliz":
        return "😊"
      case "Neutro":
        return "😐"
      case "Dúvida":
        return "🤔"
      case "Raiva":
        return "😠"
      case "Triste":
        return "😢"
      default:
        return "😐"
    }
  }

  // Função para alternar o estado de marcação com estrela
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

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-3xl">{sentimentEmoji}</span>
            <span>Mensagens com Sentimento: {sentiment}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por grupo" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="modernize-card">
        <CardHeader>
          <CardTitle>Log de Mensagens</CardTitle>
          <CardDescription>Mensagens categorizadas com o sentimento "{sentiment}"</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <LoadingSkeleton key={i} height={100} />
              ))}
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma mensagem encontrada com este sentimento.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div key={message.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.sender.avatarUrl || "/placeholder.svg"} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{message.sender.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>{format(message.timestamp, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {message.group.name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleStar(message.id)}>
                        <Star
                          className={cn(
                            "h-5 w-5",
                            starredMessages.has(message.id)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground",
                          )}
                        />
                        <span className="sr-only">
                          {starredMessages.has(message.id) ? "Desmarcar" : "Marcar"} mensagem
                        </span>
                      </Button>
                      <span className="text-xl">{message.sentiment.emoji}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-2">{message.content}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
