"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function DateRangePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
    to: new Date(),
  })

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                  {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
          <div className="flex items-center justify-between p-3 border-t">
            <Button
              variant="ghost"
              onClick={() =>
                setDate({
                  from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                  to: new Date(),
                })
              }
              size="sm"
            >
              Últimos 7 dias
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                setDate({
                  from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                  to: new Date(),
                })
              }
              size="sm"
            >
              Últimos 30 dias
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
