"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"

type HeatmapData = {
  group: string
  hours: {
    range: string
    count: number
  }[]
}[]

// Dados de exemplo com ranges de 2 horas
const mockData: HeatmapData = [
  {
    group: "Equipe de Marketing",
    hours: [
      { range: "00-02", count: Math.floor(Math.random() * 50) },
      { range: "02-04", count: Math.floor(Math.random() * 50) },
      { range: "04-06", count: Math.floor(Math.random() * 50) },
      { range: "06-08", count: Math.floor(Math.random() * 50) },
      { range: "08-10", count: Math.floor(Math.random() * 50) },
      { range: "10-12", count: Math.floor(Math.random() * 50) },
      { range: "12-14", count: Math.floor(Math.random() * 50) },
      { range: "14-16", count: Math.floor(Math.random() * 50) },
      { range: "16-18", count: Math.floor(Math.random() * 50) },
      { range: "18-20", count: Math.floor(Math.random() * 50) },
      { range: "20-22", count: Math.floor(Math.random() * 50) },
      { range: "22-24", count: Math.floor(Math.random() * 50) },
    ],
  },
  {
    group: "Grupo de Vendas",
    hours: [
      { range: "00-02", count: Math.floor(Math.random() * 50) },
      { range: "02-04", count: Math.floor(Math.random() * 50) },
      { range: "04-06", count: Math.floor(Math.random() * 50) },
      { range: "06-08", count: Math.floor(Math.random() * 50) },
      { range: "08-10", count: Math.floor(Math.random() * 50) },
      { range: "10-12", count: Math.floor(Math.random() * 50) },
      { range: "12-14", count: Math.floor(Math.random() * 50) },
      { range: "14-16", count: Math.floor(Math.random() * 50) },
      { range: "16-18", count: Math.floor(Math.random() * 50) },
      { range: "18-20", count: Math.floor(Math.random() * 50) },
      { range: "20-22", count: Math.floor(Math.random() * 50) },
      { range: "22-24", count: Math.floor(Math.random() * 50) },
    ],
  },
  {
    group: "Equipe de Suporte",
    hours: [
      { range: "00-02", count: Math.floor(Math.random() * 50) },
      { range: "02-04", count: Math.floor(Math.random() * 50) },
      { range: "04-06", count: Math.floor(Math.random() * 50) },
      { range: "06-08", count: Math.floor(Math.random() * 50) },
      { range: "08-10", count: Math.floor(Math.random() * 50) },
      { range: "10-12", count: Math.floor(Math.random() * 50) },
      { range: "12-14", count: Math.floor(Math.random() * 50) },
      { range: "14-16", count: Math.floor(Math.random() * 50) },
      { range: "16-18", count: Math.floor(Math.random() * 50) },
      { range: "18-20", count: Math.floor(Math.random() * 50) },
      { range: "20-22", count: Math.floor(Math.random() * 50) },
      { range: "22-24", count: Math.floor(Math.random() * 50) },
    ],
  },
  {
    group: "Sucesso do Cliente",
    hours: [
      { range: "00-02", count: Math.floor(Math.random() * 50) },
      { range: "02-04", count: Math.floor(Math.random() * 50) },
      { range: "04-06", count: Math.floor(Math.random() * 50) },
      { range: "06-08", count: Math.floor(Math.random() * 50) },
      { range: "08-10", count: Math.floor(Math.random() * 50) },
      { range: "10-12", count: Math.floor(Math.random() * 50) },
      { range: "12-14", count: Math.floor(Math.random() * 50) },
      { range: "14-16", count: Math.floor(Math.random() * 50) },
      { range: "16-18", count: Math.floor(Math.random() * 50) },
      { range: "18-20", count: Math.floor(Math.random() * 50) },
      { range: "20-22", count: Math.floor(Math.random() * 50) },
      { range: "22-24", count: Math.floor(Math.random() * 50) },
    ],
  },
  {
    group: "Equipe de Produto",
    hours: [
      { range: "00-02", count: Math.floor(Math.random() * 50) },
      { range: "02-04", count: Math.floor(Math.random() * 50) },
      { range: "04-06", count: Math.floor(Math.random() * 50) },
      { range: "06-08", count: Math.floor(Math.random() * 50) },
      { range: "08-10", count: Math.floor(Math.random() * 50) },
      { range: "10-12", count: Math.floor(Math.random() * 50) },
      { range: "12-14", count: Math.floor(Math.random() * 50) },
      { range: "14-16", count: Math.floor(Math.random() * 50) },
      { range: "16-18", count: Math.floor(Math.random() * 50) },
      { range: "18-20", count: Math.floor(Math.random() * 50) },
      { range: "20-22", count: Math.floor(Math.random() * 50) },
      { range: "22-24", count: Math.floor(Math.random() * 50) },
    ],
  },
]

export default function Heatmap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [data] = useState<HeatmapData>(mockData)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: React.ReactNode } | null>(null)

  const getHeatColor = (count: number, maxCount = 50) => {
    // Usando uma única cor (azul) com diferentes intensidades
    const baseColor = isDark ? "60, 105, 250" : "59, 130, 246" // rgb para azul
    const opacity = Math.max(0.1, Math.min(0.9, count / maxCount))
    return `rgba(${baseColor}, ${opacity})`
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, group: string, range: string, count: number) => {
    setTooltip({
      x: e.clientX,
      y: e.clientY,
      content: (
        <>
          <div className="font-medium">{group}</div>
          <div>Horário: {range}h</div>
          <div>Mensagens: {count}</div>
        </>
      ),
    })
  }

  const handleMouseLeave = () => {
    setTooltip(null)
  }

  return (
    <div className="relative">
      <div className="flex mb-2">
        <div className="w-32"></div>
        <div className="flex-1 grid grid-cols-12 text-xs text-center">
          {data[0].hours.map((hour, i) => (
            <div key={i}>{hour.range}h</div>
          ))}
        </div>
      </div>

      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="flex mb-1">
          <div className="w-32 truncate pr-2 text-sm">{row.group}</div>
          <div className="flex-1 grid grid-cols-12 gap-1">
            {row.hours.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor: getHeatColor(cell.count),
                }}
                onMouseMove={(e) => handleMouseMove(e, row.group, cell.range, cell.count)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      ))}

      {tooltip && (
        <Card
          className="absolute p-2 z-50 text-xs"
          style={{
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y + 10}px`,
            transform: "translateX(-50%)",
          }}
        >
          {tooltip.content}
        </Card>
      )}
    </div>
  )
}
