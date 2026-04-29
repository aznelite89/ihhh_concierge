"use client"

import { useState } from "react"
import { Mic, Send, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage?: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-background border-t border-border/50 p-4 pb-8">
      <div className="flex items-end gap-3">
        {/* Plus button */}
        <button className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-secondary text-muted-foreground transition-all hover:bg-secondary/80 hover:text-foreground">
          <Plus className="w-5 h-5" />
        </button>
        
        {/* Input container */}
        <div className="flex-1 flex items-end gap-2 p-2 pl-4 rounded-3xl bg-input border border-border/50 focus-within:border-primary/50 focus-within:shadow-[0_0_20px_var(--glow)] transition-all">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message your assistant..."
            rows={1}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base resize-none outline-none py-2 max-h-32 leading-normal"
            style={{ height: "auto" }}
          />
          
          {/* Mic button */}
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={cn(
              "flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-all",
              isRecording 
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_var(--glow)] animate-pulse" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
        
        {/* Send button */}
        <button 
          onClick={handleSend}
          disabled={!message.trim()}
          className={cn(
            "flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full transition-all",
            message.trim() 
              ? "bg-primary text-primary-foreground shadow-[0_0_20px_var(--glow)]" 
              : "bg-secondary text-muted-foreground"
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      
      {/* Safe area indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-foreground/20" />
    </div>
  )
}
