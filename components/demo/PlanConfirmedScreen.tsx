"use client"

import { useState, useEffect } from "react"
import { ChatMessage } from "@/components/chat-message"
import { ActionCard } from "@/components/action-card"
import { ActionCardType } from "@/constants/demo"
import { cn } from "@/lib/utils"

const MESSAGES = [
  { text: "Optimizing your visit...", delay: 0, isSystemBackground: true },
  { text: "Plan confirmed. Proceed to Lab Room 3 on the second floor. Follow the blue line. You will be notified when Dr. Martinez is ready.", delay: 800, isSystemBackground: false },
]

export function PlanConfirmedScreen() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [showCard, setShowCard] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [loadingPhase, setLoadingPhase] = useState(0)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Sequence messages
    MESSAGES.forEach((msg, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, index])
        }, msg.delay + 300) // Small initial delay for effect
      )
    })

    // Show card after messages
    timers.push(
      setTimeout(() => setShowCard(true), 1600)
    )

    // Show loader after card
    timers.push(
      setTimeout(() => setShowLoader(true), 2400)
    )

    // Cycle through loading phases
    timers.push(
      setTimeout(() => setLoadingPhase(1), 4000)
    )
    timers.push(
      setTimeout(() => setLoadingPhase(2), 6000)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  const loadingTexts = [
    "Preparing your route...",
    "Calculating optimal path...",
    "Route ready, activating guidance..."
  ]

  return (
    <div className="px-4 py-6 flex flex-col gap-3">
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 animate-map-glow-pulse" />
      </div>

      {/* Messages with staggered animation */}
      {MESSAGES.map((msg, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-700",
            visibleMessages.includes(index)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
          style={{ 
            transitionDelay: `${index * 100}ms`,
          }}
        >
          <ChatMessage
            message={msg.text}
            isAI
            timestamp={index === MESSAGES.length - 1 ? new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : undefined}
            isSystemBackground={msg.isSystemBackground}
          />
        </div>
      ))}

      {/* Action Card with slide-up animation */}
      <div
        className={cn(
          "transition-all duration-700 ease-out",
          showCard
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        )}
      >
        <ActionCard
          type={ActionCardType.CONFIRMED}
          title="Ready to Proceed"
          description="Follow blue line to Lab Room 3, Second Floor"
          systemLabel="Route Confirmed"
        />
      </div>

      {/* Preparing route loader with phases */}
      <div
        className={cn(
          "flex items-center gap-3 mt-4 transition-all duration-500",
          showLoader
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        )}
      >
        {/* Animated loader dots */}
        <div className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
          <div className="relative flex gap-1">
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "0.8s" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "150ms", animationDuration: "0.8s" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "300ms", animationDuration: "0.8s" }}
            />
          </div>
        </div>

        {/* Loading text with transition */}
        <div className="flex flex-col">
          <span 
            key={loadingPhase}
            className="text-sm font-medium text-foreground animate-fade-in-up"
          >
            {loadingTexts[loadingPhase]}
          </span>
          <div className="mt-1.5 h-1 w-32 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${((loadingPhase + 1) / loadingTexts.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Ambient guidance hint */}
      {showLoader && loadingPhase >= 1 && (
        <div className="mt-4 text-center animate-guidance-fade">
          <span className="text-xs text-muted-foreground">
            System is calibrating your path...
          </span>
        </div>
      )}
    </div>
  )
}
