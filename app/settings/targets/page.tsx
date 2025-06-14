"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, User, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Target = {
  id: string
  name: string
  type: "group" | "contact"
  avatarUrl?: string
  isBlocked: boolean
  lastActive?: Date
}

// Mock data with realistic names
const mockTargets: Target[] = [
  {
    id: "target-1",
    name: "Equipe de Vendas",
    type: "group",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "target-2",
    name: "Suporte Técnico",
    type: "group",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: "target-3",
    name: "Marketing Digital",
    type: "group",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: true,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: "target-4",
    name: "João Silva",
    type: "contact",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 12),
  },
  {
    id: "target-5",
    name: "Maria Oliveira",
    type: "contact",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 5),
  },
  {
    id: "target-6",
    name: "Carlos Eduardo",
    type: "contact",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: true,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 4),
  },
  {
    id: "target-7",
    name: "Ana Beatriz",
    type: "contact",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 8),
  },
  {
    id: "target-8",
    name: "Desenvolvimento de Produto",
    type: "group",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: "target-9",
    name: "Recursos Humanos",
    type: "group",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "target-10",
    name: "Pedro Almeida",
    type: "contact",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 3),
  },
  {
    id: "target-11",
    name: "Juliana Costa",
    type: "contact",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: true,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: "target-12",
    name: "Clientes VIP",
    type: "group",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: "target-13",
    name: "Fernanda Lima",
    type: "contact",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 10),
  },
  {
    id: "target-14",
    name: "Roberto Santos",
    type: "contact",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: false,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 7),
  },
  {
    id: "target-15",
    name: "Parceiros Comerciais",
    type: "group",
    avatarUrl: "/placeholder-user.jpg",
    isBlocked: true,
    lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 6),
  },
]

export default function TargetsSettingsPage() {
  const { toast } = useToast()
  const [targets, setTargets] = useState<Target[]>(mockTargets)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "group" | "contact">("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [targetToDelete, setTargetToDelete] = useState<Target | null>(null)

  const handleToggleBlock = (targetId: string) => {
    setTargets(targets.map((target) => (target.id === targetId ? { ...target, isBlocked: !target.isBlocked } : target)))

    toast({
      title: "Status Atualizado",
      description: `O alvo foi ${targets.find((t) => t.id === targetId)?.isBlocked ? "ativado" : "desativado"} com sucesso.`,
    })
  }

  const handleDeleteTarget = (target: Target) => {
    setTargetToDelete(target)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!targetToDelete) return

    setTargets(targets.filter((target) => target.id !== targetToDelete.id))
    setIsDeleteDialogOpen(false)
    setTargetToDelete(null)

    toast({
      title: "Target Deleted",
      description: "The target has been removed from monitoring.",
    })
  }

  const filteredTargets = targets.filter(
    (target) =>
      target.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterType === "all" || target.type === filterType),
  )

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manage Targets</h1>
      </div>

      <Card className="modernize-card">
        <CardHeader>
          <CardTitle>Monitored Targets</CardTitle>
          <CardDescription>Manage the groups and contacts you're monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search targets..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  onClick={() => setFilterType("all")}
                  className={filterType === "all" ? "modernize-btn-primary" : ""}
                >
                  All
                </Button>
                <Button
                  variant={filterType === "group" ? "default" : "outline"}
                  onClick={() => setFilterType("group")}
                  className={filterType === "group" ? "modernize-btn-primary" : ""}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Groups
                </Button>
                <Button
                  variant={filterType === "contact" ? "default" : "outline"}
                  onClick={() => setFilterType("contact")}
                  className={filterType === "contact" ? "modernize-btn-primary" : ""}
                >
                  <User className="h-4 w-4 mr-2" />
                  Contacts
                </Button>
              </div>
            </div>

            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredTargets.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No targets found</div>
                ) : (
                  filteredTargets.map((target) => (
                    <div key={target.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-6 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={target.avatarUrl || "/placeholder.svg"} alt={target.name} />
                          <AvatarFallback>
                            {target.type === "group" ? <Users className="h-4 w-4" /> : <User className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="truncate font-medium">{target.name}</div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline">{target.type === "group" ? "Group" : "Contact"}</Badge>
                      </div>
                      <div className="col-span-2">
                        <Badge
                          variant={target.isBlocked ? "outline" : "secondary"}
                          className="flex items-center gap-2 w-20 justify-center"
                        >
                          <div
                            className={`h-2 w-2 rounded-full ${target.isBlocked ? "bg-gray-300" : "bg-green-500"}`}
                          ></div>
                          {target.isBlocked ? "Inativo" : "Ativo"}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex justify-end items-center gap-2">
                        <Switch
                          checked={!target.isBlocked}
                          onCheckedChange={() => handleToggleBlock(target.id)}
                          className="data-[state=checked]:bg-green-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTarget(target)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {targetToDelete?.name} from monitoring? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
