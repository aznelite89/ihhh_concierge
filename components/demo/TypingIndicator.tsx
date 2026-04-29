"use client"

import { cn } from "@/lib/utils"

interface TypingIndicatorProps {
  label?: string
  variant?: "default" | "minimal"
}

export function TypingIndicator({
  label = "MedAssist is monitoring your visit...",
  variant = "default"
}: TypingIndicatorProps) {
  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-2 animate-fade-in-up">
        <div className="flex gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "0.7s" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
            style={{ animationDelay: "100ms", animationDuration: "0.7s" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
            style={{ animationDelay: "200ms", animationDuration: "0.7s" }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 animate-fade-in-up">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_14px_var(--glow)] animate-breathing-glow relative">
        {/* Subtle ring pulse */}
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
        <svg
          className="w-5 h-5 text-primary animate-spark-pulse relative"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
          />
        </svg>
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-ai-bubble border border-primary/20 shadow-[0_0_18px_var(--glow)] flex items-center gap-2.5 transition-all hover:shadow-[0_0_25px_var(--glow)]">
        <span className="flex gap-1">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "0.7s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "100ms", animationDuration: "0.7s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "200ms", animationDuration: "0.7s" }}
          />
        </span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}
