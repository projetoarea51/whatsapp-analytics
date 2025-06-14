import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type GroupsListProps = {
  groups: string[]
}

export function GroupsList({ groups }: GroupsListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {groups.map((group, idx) => (
        <Link href={`/group/${encodeURIComponent(group)}`} key={idx}>
          <Badge variant="outline" className="hover:bg-muted cursor-pointer">
            {group}
          </Badge>
        </Link>
      ))}
    </div>
  )
}
