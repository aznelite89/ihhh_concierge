"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Smartphone } from "lucide-react"
import { ADMIN_TAB_LABEL, AdminTab } from "@/constants/event"
import { useEventData } from "@/hooks/use-event-data"
import { AttendeeTable } from "./AttendeeTable"
import { EventContentEditor } from "./EventContentEditor"
import { ProgrammeEditor } from "./ProgrammeEditor"
import { cn } from "@/lib/utils"

const TABS: AdminTab[] = [AdminTab.ATTENDEES, AdminTab.PROGRAMME, AdminTab.CONTENT]

export function AdminApp() {
  const {
    attendees,
    content,
    hydrated,
    setAttendees,
    setContent,
    resetAttendees,
    resetContent
  } = useEventData()
  const [tab, setTab] = useState<AdminTab>(AdminTab.ATTENDEES)

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex flex-wrap items-center gap-3">
          <div className="mr-auto">
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Event console
            </h1>
            <p className="text-xs text-muted-foreground">
              {content.eventName} · {content.venue} {content.venueDetail}
            </p>
          </div>
          <Link
            href="/event"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <Smartphone className="w-4 h-4" />
            Open attendee view
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-5 flex gap-1">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-3.5 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {ADMIN_TAB_LABEL[t]}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-6">
        {!hydrated ? (
          <p className="text-sm text-muted-foreground">Loading saved data…</p>
        ) : tab === AdminTab.ATTENDEES ? (
          <AttendeeTable
            attendees={attendees}
            onChange={setAttendees}
            onReset={resetAttendees}
          />
        ) : tab === AdminTab.PROGRAMME ? (
          <ProgrammeEditor content={content} onChange={setContent} />
        ) : (
          <EventContentEditor
            content={content}
            onChange={setContent}
            onReset={resetContent}
          />
        )}

        <p className="mt-10 text-[11px] text-muted-foreground/70 text-pretty">
          Edits are stored in this browser only (no backend). Use Export CSV to
          share the attendance list, and Import CSV on another device to load it.
        </p>
      </main>
    </div>
  )
}
