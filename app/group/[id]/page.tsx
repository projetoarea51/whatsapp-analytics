"use client"

import { useEffect } from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, Users, Clock } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import LoadingSkeleton from "@/_components/LoadingSkeleton"
import { PainPointsBubbleChart } from "@/components/pain-points/PainPointsBubbleChart"
import ParticipationRanking from "@/app/dashboard/components/ParticipationRanking"

// Tipos
type GroupData = {
  id: string
  name: string
  description: string
  memberCount: number
  messageCount: number
  avgResponseTime: string
  sentimentDistribution: {
    name: string
    value: number
    color: string
  }[]
  teamParticipation: {
    id: string
    name: string
    avatarUrl?: string
    messageCount: number
    responseTime: string
    responseRate: number
  }[]
  prospectSentiment: {
    id: string
    name: string
    avatarUrl?: string
    messageCount: number
    sentiment: {
      type: "positive" | "neutral" | "negative" | "confused"
      label: string
    }
  }[]
  messageActivity: {
    date: string
    count: number
  }[]
  painPoints: {
    category: string
    count: number
    keywords: string[]
  }[]
}

// Dados de exemplo
const mockGroupData: Record<string, GroupData> = {
  "G4 Scale": {
    id: "g1",
    name: "G4 Scale",
    description: "Grupo de empresários em fase de escala",
    memberCount: 48,
    messageCount: 3254,
    avgResponseTime: "8m 12s",
    sentimentDistribution: [
      { name: "Positivo", value: 45, color: "#22c55e" },
      { name: "Neutro", value: 30, color: "#f59e0b" },
      { name: "Negativo", value: 15, color: "#ef4444" },
      { name: "Confuso", value: 10, color: "#f97316" },
    ],
    teamParticipation: [
      {
        id: "t1",
        name: "Ana Souza",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 312,
        responseTime: "5m 12s",
        responseRate: 92,
      },
      {
        id: "t2",
        name: "Carlos Mendes",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 287,
        responseTime: "7m 45s",
        responseRate: 88,
      },
      {
        id: "t3",
        name: "Fernanda Lima",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 243,
        responseTime: "15m 30s",
        responseRate: 75,
      },
      {
        id: "t4",
        name: "Ricardo Alves",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 198,
        responseTime: "12m 18s",
        responseRate: 82,
      },
      {
        id: "t5",
        name: "Juliana Castro",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 176,
        responseTime: "18m 42s",
        responseRate: 70,
      },
    ],
    prospectSentiment: [
      {
        id: "p1",
        name: "João Silva",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 245,
        sentiment: { type: "positive", label: "Positivo" },
      },
      {
        id: "p2",
        name: "Maria Oliveira",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 189,
        sentiment: { type: "neutral", label: "Neutro" },
      },
      {
        id: "p3",
        name: "Roberto Santos",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 156,
        sentiment: { type: "negative", label: "Negativo" },
      },
      {
        id: "p4",
        name: "Camila Pereira",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 132,
        sentiment: { type: "confused", label: "Confuso" },
      },
      {
        id: "p5",
        name: "Miguel Costa",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 98,
        sentiment: { type: "positive", label: "Positivo" },
      },
    ],
    messageActivity: [
      { date: "2023-05-01", count: 120 },
      { date: "2023-05-02", count: 145 },
      { date: "2023-05-03", count: 98 },
      { date: "2023-05-04", count: 132 },
      { date: "2023-05-05", count: 167 },
      { date: "2023-05-06", count: 87 },
      { date: "2023-05-07", count: 76 },
    ],
    painPoints: [
      {
        category: "Preço",
        count: 45,
        keywords: ["caro", "valor", "investimento", "orçamento"],
      },
      {
        category: "Suporte",
        count: 32,
        keywords: ["atendimento", "resposta", "ajuda", "problema"],
      },
      {
        category: "Produto",
        count: 28,
        keywords: ["funcionalidade", "recurso", "bug", "erro"],
      },
      {
        category: "Prazo",
        count: 20,
        keywords: ["entrega", "atraso", "tempo", "espera"],
      },
      {
        category: "Qualidade",
        count: 15,
        keywords: ["defeito", "problema", "falha", "erro"],
      },
    ],
  },
  "G4 Club": {
    id: "g2",
    name: "G4 Club",
    description: "Grupo de networking empresarial",
    memberCount: 32,
    messageCount: 2187,
    avgResponseTime: "10m 45s",
    sentimentDistribution: [
      { name: "Positivo", value: 35, color: "#22c55e" },
      { name: "Neutro", value: 40, color: "#f59e0b" },
      { name: "Negativo", value: 20, color: "#ef4444" },
      { name: "Confuso", value: 5, color: "#f97316" },
    ],
    teamParticipation: [
      {
        id: "t1",
        name: "Ana Souza",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 278,
        responseTime: "6m 32s",
        responseRate: 90,
      },
      {
        id: "t2",
        name: "Carlos Mendes",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 245,
        responseTime: "8m 15s",
        responseRate: 85,
      },
      {
        id: "t3",
        name: "Fernanda Lima",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 210,
        responseTime: "12m 40s",
        responseRate: 78,
      },
      {
        id: "t4",
        name: "Ricardo Alves",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 187,
        responseTime: "14m 22s",
        responseRate: 75,
      },
      {
        id: "t5",
        name: "Juliana Castro",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 165,
        responseTime: "16m 18s",
        responseRate: 72,
      },
    ],
    prospectSentiment: [
      {
        id: "p1",
        name: "João Silva",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 220,
        sentiment: { type: "positive", label: "Positivo" },
      },
      {
        id: "p2",
        name: "Maria Oliveira",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 175,
        sentiment: { type: "neutral", label: "Neutro" },
      },
      {
        id: "p3",
        name: "Roberto Santos",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 142,
        sentiment: { type: "negative", label: "Negativo" },
      },
      {
        id: "p4",
        name: "Camila Pereira",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 118,
        sentiment: { type: "confused", label: "Confuso" },
      },
      {
        id: "p5",
        name: "Miguel Costa",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 87,
        sentiment: { type: "positive", label: "Positivo" },
      },
    ],
    messageActivity: [
      { date: "2023-05-01", count: 95 },
      { date: "2023-05-02", count: 112 },
      { date: "2023-05-03", count: 87 },
      { date: "2023-05-04", count: 105 },
      { date: "2023-05-05", count: 132 },
      { date: "2023-05-06", count: 76 },
      { date: "2023-05-07", count: 64 },
    ],
    painPoints: [
      {
        category: "Networking",
        count: 38,
        keywords: ["contatos", "conexões", "oportunidades", "parcerias"],
      },
      {
        category: "Eventos",
        count: 30,
        keywords: ["encontro", "workshop", "palestra", "conferência"],
      },
      {
        category: "Mentoria",
        count: 25,
        keywords: ["conselho", "orientação", "experiência", "direcionamento"],
      },
      {
        category: "Investimento",
        count: 18,
        keywords: ["capital", "financiamento", "aporte", "investidor"],
      },
      {
        category: "Mercado",
        count: 15,
        keywords: ["tendência", "concorrência", "oportunidade", "segmento"],
      },
    ],
  },
  "GE - 124": {
    id: "g3",
    name: "GE - 124",
    description: "Grupo de estudos empresariais",
    memberCount: 15,
    messageCount: 1543,
    avgResponseTime: "7m 30s",
    sentimentDistribution: [
      { name: "Positivo", value: 50, color: "#22c55e" },
      { name: "Neutro", value: 35, color: "#f59e0b" },
      { name: "Negativo", value: 10, color: "#ef4444" },
      { name: "Confuso", value: 5, color: "#f97316" },
    ],
    teamParticipation: [
      {
        id: "t1",
        name: "Ana Souza",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 245,
        responseTime: "4m 45s",
        responseRate: 95,
      },
      {
        id: "t2",
        name: "Carlos Mendes",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 210,
        responseTime: "6m 20s",
        responseRate: 92,
      },
      {
        id: "t3",
        name: "Fernanda Lima",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 187,
        responseTime: "9m 15s",
        responseRate: 85,
      },
      {
        id: "t4",
        name: "Ricardo Alves",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 165,
        responseTime: "10m 30s",
        responseRate: 80,
      },
      {
        id: "t5",
        name: "Juliana Castro",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 142,
        responseTime: "12m 45s",
        responseRate: 75,
      },
    ],
    prospectSentiment: [
      {
        id: "p1",
        name: "João Silva",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 198,
        sentiment: { type: "positive", label: "Positivo" },
      },
      {
        id: "p2",
        name: "Maria Oliveira",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 165,
        sentiment: { type: "neutral", label: "Neutro" },
      },
      {
        id: "p3",
        name: "Roberto Santos",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 132,
        sentiment: { type: "negative", label: "Negativo" },
      },
      {
        id: "p4",
        name: "Camila Pereira",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 110,
        sentiment: { type: "confused", label: "Confuso" },
      },
      {
        id: "p5",
        name: "Miguel Costa",
        avatarUrl: "/placeholder-user.jpg",
        messageCount: 78,
        sentiment: { type: "positive", label: "Positivo" },
      },
    ],
    messageActivity: [
      { date: "2023-05-01", count: 85 },
      { date: "2023-05-02", count: 98 },
      { date: "2023-05-03", count: 76 },
      { date: "2023-05-04", count: 92 },
      { date: "2023-05-05", count: 110 },
      { date: "2023-05-06", count: 65 },
      { date: "2023-05-07", count: 58 },
    ],
    painPoints: [
      {
        category: "Conhecimento",
        count: 42,
        keywords: ["aprendizado", "estudo", "conteúdo", "informação"],
      },
      {
        category: "Aplicação",
        count: 35,
        keywords: ["prática", "implementação", "execução", "resultado"],
      },
      {
        category: "Tempo",
        count: 28,
        keywords: ["disponibilidade", "agenda", "dedicação", "prioridade"],
      },
      {
        category: "Metodologia",
        count: 20,
        keywords: ["abordagem", "processo", "framework", "estrutura"],
      },
      {
        category: "Engajamento",
        count: 15,
        keywords: ["participação", "motivação", "compromisso", "interesse"],
      },
    ],
  },
}

