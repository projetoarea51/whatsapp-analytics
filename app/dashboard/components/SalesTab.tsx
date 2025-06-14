"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados de exemplo para cadências
const cadenceData = [
  {
    name: "#1 Tentativa",
    enviadas: 120,
    naoResponderam: 80,
    responderam: 40,
  },
  {
    name: "#2 Tentativa",
    enviadas: 80,
    naoResponderam: 60,
    responderam: 20,
  },
  {
    name: "#3 Tentativa",
    enviadas: 60,
    naoResponderam: 45,
    responderam: 15,
  },
  {
    name: "#4 Tentativa",
    enviadas: 45,
    naoResponderam: 38,
    responderam: 7,
  },
]

// Dados de exemplo para vendedores
const salesReps = [
  { id: "all", name: "Todos Vendedores" },
  { id: "1", name: "Carlos Silva" },
  { id: "2", name: "Ana Oliveira" },
  { id: "3", name: "Roberto Santos" },
  { id: "4", name: "Juliana Costa" },
]

// Dados de exemplo para funil de cadências por vendedor
const salesRepCadenceData = {
  all: [
    { name: "#1 Tentativa", value: 120 },
    { name: "#2 Tentativa", value: 80 },
    { name: "#3 Tentativa", value: 60 },
    { name: "#4 Tentativa", value: 45 },
  ],
  "1": [
    { name: "#1 Tentativa", value: 35 },
    { name: "#2 Tentativa", value: 28 },
    { name: "#3 Tentativa", value: 20 },
    { name: "#4 Tentativa", value: 15 },
  ],
  "2": [
    { name: "#1 Tentativa", value: 42 },
    { name: "#2 Tentativa", value: 30 },
    { name: "#3 Tentativa", value: 22 },
    { name: "#4 Tentativa", value: 18 },
  ],
  "3": [
    { name: "#1 Tentativa", value: 25 },
    { name: "#2 Tentativa", value: 15 },
    { name: "#3 Tentativa", value: 10 },
    { name: "#4 Tentativa", value: 8 },
  ],
  "4": [
    { name: "#1 Tentativa", value: 18 },
    { name: "#2 Tentativa", value: 7 },
    { name: "#3 Tentativa", value: 8 },
    { name: "#4 Tentativa", value: 4 },
  ],
}

// Dados de exemplo para taxa de resposta por vendedor
const responseRateData = [
  { name: "Carlos Silva", taxa: 35 },
  { name: "Ana Oliveira", taxa: 42 },
  { name: "Roberto Santos", taxa: 28 },
  { name: "Juliana Costa", taxa: 38 },
]

// Dados de exemplo para tempo médio de resposta por cadência
const avgResponseTimeData = [
  { name: "#1 Tentativa", tempo: 24 },
  { name: "#2 Tentativa", tempo: 36 },
  { name: "#3 Tentativa", tempo: 48 },
  { name: "#4 Tentativa", tempo: 60 },
]

export default function SalesTab() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedSalesRep, setSelectedSalesRep] = useState("all")
  const [timeFrame, setTimeFrame] = useState("48h")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Análise de Vendas</h2>
          <p className="text-muted-foreground">Acompanhamento de cadências e respostas de leads</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período de análise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24h</SelectItem>
              <SelectItem value="48h">Últimas 48h</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="modernize-card">
        <CardHeader>
          <CardTitle>Análise de Cadências</CardTitle>
          <CardDescription>Acompanhamento de mensagens enviadas e respostas por tentativa de contato</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cadenceData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  }}
                />
                <Legend />
                <Bar dataKey="enviadas" name="Enviadas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="naoResponderam" name="Não Responderam" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="responderam" name="Responderam" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="modernize-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Funil de Cadências por Vendedor</CardTitle>
                <CardDescription>Quantidade de contatos realizados em cada tentativa</CardDescription>
              </div>
              <Select value={selectedSalesRep} onValueChange={setSelectedSalesRep}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione um vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {salesReps.map((rep) => (
                    <SelectItem key={rep.id} value={rep.id}>
                      {rep.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesRepCadenceData[selectedSalesRep as keyof typeof salesRepCadenceData]}
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
                    formatter={(value) => [`${value} contatos`, "Quantidade"]}
                  />
                  <Bar dataKey="value" name="Contatos" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="modernize-card">
          <CardHeader>
            <CardTitle>Métricas de Resposta</CardTitle>
            <CardDescription>Análise de taxas e tempos de resposta</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="rate">
              <TabsList className="mb-4">
                <TabsTrigger value="rate">Taxa de Resposta</TabsTrigger>
                <TabsTrigger value="time">Tempo de Resposta</TabsTrigger>
              </TabsList>
              <TabsContent value="rate">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={responseRateData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                      <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#1f2937" : "#ffffff",
                          border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                        }}
                        formatter={(value) => [`${value}%`, "Taxa de Resposta"]}
                      />
                      <Bar dataKey="taxa" name="Taxa de Resposta" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="time">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={avgResponseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                      <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#1f2937" : "#ffffff",
                          border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                        }}
                        formatter={(value) => [`${value}h`, "Tempo Médio"]}
                      />
                      <Bar dataKey="tempo" name="Tempo Médio (horas)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="modernize-card">
        <CardHeader>
          <CardTitle>Desempenho de Vendedores</CardTitle>
          <CardDescription>Análise comparativa de cumprimento de cadências</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {salesReps.slice(1).map((rep, index) => (
              <div key={rep.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{rep.name}</span>
                  <span className="text-sm">
                    {Math.floor(
                      (salesRepCadenceData[rep.id as keyof typeof salesRepCadenceData][3].value /
                        salesRepCadenceData[rep.id as keyof typeof salesRepCadenceData][0].value) *
                        100,
                    )}
                    % de conclusão
                  </span>
                </div>
                <div className="flex gap-1 h-2">
                  {salesRepCadenceData[rep.id as keyof typeof salesRepCadenceData].map((cadence, i) => {
                    const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]
                    const width = `${(cadence.value / salesRepCadenceData[rep.id as keyof typeof salesRepCadenceData][0].value) * 100}%`
                    return (
                      <div
                        key={i}
                        className={`${i === 0 ? "rounded-l-full" : ""} ${
                          i === salesRepCadenceData[rep.id as keyof typeof salesRepCadenceData].length - 1
                            ? "rounded-r-full"
                            : ""
                        }`}
                        style={{ backgroundColor: colors[i], width }}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1ª Tentativa: {salesRepCadenceData[rep.id as keyof typeof salesRepCadenceData][0].value}</span>
                  <span>4ª Tentativa: {salesRepCadenceData[rep.id as keyof typeof salesRepCadenceData][3].value}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
