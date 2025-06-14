"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { AxisDomain } from "recharts/types/util/types"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card } from "@/components/ui/card"
import EmptyState from "@/_components/EmptyState"

type Series = { date: string; tmr: number }[]

// Dados de exemplo
const mockData: Series = [
  { date: "2023-05-01", tmr: 12 },
  { date: "2023-05-02", tmr: 15 },
  { date: "2023-05-03", tmr: 10 },
  { date: "2023-05-04", tmr: 8 },
  { date: "2023-05-05", tmr: 20 },
  { date: "2023-05-06", tmr: 18 },
  { date: "2023-05-07", tmr: 14 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const tmrValue = payload[0].value as number
    const hours = Math.floor(tmrValue)
    const minutes = Math.floor((tmrValue - hours) * 60)

    return (
      <Card className="p-2 shadow-md border">
        <p className="text-sm font-medium">{format(parseISO(label), "dd 'de' MMMM, yyyy", { locale: ptBR })}</p>
        <p className="text-sm text-muted-foreground">
          TMR: {hours > 0 ? `${hours}h ` : ""}
          {minutes}m
        </p>
      </Card>
    )
  }

  return null
}

// Componente personalizado para mostrar o valor em cada ponto
const CustomizedDot = (props: any) => {
  const { cx, cy, value, index } = props

  // Verificar se cx e cy são números válidos
  if (typeof cx !== "number" || typeof cy !== "number" || isNaN(cx) || isNaN(cy)) {
    return null
  }

  const hours = Math.floor(value)
  const minutes = Math.floor((value - hours) * 60)
  const label = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

  // Ajustar a posição vertical do texto para evitar sobreposição
  const yOffset = index % 2 === 0 ? -25 : -40

  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill="#3b82f6" />
      <text
        x={cx}
        y={cy + yOffset}
        textAnchor="middle"
        fill="#6b7280"
        fontSize={12}
        fontWeight="bold"
        style={{ filter: "drop-shadow(0px 0px 2px white)" }}
      >
        {label}
      </text>
      <line x1={cx} y1={cy} x2={cx} y2={cy + yOffset + 5} stroke="#9ca3af" strokeWidth={1} strokeDasharray="2 2" />
    </g>
  )
}

export default function TmrLineChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [data] = useState<Series>(mockData)

  if (data.length === 0) {
    return <EmptyState message="Inicie suas conversas!" />
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 40, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(parseISO(date), "dd/MM", { locale: ptBR })}
            stroke={isDark ? "#9ca3af" : "#6b7280"}
          />
          <YAxis
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            domain={[0, "dataMax + 5"] as AxisDomain}
            tickFormatter={(value) => `${value}m`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="tmr"
            stroke={isDark ? "#60a5fa" : "#3b82f6"}
            strokeWidth={2}
            dot={<CustomizedDot />}
            activeDot={{ r: 6, fill: isDark ? "#93c5fd" : "#60a5fa", strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
