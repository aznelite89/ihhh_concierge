"use client"

import { Activity, Clock, Zap, FlaskConical } from "lucide-react"

interface HospitalStatusProps {
  doctorDelay: number
  queueOptimized: boolean
  labRoom: string
  waitSaved: number
}

export function HospitalStatus({ doctorDelay, queueOptimized, labRoom, waitSaved }: HospitalStatusProps) {
  return (
    <div className="mx-4 mt-4">
      <div className="relative p-4 rounded-2xl bg-card/60 backdrop-blur-xl border border-primary/20 shadow-[0_0_40px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.05)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/20">
              <Activity className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">Live Hospital Status</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_theme(colors.emerald.400)]" />
            <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Active</span>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Doctor Delay */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/10">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Doctor Delay</p>
              <p className="text-sm font-semibold text-amber-400">+{doctorDelay} min</p>
            </div>
          </div>
          
          {/* Queue Optimized */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Queue Optimized</p>
              <p className="text-sm font-semibold text-primary">{queueOptimized ? "YES" : "NO"}</p>
            </div>
          </div>
          
          {/* Lab Reserved */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <FlaskConical className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lab Reserved</p>
              <p className="text-sm font-semibold text-foreground">{labRoom}</p>
            </div>
          </div>
          
          {/* Time Saved */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Wait Saved</p>
              <p className="text-sm font-semibold text-emerald-400">{waitSaved} min</p>
            </div>
          </div>
        </div>

        {/* Scale Indicator */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <p className="text-[11px] text-muted-foreground/70">
            Patients optimized today: <span className="text-muted-foreground font-medium">184</span>
          </p>
        </div>
      </div>
    </div>
  )
}
