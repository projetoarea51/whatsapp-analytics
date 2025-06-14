"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"
import SalesTab from "./SalesTab"

// Dados de exemplo para volume de mensagens por dia
const messageVolumeData = [
  { day: "Seg", count: 120 },
  { day: "Ter", count: 150 },
  { day: "Qua", count: 180 },
  { day: "Qui", count: 145 },
  { day: "Sex", count: 190 },
  { day: "Sáb", count: 80 },
  { day: "Dom", count: 60 },
]

// Dados de exemplo para distribuição de sentimento
const sentimentData = [
  { name: "Raiva", value: 15 },
  { name: "Crítico", value: 20 },
  { name: "Muitas Dúvidas", value: 35 },
  { name: "Sob Controle", value: 45 },
  { name: "Feliz", value: 25 },
]

// Dados de exemplo para tempo de resposta por grupo
const responseTimeData = [
  { group: "Marketing", time: 8 },
  { group: "Vendas", time: 12 },
  { group: "Suporte", time: 5 },
  { group: "Engenharia", time: 15 },
  { group: "Produto", time: 10 },
]

export default function AnalyticsTab() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="space-y-4">
      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Volume de Mensagens</TabsTrigger>
          <TabsTrigger value="sentiment">Sentimento</TabsTrigger>
          <TabsTrigger value="response">Tempo de Resposta</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <Card className="modernize-card">
            <CardHeader>
              <CardTitle>Volume de Mensagens por Dia</CardTitle>
              <CardDescription>Total de mensagens enviadas e recebidas por dia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={messageVolumeData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="day" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill={isDark ? "var(--primary)" : "var(--primary)"}
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Horários de Pico</CardTitle>
                <CardDescription>Horários com maior volume de mensagens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>9:00 - 10:00</span>
                    <span className="font-medium">87 mensagens</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>14:00 - 15:00</span>
                    <span className="font-medium">76 mensagens</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "76%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>11:00 - 12:00</span>
                    <span className="font-medium">65 mensagens</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Tipos de Mensagem</CardTitle>
                <CardDescription>Distribuição dos tipos de mensagem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Texto</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Mídia (Imagens/Vídeo)</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Documentos</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Mensagens de Voz</span>
                    <span className="font-medium">2%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment">
          <Card className="modernize-card">
            <CardHeader>
              <CardTitle>Distribuição de Sentimento</CardTitle>
              <CardDescription>Distribuição de sentimento em todas as mensagens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sentimentData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 80, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                    <XAxis type="number" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                    <YAxis dataKey="name" type="category" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill={isDark ? "var(--primary)" : "var(--primary)"}
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Tendências de Sentimento</CardTitle>
                <CardDescription>Tendência semanal de sentimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Positivo</span>
                    </div>
                    <span className="font-medium text-green-500">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span>Neutro</span>
                    </div>
                    <span className="font-medium text-yellow-500">-3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>Negativo</span>
                    </div>
                    <span className="font-medium text-red-500">-9%</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Principais Insights</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• O sentimento geral está melhorando semana a semana</li>
                    <li>• O sentimento negativo diminuiu nas conversas de suporte</li>
                    <li>• O feedback de produto mostra sentimento misto</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Sentimento por Grupo</CardTitle>
                <CardDescription>Distribuição de sentimento por grupo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Equipe de Marketing</span>
                      <span className="font-medium">Majoritariamente Positivo</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="bg-red-500 w-[10%] rounded-l-full"></div>
                      <div className="bg-yellow-500 w-[30%]"></div>
                      <div className="bg-green-500 w-[60%] rounded-r-full"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Equipe de Vendas</span>
                      <span className="font-medium">Misto</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="bg-red-500 w-[25%] rounded-l-full"></div>
                      <div className="bg-yellow-500 w-[45%]"></div>
                      <div className="bg-green-500 w-[30%] rounded-r-full"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Equipe de Suporte</span>
                      <span className="font-medium">Melhorando</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="bg-red-500 w-[15%] rounded-l-full"></div>
                      <div className="bg-yellow-500 w-[35%]"></div>
                      <div className="bg-green-500 w-[50%] rounded-r-full"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Equipe de Produto</span>
                      <span className="font-medium">Precisa de Atenção</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="bg-red-500 w-[40%] rounded-l-full"></div>
                      <div className="bg-yellow-500 w-[40%]"></div>
                      <div className="bg-green-500 w-[20%] rounded-r-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="response">
          <Card className="modernize-card">
            <CardHeader>
              <CardTitle>Tempo Médio de Resposta por Grupo</CardTitle>
              <CardDescription>Tempo de resposta em minutos por grupo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={responseTimeData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 80, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                    <XAxis type="number" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                    <YAxis dataKey="group" type="category" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                      }}
                      formatter={(value) => [`${value} min`, "Tempo de Resposta"]}
                    />
                    <Bar
                      dataKey="time"
                      fill={isDark ? "var(--info)" : "var(--info)"}
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Tendências de Tempo de Resposta</CardTitle>
                <CardDescription>Tendências semanais de tempo de resposta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Esta Semana</span>
                    <span className="font-medium">8.5 min</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Semana Passada</span>
                    <span className="font-medium">10.2 min</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "51%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>2 Semanas Atrás</span>
                    <span className="font-medium">12.8 min</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center text-green-500">
                      <span className="font-medium">↓ 16.7% de melhoria</span>
                      <span className="text-sm ml-2">em relação à semana passada</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modernize-card">
              <CardHeader>
                <CardTitle>Distribuição de Tempo de Resposta</CardTitle>
                <CardDescription>Distribuição dos tempos de resposta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{"< 5 minutos"}</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>5-15 minutos</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>15-30 minutos</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{"> 30 minutos"}</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales">
          <SalesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
