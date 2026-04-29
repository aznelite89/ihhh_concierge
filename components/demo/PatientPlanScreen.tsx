"use client"

import { ChatMessage } from "@/components/chat-message"
import { ActionCard } from "@/components/action-card"
import { TimeOptimization } from "@/components/time-optimization"
import { ActionButtons } from "@/components/action-buttons"
import { ActionCardType } from "@/constants/demo"

interface PatientPlanScreenProps {
  onAcceptPlan: () => void
  onRequestChange?: () => void
  onTalkToStaff?: () => void
}

export function PatientPlanScreen({
  onAcceptPlan,
  onRequestChange,
  onTalkToStaff,
}: PatientPlanScreenProps) {
  return (
    <div className="px-4 py-6 flex flex-col gap-3 animate-fade-in-up">
      <ChatMessage
        message="Monitoring detected a scheduling conflict. Optimizing your visit now."
        isAI
        timestamp="10:41 AM"
        isSystemBackground
      />

      <ChatMessage
        message="Sarah, Dr. Martinez is delayed 15 minutes. Adjusting your visit sequence now."
        isAI
        timestamp="10:42 AM"
      />

      <ActionCard
        type={ActionCardType.RESCHEDULE}
        title="Appointment Delayed"
        description="Dr. Martinez will see you at 11:15 AM instead of 11:00 AM"
        time="New time: 11:15 AM"
        systemLabel="Doctor Schedule Updated"
      />

      <ChatMessage
        message="Reordered your visit to reduce waiting time. Blood test moved first."
        isAI
        timestamp="10:42 AM"
        showAvatar={false}
      />

      <ActionCard
        type={ActionCardType.BLOODTEST}
        title="Blood Test Scheduled"
        description="Lab Room 3, Second Floor. Fasting protocol confirmed."
        time="Starting now"
        systemLabel="Lab Reserved Automatically"
      />

      <div className="-mx-4">
        <TimeOptimization originalWait={45} newWait={20} />
      </div>

      <div className="-mx-4">
        <ActionButtons
          onAccept={onAcceptPlan}
          onRequestChange={onRequestChange}
          onTalkToStaff={onTalkToStaff}
        />
      </div>
    </div>
  )
}
