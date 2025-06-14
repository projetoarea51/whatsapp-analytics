"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"

type AlertSettings = {
  enabled: boolean
  tmrThreshold: number // in minutes
  sentimentEmojis: string[]
}

// Mock data
const defaultAlertSettings: AlertSettings = {
  enabled: true,
  tmrThreshold: 15,
  sentimentEmojis: ["😡", "😠", "😤", "😒", "😕"],
}

// Available emojis for sentiment tracking
const availableEmojis = [
  "😡",
  "😠",
  "😤",
  "😒",
  "😕",
  "😟",
  "😔",
  "😢",
  "😭",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "😩",
  "😫",
  "😖",
  "😣",
  "😞",
  "😦",
  "😧",
  "😨",
  "😬",
  "🙄",
  "😑",
  "😐",
  "🤔",
  "🤨",
  "😏",
  "🙂",
  "😊",
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😍",
  "🥰",
  "😘",
  "😗",
]

export default function AlertsSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<AlertSettings>(defaultAlertSettings)
  const [searchQuery, setSearchQuery] = useState("")

  const handleToggleEnabled = (checked: boolean) => {
    setSettings({ ...settings, enabled: checked })
  }

  const handleTmrThresholdChange = (value: number[]) => {
    setSettings({ ...settings, tmrThreshold: value[0] })
  }

  const handleAddEmoji = (emoji: string) => {
    if (!settings.sentimentEmojis.includes(emoji)) {
      setSettings({
        ...settings,
        sentimentEmojis: [...settings.sentimentEmojis, emoji],
      })
    }
  }

  const handleRemoveEmoji = (emoji: string) => {
    setSettings({
      ...settings,
      sentimentEmojis: settings.sentimentEmojis.filter((e) => e !== emoji),
    })
  }

  const handleSave = async () => {
    try {
      // TODO: integrate endpoint
      // const response = await fetch('/api/settings/alerts', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ settings }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Alerts Updated",
        description: "Your alert settings have been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving alert settings:", error)
      toast({
        title: "Error",
        description: "Failed to save alert settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredEmojis = availableEmojis.filter((emoji) => !searchQuery || emoji.includes(searchQuery))

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Alert Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configure Alerts</CardTitle>
          <CardDescription>Set up alerts for response times and sentiment detection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="alerts-enabled">Enable Alerts</Label>
              <p className="text-sm text-muted-foreground">Turn on/off all alerts for this workspace</p>
            </div>
            <Switch id="alerts-enabled" checked={settings.enabled} onCheckedChange={handleToggleEnabled} />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tmr-threshold">Response Time Threshold</Label>
                <span className="text-sm font-medium">{settings.tmrThreshold} minutes</span>
              </div>
              <Slider
                id="tmr-threshold"
                disabled={!settings.enabled}
                value={[settings.tmrThreshold]}
                onValueChange={handleTmrThresholdChange}
                min={1}
                max={60}
                step={1}
              />
              <p className="text-sm text-muted-foreground">Alert when average response time exceeds this threshold</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <Label>Sentiment Emojis</Label>
            <p className="text-sm text-muted-foreground">Select emojis that should trigger sentiment alerts</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {settings.sentimentEmojis.map((emoji) => (
                <Badge key={emoji} variant="secondary" className="text-lg py-1 px-2">
                  {emoji}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => handleRemoveEmoji(emoji)}
                    disabled={!settings.enabled}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}
              {settings.sentimentEmojis.length === 0 && (
                <p className="text-sm text-muted-foreground italic">No emojis selected</p>
              )}
            </div>

            <div className="border rounded-md p-4">
              <Label className="mb-2">Available Emojis</Label>
              <div className="grid grid-cols-10 gap-2 mt-2">
                {filteredEmojis.map((emoji) => (
                  <Button
                    key={emoji}
                    variant="outline"
                    className="text-lg h-10 w-10"
                    onClick={() => handleAddEmoji(emoji)}
                    disabled={!settings.enabled || settings.sentimentEmojis.includes(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={!settings.enabled}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
