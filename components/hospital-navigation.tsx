"use client"

import { Navigation, MapPin, Clock, ChevronRight, ArrowUp, CornerUpRight } from "lucide-react"

interface NavigationStep {
  instruction: string
  detail?: string
  isActive?: boolean
  isCompleted?: boolean
}

interface HospitalNavigationProps {
  destination: string
  level: string
  estimatedTime: number
  steps?: NavigationStep[]
}

export function HospitalNavigation({
  destination = "Lab A",
  level = "Level 2",
  estimatedTime = 2,
  steps = [
    { instruction: "Head straight", detail: "Past the reception desk", isCompleted: true },
    { instruction: "Turn right", detail: "At the elevator lobby", isActive: true },
    { instruction: "Take elevator", detail: "Go to Level 2" },
    { instruction: "Turn left", detail: "Lab A is on your right" },
  ]
}: HospitalNavigationProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Main Navigation Card */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header - Destination */}
        <div className="p-5 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Navigation className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Walk to {destination}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">{level}</p>
              </div>
            </div>
          </div>
          
          {/* Time Estimate */}
          <div className="flex items-center gap-2 mt-4">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {estimatedTime} min
            </span>
            <span className="text-sm text-muted-foreground">estimated walk</span>
          </div>
        </div>
        
        {/* Steps */}
        <div className="p-4">
          <div className="space-y-1">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`
                  flex items-center gap-3 p-3 rounded-xl transition-colors
                  ${step.isActive ? "bg-primary/10" : ""}
                `}
              >
                {/* Step Icon */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${step.isCompleted 
                    ? "bg-primary text-primary-foreground" 
                    : step.isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                  }
                `}>
                  {step.isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : index === 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : index === steps.length - 1 ? (
                    <MapPin className="w-4 h-4" />
                  ) : (
                    <CornerUpRight className="w-4 h-4" />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <p className={`
                    text-sm font-medium
                    ${step.isActive ? "text-foreground" : step.isCompleted ? "text-muted-foreground" : "text-foreground"}
                  `}>
                    {step.instruction}
                  </p>
                  {step.detail && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.detail}
                    </p>
                  )}
                </div>
                
                {/* Active Indicator */}
                {step.isActive && (
                  <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-5 pb-5">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: "25%" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Step 2 of {steps.length}
          </p>
        </div>
      </div>
    </div>
  )
}
