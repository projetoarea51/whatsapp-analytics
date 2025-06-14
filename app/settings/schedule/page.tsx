"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useToast } from "@/components/ui/use-toast"
import { TimePickerInput } from "./components/time-picker-input"

type DaySchedule = {
  start: string
  breakIn: string
  breakOut: string
  end: string
} | null

type WeekSchedule = {
  mon: DaySchedule
  tue: DaySchedule
  wed: DaySchedule
  thu: DaySchedule
  fri: DaySchedule
  sat: DaySchedule
  sun: DaySchedule
}

const defaultSchedule: WeekSchedule = {
  mon: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
  tue: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
  wed: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
  thu: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
  fri: { start: "08:00", breakIn: "12:00", breakOut: "13:00", end: "18:00" },
  sat: null,
  sun: null,
}

// Traduzir os nomes dos dias da semana
const dayLabels: Record<keyof WeekSchedule, string> = {
  mon: "Segunda-feira",
  tue: "Terça-feira",
  wed: "Quarta-feira",
  thu: "Quinta-feira",
  fri: "Sexta-feira",
  sat: "Sábado",
  sun: "Domingo",
}

export default function ScheduleSettingsPage() {
  const { toast } = useToast()
  const [schedule, setSchedule] = useState<WeekSchedule>(defaultSchedule)
  const [activeDays, setActiveDays] = useState<string[]>(
    Object.entries(defaultSchedule)
      .filter(([_, value]) => value !== null)
      .map(([key]) => key),
  )

  const handleDayToggle = (values: string[]) => {
    setActiveDays(values)

    const newSchedule = { ...schedule }
    Object.keys(schedule).forEach((day) => {
      if (values.includes(day)) {
        if (newSchedule[day as keyof WeekSchedule] === null) {
          newSchedule[day as keyof WeekSchedule] = {
            start: "08:00",
            breakIn: "12:00",
            breakOut: "13:00",
            end: "18:00",
          }
        }
      } else {
        newSchedule[day as keyof WeekSchedule] = null
      }
    })

    setSchedule(newSchedule)
  }

  const handleTimeChange = (day: keyof WeekSchedule, field: keyof DaySchedule, value: string) => {
    if (schedule[day]) {
      setSchedule({
        ...schedule,
        [day]: {
          ...schedule[day]!,
          [field]: value,
        },
      })
    }
  }

  // Traduzir as mensagens de toast
  const handleSave = async () => {
    try {
      // TODO: integrate endpoint
      // const response = await fetch('/api/settings/schedule', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ schedule }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Horário Atualizado",
        description: "Seu horário de funcionamento foi atualizado com sucesso.",
      })
    } catch (error) {
      console.error("Error saving schedule:", error)
      toast({
        title: "Erro",
        description: "Falha ao salvar o horário de funcionamento. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Traduzir o título da página e descrições
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Horário de Funcionamento</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurar Horário de Funcionamento</CardTitle>
          <CardDescription>
            Defina seu horário de funcionamento para calcular com precisão os tempos de resposta dentro do horário
            comercial.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Dias Ativos</Label>
            <ToggleGroup
              type="multiple"
              value={activeDays}
              onValueChange={handleDayToggle}
              className="flex flex-wrap gap-2"
            >
              {Object.keys(dayLabels).map((day) => (
                <ToggleGroupItem key={day} value={day} className="px-3">
                  {dayLabels[day as keyof WeekSchedule].substring(0, 3)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="space-y-4">
            {Object.entries(schedule).map(([day, daySchedule]) => {
              if (!daySchedule) return null

              return (
                <div key={day} className="grid gap-4 p-4 border rounded-md">
                  <h3 className="font-medium">{dayLabels[day as keyof WeekSchedule]}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${day}-start`}>Hora de Início</Label>
                      <TimePickerInput
                        id={`${day}-start`}
                        value={daySchedule.start}
                        onChange={(value) => handleTimeChange(day as keyof WeekSchedule, "start", value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${day}-end`}>Hora de Término</Label>
                      <TimePickerInput
                        id={`${day}-end`}
                        value={daySchedule.end}
                        onChange={(value) => handleTimeChange(day as keyof WeekSchedule, "end", value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${day}-break-in`}>Início do Intervalo</Label>
                      <TimePickerInput
                        id={`${day}-break-in`}
                        value={daySchedule.breakIn}
                        onChange={(value) => handleTimeChange(day as keyof WeekSchedule, "breakIn", value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${day}-break-out`}>Fim do Intervalo</Label>
                      <TimePickerInput
                        id={`${day}-break-out`}
                        value={daySchedule.breakOut}
                        onChange={(value) => handleTimeChange(day as keyof WeekSchedule, "breakOut", value)}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
