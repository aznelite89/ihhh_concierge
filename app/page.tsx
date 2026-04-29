"use client"

import { useState } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ActionCard } from "@/components/action-card"
import { HospitalStatus } from "@/components/hospital-status"
import { TimeOptimization } from "@/components/time-optimization"
import { ActionButtons } from "@/components/action-buttons"
import { AIActionCard } from "@/components/ai-action-card"

interface Message {
  id: number
  text: string
  isAI: boolean
  timestamp: string
  action?: {
    type: "reschedule" | "bloodtest" | "confirmed"
    title: string
    description: string
    time?: string
    systemLabel?: string
  }
  showTimeOptimization?: boolean
  showActionButtons?: boolean
  isSystemBackground?: boolean
}

const initialMessages: Message[] = [
  {
    id: 0,
    text: "Monitoring detected a scheduling conflict. Optimizing your visit now.",
    isAI: true,
    timestamp: "10:41 AM",
    isSystemBackground: true,
  },
  {
    id: 1,
    text: "Sarah, Dr. Martinez is delayed 15 minutes. Adjusting your visit sequence now.",
    isAI: true,
    timestamp: "10:42 AM",
    action: {
      type: "reschedule",
      title: "Appointment Delayed",
      description: "Dr. Martinez will see you at 11:15 AM instead of 11:00 AM",
      time: "New time: 11:15 AM",
      systemLabel: "Doctor Schedule Updated"
    }
  },
  {
    id: 2,
    text: "Reordered your visit to reduce waiting time. Blood test moved first.",
    isAI: true,
    timestamp: "10:42 AM",
    action: {
      type: "bloodtest",
      title: "Blood Test Scheduled",
      description: "Lab Room 3, Second Floor. Fasting protocol confirmed.",
      time: "Starting now",
      systemLabel: "Lab Reserved Automatically"
    },
    showTimeOptimization: true,
    showActionButtons: true
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [planAccepted, setPlanAccepted] = useState(false)

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    }
    setMessages([...messages, newMessage])
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "Understood. Processing your request now.",
        isAI: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1200)
  }

  const handleAcceptPlan = () => {
    setPlanAccepted(true)
    const confirmMessage: Message = {
      id: messages.length + 1,
      text: "Plan confirmed. Proceed to Lab Room 3 on the second floor. Follow the blue line. You will be notified when Dr. Martinez is ready.",
      isAI: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      action: {
        type: "confirmed",
        title: "Ready to Proceed",
        description: "Follow blue line to Lab Room 3, Second Floor",
        systemLabel: "Route Confirmed"
      }
    }
    setMessages(prev => [...prev, confirmMessage])
  }

  const handleRequestChange = () => {
    const changeMessage: Message = {
      id: messages.length + 1,
      text: "Opening modification options. What would you like to change?",
      isAI: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    }
    setMessages(prev => [...prev, changeMessage])
  }

  const handleTalkToStaff = () => {
    const staffMessage: Message = {
      id: messages.length + 1,
      text: "Connecting you to reception desk. A staff member will assist you shortly.",
      isAI: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    }
    setMessages(prev => [...prev, staffMessage])
  }

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-background">
      <ChatHeader 
        patientName="Sarah Mitchell"
        appointmentInfo="General Checkup"
        appointmentTime="11:00 AM with Dr. Elena Martinez"
      />
      
      {/* Live Hospital Status Panel */}
      <HospitalStatus 
        doctorDelay={15}
        queueOptimized={true}
        labRoom="Room 3"
        waitSaved={25}
      />
      
{/* Premium AI Action Card Showcase */}
        <div className="px-4 py-3">
          <AIActionCard 
            title="AI scheduled your blood test"
            subtitle="Optimized to reduce your waiting time"
            status="Confirmed"
          />
        </div>
      
        {/* Messages Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-3">
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1]
            const showAvatar = !prevMessage || prevMessage.isAI !== message.isAI
            
            return (
              <div key={message.id}>
                <ChatMessage
                  message={message.text}
                  isAI={message.isAI}
                  timestamp={showAvatar ? message.timestamp : undefined}
                  showAvatar={showAvatar}
                  isSystemBackground={message.isSystemBackground}
                />
                {message.action && (
                  <ActionCard
                    type={message.action.type}
                    title={message.action.title}
                    description={message.action.description}
                    time={message.action.time}
                    systemLabel={message.action.systemLabel}
                  />
                )}
                {message.showTimeOptimization && (
                  <TimeOptimization originalWait={45} newWait={20} />
                )}
                {message.showActionButtons && !planAccepted && (
                  <ActionButtons 
                    onAccept={handleAcceptPlan}
                    onRequestChange={handleRequestChange}
                    onTalkToStaff={handleTalkToStaff}
                  />
                )}
              </div>
            )
          })}
        </div>
        
        {/* Typing indicator */}
        <div className="flex items-center gap-2 mt-6 text-muted-foreground">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <span className="text-xs">MedAssist monitoring your visit</span>
        </div>
      </main>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
