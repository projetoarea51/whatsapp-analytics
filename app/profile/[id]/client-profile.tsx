"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Mail, Phone } from "lucide-react"
import ProfessionalTimeline from "./components/ProfessionalTimeline"
import ConversationHistory from "./components/ConversationHistory"
import ConnectionsGraph from "./components/ConnectionsGraph"
import SkillsTags from "./components/SkillsTags"
import GroupsList from "./components/GroupsList"
import CommonConnections from "./components/CommonConnections"
import RecommendedPeople from "./components/RecommendedPeople"
import { PainPointsBubbleChart } from "@/components/pain-points/PainPointsBubbleChart"
import { PainPointsMessageList } from "@/components/pain-points/PainPointsMessageList"
import type { User } from "@/types"

// Mock data for common connections
const mockConnections = [
  {
    id: "2",
    name: "Ana Silva",
    role: "Designer",
    company: "Creative Studios",
    avatarUrl: "/diverse-woman-portrait.png",
    commonGroups: ["Design Team", "Project X"],
  },
  {
    id: "3",
    name: "Roberto Alves",
    role: "Desenvolvedor Frontend",
    company: "WebTech",
    avatarUrl: "/thoughtful-man.png",
    commonGroups: ["Tech Group", "JavaScript Brasil"],
  },
  {
    id: "4",
    name: "Juliana Costa",
    role: "Product Manager",
    company: "ProductLabs",
    avatarUrl: "/woman-with-glasses.png",
    commonGroups: ["Product Team", "Agile Practitioners"],
  },
]

// Mock recommended people data
const mockRecommendedPeople = [
  {
    id: "rp1",
    name: "Luciana Mendes",
    phone: "+55 11 97654-3210",
    avatarUrl: "/diverse-woman-portrait.png",
    recommendation:
      "Especialista em marketing digital para empresas B2B, pode ajudar com estratégias de geração de leads qualificados.",
  },
  {
    id: "rp2",
    name: "Fernando Gomes",
    phone: "+55 11 98877-6655",
    avatarUrl: "/thoughtful-man.png",
    recommendation:
      "Experiência em estruturação de equipes comerciais para empresas de tecnologia em fase de expansão.",
  },
  {
    id: "rp3",
    name: "Carla Rodrigues",
    phone: "+55 11 91122-3344",
    avatarUrl: "/woman-with-glasses.png",
    recommendation: "Especialista em otimização de processos de vendas e implementação de metodologias ágeis.",
  },
  {
    id: "rp4",
    name: "Ricardo Almeida",
    phone: "+55 11 95566-7788",
    avatarUrl: "/diverse-group.png",
    recommendation:
      "Pode oferecer insights sobre captação de investimentos e gestão financeira para expansão de negócios.",
  },
]

// Mock pain points data
const mockPainPoints = [
  { id: "1", name: "Preço alto", value: 85, messages: [] },
  { id: "2", name: "Suporte lento", value: 65, messages: [] },
  { id: "3", name: "Interface confusa", value: 45, messages: [] },
  { id: "4", name: "Bugs frequentes", value: 40, messages: [] },
  { id: "5", name: "Falta de recursos", value: 35, messages: [] },
  { id: "6", name: "Documentação ruim", value: 30, messages: [] },
  { id: "7", name: "Integração difícil", value: 25, messages: [] },
]

// Mock messages for pain points
const mockMessages = [
  {
    id: "1",
    content: "O preço está muito acima do mercado para as funcionalidades oferecidas.",
    senderId: "6",
    senderName: "Carlos Mendes",
    groupId: "1",
    groupName: "Marketing Team",
    timestamp: "2023-04-15T10:30:00",
    sentiment: "negative",
    topics: ["Preço alto"],
  },
  {
    id: "2",
    content: "Estou esperando resposta do suporte há 3 dias, isso é inaceitável.",
    senderId: "6",
    senderName: "Carlos Mendes",
    groupId: "2",
    groupName: "Project Alpha",
    timestamp: "2023-04-16T14:20:00",
    sentiment: "negative",
    topics: ["Suporte lento"],
  },
  {
    id: "3",
    content: "A interface é tão confusa que meus funcionários estão tendo dificuldade para usar.",
    senderId: "6",
    senderName: "Carlos Mendes",
    groupId: "1",
    groupName: "Marketing Team",
    timestamp: "2023-04-17T09:15:00",
    sentiment: "negative",
    topics: ["Interface confusa"],
  },
]

