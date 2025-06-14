"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, BarChart3, Clock, MessageSquare, Users } from "lucide-react"
import ConversationHistory from "./components/ConversationHistory"
import GroupsList from "./components/GroupsList"
import { SentimentDistributionChart } from "@/components/sentiment/SentimentDistributionChart"
import type { TeamMemberStats, User } from "@/types"

// Mock data for team member stats
const getTeamMemberStats = (): TeamMemberStats => {
  return {
    responseSpeed: {
      type: "fast",
      avgTime: 3.5, // minutes
    },
    responseRate: 92, // percentage
    messagesPerDay: 45,
    activeGroups: 8,
    sentiment: {
      positive: 65,
      neutral: 25,
      negative: 5,
      confused: 5,
    },
  }
}

// Mock groups data
const mockTeamGroups = [
  {
    id: "1",
    name: "Suporte Técnico",
    messageCount: 245,
    sentiment: {
      emoji: "😊",
      label: "Positivo",
    },
  },
  {
    id: "2",
    name: "Vendas B2B",
    messageCount: 189,
    sentiment: {
      emoji: "😐",
      label: "Neutro",
    },
  },
  {
    id: "3",
    name: "Onboarding Clientes",
    messageCount: 156,
    sentiment: {
      emoji: "🙂",
      label: "Satisfeito",
    },
  },
]

// Mock team performance data
const mockTeamPerformanceData = {
  responseTimeByHour: [
    { hour: 8, avgTime: 3.2 },
    { hour: 9, avgTime: 2.8 },
    { hour: 10, avgTime: 2.5 },
    { hour: 11, avgTime: 3.0 },
    { hour: 12, avgTime: 4.2 },
    { hour: 13, avgTime: 5.1 },
    { hour: 14, avgTime: 3.7 },
    { hour: 15, avgTime: 2.9 },
    { hour: 16, avgTime: 2.6 },
    { hour: 17, avgTime: 3.3 },
  ],
  responseRateByDay: [
    { day: "Segunda", rate: 95 },
    { day: "Terça", rate: 92 },
    { day: "Quarta", rate: 88 },
    { day: "Quinta", rate: 90 },
    { day: "Sexta", rate: 85 },
  ],
  clientSatisfaction: [
    { month: "Jan", score: 4.2 },
    { month: "Fev", score: 4.3 },
    { month: "Mar", score: 4.1 },
    { month: "Abr", score: 4.4 },
    { month: "Mai", score: 4.5 },
    { month: "Jun", score: 4.6 },
  ],
  issueResolutionRate: 87,
  avgFirstResponseTime: "2m 45s",
  avgResolutionTime: "3h 20m",
}

