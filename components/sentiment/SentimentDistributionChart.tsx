"use client"

import { useTheme } from "next-themes"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { SentimentDistribution } from "@/types"

export interface SentimentDistributionChartProps {
  distribution?: SentimentDistribution
  data?: Array<{ name: string; value: number }>
  height?: number
  showLegend?: boolean
  showTooltip?: boolean
}

export function SentimentDistributionChart({
  distribution,
  data,
  height = 300,
  showLegend = true,
  showTooltip = true,
}: SentimentDistributionChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Prepare data based on which prop is provided
  let chartData = []

  if (data && data.length > 0) {
    // If data array is provided, use it directly
    chartData = data
  } else if (distribution) {
    // If distribution object is provided, convert it to array format
    chartData = [
      { name: "Positivo", value: distribution.positive || 0 },
      { name: "Neutro", value: distribution.neutral || 0 },
      { name: "Negativo", value: distribution.negative || 0 },
      { name: "Confuso", value: distribution.confused || 0 },
    ]
  } else {
    // Fallback data if nothing is provided
    chartData = [
      { name: "Positivo", value: 0 },
      { name: "Neutro", value: 0 },
      { name: "Negativo", value: 0 },
      { name: "Confuso", value: 0 },
    ]
  }

  // Filter out zero values
  chartData = chartData.filter((item) => item.value > 0)

  // If all values are zero, add a placeholder
  if (chartData.length === 0) {
    chartData = [{ name: "Sem dados", value: 1 }]
  }

  const COLORS = ["#22c55e", "#eab308", "#ef4444", "#a855f7"]
  const RADIAN = Math.PI / 180

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
    index: number
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill={isDark ? "white" : "black"}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip />}
        {showLegend && (
          <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: "20px" }} />
        )}
      </PieChart>
    </ResponsiveContainer>
  )
}
