"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LoadingSkeleton from "@/_components/LoadingSkeleton"

// Adicionar imports para o Select
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo para contatos
const mockContacts = [
  {
    id: "1",
    name: "Carlos Oliveira",
    phone: "+55 11 98765-4321",
    avatar: "/placeholder-user.jpg",
    isTeamMember: true,
    department: "Vendas",
  },
  {
    id: "2",
    name: "Mariana Santos",
    phone: "+55 11 97654-3210",
    avatar: "/placeholder-user.jpg",
    isTeamMember: true,
    department: "Marketing",
  },
  {
    id: "3",
    name: "Ricardo Almeida",
    phone: "+55 11 96543-2109",
    avatar: "/placeholder-user.jpg",
    isTeamMember: false,
    department: "Cliente",
  },
  {
    id: "4",
    name: "Juliana Costa",
    phone: "+55 11 95432-1098",
    avatar: "/placeholder-user.jpg",
    isTeamMember: true,
    department: "Suporte",
  },
  {
    id: "5",
    name: "Fernando Souza",
    phone: "+55 11 94321-0987",
    avatar: "/placeholder-user.jpg",
    isTeamMember: false,
    department: "Cliente",
  },
  {
    id: "6",
    name: "Amanda Lima",
    phone: "+55 11 93210-9876",
    avatar: "/placeholder-user.jpg",
    isTeamMember: true,
    department: "Desenvolvimento",
  },
  {
    id: "7",
    name: "Roberto Pereira",
    phone: "+55 11 92109-8765",
    avatar: "/placeholder-user.jpg",
    isTeamMember: false,
    department: "Cliente",
  },
  {
    id: "8",
    name: "Camila Rodrigues",
    phone: "+55 11 91098-7654",
    avatar: "/placeholder-user.jpg",
    isTeamMember: true,
    department: "Financeiro",
  },
  {
    id: "9",
    name: "Lucas Ferreira",
    phone: "+55 11 90987-6543",
    avatar: "/placeholder-user.jpg",
    isTeamMember: false,
    department: "Cliente",
  },
  {
    id: "10",
    name: "Patrícia Gomes",
    phone: "+55 11 89876-5432",
    avatar: "/placeholder-user.jpg",
    isTeamMember: true,
    department: "RH",
  },
]

export default function TeamsPage() {
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState(mockContacts)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredContacts, setFilteredContacts] = useState(contacts)

  // Adicionar novo estado para o filtro de tipo (após os outros estados)
  const [typeFilter, setTypeFilter] = useState<"all" | "team" | "client">("all")

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Modificar o useEffect de filtro para incluir o filtro por tipo
  useEffect(() => {
    let filtered = contacts

    // Filtrar por busca
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (contact) =>
          contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filtrar por tipo
    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (contact) =>
          (typeFilter === "team" && contact.isTeamMember) || (typeFilter === "client" && !contact.isTeamMember),
      )
    }

    setFilteredContacts(filtered)
  }, [searchQuery, contacts, typeFilter])

  // Alternar status de membro da equipe
  const toggleTeamMember = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              isTeamMember: !contact.isTeamMember,
              department: !contact.isTeamMember ? "Não definido" : "Cliente",
            }
          : contact,
      ),
    )
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Equipes</h1>
        <p className="text-muted-foreground">Defina quem faz parte da sua equipe e quem são seus clientes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Membros e Clientes</CardTitle>
          <CardDescription>
            Ative o toggle para marcar um contato como membro da equipe. Desative para indicar que é um cliente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por telefone ou nome..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as "all" | "team" | "client")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os contatos</SelectItem>
                  <SelectItem value="team">Apenas equipe</SelectItem>
                  <SelectItem value="client">Apenas clientes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-md">
              {filteredContacts.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhum contato encontrado com este número de telefone.
                </div>
              ) : (
                <div className="divide-y">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <Avatar className="flex-shrink-0">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{contact.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{contact.phone}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {contact.isTeamMember ? contact.department : "Cliente"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 min-w-[100px] justify-end">
                        <Switch
                          id={`team-member-${contact.id}`}
                          checked={contact.isTeamMember}
                          onCheckedChange={() => toggleTeamMember(contact.id)}
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                        />
                        <Label htmlFor={`team-member-${contact.id}`} className="text-sm whitespace-nowrap">
                          {contact.isTeamMember ? "Equipe" : "Cliente"}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button>Salvar alterações</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
