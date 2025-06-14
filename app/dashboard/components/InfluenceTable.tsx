"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

type Influencer = {
  id: string
  name: string
  avatarUrl: string
  chats: string[]
  score: number
}

// Mock data
const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "John Doe",
    avatarUrl: "/placeholder-user.jpg",
    chats: ["Marketing", "Sales", "Support"],
    score: 92,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatarUrl: "/placeholder-user.jpg",
    chats: ["Product", "Engineering"],
    score: 85,
  },
  {
    id: "3",
    name: "Robert Johnson",
    avatarUrl: "/placeholder-user.jpg",
    chats: ["Marketing", "Sales"],
    score: 78,
  },
  {
    id: "4",
    name: "Emily Davis",
    avatarUrl: "/placeholder-user.jpg",
    chats: ["Support", "Customer Success", "Sales", "Marketing"],
    score: 72,
  },
  {
    id: "5",
    name: "Michael Wilson",
    avatarUrl: "/placeholder-user.jpg",
    chats: ["Engineering", "Product"],
    score: 65,
  },
]

export default function InfluenceTable() {
  const [influencers] = useState<Influencer[]>(mockInfluencers)
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const totalPages = Math.ceil(influencers.length / limit)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-blue-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {influencers.slice((page - 1) * limit, page * limit).map((influencer) => (
          <div key={influencer.id} className="flex items-center space-x-4 p-2 rounded-md hover:bg-muted">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={influencer.avatarUrl || "/placeholder.svg"} alt={influencer.name} />
              <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <Link href={`/profile/${influencer.id}`} className="text-sm font-medium hover:underline">
                {influencer.name}
              </Link>
              <div className="flex flex-wrap gap-1 mt-1">
                {influencer.chats.slice(0, 3).map((chat, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {chat}
                  </Badge>
                ))}
                {influencer.chats.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{influencer.chats.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            <div className="w-24">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreColor(influencer.score)} rounded-full`}
                  style={{ width: `${influencer.score}%` }}
                />
              </div>
              <div className="text-xs text-right mt-1">{influencer.score}</div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
