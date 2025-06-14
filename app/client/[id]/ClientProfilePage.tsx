"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Users,
  Building2,
  BriefcaseIcon,
  GraduationCapIcon,
} from "lucide-react"
import Link from "next/link"
import { PainPointsBubbleChart } from "@/components/pain-points/PainPointsBubbleChart"
import { PainPointsMessageList } from "@/components/pain-points/PainPointsMessageList"
import { ConnectionsGraph } from "./ConnectionsGraph"

// Mock data for the client profile
const clientData = {
  id: "1",
  name: "João Silva",
  company: "Acme Inc.",
  role: "Diretor Comercial",
  avatar: "/thoughtful-man.png",
  email: "joao.silva@acme.com",
  phone: "+55 11 98765-4321",
  location: "São Paulo, SP",
  joinedDate: "Março 2022",
  bio: "Diretor Comercial com mais de 15 anos de experiência em vendas B2B e gestão de equipes comerciais.",
  groups: ["G4 Scale", "G4 Club", "GE - 124"],
  tags: ["Vendas", "Liderança", "Tecnologia", "Gestão de Equipes"],
  connections: [
    { id: "2", name: "Maria Oliveira", role: "CEO", company: "XYZ Corp", avatar: "/woman-with-glasses.png" },
    { id: "3", name: "Roberto Santos", role: "CTO", company: "Tech Solutions", avatar: "/diverse-group.png" },
    {
      id: "7",
      name: "Carlos Mendes",
      role: "Consultor de Vendas",
      company: "Nossa Empresa",
      avatar: "/placeholder-user.jpg",
    },
  ],
  commonGroups: [
    { id: "g1", name: "G4 Scale", members: 32, role: "Membro" },
    { id: "g2", name: "G4 Club", members: 48, role: "Moderador" },
    { id: "g3", name: "GE - 124", members: 15, role: "Membro" },
  ],
  commonConnections: [
    {
      id: "2",
      name: "Maria Oliveira",
      role: "CEO",
      company: "XYZ Corp",
      avatar: "/woman-with-glasses.png",
      commonGroups: ["G4 Scale", "G4 Club"],
    },
    {
      id: "3",
      name: "Roberto Santos",
      role: "CTO",
      company: "Tech Solutions",
      avatar: "/diverse-group.png",
      commonGroups: ["GE - 124"],
    },
    {
      id: "4",
      name: "Camila Pereira",
      role: "Diretora de Marketing",
      company: "Support Co",
      avatar: "/woman-with-glasses.png",
      commonGroups: ["G4 Scale"],
    },
  ],
  conversations: [
    {
      id: "c1",
      date: "2023-05-10T14:30:00",
      group: "G4 Scale",
      message: "Precisamos discutir a implementação do novo CRM na próxima reunião.",
      sentiment: "neutral",
      isMarked: false,
    },
    {
      id: "c2",
      date: "2023-05-08T10:15:00",
      group: "G4 Club",
      message: "Gostei muito da apresentação sobre vendas consultivas. Vou aplicar algumas técnicas com minha equipe.",
      sentiment: "positive",
      isMarked: true,
    },
    {
      id: "c3",
      date: "2023-05-05T16:45:00",
      group: "GE - 124",
      message: "Estamos enfrentando problemas com o prazo de entrega dos produtos. Isso está afetando nossas vendas.",
      sentiment: "negative",
      isMarked: false,
    },
    {
      id: "c4",
      date: "2023-05-03T09:30:00",
      group: "G4 Scale",
      message: "Não entendi bem como funciona o novo sistema de comissões. Alguém pode explicar?",
      sentiment: "confused",
      isMarked: false,
    },
    {
      id: "c5",
      date: "2023-04-28T11:20:00",
      group: "G4 Club",
      message: "Excelente discussão hoje. As ideias sobre expansão internacional são muito promissoras.",
      sentiment: "positive",
      isMarked: true,
    },
  ],
  timeline: [
    {
      id: "t1",
      date: "2023-01-15",
      title: "Promoção a Diretor Comercial",
      description:
        "Promovido de Gerente de Vendas para Diretor Comercial, assumindo responsabilidade por toda a operação comercial da América Latina.",
    },
    {
      id: "t2",
      date: "2022-08-10",
      title: "Implementação de CRM",
      description:
        "Liderou a implementação do novo sistema de CRM, resultando em um aumento de 30% na eficiência da equipe de vendas.",
    },
    {
      id: "t3",
      date: "2022-03-05",
      title: "Entrada na Acme Inc.",
      description: "Contratado como Gerente de Vendas para a região Sudeste.",
    },
  ],
  linkedinHistory: [
    {
      id: "lh1",
      type: "work",
      title: "Diretor Comercial",
      company: "Acme Inc.",
      location: "São Paulo, SP",
      startDate: "Jan 2020",
      endDate: "Presente",
      description:
        "Responsável pela estratégia comercial e desenvolvimento de negócios. Liderança de uma equipe de 15 vendedores e gestão de contas estratégicas.",
    },
    {
      id: "lh2",
      type: "work",
      title: "Gerente de Vendas",
      company: "XYZ Corp",
      location: "São Paulo, SP",
      startDate: "Mar 2016",
      endDate: "Dez 2019",
      description:
        "Liderança da equipe de vendas B2B, desenvolvimento de estratégias de crescimento e gestão de relacionamento com clientes-chave.",
    },
    {
      id: "lh3",
      type: "education",
      title: "MBA em Gestão Empresarial",
      company: "Fundação Getúlio Vargas",
      location: "São Paulo, SP",
      startDate: "2017",
      endDate: "2019",
      description: "Especialização em estratégia de negócios e liderança.",
    },
    {
      id: "lh4",
      type: "work",
      title: "Executivo de Contas",
      company: "Tech Solutions",
      location: "São Paulo, SP",
      startDate: "Jan 2013",
      endDate: "Fev 2016",
      description:
        "Gestão de portfólio de clientes corporativos, desenvolvimento de novas oportunidades de negócio e negociação de contratos.",
    },
    {
      id: "lh5",
      type: "education",
      title: "Bacharel em Administração",
      company: "Universidade de São Paulo",
      location: "São Paulo, SP",
      startDate: "2008",
      endDate: "2012",
      description: "Ênfase em Marketing e Vendas.",
    },
  ],
  painPoints: [
    { id: "p1", category: "Prazo de Entrega", count: 12 },
    { id: "p2", category: "Qualidade do Produto", count: 8 },
    { id: "p3", category: "Preço", count: 6 },
    { id: "p4", category: "Atendimento", count: 4 },
    { id: "p5", category: "Pós-venda", count: 2 },
  ],
  painPointMessages: {
    p1: [
      {
        id: "pm1",
        date: "2023-05-05T16:45:00",
        message: "Estamos enfrentando problemas com o prazo de entrega dos produtos. Isso está afetando nossas vendas.",
      },
      {
        id: "pm2",
        date: "2023-04-20T14:30:00",
        message: "Os atrasos nas entregas estão gerando reclamações dos clientes finais.",
      },
    ],
    p2: [
      {
        id: "pm3",
        date: "2023-04-15T10:15:00",
        message: "Tivemos que devolver 3 lotes por problemas de qualidade no último mês.",
      },
    ],
    p3: [
      {
        id: "pm4",
        date: "2023-03-28T09:30:00",
        message: "Os aumentos de preço estão dificultando nossas negociações com clientes de longo prazo.",
      },
    ],
  },
  sentimentDistribution: {
    positive: 45,
    neutral: 30,
    negative: 15,
    confused: 10,
  },
  recommendedConnections: [
    {
      id: "rec1",
      name: "Ana Souza",
      role: "Diretora de Marketing",
      company: "Marketing Pro",
      avatar: "/woman-with-glasses.png",
      commonGroups: 2,
      commonConnections: 3,
    },
    {
      id: "rec2",
      name: "Pedro Almeida",
      role: "Gerente de Vendas",
      company: "Sales Tech",
      avatar: "/diverse-group.png",
      commonGroups: 1,
      commonConnections: 5,
    },
  ],
}

