"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import {
  Clock,
  Coffee,
  CalendarClock,
  Sparkles,
  Check,
  Bell,
  FileText,
  Pill,
  Activity,
  Send,
  X,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react"

// Phases of the experience
type Phase =
  | "initial"
  | "confirming"
  | "confirmed"
  | "ai-monitoring"
  | "ai-doctor"
  | "ai-prepared"
  | "ai-card-reveal"
  | "tips-visible"
  | "interaction"
  | "payoff"

interface ConsultationDelayedScreenProps {
  onViewDashboard: () => void
}

export function ConsultationDelayedScreen({
  onViewDashboard,
}: ConsultationDelayedScreenProps) {
  const [phase, setPhase] = useState<Phase>("initial")
  const [visibleTips, setVisibleTips] = useState(0)
  const [symptomsExpanded, setSymptomsExpanded] = useState(false)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [sentToDoctor, setSentToDoctor] = useState(false)
  const [patientsOptimized] = useState(184)

  // Handle "Keep my appointment" click
  const handleKeepAppointment = useCallback(() => {
    setPhase("confirming")
    setTimeout(() => setPhase("confirmed"), 800)
  }, [])

  // Progressive AI sequence after confirmation
  useEffect(() => {
    if (phase !== "confirmed") return

    // Start AI monitoring message after 10 seconds (simulating real AI thinking)
    const t1 = setTimeout(() => setPhase("ai-monitoring"), 10000)

    return () => clearTimeout(t1)
  }, [phase])

  useEffect(() => {
    if (phase !== "ai-monitoring") return
    const t = setTimeout(() => setPhase("ai-doctor"), 2500)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== "ai-doctor") return
    const t = setTimeout(() => setPhase("ai-prepared"), 4000)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== "ai-prepared") return
    const t = setTimeout(() => setPhase("ai-card-reveal"), 2000)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== "ai-card-reveal") return
    const t = setTimeout(() => setPhase("tips-visible"), 800)
    return () => clearTimeout(t)
  }, [phase])

  // Staggered tip reveal
  useEffect(() => {
    if (phase !== "tips-visible") return

    const tips = [1, 2, 3]
    tips.forEach((_, i) => {
      setTimeout(() => setVisibleTips(i + 1), (i + 1) * 600)
    })

    const t = setTimeout(() => setPhase("interaction"), 2500)
    return () => clearTimeout(t)
  }, [phase])

  const handleSendToDoctor = () => {
    setSentToDoctor(true)
    setTimeout(() => setPhase("payoff"), 1500)
  }

  const handleSkip = () => {
    setPhase("payoff")
  }

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    )
  }

  const showAIMessages =
    phase === "ai-monitoring" ||
    phase === "ai-doctor" ||
    phase === "ai-prepared" ||
    phase === "ai-card-reveal" ||
    phase === "tips-visible" ||
    phase === "interaction" ||
    phase === "payoff"

  const showAICard =
    phase === "ai-card-reveal" ||
    phase === "tips-visible" ||
    phase === "interaction" ||
    phase === "payoff"

  return (
    <div className="px-4 py-6 flex flex-col gap-4">
      {/* Main Delay Card */}
      <div className="p-1 animate-fade-in-up">
        <div className="relative">
          {/* Subtle ambient glow */}
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-2xl pointer-events-none" />

          {/* Main card */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[oklch(0.14_0.005_260)] to-[oklch(0.11_0.005_260)] border border-[oklch(0.25_0.005_260)] overflow-hidden shadow-2xl shadow-black/50">
            {/* Top accent border */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <div className="relative p-6">
              {/* AI Context Badge */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[oklch(0.18_0.005_260)] border border-[oklch(0.25_0.005_260)]">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    AI Assistant
                  </span>
                </div>
                {/* AI Active indicator - pulsing dot */}
                {showAIMessages && (
                  <div className="flex items-center gap-1.5 ml-auto">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary/50 animate-ping" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Active
                    </span>
                  </div>
                )}
              </div>

              {/* Card content changes based on phase */}
              {phase === "initial" ||
              phase === "confirming" ||
              phase === "confirmed" ? (
                <>
                  {/* Alert indicator with delay time */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500",
                          phase === "confirmed"
                            ? "bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20"
                            : "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20"
                        )}
                      >
                        {phase === "confirmed" ? (
                          <Check className="w-5 h-5 text-primary animate-check-scale-in" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-400" />
                        )}
                      </div>
                      {/* Delay badge */}
                      {phase !== "confirmed" && (
                        <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-md bg-amber-500 text-[10px] font-bold text-black">
                          +25m
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-[17px] font-semibold text-foreground leading-snug mb-1.5">
                        {phase === "confirmed"
                          ? "Waiting confirmed"
                          : "Your consultation is delayed by 25 minutes"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {phase === "confirmed"
                          ? "You'll stay in queue. We'll alert you when it's your turn."
                          : "Grab a coffee or reschedule?"}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons - only show before confirmed */}
                  {phase !== "confirmed" && (
                    <div className="flex flex-col gap-3">
                      {/* Primary action - coffee */}
                      <button className="group relative w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.65_0.14_175)] text-primary-foreground font-semibold text-[15px] transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-center gap-2.5">
                          <Coffee className="w-4 h-4" />
                          <span>Find nearby coffee</span>
                        </div>
                      </button>

                      {/* Secondary action - reschedule */}
                      <button className="group relative w-full px-5 py-3.5 rounded-xl bg-[oklch(0.18_0.005_260)] border border-[oklch(0.28_0.005_260)] text-foreground font-medium text-[15px] transition-all duration-200 hover:bg-[oklch(0.20_0.005_260)] hover:border-[oklch(0.32_0.005_260)] active:scale-[0.98]">
                        <div className="flex items-center justify-center gap-2.5">
                          <CalendarClock className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          <span>Reschedule appointment</span>
                        </div>
                      </button>

                      {/* Tertiary action - keep appointment */}
                      <button
                        onClick={handleKeepAppointment}
                        disabled={phase === "confirming"}
                        className="group relative w-full px-4 py-2.5 rounded-lg text-muted-foreground text-sm transition-all duration-200 hover:text-foreground hover:bg-[oklch(0.16_0.005_260)] active:scale-[0.98] disabled:opacity-70"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {phase === "confirming" ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                              <span>Confirming...</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                              <span>Keep my appointment</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  )}

                  {/* Confirmed state - notification hint */}
                  {phase === "confirmed" && (
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-4 animate-fade-in-up">
                      <div className="absolute inset-0 bg-primary/5 animate-pulse" style={{ animationDuration: "3s" }} />
                      <div className="relative flex items-center gap-2">
                        <Bell className="w-4 h-4 text-primary/70" />
                        <span className="text-sm text-muted-foreground">
                          Notifications enabled for Dr. Martinez
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bottom helper text - only show when not confirmed */}
                  {phase === "initial" && (
                    <div className="mt-5 pt-4 border-t border-[oklch(0.20_0.005_260)]">
                      <p className="text-xs text-muted-foreground text-center">
                        We&apos;ll notify you when the doctor is ready
                      </p>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Progressive AI Messages */}
      {showAIMessages && (
        <div className="flex flex-col gap-3">
          {/* Message 1: Monitoring */}
          <AIMessage visible={showAIMessages} delay={0}>
            Monitoring your wait time...
          </AIMessage>

          {/* Message 2: Doctor info */}
          <AIMessage
            visible={
              phase === "ai-doctor" ||
              phase === "ai-prepared" ||
              phase === "ai-card-reveal" ||
              phase === "tips-visible" ||
              phase === "interaction" ||
              phase === "payoff"
            }
            delay={0}
          >
            You&apos;re currently waiting for{" "}
            <span className="text-foreground font-medium">
              Dr. Elena Martinez
            </span>{" "}
            (General Checkup).
          </AIMessage>

          {/* Message 3: Prepared */}
          <AIMessage
            visible={
              phase === "ai-prepared" ||
              phase === "ai-card-reveal" ||
              phase === "tips-visible" ||
              phase === "interaction" ||
              phase === "payoff"
            }
            delay={0}
          >
            While you wait, I&apos;ve prepared something to help you.
          </AIMessage>
        </div>
      )}

      {/* Pre-Consult Preparation Card */}
      {showAICard && phase !== "payoff" && (
        <PreConsultCard
          visibleTips={visibleTips}
          phase={phase}
          symptomsExpanded={symptomsExpanded}
          selectedSymptoms={selectedSymptoms}
          onToggleSymptoms={() => setSymptomsExpanded(!symptomsExpanded)}
          onSelectSymptom={toggleSymptom}
          onSendToDoctor={handleSendToDoctor}
          onSkip={handleSkip}
          sentToDoctor={sentToDoctor}
          patientsOptimized={patientsOptimized}
        />
      )}

      {/* Payoff Messages */}
      {phase === "payoff" && (
        <div className="flex flex-col gap-3">
          <AIMessage visible delay={0}>
            <span className="text-foreground font-medium">
              Dr. Martinez will be able to focus directly on your concern.
            </span>
          </AIMessage>

          <AIMessage visible delay={600}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-foreground font-medium">
                  Estimated time saved:
                </span>{" "}
                <span className="text-primary font-semibold">~8 minutes</span>
              </div>
            </div>
          </AIMessage>

          {/* Patients optimized stat */}
          <div
            className="flex items-center justify-center gap-2 py-3 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}
          >
            <Activity className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Patients optimized today:{" "}
              <span className="text-foreground font-medium">
                {patientsOptimized}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Dashboard link - only show in payoff */}
      {phase === "payoff" && (
        <button
          onClick={onViewDashboard}
          className="self-center inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground transition-all hover:text-foreground hover:border-primary/30 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1800ms", animationFillMode: "forwards" }}
        >
          <LayoutDashboard className="w-4 h-4" />
          View Hospital Dashboard
        </button>
      )}
    </div>
  )
}

// AI Message component with fade-in animation
function AIMessage({
  children,
  visible,
  delay = 0,
}: {
  children: React.ReactNode
  visible: boolean
  delay?: number
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(t)
  }, [visible, delay])

  if (!show) return null

  return (
    <div className="flex gap-3 items-start opacity-0 animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-ai-bubble border border-primary/20 flex items-center justify-center">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="flex-1 py-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  )
}

// Pre-Consult Card component
function PreConsultCard({
  visibleTips,
  phase,
  symptomsExpanded,
  selectedSymptoms,
  onToggleSymptoms,
  onSelectSymptom,
  onSendToDoctor,
  onSkip,
  sentToDoctor,
  patientsOptimized,
}: {
  visibleTips: number
  phase: Phase
  symptomsExpanded: boolean
  selectedSymptoms: string[]
  onToggleSymptoms: () => void
  onSelectSymptom: (symptom: string) => void
  onSendToDoctor: () => void
  onSkip: () => void
  sentToDoctor: boolean
  patientsOptimized: number
}) {
  const tips = [
    { icon: FileText, text: "Note your main symptoms before entering" },
    { icon: Clock, text: "Track when the issue started" },
    { icon: Pill, text: "List any medications you're taking" },
  ]

  const symptoms = ["Headache", "Fever", "Fatigue"]

  const showInteraction = phase === "interaction"

  return (
    <div
      className="relative opacity-0 animate-fade-in-up"
      style={{ animationFillMode: "forwards" }}
    >
      {/* Floating card with premium styling */}
      <div className="relative">
        {/* Blue glow effect */}
        <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-xl pointer-events-none animate-pulse" style={{ animationDuration: "3s" }} />

        {/* Card */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[oklch(0.12_0.01_200)] to-[oklch(0.09_0.005_260)] border border-primary/30 overflow-hidden shadow-2xl shadow-black/50">
          {/* Top glow border */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Blur overlay behind */}
          <div className="absolute inset-0 backdrop-blur-sm bg-background/20 pointer-events-none" />

          <div className="relative p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-base font-semibold text-foreground mb-1">
                  Pre-Consult Preparation
                </h4>
                <p className="text-xs text-muted-foreground">
                  Save time during your consultation
                </p>
              </div>
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary/50 animate-ping" />
              </div>
            </div>

            {/* Tips - staggered reveal */}
            <div className="space-y-3 mb-5">
              {tips.map((tip, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3 transition-all duration-500",
                    visibleTips > i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <tip.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.text}</p>
                </div>
              ))}
            </div>

            {/* Sent to doctor confirmation */}
            {sentToDoctor && (
              <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20 animate-fade-in-up">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary animate-check-scale-in" />
                  <span className="text-sm text-foreground font-medium">
                    Your input has been shared with Dr. Martinez
                  </span>
                </div>
              </div>
            )}

            {/* Interactive actions */}
            {showInteraction && !sentToDoctor && (
              <div className="space-y-3 pt-3 border-t border-primary/10">
                {/* Symptoms button */}
                <button
                  onClick={onToggleSymptoms}
                  className="group w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[oklch(0.15_0.005_260)] border border-[oklch(0.25_0.005_260)] transition-all hover:border-primary/30 hover:bg-[oklch(0.17_0.005_260)]"
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      I have symptoms
                    </span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      symptomsExpanded && "rotate-90"
                    )}
                  />
                </button>

                {/* Expanded symptoms chips */}
                {symptomsExpanded && (
                  <div className="flex flex-wrap gap-2 px-1 animate-fade-in-up">
                    {symptoms.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => onSelectSymptom(symptom)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-all",
                          selectedSymptoms.includes(symptom)
                            ? "bg-primary text-primary-foreground"
                            : "bg-[oklch(0.18_0.005_260)] border border-[oklch(0.28_0.005_260)] text-muted-foreground hover:text-foreground hover:border-primary/30"
                        )}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                )}

                {/* Send to doctor button - show when symptoms selected */}
                {selectedSymptoms.length > 0 && (
                  <button
                    onClick={onSendToDoctor}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.65_0.14_175)] text-primary-foreground font-medium text-sm transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] animate-fade-in-up"
                  >
                    <Send className="w-4 h-4" />
                    Send to doctor
                  </button>
                )}

                {/* Skip button */}
                <button
                  onClick={onSkip}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-muted-foreground text-sm transition-all hover:text-foreground hover:bg-[oklch(0.14_0.005_260)]"
                >
                  <X className="w-3.5 h-3.5" />
                  Skip — I prefer to wait
                </button>
              </div>
            )}

            {/* Stats footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/10">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">
                  Patients optimized today:{" "}
                  <span className="text-foreground font-medium">
                    {patientsOptimized}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
