"use client"

import { ChatMessage } from "@/components/chat-message"
import { ActionCard } from "@/components/action-card"
import { ActionCardType } from "@/constants/demo"

export function PlanConfirmedScreen() {
  return (
    <div className="px-4 py-6 flex flex-col gap-3 animate-fade-in-up">
      <ChatMessage
        message="Plan confirmed. Proceed to Lab Room 3 on the second floor. Follow the blue line. You will be notified when Dr. Martinez is ready."
        isAI
        timestamp={new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
      />

      <ActionCard
        type={ActionCardType.CONFIRMED}
        title="Ready to Proceed"
        description="Follow blue line to Lab Room 3, Second Floor"
        systemLabel="Route Confirmed"
      />

      <div className="flex items-center gap-2 mt-4 text-muted-foreground">
        <div className="flex gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <span className="text-xs">Preparing your route…</span>
      </div>
    </div>
  )
}