// Componente para o gráfico de sentimento
function SentimentPieChart({ data }: { data: GroupData["sentimentDistribution"] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

// Componente para o gráfico de atividade de mensagens
function MessageActivityChart({ data }: { data: GroupData["messageActivity"] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" name="Mensagens" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}

// Componente para a lista de mensagens relacionadas a uma dor
function PainPointsMessageList({ category, messages = [] }: { category: string; messages?: any[] }) {
  // Este é um componente simplificado para mostrar mensagens relacionadas a uma dor
  // Em uma implementação real, você buscaria as mensagens do backend

  return (
    <div className="space-y-4 h-[400px] overflow-y-auto">
      {messages.length === 0 ? (
        <>
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <div className="font-medium">João Silva</div>
              <div className="text-xs text-muted-foreground">Ontem, 14:30</div>
            </div>
            <p className="text-sm">Estamos tendo problemas com {category.toLowerCase()}. Alguém pode ajudar?</p>
            <Badge className="mt-2 text-xs bg-blue-500 hover:bg-blue-600">G4 Club</Badge>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <div className="font-medium">Maria Oliveira</div>
              <div className="text-xs text-muted-foreground">Ontem, 15:45</div>
            </div>
            <p className="text-sm">
              Também estou enfrentando questões relacionadas a {category.toLowerCase()}. Precisamos discutir isso na
              próxima reunião.
            </p>
            <Badge className="mt-2 text-xs bg-blue-500 hover:bg-blue-600">G4 Club</Badge>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <div className="font-medium">Carlos Mendes</div>
              <div className="text-xs text-muted-foreground">Hoje, 09:15</div>
            </div>
            <p className="text-sm">
              Tenho uma solução para o problema de {category.toLowerCase()} que vocês estão enfrentando. Vamos conversar
              sobre isso.
            </p>
            <Badge className="mt-2 text-xs bg-blue-500 hover:bg-blue-600">G4 Club</Badge>
          </div>
        </>
      ) : (
        messages.map((message, index) => (
          <div key={index} className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <div className="font-medium">{message.sender}</div>
              <div className="text-xs text-muted-foreground">{message.timestamp}</div>
            </div>
            <p className="text-sm">{message.content}</p>
            <Badge className="mt-2 text-xs bg-blue-500 hover:bg-blue-600">{message.group}</Badge>
          </div>
        ))
      )}
    </div>
  )
}

export default function GroupPage() {
  const params = useParams()
  const router = useRouter()
  const [groupData, setGroupData] = useState<GroupData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null)

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setLoading(true)
        // Em uma implementação real, isso seria uma chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const groupId = decodeURIComponent(params.id as string)
        const data = mockGroupData[groupId]

        if (data) {
          setGroupData(data)
        }
      } catch (error) {
        console.error("Erro ao carregar dados do grupo:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGroupData()
  }, [params.id])

  const handlePainPointClick = (category: string) => {
    setSelectedPainPoint(category)
    // Em uma implementação real, aqui você filtraria as mensagens relacionadas a esta dor
    console.log(`Dor selecionada: ${category}`)
  }

  if (loading) {
    return (
      <div className="container py-10 space-y-6">
        <LoadingSkeleton height={50} />
        <div className="grid gap-6 md:grid-cols-2">
          <LoadingSkeleton height={300} />
          <LoadingSkeleton height={300} />
        </div>
        <LoadingSkeleton height={400} />
      </div>
    )
  }

  if (!groupData) {
    return (
      <div className="container py-10">
        <Button variant="outline" size="sm" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Grupo não encontrado</h2>
              <p className="text-muted-foreground">O grupo solicitado não existe ou foi removido.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            {groupData.name}
          </h1>
          <p className="text-muted-foreground">{groupData.description}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Card className="w-[140px]">
            <CardContent className="p-4 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold">{groupData.memberCount}</div>
              <p className="text-xs text-muted-foreground">Membros</p>
            </CardContent>
          </Card>

          <Card className="w-[140px]">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold">{groupData.messageCount}</div>
              <p className="text-xs text-muted-foreground">Mensagens</p>
            </CardContent>
          </Card>

          <Card className="w-[140px]">
            <CardContent className="p-4 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold">{groupData.avgResponseTime}</div>
              <p className="text-xs text-muted-foreground">Tempo médio</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gráficos de sentimento e atividade */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Sentimento</CardTitle>
            <CardDescription>Análise de sentimento das mensagens no grupo</CardDescription>
          </CardHeader>
          <CardContent>
            <SentimentPieChart data={groupData.sentimentDistribution} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade de Mensagens</CardTitle>
            <CardDescription>Volume de mensagens por dia</CardDescription>
          </CardHeader>
          <CardContent>
            <MessageActivityChart data={groupData.messageActivity} />
          </CardContent>
        </Card>
      </div>

      {/* Rankings de participação */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ranking de Participação (Prospects)</CardTitle>
            <CardDescription>Prospects mais ativos no grupo</CardDescription>
          </CardHeader>
          <CardContent>
            <ParticipationRanking type="prospects" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ranking de Participação (Equipe)</CardTitle>
            <CardDescription>Membros da equipe mais ativos no grupo</CardDescription>
          </CardHeader>
          <CardContent>
            <ParticipationRanking type="team" />
          </CardContent>
        </Card>
      </div>

      {/* Dores e Mensagens */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Principais Dores</CardTitle>
            <CardDescription>Tópicos mais discutidos no grupo</CardDescription>
          </CardHeader>
          <CardContent>
            <PainPointsBubbleChart
              painPoints={groupData.painPoints}
              onBubbleClick={handlePainPointClick}
              selectedCategory={selectedPainPoint}
              height={400}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mensagens Relacionadas</CardTitle>
            <CardDescription>
              {selectedPainPoint
                ? `Mensagens sobre "${selectedPainPoint}"`
                : "Selecione uma dor para ver mensagens relacionadas"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto">
            {!selectedPainPoint ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Clique em uma dor para ver mensagens relacionadas
              </div>
            ) : (
              <PainPointsMessageList category={selectedPainPoint} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
