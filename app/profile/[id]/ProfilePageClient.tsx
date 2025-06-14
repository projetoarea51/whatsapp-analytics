"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type ProfilePageClientProps = {
  id: string
  type?: "client" | "team"
}

export default function ProfilePageClient({ id, type }: ProfilePageClientProps) {
  // Determine o tipo com base no ID se não for fornecido explicitamente
  const profileType = type || (Number.parseInt(id) <= 5 ? "client" : "team")

  // Dados simulados para o perfil
  const profile = {
    id,
    name: profileType === "client" ? "Cliente Exemplo" : "Membro da Equipe",
    role: profileType === "client" ? "Diretor de Operações" : "Gerente de Vendas",
    company: profileType === "client" ? "Empresa Externa" : "Nossa Empresa",
    avatar: "/placeholder.svg",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={profileType === "client" ? "secondary" : "default"}>
              {profileType === "client" ? "Cliente" : "Equipe"}
            </Badge>
            <Badge variant="outline">{profile.role}</Badge>
            <Badge variant="outline">{profile.company}</Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="connections">Conexões</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>Detalhes básicos e informações de contato</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Conteúdo da visão geral para {profileType === "client" ? "cliente" : "membro da equipe"} com ID: {id}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conversations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Conversas</CardTitle>
              <CardDescription>Mensagens recentes e interações</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Histórico de conversas para {profileType === "client" ? "cliente" : "membro da equipe"} com ID: {id}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="connections" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conexões</CardTitle>
              <CardDescription>Grupos e contatos relacionados</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Conexões para {profileType === "client" ? "cliente" : "membro da equipe"} com ID: {id}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises</CardTitle>
              <CardDescription>Métricas e estatísticas</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Análises para {profileType === "client" ? "cliente" : "membro da equipe"} com ID: {id}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
