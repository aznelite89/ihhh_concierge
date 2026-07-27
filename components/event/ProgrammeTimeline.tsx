"use client"

import { Check } from "lucide-react"
import { ProgrammeItem } from "@/constants/event"
import { cn } from "@/lib/utils"

interface ProgrammeTimelineProps {
  items: readonly ProgrammeItem[]
  /** Index of the item happening now. -1 (default) shows the plan with no pointer. */
  currentIndex?: number
  className?: string
}

export function ProgrammeTimeline({
  items,
  currentIndex = -1,
  className
}: ProgrammeTimelineProps) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, index) => {
        const isDone = currentIndex > index
        const isCurrent = currentIndex === index
        const isLast = index === items.length - 1

        return (
          <li key={item.id} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <span
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors",
                  isCurrent
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_0_16px_var(--glow)]"
                    : isDone
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-border bg-card text-transparent"
                )}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isCurrent ? "bg-primary-foreground animate-pulse" : "bg-muted-foreground/50"
                    )}
                  />
                )}
              </span>
              {!isLast && (
                <span
                  className={cn(
                    "w-px flex-1 my-1",
                    isDone ? "bg-primary/40" : "bg-border"
                  )}
                />
              )}
            </div>

            <div className={cn("flex-1 pb-5", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-xs font-semibold tabular-nums tracking-wide",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.time}
              </p>
              <p
                className={cn(
                  "text-sm text-pretty leading-snug mt-0.5",
                  isCurrent
                    ? "text-foreground font-semibold"
                    : isDone
                      ? "text-muted-foreground"
                      : "text-foreground/90 font-medium"
                )}
              >
                {item.title}
              </p>
              {item.detail && (
                <p className="text-xs text-muted-foreground mt-0.5 text-pretty">
                  {item.detail}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
