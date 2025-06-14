"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Mail, MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"
import { PainPointsBubbleChart } from "../../../components/pain-points/PainPointsBubbleChart"
import { PainPointsMessageList } from "../../../components/pain-points/PainPointsMessageList"

// Mock data for the team member profile
const teamMemberData = {
  id: "6",
  name: "Ana Souza",
  role: "Gerente de Vendas",
  department: "Comercial",
  avatar: "/diverse-woman-portrait.png",
  email: "ana.souza@nossaempresa.com",
  phone: "+55 11 98765-4321",
  location: "São Paulo, SP",
  joinedDate: "Janeiro 2021",
  bio: "Gerente de Vendas com foco em desenvolvimento de equipes e estratégias de crescimento para mercados B2B.",
  groups: ["G4 Scale", "G4 Club", "GE - 124"],
  skills: ["Liderança", "Negociação", "CRM", "Gestão de Equipes", "Vendas B2B"],
  performance: {
    responseTime: 2.3, // minutos
    responseRate: 98, // percentual
    messagesPerDay: 45,
    clientSatisfaction: 92, // percentual
    conversionRate: 28, // percentual
  },
  conversations: [
    {
      id: "c1",
      date: "2023-05-10T14:30:00",
      group: "G4 Scale",
      client: "João Silva",
      clientId: "1",
      message: "Vamos agendar uma reunião para discutir a proposta comercial na próxima semana.",
      sentiment: "positive",
      isMarked: false,
    },
    {
      id: "c2",
      date: "2023-05-08T10:15:00",
      group: "G4 Club",
      client: "Maria Oliveira",
      clientId: "2",
      message: "Entendi suas necessidades. Vou preparar uma apresentação personalizada para sua equipe.",
      sentiment: "positive",
      isMarked: true,
    },
    {
      id: "c3",
      date: "2023-05-05T16:45:00",
      group: "GE - 124",
      client: "Roberto Santos",
      clientId: "3",
      message: "Lamento o atraso na entrega. Estamos trabalhando para resolver esse problema o mais rápido possível.",
      sentiment: "negative",
      isMarked: false,
    },
    {
      id: "c4",
      date: "2023-05-03T09:30:00",
      group: "G4 Scale",
      client: "Camila Pereira",
      clientId: "4",
      message: "Vou verificar com o time de produto e retorno com mais informações sobre essa funcionalidade.",
      sentiment: "neutral",
      isMarked: false,
    },
    {
      id: "c5",
      date: "2023-04-28T11:20:00",
      group: "G4 Club",
      client: "Miguel Costa",
      clientId: "5",
      message: "Ótimo! Fico feliz que a solução atendeu às suas expectativas. Conte conosco para o suporte contínuo.",
      sentiment: "positive",
      isMarked: true,
    },
  ],
  feedbacks: [
    {
      id: "f1",
      date: "2023-05-12",
      client: "João Silva",
      clientId: "1",
      rating: 5,
      comment: "Excelente atendimento. A Ana foi muito atenciosa e resolveu nosso problema rapidamente.",
    },
    {
      id: "f2",
      date: "2023-05-05",
      client: "Maria Oliveira",
      clientId: "2",
      rating: 4,
      comment: "Boa comunicação e soluções eficientes. Apenas um pequeno atraso na resposta inicial.",
    },
    {
      id: "f3",
      date: "2023-04-20",
      client: "Roberto Santos",
      clientId: "3",
      rating: 5,
      comment: "Muito profissional e conhecedora do produto. Recomendo fortemente.",
    },
  ],
  monthlyPerformance: [
    { month: "Jan", responseTime: 2.8, satisfaction: 88 },
    { month: "Fev", responseTime: 2.6, satisfaction: 90 },
    { month: "Mar", responseTime: 2.5, satisfaction: 91 },
    { month: "Abr", responseTime: 2.4, satisfaction: 92 },
    { month: "Mai", responseTime: 2.3, satisfaction: 92 },
  ],
  clientDistribution: {
    active: 65,
    occasional: 25,
    inactive: 10,
  },
  topClients: [
    { id: "1", name: "João Silva", company: "Empresa ABC", avatar: "/diverse-group.png", interactions: 128 },
    { id: "2", name: "Maria Oliveira", company: "Tech Solutions", avatar: "/thoughtful-man.png", interactions: 95 },
    {
      id: "3",
      name: "Roberto Santos",
      company: "Consultoria XYZ",
      avatar: "/woman-with-glasses.png",
      interactions: 76,
    },
  ],
  painPoints: [
    { id: "p1", name: "Tempo de Resposta", value: 35, messages: 5 },
    { id: "p2", name: "Conhecimento Técnico", value: 25, messages: 3 },
    { id: "p3", name: "Seguimento", value: 20, messages: 2 },
  ],
  painPointMessages: {
    p1: [
      {
        id: "pm1",
        date: "2023-05-05T16:45:00",
        message: "Precisamos melhorar o tempo de resposta para clientes prioritários.",
      },
      {
        id: "pm2",
        date: "2023-04-20T14:30:00",
        message: "Implementar sistema de alertas para mensagens não respondidas após 1 hora.",
      },
    ],
    p2: [
      {
        id: "pm3",
        date: "2023-04-15T10:15:00",
        message: "Agendar treinamento técnico sobre os novos produtos para toda a equipe comercial.",
      },
    ],
  },
}

