"use client"

import { ArmchairIcon, ArrowRight, Sparkles } from "lucide-react"
import { Attendee, EventContent, SEAT_ZONE_LABEL } from "@/constants/event"
import { applyTokens } from "@/utils/content"
import { getSeat, blockLabel, ordinal } from "@/utils/seats"
import { ProgrammeTimeline } from "./ProgrammeTimeline"

interface TodaysPlanScreenProps {
  content: EventContent
  attendee: Attendee
  onFindSeat: () => void
}

export function TodaysPlanScreen({
  content,
  attendee,
  onFindSeat
}: TodaysPlanScreenProps) {
  const seat = getSeat(attendee.seatId)

  return (
    <div className="px-4 py-5 flex flex-col gap-4 animate-fade-in-up">
      {/* Concierge greeting */}
      <div className="flex gap-2.5">
        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 p-3.5 rounded-2xl rounded-tl-sm bg-ai-bubble border border-primary/15">
          <p className="text-sm text-foreground/95 text-pretty leading-relaxed">
            {applyTokens(content.planGreeting, { attendee, content })}
          </p>
        </div>
      </div>

      {/* Seat card */}
      <div className="p-4 rounded-2xl bg-card border border-primary/25 shadow-[0_0_24px_var(--glow)]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shrink-0">
            <span className="text-[10px] uppercase tracking-wider opacity-70">
              Seat
            </span>
            <span className="text-xl font-bold leading-none">
              {attendee.seatId || "—"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {seat ? `Row ${seat.row}, ${blockLabel(seat.block)}` : "Seat not assigned"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 text-pretty">
              {seat
                ? `${SEAT_ZONE_LABEL[seat.zone]} · ${ordinal(seat.rowFromFront)} row from the front`
                : "Please check in at the registration desk."}
            </p>
          </div>
        </div>

        {seat && (
          <button
            onClick={onFindSeat}
            className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArmchairIcon className="w-4 h-4" />
            Take me to my seat
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Programme */}
      <div className="p-4 rounded-2xl bg-card border border-border/50">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-foreground">
            {applyTokens(content.planTitle, { attendee, content })}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {applyTokens(content.planSubtitle, { attendee, content })}
          </p>
        </div>
        <ProgrammeTimeline items={content.programme} />
      </div>
    </div>
  )
}
