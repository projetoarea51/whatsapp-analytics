"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Users, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import FormStepper from "@/_components/FormStepper"

type ChatTarget = {
  id: string
  name: string
  type: "group" | "contact"
  avatarUrl?: string
  lastMessage?: string
  lastActive?: Date
}

// Mock data
const mockTargets: ChatTarget[] = Array.from({ length: 50 }, (_, i) => ({
  id: `target-${i + 1}`,
  name: i % 3 === 0 ? `Group ${i + 1}` : `Contact ${i + 1}`,
  type: i % 3 === 0 ? "group" : "contact",
  avatarUrl: "/placeholder-user.jpg",
  lastMessage: "Last message preview...",
  lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7),
}))

export default function TargetsSetupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [targets, setTargets] = useState<ChatTarget[]>([])
  const [selectedTargets, setSelectedTargets] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch targets
    const fetchTargets = async () => {
      try {
        // In a real implementation, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setTargets(mockTargets)
      } catch (error) {
        console.error("Error fetching targets:", error)
        toast({
          title: "Error",
          description: "Failed to load chat targets. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTargets()
  }, [toast])

  const handleTargetToggle = (targetId: string) => {
    const newSelectedTargets = new Set(selectedTargets)

    if (newSelectedTargets.has(targetId)) {
      newSelectedTargets.delete(targetId)
    } else {
      if (newSelectedTargets.size >= 100) {
        toast({
          title: "Selection Limit Reached",
          description: "You can select a maximum of 100 targets.",
          variant: "destructive",
        })
        return
      }
      newSelectedTargets.add(targetId)
    }

    setSelectedTargets(newSelectedTargets)
  }

  const handleSubmit = async () => {
    if (selectedTargets.size === 0) {
      toast({
        title: "No Targets Selected",
        description: "Please select at least one target to monitor.",
        variant: "destructive",
      })
      return
    }

    try {
      // TODO: integrate endpoint
      // const response = await fetch('/api/targets', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     targets: Array.from(selectedTargets)
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Navigate to the next step
      router.push("/setup/done")
    } catch (error) {
      console.error("Error saving targets:", error)
      toast({
        title: "Error",
        description: "Failed to save selected targets. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredTargets = targets.filter((target) => target.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container max-w-md py-10">
      <FormStepper activeStep={2} steps={["Workspace", "WhatsApp", "Targets", "Done"]} />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Select Targets</CardTitle>
          <CardDescription>Choose up to 100 groups or contacts to monitor.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups and contacts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="outline" className="px-2 py-1">
                Selected {selectedTargets.size}/100
              </Badge>
            </div>

            <div className="border rounded-md h-[400px] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Loading targets...</p>
                </div>
              ) : filteredTargets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">No targets found matching your search.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredTargets.map((target) => (
                    <div key={target.id} className="flex items-center p-3 hover:bg-muted">
                      <Checkbox
                        id={`target-${target.id}`}
                        checked={selectedTargets.has(target.id)}
                        onCheckedChange={() => handleTargetToggle(target.id)}
                        className="mr-3"
                      />
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={target.avatarUrl || "/placeholder.svg"} alt={target.name} />
                        <AvatarFallback>
                          {target.type === "group" ? <Users className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{target.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{target.lastMessage}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {target.type === "group" ? "Group" : "Contact"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/setup/whatsapp")}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={selectedTargets.size === 0}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