// Função para obter dados do cliente com base no ID
const getClientData = (id: string) => {
  // Aqui você poderia buscar dados diferentes com base no ID
  // Por enquanto, vamos apenas ajustar o nome para os IDs diferentes
  if (id === "2") {
    return { ...clientData, id, name: "Maria Oliveira", company: "XYZ Corp", role: "CEO" }
  } else if (id === "3") {
    return { ...clientData, id, name: "Roberto Santos", company: "Tech Solutions", role: "CTO" }
  } else if (id === "4") {
    return { ...clientData, id, name: "Camila Pereira", company: "Support Co", role: "Diretora de Marketing" }
  } else if (id === "5") {
    return { ...clientData, id, name: "Miguel Costa", company: "Dev Team Inc", role: "Gerente de Produto" }
  }
  return clientData
}

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  const client = getClientData(params.id)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="space-y-3 flex-1">
                <div>
                  <h2 className="text-2xl font-bold">{client.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{client.company}</Badge>
                    <Badge variant="secondary">{client.role}</Badge>
                    <Badge>Cliente</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{client.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>Desde {client.joinedDate}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{client.bio}</p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {client.groups.map((group, idx) => (
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="connections">Conexões</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills/Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Interesses e Habilidades</CardTitle>
                <CardDescription>Tags identificadas nas conversas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {client.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Conversations */}
            <Card>
              <CardHeader>
                <CardTitle>Conversas Recentes</CardTitle>
                <CardDescription>Últimas interações nos grupos</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0 divide-y">
                  {client.conversations.slice(0, 3).map((conv) => (
                    <div key={conv.id} className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline">{conv.group}</Badge>
                        <Badge variant="outline" className={getSentimentBadgeClass(conv.sentiment)}>
                          {getSentimentEmoji(conv.sentiment)}
                        </Badge>
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
          </div>

          {/* Pain Points */}
          <Card>
            <CardHeader>
              <CardTitle>Pontos de Dor</CardTitle>
              <CardDescription>Principais preocupações identificadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <PainPointsBubbleChart
                    painPoints={client.painPoints || []}
                    onBubbleClick={(id) => {
                      setSelectedPainPoint(id)
                      setSelectedCategory(client.painPoints.find((p) => p.id === id)?.category || null)
                    }}
                    selectedCategory={selectedCategory}
                    height={300}
                  />
                </div>
                <div>
                  {selectedPainPoint && client.painPointMessages[selectedPainPoint] ? (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Mensagens relacionadas a {selectedCategory}</h4>
                      <div className="max-h-[300px] overflow-y-auto">
                        <PainPointsMessageList
                          messages={client.painPointMessages[selectedPainPoint]}
                          formatDate={formatDate}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">
                        Selecione um ponto de dor para ver as mensagens relacionadas
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Linha do Tempo Profissional</CardTitle>
              <CardDescription>Eventos importantes na carreira</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l pl-6 pb-2">
                {client.timeline.map((event, idx) => (
                  <div key={event.id} className="mb-6 relative">
                    <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{event.date}</div>
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.description}</div>
                    </div>
                    {idx < client.timeline.length - 1 && (
                      <div className="absolute -left-8 top-4 h-full border-l border-dashed"></div>
                    )}
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
              <CardDescription>Todas as mensagens nos grupos</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0 divide-y">
                {client.conversations.map((conv) => (
                  <div key={conv.id} className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{conv.group}</Badge>
                        <span className="text-xs text-muted-foreground">{formatDate(conv.date)}</span>
                      </div>
                      <Badge variant="outline" className={getSentimentBadgeClass(conv.sentiment)}>
                        {getSentimentEmoji(conv.sentiment)}
                      </Badge>
                    </div>
                    <p className="text-sm">{conv.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Connections Tab */}
        <TabsContent value="connections" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Mapa de Conexões</CardTitle>
                <CardDescription>Visualização da rede de contatos</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ConnectionsGraph userId={client.id} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conexões em Comum</CardTitle>
                <CardDescription>Pessoas conectadas a este contato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.commonConnections.map((connection) => (
                    <div key={connection.id} className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                        <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Link
                          href={connection.id.startsWith("7") ? `/team/${connection.id}` : `/client/${connection.id}`}
                          className="font-medium hover:underline"
                        >
                          {connection.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {connection.role} em {connection.company}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {connection.commonGroups.map((group, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {group}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grupos em Comum</CardTitle>
                <CardDescription>Grupos em que este contato participa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {client.commonGroups.map((group) => (
                    <Link href={`/group/${encodeURIComponent(group.name)}`} key={group.id} className="block">
                      <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors border border-gray-200 dark:border-gray-700 border-opacity-40 dark:border-opacity-40 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{group.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-muted-foreground">
                                {group.members} membros • {group.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Conexões Recomendadas</CardTitle>
                <CardDescription>Pessoas que talvez você queira conectar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {client.recommendedConnections.map((person) => (
                    <div key={person.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <Avatar className="h-12 w-12 border">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {person.role} em {person.company}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {person.commonGroups} grupos em comum • {person.commonConnections} conexões em comum
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sentiment Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Sentimentos</CardTitle>
                <CardDescription>Análise das mensagens por sentimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">😊</span>
                      <span>Positivo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{client.sentimentDistribution.positive}%</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${client.sentimentDistribution.positive}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">😐</span>
                      <span>Neutro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{client.sentimentDistribution.neutral}%</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: `${client.sentimentDistribution.neutral}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">😠</span>
                      <span>Negativo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{client.sentimentDistribution.negative}%</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500"
                          style={{ width: `${client.sentimentDistribution.negative}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">🤔</span>
                      <span>Confuso</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{client.sentimentDistribution.confused}%</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500"
                          style={{ width: `${client.sentimentDistribution.confused}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pain Points */}
            <Card>
              <CardHeader>
                <CardTitle>Pontos de Dor</CardTitle>
                <CardDescription>Principais preocupações identificadas</CardDescription>
              </CardHeader>
              <CardContent>
                <PainPointsBubbleChart
                  painPoints={client.painPoints || []}
                  onBubbleClick={(id) => {
                    setSelectedPainPoint(id)
                    setSelectedCategory(client.painPoints.find((p) => p.id === id)?.category || null)
                  }}
                  selectedCategory={selectedCategory}
                  height={400}
                />
                {selectedPainPoint && client.painPointMessages[selectedPainPoint] && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Mensagens relacionadas a {selectedCategory}</h4>
                    <PainPointsMessageList
                      messages={client.painPointMessages[selectedPainPoint]}
                      formatDate={formatDate}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* LinkedIn Tab */}
        <TabsContent value="linkedin" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Histórico do LinkedIn</CardTitle>
                <CardDescription>Informações profissionais e educacionais</CardDescription>
              </div>
              <Linkedin className="h-5 w-5 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="relative space-y-8 before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-border">
                {client.linkedinHistory.map((item) => (
                  <div key={item.id} className="relative pl-10">
                    <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                      {item.type === "work" ? (
                        <BriefcaseIcon className="h-4 w-4 text-primary" />
                      ) : (
                        <GraduationCapIcon className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Building2 className="h-3 w-3" />
                            <span>{item.company}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.startDate} - {item.endDate}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
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
