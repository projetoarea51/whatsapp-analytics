import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

type RecommendedPerson = {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
  commonGroups: number
  commonConnections: number
}

type RecommendedPeopleProps = {
  people: RecommendedPerson[]
}

export function RecommendedPeople({ people }: RecommendedPeopleProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {people.map((person) => (
        <div key={person.id} className="flex items-center gap-4 p-3 border rounded-lg">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{person.name}</div>
            <div className="text-sm text-muted-foreground">
              {person.role} em {person.company}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {person.commonGroups} grupos em comum • {person.commonConnections} conexões em comum
            </div>
          </div>
          <Button size="sm" variant="outline">
            <UserPlus className="h-4 w-4 mr-1" />
            Conectar
          </Button>
        </div>
      ))}
    </div>
  )
}
