"use client"

import { useState, useEffect, useCallback } from "react"
import { Navigation, MapPin, Clock, ChevronRight, ArrowUp, CornerUpRight, Map, X } from "lucide-react"
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

const GUIDANCE_MESSAGES = [
  "You're on the right path",
  "Almost there...",
  "Keep going, looking good",
  "Perfect, continue ahead",
]

export function HospitalNavigation({
  destination = "Lab A",
  level = "Level 2",
  estimatedTime = 2,
  steps = [
    { instruction: "Head straight", detail: "Past the reception desk", distance: "15m", isCompleted: true },
    { instruction: "Turn right", detail: "At the elevator lobby", distance: "5m", isActive: true },
    { instruction: "Take elevator", detail: "Go to Level 2", distance: "" },
    { instruction: "Turn left", detail: "Lab A is on your right", distance: "8m" },
  ],
  currentStepIndex = 1
}: HospitalNavigationProps) {
  const [showMap, setShowMap] = useState(false)
  const [guidanceMessage, setGuidanceMessage] = useState<string | null>(null)
  const [guidanceKey, setGuidanceKey] = useState(0)
  const [animatedProgress, setAnimatedProgress] = useState(0)

  // Calculate progress
  const completedSteps = steps.filter(s => s.isCompleted).length
  const progress = ((completedSteps + 0.5) / steps.length) * 100

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 300)
    return () => clearTimeout(timer)
  }, [progress])

  // Show guidance messages periodically
  useEffect(() => {
    const showMessage = () => {
      const randomMessage = GUIDANCE_MESSAGES[Math.floor(Math.random() * GUIDANCE_MESSAGES.length)]
      setGuidanceMessage(randomMessage)
      setGuidanceKey(k => k + 1)
      
      // Clear after animation
      setTimeout(() => setGuidanceMessage(null), 4000)
    }

    // Show first message after 3s, then every 8s
    const initialTimer = setTimeout(showMessage, 3000)
    const interval = setInterval(showMessage, 8000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const getStepIcon = (step: NavigationStep, index: number) => {
    if (step.isCompleted) {
      return (
        <svg 
          className="w-4 h-4 animate-check-scale-in" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )
    }
    if (index === 0) return <ArrowUp className={cn("w-4 h-4", step.isActive && "animate-icon-float")} />
    if (index === steps.length - 1) return <MapPin className={cn("w-4 h-4", step.isActive && "animate-icon-float")} />
    return <CornerUpRight className={cn("w-4 h-4", step.isActive && "animate-icon-float")} />
  }

  return (
    <>
      <div className="w-full max-w-sm mx-auto animate-slide-up-enter">
        {/* Main Navigation Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden relative">
          {/* Ambient background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-primary/5 rounded-full blur-3xl animate-map-glow-pulse" />
          </div>

          {/* Header - Destination */}
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
              
              {/* View Map Button */}
              <button
                onClick={() => setShowMap(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs text-muted-foreground transition-all hover:text-foreground hover:border-primary/30 hover:bg-primary/10 active:scale-95"
              >
                <Map className="w-3.5 h-3.5" />
                Map
              </button>
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
          <div className="p-4 relative">
            <div className="space-y-1">
              {steps.map((step, index) => (
                <button 
                  key={index}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative overflow-hidden group",
                    step.isActive && "animate-active-step-glow bg-primary/10 scale-[1.02]",
                    step.isCompleted && "opacity-60",
                    !step.isActive && !step.isCompleted && "hover:bg-secondary/30"
                  )}
                >
                  {/* Ripple effect container */}
                  <span className="absolute inset-0 pointer-events-none">
                    <span className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-primary/20 group-active:animate-ripple" />
                  </span>

                  {/* Step Icon */}
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    step.isCompleted 
                      ? "bg-primary text-primary-foreground" 
                      : step.isActive 
                        ? "bg-primary text-primary-foreground shadow-[0_0_15px_var(--glow)]" 
                        : "bg-secondary text-muted-foreground"
                  )}>
                    {getStepIcon(step, index)}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <p className={cn(
                        "text-sm font-medium transition-colors",
                        step.isActive ? "text-foreground" : step.isCompleted ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {step.instruction}
                      </p>
                      {step.distance && step.isActive && (
                        <span className="text-xs text-primary font-medium">
                          in {step.distance}
                        </span>
                      )}
                    </div>
                    {step.detail && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {step.detail}
                      </p>
                    )}
                  </div>
                  
                  {/* Active Indicator */}
                  {step.isActive && (
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 animate-arrow-bounce" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="px-5 pb-5">
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${animatedProgress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Step {currentStepIndex + 1} of {steps.length}
            </p>
          </div>

          {/* Ambient guidance message */}
          {guidanceMessage && (
            <div 
              key={guidanceKey}
              className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none"
            >
              <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary animate-guidance-fade">
                {guidanceMessage}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setShowMap(false)}
        >
          <div className="h-full flex flex-col p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Route Overview</h3>
              <button
                onClick={() => setShowMap(false)}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-all hover:bg-secondary/80 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Map View */}
            <div className="flex-1 rounded-2xl bg-card border border-border overflow-hidden relative">
              {/* Stylized map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" className="text-primary"/>
                  </svg>
                </div>

                {/* Route visualization */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400">
                  {/* Route path */}
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
                  
                  {/* You are here dot */}
                  <circle cx="150" cy="250" r="8" className="fill-primary animate-dot-pulse" />
                  <circle cx="150" cy="250" r="16" className="fill-primary/20 animate-ping" />
                  
                  {/* Destination pin */}
                  <g transform="translate(150, 70)">
                    <circle r="12" className="fill-primary" />
                    <circle r="4" className="fill-primary-foreground" />
                  </g>
                </svg>

                {/* Labels */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  You are here
                </div>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-card border border-primary text-primary text-xs font-medium">
                  {destination}
                </div>
              </div>
            </div>

            {/* Back button */}
            <button
              onClick={() => setShowMap(false)}
              className="mt-4 w-full py-4 rounded-2xl bg-secondary text-foreground font-semibold transition-all hover:bg-secondary/80 active:scale-[0.98]"
            >
              Back to Steps
            </button>
          </div>
        </div>
      )}
    </>
  )
}
