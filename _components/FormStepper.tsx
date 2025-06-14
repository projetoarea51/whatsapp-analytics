import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type FormStepperProps = {
  steps: string[]
  activeStep: number
}

export default function FormStepper({ steps, activeStep }: FormStepperProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center w-full max-w-3xl">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center w-full">
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 z-10",
                  index < activeStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : index === activeStep
                      ? "border-primary text-primary"
                      : "border-muted-foreground text-muted-foreground",
                )}
              >
                {index < activeStep ? <CheckCircle className="w-5 h-5" /> : <span>{index + 1}</span>}
              </div>
              <span
                className={cn(
                  "absolute top-10 text-xs font-medium",
                  index <= activeStep ? "text-primary" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn("flex-1 h-0.5", index < activeStep ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