export default function TeamProfileView({ user }: { user: User }) {
  const teamStats = getTeamMemberStats()

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Perfil */}
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
                    <Badge>Equipe</Badge>
                  </div>
                  <div className="text-muted-foreground">
                    {user.role} {user.company && `• ${user.company}`}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{teamStats.messagesPerDay * 30}</div>
                    <div className="text-xs text-muted-foreground">Mensagens/Mês</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{teamStats.responseSpeed.avgTime} min</div>
                    <div className="text-xs text-muted-foreground">Tempo Médio</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{teamStats.activeGroups}</div>
                    <div className="text-xs text-muted-foreground">Grupos Ativos</div>
                  </div>
                </div>

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

      {/* Conteúdo Principal */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
          <TabsTrigger value="groups">Grupos</TabsTrigger>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Métricas de Desempenho */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tempo de Resposta</CardTitle>
                <CardDescription>Tempo médio de resposta por hora do dia</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Gráfico de Tempo de Resposta</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Resposta</CardTitle>
                <CardDescription>Porcentagem de mensagens respondidas por dia</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Gráfico de Taxa de Resposta</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métricas de Qualidade */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Satisfação do Cliente</CardTitle>
                <CardDescription>Avaliação média dos clientes atendidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[200px]">
                  <div className="text-5xl font-bold">4.8</div>
                  <div className="text-muted-foreground mt-2">de 5.0</div>
                  <div className="flex items-center mt-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Baseado em 156 avaliações</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolução de Problemas</CardTitle>
                <CardDescription>Taxa de resolução de problemas no primeiro contato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[200px]">
                  <div className="text-5xl font-bold">{mockTeamPerformanceData.issueResolutionRate}%</div>
                  <div className="text-muted-foreground mt-2">Taxa de Resolução</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${mockTeamPerformanceData.issueResolutionRate}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Meta: 85%</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tempos de Atendimento</CardTitle>
                <CardDescription>Tempo médio de primeira resposta e resolução</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-center h-[200px] space-y-6">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Primeira Resposta</div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <div className="text-2xl font-bold">{mockTeamPerformanceData.avgFirstResponseTime}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Meta: 3 minutos</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Resolução Completa</div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <div className="text-2xl font-bold">{mockTeamPerformanceData.avgResolutionTime}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Meta: 4 horas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Distribuição de Sentimento */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Sentimento</CardTitle>
              <CardDescription>Sentimento das mensagens enviadas e recebidas</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <SentimentDistributionChart
                data={[
                  { name: "Positivo", value: teamStats.sentiment.positive },
                  { name: "Neutro", value: teamStats.sentiment.neutral },
                  { name: "Negativo", value: teamStats.sentiment.negative },
                  { name: "Confuso", value: teamStats.sentiment.confused },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Grupos Atendidos */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Grupos Atendidos</CardTitle>
                  <CardDescription>Grupos em que este membro da equipe está ativo</CardDescription>
                </CardHeader>
                <CardContent>
                  <GroupsList groups={mockTeamGroups} />
                </CardContent>
              </Card>
            </div>

            {/* Métricas por Grupo */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas por Grupo</CardTitle>
                  <CardDescription>Desempenho detalhado em cada grupo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockTeamGroups.map((group) => (
                      <div key={group.id} className="p-4 border rounded-lg">
                        <h3 className="text-lg font-medium">{group.name}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Mensagens</div>
                            <div className="text-xl font-medium">{group.messageCount}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Tempo de Resposta</div>
                            <div className="text-xl font-medium">2.8 min</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Satisfação</div>
                            <div className="text-xl font-medium">4.7/5.0</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm text-muted-foreground mb-1">Sentimento</div>
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{ backgroundColor: "rgb(34, 197, 94)" }}
                            ></span>
                            <span className="text-sm">Positivo: 70%</span>
                            <span
                              className="inline-block w-3 h-3 rounded-full ml-2"
                              style={{ backgroundColor: "rgb(234, 179, 8)" }}
                            ></span>
                            <span className="text-sm">Neutro: 20%</span>
                            <span
                              className="inline-block w-3 h-3 rounded-full ml-2"
                              style={{ backgroundColor: "rgb(239, 68, 68)" }}
                            ></span>
                            <span className="text-sm">Negativo: 10%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Volume de Mensagens por Grupo */}
          <Card>
            <CardHeader>
              <CardTitle>Volume de Mensagens por Grupo</CardTitle>
              <CardDescription>Distribuição de mensagens entre os grupos atendidos</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart3 className="h-12 w-12 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Gráfico de Volume de Mensagens</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Conversas</CardTitle>
              <CardDescription>Todas as conversas de {user.name}</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px] overflow-y-auto">
              <ConversationHistory extended />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Feedback dos Clientes */}
            <Card>
              <CardHeader>
                <CardTitle>Feedback dos Clientes</CardTitle>
                <CardDescription>Avaliações e comentários recebidos</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Carlos Mendes</div>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      "Atendimento excelente e rápido. Resolveu meu problema em poucos minutos."
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">15/04/2023</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Juliana Costa</div>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      "Muito atenciosa e paciente. Explicou tudo detalhadamente."
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">10/04/2023</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Roberto Alves</div>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      "Profissional excepcional. Resolveu um problema complexo com muita eficiência."
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">05/04/2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Áreas de Melhoria */}
            <Card>
              <CardHeader>
                <CardTitle>Áreas de Melhoria</CardTitle>
                <CardDescription>Oportunidades identificadas para desenvolvimento</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">Conhecimento Técnico</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="ml-2 text-sm">75%</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Aprofundar conhecimento em funcionalidades avançadas dos produtos para resolver casos complexos
                      mais rapidamente.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">Comunicação Escrita</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="ml-2 text-sm">85%</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Melhorar a clareza e concisão nas respostas escritas para evitar mal-entendidos.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">Gestão de Tempo</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <span className="ml-2 text-sm">70%</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Otimizar o atendimento simultâneo de múltiplos clientes para reduzir o tempo médio de resposta.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Evolução de Desempenho */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Desempenho</CardTitle>
              <CardDescription>Progresso ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart3 className="h-12 w-12 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Gráfico de Evolução de Desempenho</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
