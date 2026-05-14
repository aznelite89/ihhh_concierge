"use client"

import { useState, useEffect } from "react"
import { Bell, MapPin } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function PlanConfirmedScreen() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="px-4 py-10 flex flex-col items-center text-center gap-6 relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 animate-map-glow-pulse" />
      </div>

      {/* Large destination icon */}
      <div
        className={cn(
          "relative w-24 h-24 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center transition-all duration-700",
          "shadow-[0_0_40px_var(--glow)]",
          revealed ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
        <MapPin className="w-12 h-12 text-primary relative" strokeWidth={2.25} />
      </div>

      {/* Primary headline */}
      <div
        className={cn(
          "flex flex-col items-center gap-3 transition-all duration-700 delay-150",
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex items-center gap-2">
          <h1
            className="font-bold text-foreground leading-tight"
            style={{ fontSize: "32px" }}
          >
            Go to Lab Room 3
          </h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="You'll be told when Dr. Martinez is ready"
                className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-all hover:bg-primary/20 active:scale-95"
              >
                <Bell className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-sm px-3 py-2">
              We&apos;ll tell you when Dr. Martinez is ready.
            </TooltipContent>
          </Tooltip>
        </div>

        <p
          className="text-muted-foreground"
          style={{ fontSize: "20px" }}
        >
          Level 2 · Follow the blue line
        </p>
      </div>

      {/* Calm route preparing indicator */}
      <div
        className={cn(
          "flex items-center gap-2 mt-2 transition-all duration-700 delay-500",
          revealed ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="flex gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "0.9s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms", animationDuration: "0.9s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms", animationDuration: "0.9s" }}
          />
        </span>
        <span style={{ fontSize: "18px" }} className="text-muted-foreground">
          Preparing your route
        </span>
      </div>
    </div>
  )
}
