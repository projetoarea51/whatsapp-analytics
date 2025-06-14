"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import * as d3 from "d3"
import { useRouter } from "next/navigation"

type Node = {
  id: string
  name: string
  group: string
  type: "user" | "contact" | "group"
}

type Link = {
  source: string
  target: string
  value: number
}

type Person = {
  id: string
  name: string
  role: string
  company: string
  avatarUrl: string
  groups: string[]
}

type Connection = {
  source: string
  target: string
  weight: number // Peso da conexão (interações)
}

type ConnectionsGraphProps = {
  userId: string
}

// Dados de exemplo para pessoas
const mockPeople: Person[] = [
  {
    id: "1",
    name: "João Silva",
    role: "Diretor Comercial",
    company: "Acme Inc.",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Club", "GE - 124"],
  },
  {
    id: "2",
    name: "Maria Oliveira",
    role: "CEO",
    company: "XYZ Corp",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Alumni"],
  },
  {
    id: "3",
    name: "Roberto Santos",
    role: "CTO",
    company: "Tech Solutions",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["GE - 124", "G4 Club"],
  },
  {
    id: "4",
    name: "Camila Pereira",
    role: "Diretora de Marketing",
    company: "Support Co",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Alumni"],
  },
  {
    id: "5",
    name: "Miguel Costa",
    role: "Gerente de Produto",
    company: "Dev Team Inc",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["GE - 124", "G4 Club"],
  },
  {
    id: "6",
    name: "Ana Souza",
    role: "Gerente de Vendas",
    company: "Nossa Empresa",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Club"],
  },
  {
    id: "7",
    name: "Carlos Mendes",
    role: "Consultor de Vendas",
    company: "Nossa Empresa",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Alumni"],
  },
  {
    id: "8",
    name: "Fernanda Lima",
    role: "Atendimento ao Cliente",
    company: "Nossa Empresa",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["GE - 124", "G4 Club"],
  },
  {
    id: "9",
    name: "Ricardo Alves",
    role: "Consultor de Vendas",
    company: "Nossa Empresa",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["G4 Scale", "G4 Alumni"],
  },
  {
    id: "10",
    name: "Juliana Castro",
    role: "Gerente de Marketing",
    company: "Nossa Empresa",
    avatarUrl: "/placeholder-user.jpg",
    groups: ["GE - 124", "G4 Club"],
  },
]

// Gerar conexões de exemplo
const generateMockConnections = (profileId: string): Connection[] => {
  const connections: Connection[] = []

  // Verificar se o profileId existe nos mockPeople
  const profileExists = mockPeople.some((person) => person.id === profileId)

  // Se o profileId não existir, usar o primeiro ID como fallback
  const safeProfileId = profileExists ? profileId : mockPeople[0].id

  mockPeople.forEach((person) => {
    if (person.id !== safeProfileId) {
      // Gerar um peso aleatório entre 1 e 10, com maior probabilidade para pessoas que compartilham mais grupos
      const profilePerson = mockPeople.find((p) => p.id === safeProfileId)
      const sharedGroups = profilePerson ? person.groups.filter((g) => profilePerson.groups.includes(g)).length : 0

      const baseWeight = Math.max(1, sharedGroups * 2)
      const randomFactor = Math.random() * 5
      const weight = Math.min(10, baseWeight + randomFactor)

      connections.push({
        source: safeProfileId,
        target: person.id,
        weight: Math.round(weight),
      })
    }
  })

  // Adicionar algumas conexões entre outras pessoas para tornar o gráfico mais interessante
  for (let i = 0; i < 15; i++) {
    const sourceIndex = Math.floor(Math.random() * mockPeople.length)
    let targetIndex = Math.floor(Math.random() * mockPeople.length)

    // Evitar auto-conexões
    while (targetIndex === sourceIndex) {
      targetIndex = Math.floor(Math.random() * mockPeople.length)
    }

    const source = mockPeople[sourceIndex].id
    const target = mockPeople[targetIndex].id

    // Evitar duplicatas
    if (
      !connections.some(
        (c) => (c.source === source && c.target === target) || (c.source === target && c.target === source),
      )
    ) {
      connections.push({
        source,
        target,
        weight: Math.floor(Math.random() * 5) + 1, // Peso entre 1 e 5
      })
    }
  }

  return connections
}

export default function ConnectionsGraph({ userId }: ConnectionsGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; content: string } | null>(null)
  const router = useRouter()

  // Mock data - in a real app, this would come from an API
  const mockData = {
    nodes: mockPeople.map((p) => ({ id: p.id, name: p.name, group: "client", type: "contact" })),
    links: generateMockConnections(userId),
  }

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect
        setDimensions({ width, height })
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0 || !mockData.nodes.length) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const { width, height } = dimensions

    // Create a force simulation
    const simulation = d3
      .forceSimulation(mockData.nodes as any)
      .force(
        "link",
        d3
          .forceLink(mockData.links as any)
          .id((d: any) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1))

    // Define color scale for node types
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(["user", "contact", "group"])
      .range(
        isDark
          ? ["#3b82f6", "#10b981", "#8b5cf6"] // Dark theme colors
          : ["#2563eb", "#059669", "#7c3aed"], // Light theme colors
      )

    // Create links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(mockData.links)
      .enter()
      .append("line")
      .attr("stroke", isDark ? "#4b5563" : "#d1d5db")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: any) => Math.sqrt(d.weight))

    // Create nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(mockData.nodes)
      .enter()
      .append("g")
      .call(d3.drag<SVGGElement, any>().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", (d: any) => (d.id === userId ? 10 : 8))
      .attr("fill", (d: any) => colorScale(d.type))
      .attr("stroke", isDark ? "#1f2937" : "#f3f4f6")
      .attr("stroke-width", 2)

    // Add labels to nodes
    node
      .append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text((d: any) => d.name)
      .attr("font-size", "10px")
      .attr("fill", isDark ? "#e5e7eb" : "#1f2937")

    // Add title for tooltip on hover
    node.append("title").text((d: any) => d.name)

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [dimensions, userId, isDark])

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  )
}