const mockProspectGroups = [
  {
    id: "1",
    name: "Marketing Team",
    messageCount: 156,
    sentiment: {
      emoji: "😊",
      label: "Positivo",
    },
  },
  {
    id: "2",
    name: "Project Alpha",
    messageCount: 89,
    sentiment: {
      emoji: "😐",
      label: "Neutro",
    },
  },
  {
    id: "3",
    name: "Tech Innovators",
    messageCount: 42,
    sentiment: {
      emoji: "🙂",
      label: "Satisfeito",
    },
  },
]

export default function ClientProfileView({ user }: { user: User }) {
  // Assign mock messages to pain points with proper error handling
  const painPointsWithMessages = mockPainPoints.map((point) => {
    const relatedMessages = mockMessages.filter((msg) => msg.topics?.includes(point.name))
    return {
      ...point,
      category: point.name, // Ensure category is set for D3 rendering
      count: point.value || 0, // Ensure count is set for D3 rendering
      messages: relatedMessages,
    }
  })

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 border-2 border-primary/20">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <Badge variant="secondary">Cliente</Badge>
                  </div>
                  <div className="text-muted-foreground">
                    {user.role} {user.company && `• ${user.company}`}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  <Button>Enviar Mensagem</Button>
                  <Button variant="outline">Adicionar Nota</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{user.phone}</div>
                    <div className="text-xs text-muted-foreground">Telefone</div>
                  </div>
                </div>

                {user.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{user.email}</div>
                      <div className="text-xs text-muted-foreground">Email</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {user.lastActive ? new Date(user.lastActive).toLocaleDateString("pt-BR") : "N/A"}
                    </div>
                    <div className="text-xs text-muted-foreground">Última Atividade</div>
                  </div>
                </div>
              </div>

              {user.bio && (
                <div className="mt-4">
                  <p className="text-muted-foreground">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="connections">Conexões</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6 md:col-span-2">
              {/* Prospect Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Histórico Profissional</CardTitle>
                  <CardDescription>Trajetória profissional e acadêmica</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalTimeline />
                </CardContent>
              </Card>

              {/* Conversation History */}
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Conversas</CardTitle>
                  <CardDescription>Últimas interações com este contato</CardDescription>
                </CardHeader>
                <CardContent>
                  <ConversationHistory />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Prospect Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Habilidades</CardTitle>
                  <CardDescription>Habilidades identificadas nas conversas</CardDescription>
                </CardHeader>
                <CardContent>
                  <SkillsTags skills={user.skills || []} />
                </CardContent>
              </Card>

              {/* Groups */}
              <Card>
                <CardHeader>
                  <CardTitle>Grupos</CardTitle>
                  <CardDescription>Grupos em que este contato está presente</CardDescription>
                </CardHeader>
                <CardContent>
                  <GroupsList groups={mockProspectGroups} />
                </CardContent>
              </Card>

              {/* Common Connections */}
              <Card>
                <CardHeader>
                  <CardTitle>Conexões em Comum</CardTitle>
                  <CardDescription>Pessoas que compartilham grupos com este contato</CardDescription>
                </CardHeader>
                <CardContent>
                  <CommonConnections connections={mockConnections} />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recommended People */}
          <Card>
            <CardHeader>
              <CardTitle>Pessoas Recomendadas</CardTitle>
              <CardDescription>Contatos que podem ser relevantes para este perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendedPeople people={mockRecommendedPeople} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversations Tab */}
        <TabsContent value="conversations">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Conversas</CardTitle>
              <CardDescription>Todas as conversas com este contato</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px] overflow-y-auto">
              <ConversationHistory extended />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Connections Tab */}
        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Conexões</CardTitle>
              <CardDescription>Visualize como este contato está conectado a outros</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <ConnectionsGraph profileId={user.id} profileName={user.name} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Prospect Analytics - Pain Points */}
          <Card>
            <CardHeader>
              <CardTitle>Principais Dores</CardTitle>
              <CardDescription>Dores identificadas nas conversas com este contato</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PainPointsBubbleChart
                painPoints={
                  painPointsWithMessages.length > 0
                    ? painPointsWithMessages
                    : [{ category: "Sem dados", count: 1, keywords: [] }]
                }
                onBubbleClick={(category) => console.log(`Clicked on ${category}`)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mensagens Relacionadas às Dores</CardTitle>
              <CardDescription>Mensagens que mencionam as dores identificadas</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] overflow-y-auto">
              <PainPointsMessageList messages={mockMessages} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
