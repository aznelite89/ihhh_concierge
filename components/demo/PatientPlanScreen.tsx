"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { ChatMessage } from "@/components/chat-message"
import { ActionCard } from "@/components/action-card"
import { TimeOptimization } from "@/components/time-optimization"
import { ActionButtons } from "@/components/action-buttons"
import { TypingIndicator } from "./TypingIndicator"
import { cn } from "@/lib/utils"
import {
  ActionCardType,
  PATIENT_PLAN_TIMELINE,
  PatientPlanItem,
} from "@/constants/demo"

interface PatientPlanScreenProps {
  skipAnimation: boolean
  onAcceptPlan: () => void
  onRequestChange?: () => void
  onTalkToStaff?: () => void
}

const ALL_ITEM_IDS: PatientPlanItem[] = PATIENT_PLAN_TIMELINE.map(t => t.id)

export function PatientPlanScreen({
  skipAnimation,
  onAcceptPlan,
  onRequestChange,
  onTalkToStaff,
}: PatientPlanScreenProps) {
  const [revealed, setRevealed] = useState<Set<PatientPlanItem>>(() =>
    skipAnimation ? new Set(ALL_ITEM_IDS) : new Set()
  )
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (skipAnimation) {
      setRevealed(new Set(ALL_ITEM_IDS))
      return
    }
    const timers = PATIENT_PLAN_TIMELINE.map(({ id, delayMs }) =>
      setTimeout(() => {
        setRevealed(prev => {
          if (prev.has(id)) return prev
          const next = new Set(prev)
          next.add(id)
          return next
        })
      }, delayMs)
    )
    return () => timers.forEach(clearTimeout)
  }, [skipAnimation])

  useEffect(() => {
    if (revealed.size === 0) return
    const id = requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    })
    return () => cancelAnimationFrame(id)
  }, [revealed])

  const has = (id: PatientPlanItem) => revealed.has(id)
  const showTyping1 = has(PatientPlanItem.TYPING_1) && !has(PatientPlanItem.MONITORING)
  const showTyping2 = has(PatientPlanItem.TYPING_2) && !has(PatientPlanItem.DELAY_MESSAGE)

  return (
    <div className="px-4 py-6 flex flex-col gap-3">
      {showTyping1 && <TypingIndicator />}

      {has(PatientPlanItem.MONITORING) && (
        <Reveal>
          <ChatMessage
            message="Monitoring detected a scheduling conflict. Optimizing your visit now."
            isAI
            timestamp="10:41 AM"
            isSystemBackground
          />
        </Reveal>
      )}

      {showTyping2 && <TypingIndicator />}

      {has(PatientPlanItem.DELAY_MESSAGE) && (
        <Reveal>
          <ChatMessage
            message="Sarah, Dr. Martinez is delayed 15 minutes. Adjusting your visit sequence now."
            isAI
            timestamp="10:42 AM"
          />
        </Reveal>
      )}

      {has(PatientPlanItem.DELAY_CARD) && (
        <Reveal className="rounded-2xl animate-ring-flash-amber">
          <ActionCard
            type={ActionCardType.RESCHEDULE}
            title="Appointment Delayed"
            description="Dr. Martinez will see you at 11:15 AM instead of 11:00 AM"
            time="New time: 11:15 AM"
            systemLabel="Doctor Schedule Updated"
          />
        </Reveal>
      )}

      {has(PatientPlanItem.REORDER_MESSAGE) && (
        <Reveal>
          <ChatMessage
            message="Reordered your visit to reduce waiting time. Blood test moved first."
            isAI
            timestamp="10:42 AM"
            showAvatar={false}
          />
        </Reveal>
      )}

      {has(PatientPlanItem.BLOODTEST_CARD) && (
        <Reveal className="rounded-2xl animate-ring-flash-success">
          <ActionCard
            type={ActionCardType.BLOODTEST}
            title="Blood Test Scheduled"
            description="Lab Room 3, Second Floor. Fasting protocol confirmed."
            time="Starting now"
            systemLabel="Lab Reserved Automatically"
          />
        </Reveal>
      )}

      {has(PatientPlanItem.TIME_OPTIMIZATION) && (
        <Reveal className="-mx-4">
          <TimeOptimization originalWait={45} newWait={20} />
        </Reveal>
      )}

      {has(PatientPlanItem.ACTION_BUTTONS) && (
        <Reveal className="-mx-4 animate-button-pulse-once">
          <ActionButtons
            onAccept={onAcceptPlan}
            onRequestChange={onRequestChange}
            onTalkToStaff={onTalkToStaff}
          />
        </Reveal>
      )}

      <div ref={bottomRef} aria-hidden className="h-1" />
    </div>
  )
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("animate-fade-in-up", className)}>{children}</div>
}
