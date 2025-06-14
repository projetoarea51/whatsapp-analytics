"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

type TimePickerInputProps = {
  id: string
  value: string
  onChange: (value: string) => void
}

export function TimePickerInput({ id, value, onChange }: TimePickerInputProps) {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")

  // Parse the initial value
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":")
      setHours(h)
      setMinutes(m)
    }
  }, [value])

  // Update the parent component when hours or minutes change
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHours = e.target.value.replace(/[^0-9]/g, "")

    if (newHours.length > 2) {
      newHours = newHours.substring(0, 2)
    }

    if (newHours && Number.parseInt(newHours) > 23) {
      newHours = "23"
    }

    setHours(newHours)

    if (newHours && minutes) {
      onChange(`${newHours.padStart(2, "0")}:${minutes.padStart(2, "0")}`)
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinutes = e.target.value.replace(/[^0-9]/g, "")

    if (newMinutes.length > 2) {
      newMinutes = newMinutes.substring(0, 2)
    }

    if (newMinutes && Number.parseInt(newMinutes) > 59) {
      newMinutes = "59"
    }

    setMinutes(newMinutes)

    if (hours && newMinutes) {
      onChange(`${hours.padStart(2, "0")}:${newMinutes.padStart(2, "0")}`)
    }
  }

  // Traduzir os placeholders
  return (
    <div className="flex items-center">
      <Input
        id={`${id}-hours`}
        value={hours}
        onChange={handleHoursChange}
        placeholder="HH"
        className="w-16 text-center"
        maxLength={2}
      />
      <span className="mx-1">:</span>
      <Input
        id={`${id}-minutes`}
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="MM"
        className="w-16 text-center"
        maxLength={2}
      />
    </div>
  )
}
