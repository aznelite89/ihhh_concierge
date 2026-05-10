"use client"

import { ReactNode } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatInput } from "@/components/chat-input"

interface PhoneShellProps {
  children: ReactNode
  showInput?: boolean
  onSendMessage?: (message: string) => void
  overlay?: ReactNode
}

export function PhoneShell({ children, showInput = true, onSendMessage, overlay }: PhoneShellProps) {
  return (
    <div className="relative h-dvh max-w-md mx-auto flex flex-col bg-background overflow-hidden">
      <ChatHeader
        patientName="Sarah Mitchell"
        appointmentInfo="General Checkup"
        appointmentTime="11:00 AM with Dr. Elena Martinez"
      />

      <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar [scrollbar-gutter:stable]">
        {children}
      </main>

      {overlay}

      {showInput && <ChatInput onSendMessage={onSendMessage} />}
    </div>
  )
}
