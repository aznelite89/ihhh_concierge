"use client"

import { FormEvent, useState } from "react"
import { AlertCircle, ArrowRight, Mail, Sparkles } from "lucide-react"
import { Attendee, EventContent } from "@/constants/event"
import { findAttendeeByEmail } from "@/utils/attendees"
import { applyTokens } from "@/utils/content"
import { cn } from "@/lib/utils"

interface IdentifyScreenProps {
  content: EventContent
  attendees: readonly Attendee[]
  onIdentified: (attendee: Attendee) => void
}

export function IdentifyScreen({
  content,
  attendees,
  onIdentified
}: IdentifyScreenProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const match = findAttendeeByEmail(attendees, email)
    if (!match) {
      setError(applyTokens(content.identifyNotFound, { content }))
      return
    }
    setError(null)
    onIdentified(match)
  }

  return (
    <div className="px-5 py-8 flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col items-center text-center gap-3 pt-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-ai-glow">
          <Sparkles className="w-8 h-8 text-primary animate-spark-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight text-balance">
          {applyTokens(content.identifyTitle, { content })}
        </h2>
        <p className="text-sm text-muted-foreground text-pretty max-w-[18rem]">
          {applyTokens(content.identifySubtitle, { content })}
        </p>
      </div>

      {/* noValidate: the supplied list carries trailing semicolons, which native
          email validation would reject before normalizeEmail can clean them. */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
        <label
          htmlFor="attendee-email"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          {content.identifyInputLabel}
        </label>

        <div
          className={cn(
            "flex items-center gap-3 px-4 rounded-2xl bg-input border transition-colors",
            error ? "border-destructive/60" : "border-border focus-within:border-primary/60"
          )}
        >
          <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            id="attendee-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              if (error) setError(null)
            }}
            placeholder="name@ihhhealthcare.com"
            suppressHydrationWarning
            className="flex-1 bg-transparent py-4 text-base text-foreground placeholder:text-muted-foreground/60 outline-none"
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 animate-fade-in-up">
            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/90 text-pretty">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={email.trim().length === 0}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-semibold text-base transition-all",
            email.trim().length === 0
              ? "bg-secondary text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground shadow-[0_0_30px_var(--glow)] hover:shadow-[0_0_40px_var(--glow)] hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {content.identifyCta}
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <p className="text-center text-[11px] text-muted-foreground/70 text-pretty">
        Your details are used only to show your seat for this event.
      </p>
    </div>
  )
}
