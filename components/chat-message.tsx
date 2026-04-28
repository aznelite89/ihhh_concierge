"use client"

import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: string
  isAI?: boolean
  timestamp?: string
  showAvatar?: boolean
  isSystemBackground?: boolean
}

export function ChatMessage({ message, isAI = false, timestamp, showAvatar = true, isSystemBackground = false }: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3", isAI ? "justify-start" : "justify-end", isSystemBackground && "opacity-70")}>
      {isAI && showAvatar && (
        <div className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center",
          isSystemBackground ? "shadow-[0_0_12px_var(--glow)]" : "shadow-[0_0_20px_var(--glow)]"
        )}>
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </div>
      )}
      {isAI && !showAvatar && <div className="w-9 flex-shrink-0" />}
      
      <div className={cn("max-w-[80%] flex flex-col gap-1", !isAI && "items-end")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-base leading-relaxed",
            isAI && !isSystemBackground && "bg-ai-bubble border border-primary/20 text-foreground rounded-tl-md shadow-[0_0_30px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.05)]",
            isAI && isSystemBackground && "bg-ai-bubble/50 border border-primary/10 text-foreground/80 rounded-tl-md shadow-[0_0_14px_var(--glow)] italic text-sm",
            !isAI && "bg-user-bubble text-foreground rounded-tr-md"
          )}
        >
          {message}
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground px-1">{timestamp}</span>
        )}
      </div>
      
      {!isAI && showAvatar && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-foreground">
          S
        </div>
      )}
      {!isAI && !showAvatar && <div className="w-9 flex-shrink-0" />}
    </div>
  )
}
