"use client"

import { ArrowDown, ArrowUp, MessageSquare, Users, User } from "lucide-react"

type MonitoringStatsProps = {
  type: "total" | "private" | "groups" | "tmr" | "tmr-individual" | "tmr-groups"
  value: number | string
  change: number
}

export default function MonitoringStats({ type, value, change }: MonitoringStatsProps) {
  const getIcon = () => {
    switch (type) {
      case "total":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "private":
        return <User className="h-4 w-4 text-green-600" />
      case "groups":
        return <Users className="h-4 w-4 text-amber-600" />
      case "tmr":
      case "tmr-individual":
      case "tmr-groups":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getChangeText = () => {
    const prefix = change > 0 ? "+" : ""
    const suffix = type.startsWith("tmr") ? "% em relação a ontem" : "% em relação à última hora"
    return `${prefix}${change}${suffix}`
  }

  const getChangeColor = () => {
    // Para métricas de tempo, menor é melhor (negativo é bom)
    if (type.startsWith("tmr")) {
      return change < 0 ? "text-green-600" : "text-red-600"
    }
    // Para outras métricas, maior é melhor (positivo é bom)
    return change > 0 ? "text-green-600" : "text-red-600"
  }

  const getChangeIcon = () => {
    // Para métricas de tempo, menor é melhor (negativo é bom)
    if (type.startsWith("tmr")) {
      return change < 0 ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />
    }
    // Para outras métricas, maior é melhor (positivo é bom)
    return change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {getIcon()}
        <span className="text-lg font-bold ml-2">{value}</span>
      </div>
      <div className={`flex items-center text-xs mt-1 ${getChangeColor()}`}>
        {getChangeIcon()}
        <span className="ml-1">{getChangeText()}</span>
      </div>
    </div>
  )
}
