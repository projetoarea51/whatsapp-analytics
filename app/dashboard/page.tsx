import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SentimentWidget from "./components/SentimentWidget"
import TmrLineChart from "./components/TmrLineChart"
import ParticipationRanking from "./components/ParticipationRanking"
import AlertList from "./components/AlertList"
import LoadingSkeleton from "@/_components/LoadingSkeleton"
import AnalyticsTab from "./components/AnalyticsTab"
import ReportsTab from "./components/ReportsTab"
import DateRangePicker from "./components/DateRangePicker"
import MonitoringStats from "./components/MonitoringStats"
import TopicMessageFilter from "./components/TopicMessageFilter"
import GroupsOverview from "./components/GroupsOverview"

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <DateRangePicker />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card className="modernize-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sentimento</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingSkeleton height={150} />}>
                  <SentimentWidget />
                </Suspense>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Card className="modernize-card h-1/3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-sm font-medium">Números Monitorados</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonitoringStats type="total" value={124} change={5} />
                </CardContent>
              </Card>

              <Card className="modernize-card h-1/3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-sm font-medium">Mensagem Particular</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonitoringStats type="private" value={78} change={10} />
                </CardContent>
              </Card>

              <Card className="modernize-card h-1/3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-sm font-medium">Grupos Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonitoringStats type="groups" value={46} change={-2} />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-4">
              <Card className="modernize-card h-1/3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonitoringStats type="tmr" value="12m 34s" change={-2} />
                </CardContent>
              </Card>

              <Card className="modernize-card h-1/3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-sm font-medium">Tempo Médio Individual</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonitoringStats type="tmr-individual" value="8m 12s" change={-5} />
                </CardContent>
              </Card>

              <Card className="modernize-card h-1/3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-sm font-medium">Tempo Médio em Grupos</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonitoringStats type="tmr-groups" value="15m 47s" change={3} />
                </CardContent>
              </Card>
            </div>

            <Card className="modernize-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+19% em relação a ontem</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-7">
            <Card className="modernize-card lg:col-span-4">
              <CardHeader>
                <CardTitle>Tempo Médio de Resposta</CardTitle>
                <CardDescription>Tempo médio diário de resposta dentro do horário comercial</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<LoadingSkeleton height={350} />}>
                  <TmrLineChart />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="modernize-card lg:col-span-3">
              <CardHeader>
                <CardTitle>Alertas Recentes</CardTitle>
                <CardDescription>Alertas baseados nos limites configurados</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingSkeleton height={350} />}>
                  <AlertList />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Visão Geral dos Grupos</CardTitle>
                <CardDescription>Status atual dos grupos monitorados</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingSkeleton height={350} />}>
                  <GroupsOverview />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Ranking de Participação (Prospects)</CardTitle>
                <CardDescription>Principais participantes externos</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingSkeleton height={350} />}>
                  <ParticipationRanking type="prospects" />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Ranking de Participação (Equipe)</CardTitle>
                <CardDescription>Principais participantes internos</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingSkeleton height={350} />}>
                  <ParticipationRanking type="team" />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          {/* Novo widget de filtro de mensagens por tópico */}
          <Card className="modernize-card">
            <CardHeader>
              <CardTitle>Mensagens por Tópico</CardTitle>
              <CardDescription>Filtre mensagens por tópicos de interesse</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSkeleton height={350} />}>
                <TopicMessageFilter />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
