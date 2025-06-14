"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import * as d3 from "d3"

type PainPoint = {
  category: string
  count: number
  keywords: string[]
}

type PainPointsBubbleChartProps = {
  painPoints: PainPoint[]
  onBubbleClick: (category: string) => void
  selectedCategory?: string | null
  height?: number
}

export default function PainPointsBubbleChart({
  painPoints,
  onBubbleClick,
  selectedCategory = null,
  height = 400,
}: PainPointsBubbleChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [dimensions, setDimensions] = useState({ width: 0, height })
  const [selectedBubble, setSelectedBubble] = useState<string | null>(selectedCategory)

  // Atualizar seleção quando a prop mudar
  useEffect(() => {
    setSelectedBubble(selectedCategory)
  }, [selectedCategory])

  // Atualizar dimensões quando o componente montar
  useEffect(() => {
    if (svgRef.current) {
      const { width } = svgRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    const handleResize = () => {
      if (svgRef.current) {
        const { width } = svgRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [height])

  // Renderizar o gráfico quando as dimensões ou dados mudarem
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || painPoints.length === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const { width, height } = dimensions

    // Configurar o layout de força para as bolhas
    const simulation = d3
      .forceSimulation()
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("charge", d3.forceManyBody().strength(10)) // Aumentado para aproximar as bolhas
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d: any) => d.radius + 5), // Reduzido para aproximar as bolhas
      )

    // Preparar os dados
    const data = painPoints.map((d) => ({
      ...d,
      radius: Math.sqrt(d.count) * 10, // Tamanho proporcional à contagem
    }))

    // Definir a escala de cores
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Criar gradientes para efeito 3D
    const defs = svg.append("defs")

    data.forEach((d, i) => {
      const gradientId = `bubble-gradient-${i}`
      const gradient = defs
        .append("radialGradient")
        .attr("id", gradientId)
        .attr("cx", "30%")
        .attr("cy", "30%")
        .attr("r", "70%")

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr(
          "stop-color",
          isDark
            ? d3.color(color(d.category))?.brighter(0.5).toString() || "#fff"
            : d3.color(color(d.category))?.brighter(0.8).toString() || "#fff",
        )

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color(d.category) as string)

      d.gradientId = gradientId
    })

    // Criar os círculos
    const bubbles = svg
      .selectAll(".bubble")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .style("cursor", "pointer")
      .on("click", (event, d: any) => {
        setSelectedBubble(d.category)
        onBubbleClick(d.category)
      })

    // Adicionar círculos com efeito de hover
    bubbles
      .append("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any, i) => `url(#${d.gradientId})`)
      .attr("fill-opacity", (d: any) => (selectedBubble === d.category ? 0.9 : 0.7))
      .attr("stroke", (d: any) => (selectedBubble === d.category ? (isDark ? "#fff" : "#000") : "none"))
      .attr("stroke-width", 2)
      .attr("stroke-opacity", isDark ? 0.5 : 0.3)
      .attr("filter", "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))")
      .on("mouseover", function () {
        // Efeito de hover: aumentar ligeiramente a bolha
        d3.select(this)
          .transition()
          .duration(300)
          .attr("r", (d: any) => d.radius * 1.1)
          .attr("fill-opacity", 0.9)
      })
      .on("mouseout", function (event, d: any) {
        // Retornar ao tamanho normal, exceto se for a bolha selecionada
        d3.select(this)
          .transition()
          .duration(300)
          .attr("r", (d: any) => d.radius)
          .attr("fill-opacity", (d: any) => (selectedBubble === d.category ? 0.9 : 0.7))
      })

    // Adicionar texto com tamanho ajustado para caber dentro da bolha
    bubbles
      .append("text")
      .text((d: any) => d.category || "") // Add fallback for undefined category
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("font-size", (d: any) => {
        // Safely handle undefined category
        const category = d.category || ""
        const radius = d.radius || 0
        const textLength = category.length
        // Ajuste mais conservador para garantir que o texto caiba
        return Math.min(radius * 0.6, (radius * 1.2) / Math.sqrt(textLength || 1)) + "px"
      })
      .attr("font-weight", "bold")
      .attr("fill", "#ffffff") // Garantir que o texto seja branco
      .attr("pointer-events", "none") // Evita que o texto interfira nos eventos do mouse

    // Iniciar a simulação
    simulation.nodes(data as any).on("tick", () => {
      bubbles.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    return () => {
      simulation.stop()
    }
  }, [dimensions, painPoints, selectedBubble, isDark, onBubbleClick])

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ height: `${height}px` }}>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  )
}
