"use client"

import { ChevronLeft, ChevronRight, RotateCcw, FastForward } from "lucide-react"
import { cn } from "@/lib/utils"
import { DEMO_STEP_ORDER, DemoStep } from "@/constants/demo"

interface DemoControlsProps {
  step: DemoStep
  onPrevious: () => void
  onNext: () => void
  onReset: () => void
  onSkipAnimation: () => void
  canSkipAnimation: boolean
}

export function DemoControls({
  step,
  onPrevious,
  onNext,
  onReset,
  onSkipAnimation,
  canSkipAnimation,
}: DemoControlsProps) {
  const index = DEMO_STEP_ORDER.indexOf(step)
  const canPrev = index > 0
  const canNext = index < DEMO_STEP_ORDER.length - 1

  return (
    <div className="fixed bottom-24 right-4 z-50 group">
      <div
        className={cn(
          "flex items-center gap-1 rounded-full bg-card/80 backdrop-blur-xl border border-border/60",
          "px-1.5 py-1.5 shadow-[0_0_20px_var(--glow)]",
          "opacity-25 transition-opacity duration-300",
          "hover:opacity-100 focus-within:opacity-100"
        )}
      >
        <button
          onClick={onPrevious}
          disabled={!canPrev}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-foreground transition-colors",
            canPrev ? "hover:bg-secondary" : "opacity-30 cursor-not-allowed"
          )}
          aria-label="Previous step"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-2 text-[10px] uppercase tracking-wider text-muted-foreground select-none whitespace-nowrap">
          {index + 1} / {DEMO_STEP_ORDER.length}
        </span>

        <button
          onClick={onNext}
          disabled={!canNext}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-foreground transition-colors",
            canNext ? "hover:bg-secondary" : "opacity-30 cursor-not-allowed"
          )}
          aria-label="Next step"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-border/60 mx-0.5" />

        <button
          onClick={onSkipAnimation}
          disabled={!canSkipAnimation}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-foreground transition-colors",
            canSkipAnimation ? "hover:bg-secondary" : "opacity-30 cursor-not-allowed"
          )}
          aria-label="Skip animation"
          title="Skip animation"
        >
          <FastForward className="w-4 h-4" />
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center w-8 h-8 rounded-full text-foreground hover:bg-secondary transition-colors"
          aria-label="Reset demo"
          title="Reset demo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
