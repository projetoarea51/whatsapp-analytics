"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, Mail } from "lucide-react"

export default function ReportsTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Relatórios</h2>
          <p className="text-muted-foreground">Gere e baixe relatórios sobre suas análises do WhatsApp</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="last7days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="last7days">Últimos 7 dias</SelectItem>
              <SelectItem value="last30days">Últimos 30 dias</SelectItem>
              <SelectItem value="thismonth">Este mês</SelectItem>
              <SelectItem value="lastmonth">Mês passado</SelectItem>
              <SelectItem value="custom">Período personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="modernize-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Resumo de Atividade</span>
            </CardTitle>
            <CardDescription>Visão geral de toda atividade do WhatsApp</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Este relatório inclui volume de mensagens, tempos de resposta e horários ativos em todos os grupos e
              contatos monitorados.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Última atualização: Hoje</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Baixar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="modernize-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-sky-500" />
              <span>Análise de Sentimento</span>
            </CardTitle>
            <CardDescription>Tendências e distribuição de sentimento</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Detalhamento do sentimento nas conversas, incluindo tendências e principais insights por grupo.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Última atualização: Ontem</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Baixar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="modernize-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-500" />
              <span>Relatório de Influência</span>
            </CardTitle>
            <CardDescription>Principais influenciadores e seu impacto</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Análise dos contatos e grupos mais influentes, incluindo métricas de engajamento e alcance.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Última atualização: 2 dias atrás</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Baixar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="modernize-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-500" />
              <span>Tempo de Resposta</span>
            </CardTitle>
            <CardDescription>Análise detalhada do tempo de resposta</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Análise abrangente dos tempos de resposta por grupo, hora do dia e dia da semana.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Última atualização: 3 dias atrás</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Baixar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="modernize-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>Análise de Tópicos</span>
            </CardTitle>
            <CardDescription>Tópicos comuns e palavras-chave</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Análise de tópicos frequentemente discutidos, palavras-chave em tendência e temas de conversa.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Última atualização: 5 dias atrás</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Baixar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="modernize-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-red-500" />
              <span>Agendar Relatório</span>
            </CardTitle>
            <CardDescription>Configure entrega automática de relatórios</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Configure relatórios automatizados para serem entregues em seu e-mail em uma programação regular.
            </p>
            <Button className="w-full modernize-btn-primary">Configurar Agendamento</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
