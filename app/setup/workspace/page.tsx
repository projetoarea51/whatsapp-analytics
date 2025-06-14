"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import FormStepper from "@/_components/FormStepper"

export default function WorkspaceSetupPage() {
  const router = useRouter()
  const [workspaceName, setWorkspaceName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!workspaceName.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: integrate endpoint
      // const response = await fetch('/api/workspace', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: workspaceName }),
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to create workspace')
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Navigate to the next step
      router.push("/setup/whatsapp")
    } catch (error) {
      console.error("Error creating workspace:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-md py-10">
      <FormStepper activeStep={0} steps={["Workspace", "WhatsApp", "Targets", "Done"]} />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Create Workspace</CardTitle>
          <CardDescription>
            Start by giving your workspace a name. This will help you organize your WhatsApp analytics.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input
                  id="workspace-name"
                  placeholder="My Workspace"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>
              Back
            </Button>
            <Button type="submit" disabled={!workspaceName.trim() || isSubmitting}>
              {isSubmitting ? "Creating..." : "Next"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
