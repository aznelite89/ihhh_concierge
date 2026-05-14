"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Navigation,
  MapPin,
  Clock,
  ChevronDown,
  ArrowUp,
  CornerUpRight,
  CornerUpLeft,
  ArrowUpDown,
  Map,
  X,
  ChevronRight,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationStep {
  instruction: string
  detail?: string
  distance?: string
  isActive?: boolean
  isCompleted?: boolean
}

interface HospitalNavigationProps {
  destination: string
  level: string
  estimatedTime: number
  steps?: NavigationStep[]
  currentStepIndex?: number
}

const DEFAULT_STEPS: NavigationStep[] = [
  { instruction: "Head straight", detail: "Past the reception desk", distance: "15m", isCompleted: true },
  { instruction: "Turn right", detail: "At the elevator lobby", distance: "5m", isActive: true },
  { instruction: "Take elevator", detail: "Go to Level 2" },
  { instruction: "Turn left", detail: "Lab A is on your right", distance: "8m" },
]

function pickIcon(instruction: string, isFinal: boolean) {
  const text = instruction.toLowerCase()
  if (isFinal) return MapPin
  if (text.includes("elevator")) return ArrowUpDown
  if (text.includes("left")) return CornerUpLeft
  if (text.includes("right")) return CornerUpRight
  return ArrowUp
}

