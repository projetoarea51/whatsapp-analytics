"use client"

import { useTheme } from "next-themes"
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts"

type SentimentGaugeProps = {
  value: number // 0..4 (0=Raiva, 4=Feliz)
}

export default function Termometer({ value }: SentimentGaugeProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Sentiment labels
  const sentimentLabels = ["Raiva", "Crítico", "Muitas Dúvidas", "Sob Controle", "Feliz"]

  // Colors based on sentiment value
  const getColor = (value: number) => {
    const colors = {
      0: isDark ? "#f87171" : "#ef4444", // error
      1: isDark ? "#fb923c" : "#f97316", // warning
      2: isDark ? "#60a5fa" : "#3b82f6", // info
      3: isDark ? "#4ade80" : "#22c55e", // success
      4: isDark ? "#34d399" : "#10b981", // success.dark
    }
    return colors[value as keyof typeof colors]
  }

  const data = [
    {
      name: sentimentLabels[value],
      value: 100,
      fill: getColor(value),
    },
  ]

  return (
    <div className="h-[150px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          barSize={10}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background clockWise dataKey="value" cornerRadius={10} fill={getColor(value)} />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-lg font-bold"
          >
            {sentimentLabels[value]}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
