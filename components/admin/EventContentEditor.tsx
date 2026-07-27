"use client"

import { RotateCcw } from "lucide-react"
import { CONTENT_TOKEN_HINTS, EventContent } from "@/constants/event"
import { cn } from "@/lib/utils"

interface EventContentEditorProps {
  content: EventContent
  onChange: (next: EventContent) => void
  onReset: () => void
}

type CopyField = Exclude<keyof EventContent, "programme">

interface FieldSpec {
  key: CopyField
  label: string
  hint?: string
  multiline?: boolean
}

const SECTIONS: ReadonlyArray<{ title: string; fields: FieldSpec[] }> = [
  {
    title: "Event details",
    fields: [
      { key: "eventName", label: "Event name" },
      { key: "eventTagline", label: "Organisation / tagline" },
      { key: "eventDate", label: "Event date" },
      { key: "venue", label: "Venue" },
      { key: "venueDetail", label: "Room / area" }
    ]
  },
  {
    title: "1 · Check in",
    fields: [
      { key: "identifyTitle", label: "Headline" },
      { key: "identifySubtitle", label: "Sub-line", multiline: true },
      { key: "identifyInputLabel", label: "Field label" },
      { key: "identifyCta", label: "Button" },
      {
        key: "identifyNotFound",
        label: "Email not on the list",
        multiline: true
      }
    ]
  },
  {
    title: "2 · Today's Plan",
    fields: [
      { key: "planGreeting", label: "Concierge greeting", multiline: true },
      { key: "planTitle", label: "Programme heading" },
      { key: "planSubtitle", label: "Programme sub-line" }
    ]
  },
  {
    title: "3 · Find my seat",
    fields: [
      { key: "navigationTitle", label: "Headline" },
      { key: "navigationHint", label: "Sub-line", multiline: true },
      { key: "navigationCta", label: "Button" }
    ]
  },
  {
    title: "4 · Seated",
    fields: [
      { key: "seatedTitle", label: "Headline" },
      { key: "seatedMessage", label: "Message", multiline: true }
    ]
  }
]

export function EventContentEditor({
  content,
  onChange,
  onReset
}: EventContentEditorProps) {
  const set = (key: CopyField, value: string) =>
    onChange({ ...content, [key]: value })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start gap-3">
        <div className="mr-auto">
          <h2 className="text-lg font-semibold text-foreground">
            Event journey copy
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Every line an attendee sees, in the order they see it. Changes save
            instantly and apply to open /event tabs.
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium transition-colors hover:bg-secondary/70"
        >
          <RotateCcw className="w-4 h-4" />
          Reset copy
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-3">
        <p className="text-xs font-semibold text-foreground mb-2">
          Placeholders you can use in any field
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {CONTENT_TOKEN_HINTS.map(({ token, meaning }) => (
            <span key={token} className="text-[11px] text-muted-foreground">
              <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono">
                {token}
              </code>{" "}
              {meaning}
            </span>
          ))}
        </div>
      </div>

      {SECTIONS.map(section => (
        <section key={section.title} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground border-b border-border/60 pb-2">
            {section.title}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.fields.map(field => (
              <label
                key={field.key}
                className={cn(
                  "flex flex-col gap-1.5",
                  field.multiline && "sm:col-span-2"
                )}
              >
                <span className="text-xs font-medium text-muted-foreground">
                  {field.label}
                </span>
                {field.multiline ? (
                  <textarea
                    value={content[field.key]}
                    onChange={e => set(field.key, e.target.value)}
                    rows={2}
                    suppressHydrationWarning
                    className={inputClass}
                  />
                ) : (
                  <input
                    value={content[field.key]}
                    onChange={e => set(field.key, e.target.value)}
                    suppressHydrationWarning
                    className={inputClass}
                  />
                )}
              </label>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const inputClass =
  "w-full px-3 py-2.5 rounded-lg bg-input border border-border text-sm text-foreground outline-none focus:border-primary/60 transition-colors resize-y"
