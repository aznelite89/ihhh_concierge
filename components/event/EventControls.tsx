"use client"

import { ChevronLeft, ChevronRight, RotateCcw, Settings2, Users } from "lucide-react"
import Link from "next/link"
import { Attendee, EVENT_STEP_ORDER, EventStep } from "@/constants/event"
import { cn } from "@/lib/utils"

interface EventControlsProps {
  step: EventStep
  attendees: readonly Attendee[]
  activeAttendeeId: string | null
  onPrevious: () => void
  onNext: () => void
  onReset: () => void
  onPickAttendee: (attendeeId: string) => void
}

/**
 * Presenter-only pill (low opacity until hovered). Lets whoever is running the
 * dry run jump steps and switch identity without retyping emails.
 */
export function EventControls({
  step,
  attendees,
  activeAttendeeId,
  onPrevious,
  onNext,
  onReset,
  onPickAttendee
}: EventControlsProps) {
  const index = EVENT_STEP_ORDER.indexOf(step)
  const canPrev = index > 0
  const canNext = index < EVENT_STEP_ORDER.length - 1 && Boolean(activeAttendeeId)

  return (
    <div className="fixed bottom-4 right-4 z-50">
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
          {index + 1} / {EVENT_STEP_ORDER.length}
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

        <label className="flex items-center gap-1 pl-1" title="Switch attendee">
          <Users className="w-4 h-4 text-muted-foreground" />
          <select
            value={activeAttendeeId ?? ""}
            onChange={e => onPickAttendee(e.target.value)}
            aria-label="Switch attendee"
            className="max-w-[7.5rem] bg-transparent text-[11px] text-foreground outline-none cursor-pointer"
          >
            <option value="">Pick attendee…</option>
            {attendees.map(a => (
              <option key={a.id} value={a.id} className="bg-card">
                {a.seatId || "—"} · {a.name}
              </option>
            ))}
          </select>
        </label>

        <div className="w-px h-5 bg-border/60 mx-0.5" />

        <button
          onClick={onReset}
          className="flex items-center justify-center w-8 h-8 rounded-full text-foreground hover:bg-secondary transition-colors"
          aria-label="Reset event flow"
          title="Reset event flow"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <Link
          href="/admin"
          className="flex items-center justify-center w-8 h-8 rounded-full text-foreground hover:bg-secondary transition-colors"
          aria-label="Open admin"
          title="Attendance list & event content"
        >
          <Settings2 className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
