import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

type Connection = {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
}

type CommonConnectionsProps = {
  connections: Connection[]
  getProfileUrl?: (id: string) => string
}

export function CommonConnections({ connections, getProfileUrl }: CommonConnectionsProps) {
  return (
    <div className="space-y-4">
      {connections.map((connection) => (
        <div key={connection.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
            <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Link
              href={getProfileUrl ? getProfileUrl(connection.id) : `/profile/${connection.id}`}
              className="font-medium hover:underline"
            >
              {connection.name}
            </Link>
            <div className="text-sm text-muted-foreground">
              {connection.role} em {connection.company}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
