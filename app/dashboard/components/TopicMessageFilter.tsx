"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Message = {
  id: string
  content: string
  timestamp: Date
  group: string
  sender: {
    name: string
    avatarUrl?: string
  }
  isOutgoing?: boolean
}

type TopicData = {
  id: string
  name: string
  color: string
  messages: Message[]
}

// Dados de exemplo para tópicos
const topicsData: TopicData[] = [
  {
    id: "t1",
    name: "Vendas",
    color: "bg-blue-500",
    messages: [
      {
        id: "m1",
        content: "Precisamos melhorar nossa taxa de conversão. Estamos perdendo muitos leads na etapa final.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
        group: "G4 Scale",
        sender: {
          name: "João Silva",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m2",
        content: "Implementamos um novo CRM, mas a equipe está tendo dificuldades para se adaptar ao processo.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 dia atrás
        group: "G4 Club",
        sender: {
          name: "Maria Oliveira",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m1a",
        content:
          "Nossa meta para este trimestre é aumentar as vendas em 20%. Precisamos de estratégias mais agressivas.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
        group: "Equipe de Vendas",
        sender: {
          name: "Roberto Almeida",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m1b",
        content: "O novo cliente potencial solicitou uma demonstração para a próxima semana. Quem pode atender?",
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 horas atrás
        group: "G4 Scale",
        sender: {
          name: "Camila Santos",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m1c",
        content: "Acabei de fechar um contrato com a empresa XYZ. Valor anual de R$ 120.000!",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutos atrás
        group: "G4 Club",
        sender: {
          name: "Paulo Mendes",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m1d",
        content: "Precisamos revisar nossa política de descontos. Estamos perdendo margem em negociações longas.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 horas atrás
        group: "Equipe de Vendas",
        sender: {
          name: "Fernanda Lima",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
    ],
  },
  {
    id: "t2",
    name: "Produto",
    color: "bg-green-500",
    messages: [
      {
        id: "m3",
        content: "O feedback dos usuários sobre a nova interface tem sido muito positivo.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutos atrás
        group: "Tech Leaders SP",
        sender: {
          name: "Roberto Santos",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m4",
        content: "Precisamos priorizar a correção dos bugs reportados antes de lançar novos recursos.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
        group: "GE - 124",
        sender: {
          name: "Camila Pereira",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m2a",
        content: "A nova funcionalidade de exportação de relatórios será lançada na próxima semana.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
        group: "Desenvolvimento",
        sender: {
          name: "Lucas Oliveira",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m2b",
        content: "Estamos enfrentando problemas de desempenho no módulo de análise de dados. Alguém pode ajudar?",
        timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 horas atrás
        group: "Tech Leaders SP",
        sender: {
          name: "Amanda Costa",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m2c",
        content: "O teste A/B mostrou que a versão B teve uma taxa de conversão 30% maior.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
        group: "GE - 124",
        sender: {
          name: "Rodrigo Alves",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m2d",
        content: "Precisamos definir as prioridades para o próximo sprint. Vamos agendar uma reunião?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
        group: "Desenvolvimento",
        sender: {
          name: "Juliana Martins",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
    ],
  },
  {
    id: "t3",
    name: "Suporte",
    color: "bg-purple-500",
    messages: [
      {
        id: "m5",
        content: "O tempo de resposta do suporte melhorou significativamente após as mudanças no processo.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
        group: "G4 Scale",
        sender: {
          name: "Miguel Costa",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m6",
        content: "Estamos recebendo muitas solicitações sobre o mesmo problema. Precisamos de uma solução definitiva.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
        group: "G4 Club",
        sender: {
          name: "Ana Souza",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m3a",
        content: "Cliente relatou que o problema de login foi resolvido após a atualização.",
        timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutos atrás
        group: "Atendimento",
        sender: {
          name: "Carlos Eduardo",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m3b",
        content:
          "Precisamos criar um artigo na base de conhecimento sobre o erro #5432. Está afetando muitos usuários.",
        timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1h30 atrás
        group: "G4 Scale",
        sender: {
          name: "Patricia Lima",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m3c",
        content: "A integração com o sistema de pagamentos está instável desde ontem. Equipe de TI já está ciente.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 horas atrás
        group: "Atendimento",
        sender: {
          name: "Ricardo Gomes",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m3d",
        content: "Conseguimos reduzir o tempo médio de resolução de tickets em 25% este mês. Ótimo trabalho, equipe!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 horas atrás
        group: "G4 Club",
        sender: {
          name: "Mariana Silva",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
    ],
  },
  {
    id: "t4",
    name: "Marketing",
    color: "bg-yellow-500",
    messages: [
      {
        id: "m7",
        content: "A campanha nas redes sociais está gerando mais engajamento do que o esperado.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
        group: "Marketing Digital",
        sender: {
          name: "Carlos Mendes",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m8",
        content: "Precisamos revisar nossa estratégia de conteúdo para o próximo trimestre.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 horas atrás
        group: "G4 Scale",
        sender: {
          name: "Fernanda Lima",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m4a",
        content: "O último webinar teve 500 participantes! Precisamos fazer mais eventos como esse.",
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutos atrás
        group: "Marketing Digital",
        sender: {
          name: "Beatriz Almeida",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m4b",
        content: "Acabei de aprovar os novos designs para os banners do site. Ficaram excelentes!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hora atrás
        group: "G4 Scale",
        sender: {
          name: "Daniel Costa",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m4c",
        content: "Nossa taxa de abertura de e-mail marketing aumentou 15% após as mudanças no assunto.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
        group: "Marketing Digital",
        sender: {
          name: "Luiza Santos",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m4d",
        content: "Precisamos integrar melhor nossas campanhas de marketing com o funil de vendas.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
        group: "G4 Scale",
        sender: {
          name: "Gabriel Oliveira",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
    ],
  },
  {
    id: "t5",
    name: "Finanças",
    color: "bg-red-500",
    messages: [
      {
        id: "m9",
        content: "O relatório financeiro do último trimestre mostra um crescimento de 15% nas receitas.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hora atrás
        group: "G4 Club",
        sender: {
          name: "Ricardo Alves",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m10",
        content: "Precisamos revisar o orçamento para o próximo ano fiscal.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 horas atrás
        group: "GE - 124",
        sender: {
          name: "Juliana Castro",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m5a",
        content: "Os investimentos em marketing digital tiveram um ROI de 320% no último trimestre.",
        timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutos atrás
        group: "Finanças",
        sender: {
          name: "André Martins",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m5b",
        content: "Precisamos otimizar nossos custos operacionais. Vamos agendar uma reunião com os gestores?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
        group: "G4 Club",
        sender: {
          name: "Cristina Pereira",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m5c",
        content: "A auditoria foi concluída sem ressalvas. Todos os processos estão em conformidade.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
        group: "Finanças",
        sender: {
          name: "Marcelo Souza",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m5d",
        content: "Conseguimos reduzir os custos fixos em 8% após a renegociação com fornecedores.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
        group: "GE - 124",
        sender: {
          name: "Renata Lima",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
    ],
  },
  {
    id: "t6",
    name: "RH",
    color: "bg-pink-500",
    messages: [
      {
        id: "m6a",
        content: "O processo seletivo para a vaga de desenvolvedor frontend recebeu mais de 200 candidaturas.",
        timestamp: new Date(Date.now() - 1000 * 60 * 35), // 35 minutos atrás
        group: "Recrutamento",
        sender: {
          name: "Carolina Mendes",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m6b",
        content: "Precisamos finalizar o plano de treinamento para o próximo semestre até o final da semana.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
        group: "G4 Scale",
        sender: {
          name: "Thiago Oliveira",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m6c",
        content: "A pesquisa de clima organizacional mostrou uma melhoria de 12% na satisfação dos colaboradores.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 horas atrás
        group: "Recrutamento",
        sender: {
          name: "Aline Costa",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
      {
        id: "m6d",
        content: "Vamos implementar o novo programa de benefícios a partir do próximo mês.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
        group: "G4 Scale",
        sender: {
          name: "Rafael Santos",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: true,
      },
      {
        id: "m6e",
        content: "O índice de turnover reduziu 8% após as melhorias no processo de onboarding.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
        group: "Recrutamento",
        sender: {
          name: "Vanessa Lima",
          avatarUrl: "/placeholder-user.jpg",
        },
        isOutgoing: false,
      },
    ],
  },
]

export default function TopicMessageFilter() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [starredMessages, setStarredMessages] = useState<Set<string>>(new Set())

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

  // Encontrar o tópico selecionado
  const currentTopic = selectedTopic ? topicsData.find((topic) => topic.id === selectedTopic) : null
  const messages = currentTopic?.messages || []

  return (
    <div className="space-y-4">
      {/* Filtros como tags */}
      <div className="flex flex-wrap gap-2">
        {topicsData.map((topic) => (
          <Badge
            key={topic.id}
            variant={selectedTopic === topic.id ? "default" : "outline"}
            className={cn(
              "cursor-pointer text-sm py-1 px-3",
              selectedTopic === topic.id && topic.color,
              selectedTopic === topic.id ? "text-white" : "",
            )}
            onClick={() => setSelectedTopic(topic.id === selectedTopic ? null : topic.id)}
          >
            {topic.name}
          </Badge>
        ))}
      </div>

      {/* Mensagens estilo WhatsApp */}
      <div
        className="rounded-md p-3 space-y-3 max-h-[350px] overflow-y-auto"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAAtElEQVRIDe2UMQ6DMAxFMXTgGr0dR+AQHSvEyh04AGJlZOAAnKD8Iq8qRSRumoGWv8R27H+2lBZFPnmSPYVQ1ZTqvR9TSqO1di2K4gA+UmEKwxhzJdDzvJG5yTVTzDnfCRTLsqxUvfdXeZVJ4DdYBQTZYEzQDXYBQRIYE5jBISBIBGOCbtAFBAlgTGAGbUCQDYwJTGBuEORUhtU7xgS/g/MnEGSBMcHmYBMQJIIxwTdYBQRZYHzGE/iMdQyrJPUwAAAAAElFTkSuQmCC")`,
          backgroundColor: "#e5ddd5",
        }}
      >
        {selectedTopic === null ? (
          <div className="text-center py-8 text-muted-foreground">
            Selecione um tópico para ver as mensagens relacionadas
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Nenhuma mensagem encontrada para este tópico</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={cn("flex", message.isOutgoing ? "justify-end" : "justify-start")}>
              <div className="flex flex-col max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  {!message.isOutgoing && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={message.sender.avatarUrl || "/placeholder.svg"} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="text-xs font-medium">{message.sender.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(message.timestamp, "HH:mm", { locale: ptBR })}
                  </span>
                </div>
                <div
                  className={cn(
                    "relative px-3 py-2 rounded-lg text-sm",
                    message.isOutgoing ? "bg-[#dcf8c6] text-gray-800" : "bg-white text-gray-800",
                    "shadow-sm",
                  )}
                >
                  <div className="flex justify-between gap-2">
                    <p>{message.content}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 -mr-1 -mt-1 opacity-70 hover:opacity-100"
                      onClick={() => toggleStar(message.id)}
                    >
                      <Star
                        className={cn(
                          "h-3 w-3",
                          starredMessages.has(message.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-500",
                        )}
                      />
                      <span className="sr-only">
                        {starredMessages.has(message.id) ? "Desmarcar" : "Marcar"} mensagem
                      </span>
                    </Button>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <Badge className="text-[10px] py-0 px-1 h-4 bg-blue-500 text-white hover:bg-blue-600">
                      {message.group}
                    </Badge>
                    <span className="text-[10px] text-gray-500">
                      {format(message.timestamp, "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
