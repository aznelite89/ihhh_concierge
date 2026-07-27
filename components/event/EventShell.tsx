"use client"

import { ReactNode } from "react"
import { CalendarDays, MapPin } from "lucide-react"
import { Attendee, EventContent } from "@/constants/event"
import { ATTENDEE_ROLE_LABEL } from "@/constants/event"

interface EventShellProps {
  content: EventContent
  attendee?: Attendee | null
  children: ReactNode
}

export function EventShell({ content, attendee, children }: EventShellProps) {
  return (
    <div className="relative h-dvh max-w-md mx-auto flex flex-col bg-background overflow-hidden">
      <header className="z-10 bg-background border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-foreground tracking-tight truncate">
              {content.eventName}
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {content.eventTagline}
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live
          </div>
        </div>

        {attendee && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 text-primary text-sm font-semibold shrink-0">
                {attendee.seatId || "—"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {attendee.name}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {content.venue} · {content.venueDetail}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-medium shrink-0">
                {ATTENDEE_ROLE_LABEL[attendee.role]}
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar [scrollbar-gutter:stable]">
        {children}
      </main>
    </div>
  )
}