export function HospitalNavigation({
  destination = "Lab A",
  level = "Level 2",
  estimatedTime = 2,
  steps = DEFAULT_STEPS,
  currentStepIndex,
}: HospitalNavigationProps) {
  // Initial current step: prop, first active step, or first non-completed step
  const initialIndex = useMemo(() => {
    if (typeof currentStepIndex === "number") return currentStepIndex
    const active = steps.findIndex(s => s.isActive)
    if (active >= 0) return active
    const next = steps.findIndex(s => !s.isCompleted)
    return next >= 0 ? next : 0
  }, [currentStepIndex, steps])

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [showMap, setShowMap] = useState(false)
  const [stepsExpanded, setStepsExpanded] = useState(false)
  const [animatedProgress, setAnimatedProgress] = useState(0)

  // Derive completed/active flags from internal pointer so the UI advances
  const computedSteps = useMemo(
    () =>
      steps.map((s, i) => ({
        ...s,
        isCompleted: i < activeIndex,
        isActive: i === activeIndex,
      })),
    [steps, activeIndex]
  )

  const currentStep = computedSteps[activeIndex]
  const isFinalStep = activeIndex === computedSteps.length - 1
  const CurrentIcon = pickIcon(currentStep?.instruction ?? "", isFinalStep)

  const progress = ((activeIndex + 0.5) / computedSteps.length) * 100

  useEffect(() => {
    const t = setTimeout(() => setAnimatedProgress(progress), 250)
    return () => clearTimeout(t)
  }, [progress])

  const handleNext = () => {
    setActiveIndex(i => Math.min(i + 1, computedSteps.length - 1))
  }

  return (
    <>
      <div className="w-full max-w-sm mx-auto animate-slide-up-enter">
        <div className="bg-card rounded-2xl border border-border overflow-hidden relative">
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-primary/5 rounded-full blur-3xl animate-map-glow-pulse" />
          </div>

          {/* Header — destination */}
          <div className="p-5 border-b border-border relative">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 animate-breathing-glow">
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Walk to {destination}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{level}</p>
                </div>
              </div>

              <button
                onClick={() => setShowMap(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs text-muted-foreground transition-all hover:text-foreground hover:border-primary/30 hover:bg-primary/10 active:scale-95"
              >
                <Map className="w-3.5 h-3.5" />
                Map
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {estimatedTime} min
              </span>
              <span className="text-sm text-muted-foreground">estimated walk</span>
            </div>
          </div>

          {/* Current step — single large focus card */}
          <div className="p-4 relative">
            <div
              key={activeIndex}
              className="relative rounded-2xl bg-primary/10 border border-primary/30 p-5 shadow-[0_0_25px_var(--glow)] animate-fade-in-up overflow-hidden"
            >
              {/* Distance pill */}
              {currentStep?.distance && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 border border-primary/30 text-primary text-sm font-semibold">
                  in {currentStep.distance}
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_25px_var(--glow)] animate-breathing-glow">
                  <CurrentIcon
                    className="w-16 h-16 animate-icon-float"
                    strokeWidth={2.25}
                    style={{ width: "64px", height: "64px" }}
                  />
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <p
                    className="font-bold text-foreground leading-tight"
                    style={{ fontSize: "28px" }}
                  >
                    {currentStep?.instruction}
                  </p>
                  {currentStep?.detail && (
                    <p
                      className="text-muted-foreground mt-1 leading-snug"
                      style={{ fontSize: "18px" }}
                    >
                      {currentStep.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Next button — advance to the next step */}
            {!isFinalStep && (
              <button
                onClick={handleNext}
                className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-[0_0_25px_var(--glow)] transition-all hover:scale-[1.01] active:scale-[0.98]"
                style={{ fontSize: "18px" }}
              >
                <span>Next step</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* See all steps — collapsible */}
            <button
              onClick={() => setStepsExpanded(v => !v)}
              className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-primary transition-all hover:bg-primary/10 active:scale-[0.98]"
              style={{ fontSize: "18px" }}
              aria-expanded={stepsExpanded}
            >
              <span>{stepsExpanded ? "Hide steps" : "See all steps"}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  stepsExpanded && "rotate-180"
                )}
              />
            </button>

            {stepsExpanded && (
              <ul className="mt-3 flex flex-col gap-1.5 animate-fade-in-up">
                {computedSteps.map((step, index) => {
                  const StepIcon = pickIcon(
                    step.instruction,
                    index === computedSteps.length - 1
                  )
                  return (
                    <li
                      key={index}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl",
                        step.isActive && "bg-primary/10 border border-primary/30",
                        step.isCompleted && "opacity-60"
                      )}
                    >
                      <div
                        className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                          step.isCompleted
                            ? "bg-primary text-primary-foreground"
                            : step.isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {step.isCompleted ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <StepIcon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p
                          className="font-medium text-foreground"
                          style={{ fontSize: "18px" }}
                        >
                          {step.instruction}
                        </p>
                        {step.detail && (
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {step.detail}
                          </p>
                        )}
                      </div>
                      {step.distance && (
                        <span className="text-sm text-primary font-medium flex-shrink-0">
                          {step.distance}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Progress bar */}
          <div className="px-5 pb-5">
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${animatedProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Step {activeIndex + 1} of {computedSteps.length}
            </p>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setShowMap(false)}
        >
          <div className="h-full flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Route</h3>
              <button
                onClick={() => setShowMap(false)}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-all hover:bg-secondary/80 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 rounded-2xl bg-card border border-border overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" className="text-primary" />
                  </svg>
                </div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400">
                  <path
                    d="M 150 350 L 150 250 L 220 250 L 220 150 L 150 150 L 150 80"
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-route-draw"
                  />
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="oklch(0.72 0.14 175 / 0.3)" />
                      <stop offset="100%" stopColor="oklch(0.72 0.14 175 / 1)" />
                    </linearGradient>
                  </defs>

                  <circle cx="150" cy="250" r="8" className="fill-primary animate-dot-pulse" />
                  <circle cx="150" cy="250" r="16" className="fill-primary/20 animate-ping" />

                  <g transform="translate(150, 70)">
                    <circle r="12" className="fill-primary" />
                    <circle r="4" className="fill-primary-foreground" />
                  </g>
                </svg>

                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  You are here
                </div>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-card border border-primary text-primary text-xs font-medium">
                  {destination}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowMap(false)}
              className="mt-4 w-full py-4 rounded-2xl bg-secondary text-foreground font-semibold transition-all hover:bg-secondary/80 active:scale-[0.98]"
            >
              Back to steps
            </button>
          </div>
        </div>
      )}
    </>
  )
}
