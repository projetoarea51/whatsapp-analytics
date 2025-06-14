"use client"

import { Badge } from "@/components/ui/badge"

type SkillsTagsProps = {
  tags: string[]
}

export function SkillsTags({ tags }: SkillsTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <Badge key={idx} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  )
}
