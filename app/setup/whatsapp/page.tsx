"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, QrCode, Check } from "lucide-react"
import FormStepper from "@/_components/FormStepper"

enum ConnectionStatus {
  WAITING = "waiting",
  CONNECTING = "connecting",
  CONNECTED = "connected",
  LOADING_HISTORY = "loading_history",
  COMPLETED = "completed",
  ERROR = "error",
}

export default function WhatsAppSetupPage() {
  const router = useRouter()
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.WAITING)
  const [error, setError] = useState<string | null>(null)

  // Simulate WebSocket connection and status updates
  useEffect(() => {
    // In a real implementation, this would be a WebSocket connection
    const simulateConnection = async () => {
      // Simulate QR code scanning
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setStatus(ConnectionStatus.CONNECTING)

      // Simulate connection established
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus(ConnectionStatus.CONNECTED)

      // Simulate loading history
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setStatus(ConnectionStatus.LOADING_HISTORY)

      // Simulate completion
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus(ConnectionStatus.COMPLETED)
    }

    simulateConnection().catch((err) => {
      console.error("Error connecting to WhatsApp:", err)
      setStatus(ConnectionStatus.ERROR)
      setError("Failed to connect to WhatsApp. Please try again.")
    })

    // Cleanup function
    return () => {
      // In a real implementation, this would close the WebSocket connection
    }
  }, [])

  const handleNext = () => {
    router.push("/setup/targets")
  }

  const renderStatusContent = () => {
    switch (status) {
      case ConnectionStatus.WAITING:
        return (
          <div className="flex flex-col items-center justify-center p-6">
            <QrCode className="h-48 w-48 mb-4" />
            <p className="text-center text-muted-foreground">Scan this QR code with your WhatsApp to connect</p>
          </div>
        )

      case ConnectionStatus.CONNECTING:
        return (
          <div className="flex flex-col items-center justify-center p-6">
            <Loader2 className="h-16 w-16 mb-4 animate-spin text-primary" />
            <p className="text-center font-medium">Connecting to WhatsApp...</p>
          </div>
        )

      case ConnectionStatus.CONNECTED:
        return (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mb-4">
              <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-center font-medium">Connected to WhatsApp!</p>
            <p className="text-center text-muted-foreground mt-2">Preparing to load your chat history...</p>
          </div>
        )

      case ConnectionStatus.LOADING_HISTORY:
        return (
          <div className="flex flex-col items-center justify-center p-6">
            <Loader2 className="h-16 w-16 mb-4 animate-spin text-primary" />
            <p className="text-center font-medium">Loading chat history...</p>
            <p className="text-center text-muted-foreground mt-2">
              This may take a few minutes depending on the size of your history.
            </p>
          </div>
        )

      case ConnectionStatus.COMPLETED:
        return (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mb-4">
              <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-center font-medium">WhatsApp connected successfully!</p>
            <p className="text-center text-muted-foreground mt-2">
              Your chat history has been loaded. You can now proceed to select your targets.
            </p>
          </div>
        )

      case ConnectionStatus.ERROR:
        return (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-red-100 dark:bg-red-900 p-3 mb-4">
              <QrCode className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-center font-medium text-red-600 dark:text-red-400">Connection Error</p>
            <p className="text-center text-muted-foreground mt-2">
              {error || "Failed to connect to WhatsApp. Please try again."}
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setStatus(ConnectionStatus.WAITING)}>
              Try Again
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="container max-w-md py-10">
      <FormStepper activeStep={1} steps={["Workspace", "WhatsApp", "Targets", "Done"]} />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Connect WhatsApp</CardTitle>
          <CardDescription>Connect your WhatsApp account to start analyzing your conversations.</CardDescription>
        </CardHeader>
        <CardContent>{renderStatusContent()}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/setup/workspace")}
            disabled={status === ConnectionStatus.CONNECTING || status === ConnectionStatus.LOADING_HISTORY}
          >
            Back
          </Button>
          <Button onClick={handleNext} disabled={status !== ConnectionStatus.COMPLETED}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
