"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, FrownIcon as EmojiSad, Eye, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Alert = {
  id: string
  type: "tmr" | "sentiment"
  message: string
  timestamp: Date
  read: boolean
}

// Dados de exemplo
const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "tmr",
    message: "Tempo médio de resposta na 'Equipe de Marketing' excedeu 30 minutos",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
  },
  {
    id: "2",
    type: "sentiment",
    message: "Sentimento negativo detectado no grupo 'Suporte ao Cliente'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: false,
  },
  {
    id: "3",
    type: "tmr",
    message: "Tempo médio de resposta na 'Equipe de Vendas' excedeu 20 minutos",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    read: true,
  },
  {
    id: "4",
    type: "sentiment",
    message: "Sentimento negativo detectado no grupo 'Feedback de Produto'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 horas atrás
    read: true,
  },
  {
    id: "5",
    type: "tmr",
    message: "Tempo médio de resposta na 'Equipe de Engenharia' excedeu 25 minutos",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 horas atrás
    read: true,
  },
]

export default function AlertList() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)

  const toggleReadStatus = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: !alert.read } : alert)))
  }

  return (
    <div className="max-h-[240px] overflow-y-auto pr-2">
      {alerts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">Nenhum alerta para exibir</div>
      ) : (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn("p-3 rounded-md border flex items-start gap-3", alert.read ? "bg-transparent" : "bg-muted")}
            >
              <div className="mt-0.5">
                {alert.type === "tmr" ? (
                  <Clock className="h-5 w-5 text-amber-500" />
                ) : (
                  <EmojiSad className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm", alert.read ? "font-normal" : "font-medium")}>{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(alert.timestamp, { addSuffix: true, locale: ptBR })}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => toggleReadStatus(alert.id)}
              >
                {alert.read ? <Mail className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{alert.read ? "Marcar como não lido" : "Marcar como lido"}</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
