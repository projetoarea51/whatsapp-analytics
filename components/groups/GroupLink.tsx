import Link from "next/link"
import type { GroupLinkProps } from "../../types"
import { ROUTES } from "../../lib/constants"

export function GroupLink({ group, className = "" }: GroupLinkProps) {
  return (
    <Link href={ROUTES.GROUP(group.id)} className={`text-blue-600 hover:text-blue-800 hover:underline ${className}`}>
      {group.name}
    </Link>
  )
}
