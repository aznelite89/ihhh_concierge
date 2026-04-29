"use client"

import { cn } from "@/lib/utils"
import { Sparkles, Check } from "lucide-react"

interface AIActionCardProps {
  title?: string
  subtitle?: string
  status?: string
  className?: string
}

export function AIActionCard({
  title = "AI scheduled your blood test",
  subtitle = "Optimized to reduce your waiting time",
  status = "Confirmed",
  className,
}: AIActionCardProps) {
  return (
    <div className={cn("p-1", className)}>
      {/* Outer glow container */}
      <div className="relative animate-fade-in-up">
        {/* Animated border glow */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-75 blur-[2px] animate-border-glow" />
        
        {/* Main card with glassmorphism */}
        <div className="relative rounded-3xl bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-xl border border-primary/20 overflow-hidden animate-ai-glow">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer pointer-events-none" />
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative p-5">
            {/* Header with AI badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* AI Spark icon with pulse animation */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-md animate-pulse" />
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30">
                    <Sparkles className="w-4 h-4 text-primary animate-spark-pulse" />
                  </div>
                </div>
                <span className="text-xs font-medium text-primary/90 uppercase tracking-wider">AI Action</span>
              </div>
              
              {/* Status badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
                  <Check className="relative w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-emerald-400">{status}</span>
              </div>
            </div>
            
            {/* Main content */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground leading-tight">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            </div>
            
            {/* Bottom accent line */}
            <div className="mt-5 pt-4 border-t border-primary/10">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
                <span className="text-[10px] text-muted-foreground/70 uppercase tracking-widest font-medium">Automated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
