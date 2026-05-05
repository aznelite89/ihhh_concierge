"use client"

import { ConsultationDelayedScreen } from "./ConsultationDelayedScreen"

interface SmartSuggestionScreenProps {
  onViewDashboard: () => void
}

export function SmartSuggestionScreen({ onViewDashboard }: SmartSuggestionScreenProps) {
  return <ConsultationDelayedScreen onViewDashboard={onViewDashboard} />
}
