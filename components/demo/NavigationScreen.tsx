"use client"

import { HospitalNavigation } from "@/components/hospital-navigation"
import { MapPin } from "lucide-react"

interface NavigationScreenProps {
  onArrived: () => void
}

export function NavigationScreen({ onArrived }: NavigationScreenProps) {
  return (
    <div className="px-4 py-6 flex flex-col gap-4 animate-fade-in-up">
      <HospitalNavigation
        destination="Lab A"
        level="Level 2"
        estimatedTime={2}
        steps={[
          { instruction: "Head straight", detail: "Past the reception desk", isCompleted: true },
          { instruction: "Turn right", detail: "At the elevator lobby", isActive: true },
          { instruction: "Take elevator", detail: "Go to Level 2" },
          { instruction: "Turn left", detail: "Lab A is on your right" },
        ]}
      />

      <button
        onClick={onArrived}
        className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-[0_0_30px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all hover:shadow-[0_0_40px_var(--glow)] hover:scale-[1.02] active:scale-[0.98]"
      >
        <MapPin className="w-5 h-5" />
        Arrived at Lab A
      </button>
    </div>
  )
}
