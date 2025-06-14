"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import FormStepper from "@/_components/FormStepper"
import confetti from "canvas-confetti"

export default function SetupDonePage() {
  const router = useRouter()

  useEffect(() => {
    // Create default business hours
    const createDefaultSchedule = async () => {
      try {
        // TODO: integrate endpoint
        // const response = await fetch('/api/schedule/default', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     schedule: {
        //       mon: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
        //       tue: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
        //       wed: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
        //       thu: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
        //       fri: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
        //       sat: null,
        //       sun: null,
        //     }
        //   }),
        // })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
      } catch (error) {
        console.error("Error creating default schedule:", error)
      }
    }

    createDefaultSchedule()

    // Trigger confetti animation
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    // Delay confetti
    setTimeout(triggerConfetti, 500)
  }, [])

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="container max-w-md py-10">
      <FormStepper activeStep={3} steps={["Workspace", "WhatsApp", "Targets", "Done"]} />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Setup Complete!</CardTitle>
          <CardDescription>Your WhatsApp Analytics platform is now ready to use.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-6 mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
          <p className="text-center text-muted-foreground">
            You've successfully set up your WhatsApp Analytics platform. You can now start monitoring your conversations
            and gain valuable insights.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" onClick={handleGoToDashboard}>
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
