"use client"

import { useState } from "react"
import { Check, RefreshCw, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActionButtonsProps {
  onAccept?: () => void
  onRequestChange?: () => void
  onTalkToStaff?: () => void
}

export function ActionButtons({ onAccept, onRequestChange, onTalkToStaff }: ActionButtonsProps) {
  const [confirmed, setConfirmed] = useState(false)

  const handleAccept = () => {
    setConfirmed(true)
    onAccept?.()
  }

  return (
    <div className="mx-4 my-4">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3 px-1">Your Response</p>
      <div className="flex flex-col gap-2.5">

        {/* Confirmation hint */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            confirmed ? "max-h-10 opacity-100 mb-0.5" : "max-h-0 opacity-0"
          )}
        >
          <p className="text-[13px] font-medium text-primary px-1">
            Proceed to Lab Room 3
          </p>
        </div>

        {/* Primary - Accept Plan */}
        <button
          onClick={handleAccept}
          disabled={confirmed}
          className={cn(
            "flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl",
            "font-semibold text-base transition-all duration-300",
            confirmed
              ? [
                  "bg-primary/20 text-primary border border-primary/40 cursor-default",
                  "shadow-[0_0_24px_var(--glow)] animate-pulse-glow",
                ]
              : [
                  "bg-primary text-primary-foreground",
                  "shadow-[0_0_30px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.15)]",
                  "hover:shadow-[0_0_40px_var(--glow)] hover:scale-[1.02] active:scale-[0.98]",
                ]
          )}
        >
          <Check className={cn("w-5 h-5 transition-all duration-300", confirmed && "scale-110")} />
          {confirmed ? "Plan Confirmed" : "Accept Plan"}
        </button>

        {/* Secondary buttons row */}
        <div className="flex gap-2.5">
          <button
            onClick={onRequestChange}
            disabled={confirmed}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl",
              "bg-secondary border border-border/50 font-medium text-sm",
              "transition-all duration-300",
              confirmed
                ? "text-muted-foreground/40 cursor-default"
                : "text-foreground hover:border-primary/30 hover:bg-secondary/80 active:scale-[0.98]"
            )}
          >
            <RefreshCw className="w-4 h-4" />
            Request Change
          </button>

          <button
            onClick={onTalkToStaff}
            disabled={confirmed}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl",
              "bg-secondary border border-border/50 font-medium text-sm",
              "transition-all duration-300",
              confirmed
                ? "text-muted-foreground/40 cursor-default"
                : "text-foreground hover:border-primary/30 hover:bg-secondary/80 active:scale-[0.98]"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            Talk to Staff
          </button>
        </div>
      </div>
    </div>
  )
}
