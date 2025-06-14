"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

// Mock data for profiles
const profiles = [
  {
    id: "1",
    name: "John Doe",
    avatarUrl: "/placeholder-user.jpg",
    role: "Marketing Manager",
    company: "Acme Inc.",
    sentiment: "Positive",
    sentimentValue: 4,
    activeGroups: ["Marketing", "Sales", "Product"],
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatarUrl: "/placeholder-user.jpg",
    role: "Sales Director",
    company: "XYZ Corp",
    sentiment: "Neutral",
    sentimentValue: 3,
    activeGroups: ["Sales", "Customer Success"],
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Robert Johnson",
    avatarUrl: "/placeholder-user.jpg",
    role: "Product Manager",
    company: "Tech Solutions",
    sentiment: "Negative",
    sentimentValue: 1,
    activeGroups: ["Product", "Engineering"],
    lastActive: "3 hours ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    avatarUrl: "/placeholder-user.jpg",
    role: "Customer Support",
    company: "Support Co",
    sentiment: "Positive",
    sentimentValue: 4,
    activeGroups: ["Support", "Customer Success"],
    lastActive: "Just now",
  },
  {
    id: "5",
    name: "Michael Wilson",
    avatarUrl: "/placeholder-user.jpg",
    role: "Engineering Lead",
    company: "Dev Team Inc",
    sentiment: "Neutral",
    sentimentValue: 2,
    activeGroups: ["Engineering", "Product"],
    lastActive: "5 hours ago",
  },
  {
    id: "6",
    name: "Sarah Brown",
    avatarUrl: "/placeholder-user.jpg",
    role: "Marketing Specialist",
    company: "Marketing Pro",
    sentiment: "Positive",
    sentimentValue: 4,
    activeGroups: ["Marketing", "Content"],
    lastActive: "1 hour ago",
  },
]

// Extract all unique groups from profiles
const allGroups = Array.from(new Set(profiles.flatMap((profile) => profile.activeGroups))).sort()

const getSentimentColor = (value: number) => {
  switch (value) {
    case 0:
      return "bg-red-500 text-white"
    case 1:
      return "bg-red-400 text-white"
    case 2:
      return "bg-yellow-500 text-white"
    case 3:
      return "bg-green-400 text-white"
    case 4:
      return "bg-green-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  const [filteredProfiles, setFilteredProfiles] = useState(profiles)

  // Filter profiles based on search term and selected group
  useEffect(() => {
    const filtered = profiles.filter((profile) => {
      const matchesSearch = searchTerm === "" || profile.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesGroup = selectedGroup === "" || profile.activeGroups.includes(selectedGroup)

      return matchesSearch && matchesGroup
    })

    setFilteredProfiles(filtered)
  }, [searchTerm, selectedGroup])

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Profiles</h1>
      </div>

      {/* Filter section */}
      <div className="mb-8 bg-card p-4 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Filtrar Perfis</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar grupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os grupos</SelectItem>
              {allGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhum perfil encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.map((profile) => (
            <Link href={`/profile/${profile.id}`} key={profile.id} className="block">
              <Card className="modernize-card h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={profile.name} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Badge className={getSentimentColor(profile.sentimentValue)}>{profile.sentiment}</Badge>
                  </div>
                  <CardTitle className="mt-2">{profile.name}</CardTitle>
                  <CardDescription>
                    {profile.role} at {profile.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Active in</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.activeGroups.map((group) => (
                          <Badge key={group} variant="outline" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">Last active: {profile.lastActive}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
