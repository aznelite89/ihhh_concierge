"use client"

import { Activity, Clock, Sparkles, Zap, ArrowRight } from "lucide-react"

const stats = [
  {
    label: "Patients optimized today",
    value: "184",
    Icon: Activity,
    accent: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Average wait time saved",
    value: "25 min",
    Icon: Clock,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "AI actions taken",
    value: "42",
    Icon: Sparkles,
    accent: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Queue optimized",
    value: "Yes",
    Icon: Zap,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
]

const liveEvents = [
  "Sarah Mitchell rerouted to Lab A",
  "Blood test reserved automatically",
  "Doctor delay detected",
  "Patient wait reduced by 25 min",
]

export function CEODashboardScreen() {
  return (
    <div className="px-4 py-6 flex flex-col gap-5 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-primary/80 mb-1">
            IHHH Singapore
          </p>
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            Hospital Operations
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_theme(colors.emerald.400)]" />
          <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, Icon, accent, bg, border }) => (
          <div
            key={label}
            className={`p-4 rounded-2xl bg-card/60 backdrop-blur-xl border ${border} shadow-[0_0_24px_var(--glow)]`}
          >
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-xl ${bg} mb-3`}
            >
              <Icon className={`w-4.5 h-4.5 ${accent}`} />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 leading-tight">
              {label}
            </p>
            <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/15">
              <Activity className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Live events
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Real-time
          </span>
        </div>

        <ul className="divide-y divide-border/30">
          {liveEvents.map((event, idx) => (
            <li
              key={event}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/30"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_6px_var(--glow)]"
                style={{ animationDelay: `${idx * 200}ms` }}
              />
              <span className="flex-1 text-sm text-foreground">{event}</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[11px] text-muted-foreground/60 text-center">
        IHHH AI Concierge · CEO demo
      </p>
    </div>
  )
}
