"use client"

import { ChevronLeft, Bell } from "lucide-react"

interface ChatHeaderProps {
  patientName: string
  appointmentInfo: string
  appointmentTime: string
}

export function ChatHeader({ patientName, appointmentInfo, appointmentTime }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-3">
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-foreground transition-colors hover:bg-secondary">
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex-1 text-center px-4">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            {patientName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {appointmentInfo}
          </p>
        </div>
        
        <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-foreground transition-colors hover:bg-secondary">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--glow)]" />
        </button>
      </div>
      
      {/* Appointment Card */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Today&apos;s Appointment</p>
            <p className="text-xs text-muted-foreground truncate">{appointmentTime}</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Active
          </div>
        </div>
      </div>
    </header>
  )
}
