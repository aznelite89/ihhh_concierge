"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Clock, Coffee, CalendarClock, Sparkles, Check, Bell } from "lucide-react"

interface AIDecisionCardProps {
  title?: string
  suggestion?: string
  delayMinutes?: number
  primaryAction?: {
    label: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
  }
  tertiaryAction?: {
    label: string
    onClick?: () => void
  }
  className?: string
}

export function AIDecisionCard({
  title = "Your consultation is delayed by 25 minutes",
  suggestion = "Grab a coffee or reschedule?",
  delayMinutes = 25,
  primaryAction = { label: "Find nearby coffee" },
  secondaryAction = { label: "Reschedule appointment" },
  tertiaryAction = { label: "Keep my appointment" },
  className,
}: AIDecisionCardProps) {
  const [waitingConfirmed, setWaitingConfirmed] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const handleKeepAppointment = () => {
    setIsConfirming(true)
    // Simulate brief processing
    setTimeout(() => {
      setIsConfirming(false)
      setWaitingConfirmed(true)
      tertiaryAction?.onClick?.()
    }, 800)
  }
  return (
    <div className={cn("p-1", className)}>
      <div className="relative animate-fade-in-up">
        {/* Subtle ambient glow */}
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-2xl pointer-events-none" />
        
        {/* Main card - Stripe/Wise inspired dark glass */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[oklch(0.14_0.005_260)] to-[oklch(0.11_0.005_260)] border border-[oklch(0.25_0.005_260)] overflow-hidden shadow-2xl shadow-black/50">
          {/* Top accent border */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          <div className="relative p-6">
            {/* AI Context Badge */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[oklch(0.18_0.005_260)] border border-[oklch(0.25_0.005_260)]">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[11px] font-medium text-muted-foreground">AI Assistant</span>
              </div>
            </div>
            
            {/* Alert indicator with delay time */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                {/* Delay badge */}
                <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-md bg-amber-500 text-[10px] font-bold text-black">
                  +{delayMinutes}m
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-[17px] font-semibold text-foreground leading-snug mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {suggestion}
                </p>
              </div>
            </div>
            
            {/* Action buttons - prominent and clean */}
            <div className="flex flex-col gap-3">
              {/* Primary action - coffee */}
              <button
                onClick={primaryAction.onClick}
                className="group relative w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.65_0.14_175)] text-primary-foreground font-semibold text-[15px] transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center gap-2.5">
                  <Coffee className="w-4 h-4" />
                  <span>{primaryAction.label}</span>
                </div>
              </button>
              
              {/* Secondary action - reschedule */}
              <button
                onClick={secondaryAction.onClick}
                className="group relative w-full px-5 py-3.5 rounded-xl bg-[oklch(0.18_0.005_260)] border border-[oklch(0.28_0.005_260)] text-foreground font-medium text-[15px] transition-all duration-200 hover:bg-[oklch(0.20_0.005_260)] hover:border-[oklch(0.32_0.005_260)] active:scale-[0.98]"
              >
                <div className="flex items-center justify-center gap-2.5">
                  <CalendarClock className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span>{secondaryAction.label}</span>
                </div>
              </button>

              {/* Tertiary action - keep appointment */}
              {!waitingConfirmed ? (
                <button
                  onClick={handleKeepAppointment}
                  disabled={isConfirming}
                  className="group relative w-full px-4 py-2.5 rounded-lg text-muted-foreground text-sm transition-all duration-200 hover:text-foreground hover:bg-[oklch(0.16_0.005_260)] active:scale-[0.98] disabled:opacity-70"
                >
                  <div className="flex items-center justify-center gap-2">
                    {isConfirming ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                        <span>Confirming...</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span>{tertiaryAction.label}</span>
                      </>
                    )}
                  </div>
                </button>
              ) : (
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-4 animate-fade-in-up">
                  {/* Success pulse effect */}
                  <div className="absolute inset-0 bg-primary/5 animate-pulse" style={{ animationDuration: '3s' }} />
                  
                  <div className="relative flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary animate-check-scale-in" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">Waiting confirmed</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        You&apos;ll stay in queue. We&apos;ll alert you when it&apos;s your turn.
                      </p>
                    </div>
                  </div>

                  {/* Notification hint */}
                  <div className="relative flex items-center gap-2 mt-3 pt-3 border-t border-primary/10">
                    <Bell className="w-3 h-3 text-primary/70" />
                    <span className="text-[11px] text-muted-foreground">
                      Notifications enabled for Dr. Martinez
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Bottom helper text - only show when not confirmed */}
            {!waitingConfirmed && (
              <div className="mt-5 pt-4 border-t border-[oklch(0.20_0.005_260)]">
                <p className="text-xs text-muted-foreground text-center">
                  We&apos;ll notify you when the doctor is ready
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