// Função para obter dados do membro da equipe com base no ID
const getTeamMemberData = (id: string) => {
  // Aqui você poderia buscar dados diferentes com base no ID
  // Por enquanto, vamos apenas ajustar o nome para os IDs diferentes
  if (id === "7") {
    return { ...teamMemberData, id, name: "Carlos Mendes", role: "Consultor de Vendas" }
  } else if (id === "8") {
    return { ...teamMemberData, id, name: "Fernanda Lima", role: "Atendimento ao Cliente" }
  } else if (id === "9") {
    return { ...teamMemberData, id, name: "Ricardo Alves", role: "Consultor de Vendas" }
  } else if (id === "10") {
    return { ...teamMemberData, id, name: "Juliana Castro", role: "Gerente de Marketing" }
  }
  return teamMemberData
}

export default function TeamProfileClientPage({ params }: { params: { id: string } }) {
  const teamMember = getTeamMemberData(params.id)
  const [activeTab, setActiveTab] = useState("performance")
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null)
  const [conversations, setConversations] = useState(teamMember.conversations)

  // Function to toggle the marked status of a conversation
  const toggleMarked = (id: string) => {
    setConversations(conversations.map((conv) => (conv.id === id ? { ...conv, isMarked: !conv.isMarked } : conv)))
  }

  // Format date to DD/MM/YYYY HH:MM
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  }

  // Get sentiment badge class
  const getSentimentBadgeClass = (sentiment: string) => {
    switch (sentiment) {
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

  // Get sentiment emoji
  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
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

  // Get rating stars
  const getRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
        />
      ))
  }

  const handlePainPointClick = (id: string) => {
    setSelectedPainPoint(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={teamMember.avatar || "/placeholder.svg"} alt={teamMember.name} />
                <AvatarFallback>{teamMember.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="space-y-3 flex-1">
                <div>
                  <h2 className="text-2xl font-bold">{teamMember.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{teamMember.department}</Badge>
                    <Badge variant="secondary">{teamMember.role}</Badge>
                    <Badge>Equipe</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{teamMember.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{teamMember.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{teamMember.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>Desde {teamMember.joinedDate}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{teamMember.bio}</p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {teamMember.groups.map((group, idx) => (
                    <Link href={`/group/${encodeURIComponent(group)}`} key={idx}>
                      <Badge variant="outline" className="hover:bg-muted cursor-pointer">
                        {group}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Tempo de Resposta</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{teamMember.performance.responseTime} min</p>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Rápido
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Taxa de Resposta</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{teamMember.performance.responseRate}%</p>
                <Progress value={teamMember.performance.responseRate} className="h-2 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Mensagens por Dia</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{teamMember.performance.messagesPerDay}</p>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Alto
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Satisfação do Cliente</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{teamMember.performance.clientSatisfaction}%</p>
                <Progress value={teamMember.performance.clientSatisfaction} className="h-2 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
          <TabsTrigger value="groups">Grupos</TabsTrigger>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho Mensal</CardTitle>
                <CardDescription>Evolução dos indicadores nos últimos meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tempo de Resposta (min)</h4>
                    <div className="flex items-end gap-2 h-32">
                      {teamMember.monthlyPerformance.map((month, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full bg-primary/20 rounded-t"
                            style={{ height: `${(month.responseTime / 3) * 100}%` }}
                          ></div>
                          <span className="text-xs mt-1">{month.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Satisfação do Cliente (%)</h4>
                    <div className="flex items-end gap-2 h-32">
                      {teamMember.monthlyPerformance.map((month, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full bg-green-500/70 rounded-t"
                            style={{ height: `${month.satisfaction}%` }}
                          ></div>
                          <span className="text-xs mt-1">{month.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Habilidades</CardTitle>
                <CardDescription>Competências identificadas nas interações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {teamMember.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Separator className="my-4" />
                <h4 className="text-sm font-medium mb-3">Pontos de Melhoria</h4>
                <PainPointsBubbleChart
                  painPoints={teamMember.painPoints || []}
                  onBubbleClick={handlePainPointClick}
                  selectedCategory={selectedPainPoint}
                  height={400}
                />
                {selectedPainPoint && teamMember.painPointMessages[selectedPainPoint] && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Observações sobre {teamMember.painPoints.find((p) => p.id === selectedPainPoint)?.name}
                    </h4>
                    <PainPointsMessageList
                      messages={teamMember.painPointMessages[selectedPainPoint]}
                      formatDate={formatDate}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Client Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Clientes</CardTitle>
              <CardDescription>Segmentação dos clientes atendidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Clientes Ativos</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{teamMember.clientDistribution.active}%</div>
                    <Progress value={teamMember.clientDistribution.active} className="h-2 flex-1" />
                  </div>
                  <p className="text-xs text-muted-foreground">Interagem semanalmente</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Clientes Ocasionais</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{teamMember.clientDistribution.occasional}%</div>
                    <Progress value={teamMember.clientDistribution.occasional} className="h-2 flex-1" />
                  </div>
                  <p className="text-xs text-muted-foreground">Interagem mensalmente</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Clientes Inativos</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{teamMember.clientDistribution.inactive}%</div>
                    <Progress value={teamMember.clientDistribution.inactive} className="h-2 flex-1" />
                  </div>
                  <p className="text-xs text-muted-foreground">Sem interação recente</p>
                </div>
              </div>
              <Separator className="my-4" />
              <h4 className="text-sm font-medium mb-3">Principais Clientes</h4>
              <div className="space-y-3">
                {teamMember.topClients.map((client) => (
                  <div key={client.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link href={`/client/${client.id}`} className="text-sm font-medium hover:underline">
                        {client.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{client.company}</p>
                    </div>
                    <div className="text-sm">{client.interactions} interações</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grupos</CardTitle>
              <CardDescription>Participação e atividade nos grupos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMember.groups.map((group, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={`/group/${encodeURIComponent(group)}`}
                        className="text-base font-medium hover:underline"
                      >
                        {group}
                      </Link>
                      <Badge variant="outline">Ativo</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Participação</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mensagens</span>
                        <span>42 / semana</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Clientes atendidos</span>
                        <span>12</span>
                      </div>
                    </div>
                    {idx < teamMember.groups.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversations Tab */}
        <TabsContent value="conversations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Conversas</CardTitle>
              <CardDescription>Interações recentes com clientes</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0 divide-y">
                {conversations.map((conv) => (
                  <div key={conv.id} className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{conv.group}</Badge>
                        <Link href={`/client/${conv.clientId}`} className="text-sm hover:underline">
                          {conv.client}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getSentimentBadgeClass(conv.sentiment)}>
                          {getSentimentEmoji(conv.sentiment)}
                        </Badge>
                        <button
                          onClick={() => toggleMarked(conv.id)}
                          className={`text-muted-foreground hover:text-yellow-500 ${
                            conv.isMarked ? "text-yellow-500" : ""
                          }`}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm">{conv.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">{formatDate(conv.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback de Clientes</CardTitle>
              <CardDescription>Avaliações recebidas dos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMember.feedbacks.map((feedback) => (
                  <div key={feedback.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/client/${feedback.clientId}`} className="font-medium hover:underline">
                        {feedback.client}
                      </Link>
                      <div className="flex">{getRatingStars(feedback.rating)}</div>
                    </div>
                    <p className="text-sm">{feedback.comment}</p>
                    <div className="text-xs text-muted-foreground mt-2">{feedback.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
