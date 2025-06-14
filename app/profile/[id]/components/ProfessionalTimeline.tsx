type TimelineEvent = {
  id: string
  date: string
  title: string
  description: string
}

type ProfessionalTimelineProps = {
  timeline: TimelineEvent[]
}

export function ProfessionalTimeline({ timeline }: ProfessionalTimelineProps) {
  return (
    <div className="relative border-l pl-6 pb-2">
      {timeline.map((event, idx) => (
        <div key={event.id} className="mb-6 relative">
          <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
          <div className="space-y-1">
            <div className="text-sm font-medium">{event.date}</div>
            <div className="font-semibold">{event.title}</div>
            <div className="text-sm text-muted-foreground">{event.description}</div>
          </div>
          {idx < timeline.length - 1 && <div className="absolute -left-8 top-4 h-full border-l border-dashed"></div>}
        </div>
      ))}
    </div>
  )
}
