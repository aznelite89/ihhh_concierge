"use client"

import { useEffect, useState } from "react"
import { FileText, MessageSquare, Mic, Navigation, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  CompanionAction,
  CompanionState,
  COMPANION_APPEAR_DURATION_MS,
  COMPANION_DEFAULT_MESSAGE,
  COMPANION_LABEL_DURATION_MS,
  COMPANION_SPEECH_DURATION_MS,
} from "@/constants/demo"

interface FloatingCompanionProps {
  visible: boolean
  message?: string
  onAction?: (action: CompanionAction) => void
  className?: string
}

const QUICK_ACTIONS: ReadonlyArray<{
  id: CompanionAction
  label: string
  icon: typeof FileText
}> = [
  { id: CompanionAction.EXPLAIN_PLAN, label: "Explain my plan", icon: FileText },
  { id: CompanionAction.GUIDE_ME, label: "Guide me there", icon: Navigation },
  { id: CompanionAction.TALK_TO_STAFF, label: "Talk to staff", icon: MessageSquare },
]

export function FloatingCompanion({
  visible,
  message = COMPANION_DEFAULT_MESSAGE,
  onAction,
  className,
}: FloatingCompanionProps) {
  const [state, setState] = useState<CompanionState>(CompanionState.HIDDEN)
  const [labelVisible, setLabelVisible] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    if (!visible) {
      setState(CompanionState.HIDDEN)
      setLabelVisible(false)
      setPanelOpen(false)
      return
    }

    setState(CompanionState.APPEARING)
    setLabelVisible(true)
    setPanelOpen(false)

    const speakingTimer = setTimeout(
      () => setState(CompanionState.SPEAKING),
      COMPANION_APPEAR_DURATION_MS
    )
    const labelTimer = setTimeout(
      () => setLabelVisible(false),
      COMPANION_LABEL_DURATION_MS
    )
    const idleTimer = setTimeout(
      () => setState(CompanionState.IDLE),
      COMPANION_APPEAR_DURATION_MS + COMPANION_SPEECH_DURATION_MS
    )

    return () => {
      clearTimeout(speakingTimer)
      clearTimeout(labelTimer)
      clearTimeout(idleTimer)
    }
  }, [visible])

  if (state === CompanionState.HIDDEN) return null

  const isAppearing = state === CompanionState.APPEARING
  const isSpeaking = state === CompanionState.SPEAKING
  const showBubble = isSpeaking && !panelOpen
  const showLabel = labelVisible && !panelOpen

  const togglePanel = () => {
    setPanelOpen(open => !open)
    setLabelVisible(false)
  }

  const handleActionClick = (action: CompanionAction) => {
    onAction?.(action)
  }

  return (
    <div
      className={cn(
        "absolute bottom-28 right-4 z-40 flex flex-col items-end gap-2 pointer-events-none",
        className
      )}
    >
      {showBubble && (
        <div className="pointer-events-none mr-1 max-w-[230px] animate-fade-in-up">
          <div className="relative rounded-2xl rounded-br-sm bg-card/90 backdrop-blur-xl border border-border/60 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_24px_var(--glow)]">
            <p className="text-[12.5px] leading-snug text-foreground/95">
              {message}
            </p>
            <div className="absolute -bottom-[5px] right-3 w-2.5 h-2.5 rotate-45 bg-card/90 border-r border-b border-border/60" />
          </div>
        </div>
      )}

      {panelOpen && (
        <div className="pointer-events-auto w-[260px] origin-bottom-right animate-fade-in-up">
          <div className="rounded-2xl bg-card/90 backdrop-blur-xl border border-border/60 shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_30px_var(--glow)] overflow-hidden">
            <div className="px-4 pt-3.5 pb-2.5 flex items-start justify-between gap-2 border-b border-border/40">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                  <p className="text-[13px] font-semibold text-foreground tracking-tight">
                    Patient Companion
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Voice guidance available
                </p>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                className="flex items-center justify-center w-6 h-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                aria-label="Close companion panel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="px-3 py-2.5 flex flex-col gap-1.5">
              {QUICK_ACTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleActionClick(id)}
                  className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-secondary/40 hover:bg-secondary/80 border border-border/40 hover:border-primary/30 transition-all text-left"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[12.5px] font-medium text-foreground">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <div className="px-3">
              <button
                onClick={() => handleActionClick(CompanionAction.SPEAK)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/30 hover:border-primary/50 transition-all"
              >
                <Mic className="w-4 h-4 text-primary" />
                <span className="text-[12.5px] font-semibold text-primary">
                  Speak instead of typing
                </span>
              </button>
            </div>

            <div className="px-4 pt-2.5 pb-3">
              <p className="text-[10.5px] text-muted-foreground/80 leading-snug text-center">
                Designed for patients who prefer voice guidance.
              </p>
            </div>
          </div>
        </div>
      )}

      {showLabel && (
        <span className="pointer-events-none text-[10px] uppercase tracking-wider text-primary/80 font-medium animate-fade-in-up">
          Companion available
        </span>
      )}

      <button
        onClick={togglePanel}
        className={cn(
          "pointer-events-auto relative flex items-center justify-center w-16 h-16 rounded-full",
          "bg-card/70 backdrop-blur-xl border border-border/60",
          "transition-all duration-500",
          isAppearing
            ? "opacity-0 scale-75"
            : "opacity-100 scale-100",
          isSpeaking
            ? "shadow-[0_0_36px_oklch(0.72_0.14_175/0.55),inset_0_0_18px_oklch(0.72_0.14_175/0.1)]"
            : "shadow-[0_0_22px_oklch(0.72_0.14_175/0.3),inset_0_0_12px_oklch(0.72_0.14_175/0.06)]",
          "hover:scale-105 active:scale-95",
          !isAppearing && "animate-breathing-glow"
        )}
        aria-label="Open patient companion"
        aria-pressed={panelOpen}
      >
        <span className="relative flex items-center justify-center w-11 h-11 rounded-full overflow-hidden">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/45 via-primary/15 to-transparent" />
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,oklch(0.85_0.1_175/0.7),transparent_60%)]" />
          <svg
            viewBox="0 0 24 24"
            className="relative w-6 h-6 text-foreground/90"
            aria-hidden="true"
          >
            <circle cx="9" cy="10.5" r="1.1" fill="currentColor" />
            <circle cx="15" cy="10.5" r="1.1" fill="currentColor" />
            <path
              d="M8.6 14.6 Q12 16.6 15.4 14.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>

        {isSpeaking && (
          <span
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-2.5"
            aria-hidden="true"
          >
            <span className="w-0.5 h-1 rounded-full bg-primary animate-pulse [animation-delay:0ms]" />
            <span className="w-0.5 h-2 rounded-full bg-primary animate-pulse [animation-delay:120ms]" />
            <span className="w-0.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:240ms]" />
            <span className="w-0.5 h-2 rounded-full bg-primary animate-pulse [animation-delay:360ms]" />
          </span>
        )}
      </button>
    </div>
  )
}
