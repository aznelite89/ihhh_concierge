"use client"

import { useState } from "react"
import { Check, Maximize2, Minimize2, Navigation } from "lucide-react"
import { Attendee, EventContent, MapView } from "@/constants/event"
import { applyTokens } from "@/utils/content"
import { assignedSeatIds } from "@/utils/attendees"
import { buildSeatDirections, getSeat } from "@/utils/seats"
import { LectureTheatreMap, MapLegend } from "./LectureTheatreMap"
import { cn } from "@/lib/utils"

interface SeatNavigationScreenProps {
  content: EventContent
  attendee: Attendee
  attendees: readonly Attendee[]
  onSeated: () => void
}

export function SeatNavigationScreen({
  content,
  attendee,
  attendees,
  onSeated
}: SeatNavigationScreenProps) {
  const [view, setView] = useState<MapView>(MapView.FOCUS)
  const seat = getSeat(attendee.seatId)
  const directions = seat ? buildSeatDirections(seat) : []

  return (
    <div className="px-4 py-5 flex flex-col gap-4 animate-fade-in-up">
      <div>
        <h2 className="text-xl font-bold text-foreground tracking-tight text-balance">
          {applyTokens(content.navigationTitle, { attendee, content })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1 text-pretty">
          {applyTokens(content.navigationHint, { attendee, content })}
        </p>
      </div>

      {/* Floor plan */}
      <div className="rounded-2xl bg-card border border-border/50 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            {content.venueDetail} · floor plan
          </span>
          <button
            onClick={() =>
              setView(v => (v === MapView.FOCUS ? MapView.FULL : MapView.FOCUS))
            }
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[11px] font-medium transition-colors hover:bg-secondary/70"
          >
            {view === MapView.FOCUS ? (
              <>
                <Maximize2 className="w-3 h-3" />
                Full map
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3" />
                Zoom to my seat
              </>
            )}
          </button>
        </div>

        <div className="overflow-hidden rounded-xl">
          <LectureTheatreMap
            highlightSeatId={attendee.seatId}
            assignedSeatIds={assignedSeatIds(attendees)}
            view={view}
          />
        </div>

        <MapLegend className="mt-3" />
      </div>

      {/* Walking directions */}
      {directions.length > 0 && (
        <div className="p-4 rounded-2xl bg-card border border-border/50 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Getting there
            </h3>
          </div>
          {directions.map((step, index) => (
            <div key={step.instruction} className="flex gap-3">
              <span
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold shrink-0",
                  index === directions.length - 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">
                  {step.instruction}
                </p>
                <p className="text-xs text-muted-foreground text-pretty">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onSeated}
        className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-[0_0_30px_var(--glow)] transition-all hover:shadow-[0_0_40px_var(--glow)] hover:scale-[1.02] active:scale-[0.98]"
      >
        <Check className="w-5 h-5" />
        {content.navigationCta}
      </button>
    </div>
  )
}
