"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar, CheckCircle, Clock, Plus, Search, User, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

type TaskStatus = "todo" | "in_progress" | "review" | "done"
type TaskPriority = "low" | "medium" | "high" | "urgent"

interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  dueDate: Date
  createdAt: Date
  tags: string[]
  estimatedHours: number
  completedHours?: number
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Implementar filtros de sentimento por período",
    description: "Adicionar filtros de data para análise de sentimento histórica",
    status: "todo",
    priority: "high",
    assignee: "João Silva",
    dueDate: new Date(2024, 0, 15),
    createdAt: new Date(2024, 0, 10),
    tags: ["frontend", "filtros"],
    estimatedHours: 8,
  },
  {
    id: "2",
    title: "Criar gráfico de distribuição de sentimento",
    description: "Desenvolver visualização em pizza para mostrar distribuição de sentimentos",
    status: "in_progress",
    priority: "medium",
    assignee: "Maria Santos",
    dueDate: new Date(2024, 0, 18),
    createdAt: new Date(2024, 0, 8),
    tags: ["frontend", "charts"],
    estimatedHours: 12,
    completedHours: 6,
  },
  {
    id: "3",
    title: "Otimizar consultas de análise de sentimento",
    description: "Melhorar performance das queries de análise sentimental no banco",
    status: "review",
    priority: "high",
    assignee: "Carlos Oliveira",
    dueDate: new Date(2024, 0, 12),
    createdAt: new Date(2024, 0, 5),
    tags: ["backend", "performance"],
    estimatedHours: 16,
    completedHours: 16,
  },
  {
    id: "4",
    title: "Documentar API de sentimento",
    description: "Criar documentação completa dos endpoints de análise sentimental",
    status: "done",
    priority: "medium",
    assignee: "Ana Costa",
    dueDate: new Date(2024, 0, 10),
    createdAt: new Date(2024, 0, 3),
    tags: ["documentation", "api"],
    estimatedHours: 6,
    completedHours: 6,
  },
]

const statusConfig = {
  todo: { label: "A Fazer", color: "bg-gray-500", icon: Clock },
  in_progress: { label: "Em Progresso", color: "bg-blue-500", icon: User },
  review: { label: "Em Revisão", color: "bg-yellow-500", icon: AlertCircle },
  done: { label: "Concluído", color: "bg-green-500", icon: CheckCircle },
}

const priorityConfig = {
  low: { label: "Baixa", color: "bg-gray-400" },
  medium: { label: "Média", color: "bg-blue-400" },
  high: { label: "Alta", color: "bg-orange-400" },
  urgent: { label: "Urgente", color: "bg-red-500" },
}

export default function SentimentTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status)
  }

  const TaskCard = ({ task }: { task: Task }) => {
    const StatusIcon = statusConfig[task.status].icon
    const progress = task.completedHours ? (task.completedHours / task.estimatedHours) * 100 : 0

    return (
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <CardDescription className="mt-1">{task.description}</CardDescription>
            </div>
            <Badge className={`${priorityConfig[task.priority].color} text-white`}>
              {priorityConfig[task.priority].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <StatusIcon className="h-4 w-4" />
                <span className={`px-2 py-1 rounded-full text-xs text-white ${statusConfig[task.status].color}`}>
                  {statusConfig[task.status].label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(task.dueDate, "dd/MM/yyyy", { locale: ptBR })}</span>
              </div>
            </div>

            {task.completedHours && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>
                    {task.completedHours}h / {task.estimatedHours}h
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{task.assignee}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Análise de Sentimento - Gerenciamento de Tarefas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as atividades de desenvolvimento da funcionalidade de análise de sentimento
          </p>
        </div>
        <Button onClick={() => setShowNewTaskForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">A Fazer</p>
                <p className="text-2xl font-bold">{getTasksByStatus("todo").length}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Progresso</p>
                <p className="text-2xl font-bold">{getTasksByStatus("in_progress").length}</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Revisão</p>
                <p className="text-2xl font-bold">{getTasksByStatus("review").length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Concluído</p>
                <p className="text-2xl font-bold">{getTasksByStatus("done").length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="todo">A Fazer</SelectItem>
            <SelectItem value="in_progress">Em Progresso</SelectItem>
            <SelectItem value="review">Em Revisão</SelectItem>
            <SelectItem value="done">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Tarefas */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(statusConfig).map(([status, config]) => (
              <Card key={status}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <config.icon className="h-4 w-4" />
                    {config.label}
                    <Badge variant="secondary" className="ml-auto">
                      {getTasksByStatus(status as TaskStatus).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getTasksByStatus(status as TaskStatus).map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
