"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, Check, TestTube, ArrowRight } from "lucide-react"

interface ActionCardProps {
  type: "reschedule" | "bloodtest" | "confirmed"
  title: string
  description: string
  time?: string
  systemLabel?: string
}

const cardConfig = {
  reschedule: {
    Icon: AlertTriangle,
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    glowColor: "shadow-[0_0_25px_theme(colors.amber.500/0.15)]",
    hoverGlow: "hover:shadow-[0_0_35px_theme(colors.amber.500/0.25)]",
    statusColor: "text-amber-400",
    statusBg: "bg-amber-500/10",
    defaultLabel: "Schedule Updated"
  },
  bloodtest: {
    Icon: TestTube,
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    glowColor: "shadow-[0_0_25px_var(--glow)]",
    hoverGlow: "hover:shadow-[0_0_40px_var(--glow)]",
    statusColor: "text-primary",
    statusBg: "bg-primary/10",
    defaultLabel: "Auto-Reserved"
  },
  confirmed: {
    Icon: Check,
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    glowColor: "shadow-[0_0_25px_theme(colors.emerald.500/0.15)]",
    hoverGlow: "hover:shadow-[0_0_35px_theme(colors.emerald.500/0.25)]",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-500/10",
    defaultLabel: "Confirmed"
  }
}

export function ActionCard({ type, title, description, time, systemLabel }: ActionCardProps) {
  const config = cardConfig[type]
  const { Icon } = config
  const label = systemLabel || config.defaultLabel
  
  return (
    <div className="mt-3 mb-2">
      <button 
        className={cn(
          "w-full p-4 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden",
          config.bgColor,
          config.borderColor,
          config.glowColor,
          config.hoverGlow,
          "hover:scale-[1.01] active:scale-[0.99]"
        )}
      >
        {/* Ripple effect container */}
        <span className="absolute inset-0 pointer-events-none">
          <span className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-100 bg-white/10 group-active:animate-ripple" />
        </span>

        {/* System label */}
        <div className="flex items-center justify-between mb-3 relative">
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium",
            config.statusBg,
            config.statusColor
          )}>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full animate-pulse", 
              config.iconColor.replace("text-", "bg-")
            )} />
            {label}
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
        
        <div className="flex items-start gap-3 relative">
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105",
            config.iconBg
          )}>
            <Icon className={cn("w-6 h-6 transition-transform group-hover:scale-110", config.iconColor)} />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-base font-semibold text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            {time && (
              <p className={cn("text-sm mt-2 font-semibold", config.statusColor)}>{time}</p>
            )}
          </div>
        </div>
      </button>
    </div>
  )
}
