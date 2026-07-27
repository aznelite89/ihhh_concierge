"use client"

import { useEffect, useState } from "react"
import { Check, Map as MapIcon } from "lucide-react"
import {
  Attendee,
  EventContent,
  MapView,
  PROGRAMME_TICK_MS
} from "@/constants/event"
import { applyTokens } from "@/utils/content"
import { assignedSeatIds } from "@/utils/attendees"
import { LectureTheatreMap } from "./LectureTheatreMap"
import { ProgrammeTimeline } from "./ProgrammeTimeline"

interface SeatedScreenProps {
  content: EventContent
  attendee: Attendee
  attendees: readonly Attendee[]
}

export function SeatedScreen({
  content,
  attendee,
  attendees
}: SeatedScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMap, setShowMap] = useState(false)

  // Demo pacing: the programme pointer walks forward so the presenter can show
  // "now / next" without waiting for the real clock.
  useEffect(() => {
    if (currentIndex >= content.programme.length - 1) return
    const timer = setTimeout(
      () => setCurrentIndex(i => Math.min(i + 1, content.programme.length - 1)),
      PROGRAMME_TICK_MS
    )
    return () => clearTimeout(timer)
  }, [currentIndex, content.programme.length])

  const current = content.programme[currentIndex]
  const next = content.programme[currentIndex + 1]

  return (
    <div className="px-4 py-5 flex flex-col gap-4 animate-fade-in-up">
      <div className="p-5 rounded-2xl bg-card border border-primary/30 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center animate-breathing-glow">
          <Check className="w-7 h-7 text-primary animate-check-scale-in" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground text-balance">
            {applyTokens(content.seatedTitle, { attendee, content })}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 text-pretty">
            {applyTokens(content.seatedMessage, { attendee, content })}
          </p>
        </div>
      </div>

      {current && (
        <div className="p-4 rounded-2xl bg-ai-bubble border border-primary/20">
          <p className="text-[11px] uppercase tracking-wider text-primary font-semibold">
            Now
          </p>
          <p className="text-base font-semibold text-foreground mt-1 text-pretty leading-snug">
            {current.title}
          </p>
          {current.detail && (
            <p className="text-xs text-muted-foreground mt-0.5">{current.detail}</p>
          )}
          {next && (
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
              <span className="text-foreground/80 font-medium">Next {next.time}</span>{" "}
              · {next.title}
            </p>
          )}
        </div>
      )}

      <div className="p-4 rounded-2xl bg-card border border-border/50">
        <h3 className="text-base font-semibold text-foreground mb-4">
          {applyTokens(content.planTitle, { attendee, content })}
        </h3>
        <ProgrammeTimeline
          items={content.programme}
          currentIndex={currentIndex}
        />
      </div>

      <button
        onClick={() => setShowMap(v => !v)}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-secondary text-secondary-foreground font-medium text-sm transition-colors hover:bg-secondary/70"
      >
        <MapIcon className="w-4 h-4" />
        {showMap ? "Hide seat map" : "Show my seat again"}
      </button>

      {showMap && (
        <div className="rounded-2xl bg-card border border-border/50 p-3 animate-fade-in-up">
          <div className="overflow-hidden rounded-xl">
            <LectureTheatreMap
              highlightSeatId={attendee.seatId}
              assignedSeatIds={assignedSeatIds(attendees)}
              view={MapView.FOCUS}
            />
          </div>
        </div>
      )}
    </div>
  )
}
