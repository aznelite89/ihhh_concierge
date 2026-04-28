"use client"

import { TrendingDown } from "lucide-react"

interface TimeOptimizationProps {
  originalWait: number
  newWait: number
}

export function TimeOptimization({ originalWait, newWait }: TimeOptimizationProps) {
  const timeSaved = originalWait - newWait
  
  return (
    <div className="mx-4 my-2">
      <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 shadow-[0_0_30px_var(--glow)]">
        {/* Decorative glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20 shadow-[0_0_12px_var(--glow)]">
              <TrendingDown className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">Time Optimization</span>
          </div>
          
          {/* Stats */}
          <div className="flex items-end justify-between">
            <div className="flex gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Original Wait</p>
                <p className="text-lg font-medium text-muted-foreground line-through decoration-muted-foreground/50">{originalWait} min</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">New Wait</p>
                <p className="text-lg font-semibold text-foreground">{newWait} min</p>
              </div>
            </div>
            
            {/* Time Saved - Highlight */}
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-primary mb-1">Time Saved</p>
              <p className="text-2xl font-bold text-primary drop-shadow-[0_0_12px_var(--glow)]">
                {timeSaved} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
