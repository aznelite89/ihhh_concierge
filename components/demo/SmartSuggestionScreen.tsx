"use client"

import { AIDecisionCard } from "@/components/ai-decision-card"
import { LayoutDashboard } from "lucide-react"

interface SmartSuggestionScreenProps {
  onViewDashboard: () => void
}

export function SmartSuggestionScreen({ onViewDashboard }: SmartSuggestionScreenProps) {
  return (
    <div className="px-4 py-6 flex flex-col gap-4 animate-fade-in-up">
      <AIDecisionCard
        title="Your consultation is delayed by 25 minutes"
        suggestion="Grab a coffee or reschedule?"
        delayMinutes={25}
        primaryAction={{ label: "Find nearby coffee" }}
        secondaryAction={{ label: "Reschedule appointment" }}
      />

      <button
        onClick={onViewDashboard}
        className="self-center inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground transition-all hover:text-foreground hover:border-primary/30"
      >
        <LayoutDashboard className="w-4 h-4" />
        View Hospital Dashboard
      </button>
    </div>
  )
}
