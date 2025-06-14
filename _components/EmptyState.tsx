import type React from "react"
import { FolderOpen } from "lucide-react"

type EmptyStateProps = {
  message: string
  icon?: React.ReactNode
}

export default function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        {icon || <FolderOpen className="h-6 w-6 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-medium">{message}</h3>
    </div>
  )
}
