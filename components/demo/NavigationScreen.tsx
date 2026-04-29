"use client"

import { useState, useEffect } from "react"
import { HospitalNavigation } from "@/components/hospital-navigation"
import { MapPin, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationScreenProps {
  onArrived: () => void
}

// Confetti particle component
function ConfettiParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <div
      className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
      style={{
        left: `${x}%`,
        top: "50%",
        animation: `confetti-fall 2s ease-out ${delay}ms forwards`,
      }}
    />
  )
}

export function NavigationScreen({ onArrived }: NavigationScreenProps) {
  const [isArriving, setIsArriving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false)

  const handleArrival = () => {
    setButtonPressed(true)
    setIsArriving(true)
    
    // Show success state after brief loading
    setTimeout(() => {
      setShowSuccess(true)
    }, 800)

    // Trigger callback after celebration
    setTimeout(() => {
      onArrived()
    }, 2500)
  }

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 80,
    x: 10 + (i * 7) + Math.random() * 5,
  }))

  return (
    <div className="px-4 py-6 flex flex-col gap-4 relative">
      {/* Background ambient effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className={cn(
            "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full transition-all duration-1000",
            showSuccess 
              ? "bg-primary/15 blur-3xl scale-150" 
              : "bg-primary/5 blur-3xl animate-map-glow-pulse"
          )} 
        />
      </div>

      {/* Navigation component */}
      <div className={cn(
        "transition-all duration-500",
        showSuccess && "opacity-50 scale-[0.98]"
      )}>
        <HospitalNavigation
          destination="Lab A"
          level="Level 2"
          estimatedTime={2}
          steps={[
            { instruction: "Head straight", detail: "Past the reception desk", distance: "15m", isCompleted: true },
            { instruction: "Turn right", detail: "At the elevator lobby", distance: "5m", isActive: true },
            { instruction: "Take elevator", detail: "Go to Level 2" },
            { instruction: "Turn left", detail: "Lab A is on your right", distance: "8m" },
          ]}
        />
      </div>

      {/* Arrival Button / Success State */}
      <div className="relative">
        {showSuccess ? (
          /* Success State */
          <div className="relative animate-slide-up-enter overflow-hidden">
            {/* Confetti particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {confettiParticles.map(p => (
                <ConfettiParticle key={p.id} delay={p.delay} x={p.x} />
              ))}
            </div>

            {/* Success card */}
            <div className="w-full p-6 rounded-2xl bg-card border border-primary/30 animate-success-spread relative overflow-hidden">
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
              
              <div className="relative flex flex-col items-center text-center gap-4">
                {/* Success icon */}
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-breathing-glow">
                  <Check className="w-8 h-8 text-primary animate-check-scale-in" />
                </div>
                
                {/* Success text */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Arrived at Lab A
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dr. Martinez will be ready shortly
                  </p>
                </div>

                {/* Sparkle decoration */}
                <div className="flex items-center gap-2 text-primary/60">
                  <Sparkles className="w-4 h-4 animate-spark-pulse" />
                  <span className="text-xs">Welcome to your appointment</span>
                  <Sparkles className="w-4 h-4 animate-spark-pulse" style={{ animationDelay: "500ms" }} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Arrival Button */
          <button
            onClick={handleArrival}
            disabled={isArriving}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-semibold text-base transition-all relative overflow-hidden group",
              isArriving
                ? "bg-primary/70 text-primary-foreground cursor-wait"
                : "bg-primary text-primary-foreground shadow-[0_0_30px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_var(--glow)] hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            {/* Button glow effect */}
            <span className="absolute inset-0 pointer-events-none">
              <span className={cn(
                "absolute inset-0 rounded-2xl opacity-0 bg-white/20",
                buttonPressed && "animate-ripple"
              )} />
            </span>

            {/* Button content */}
            {isArriving ? (
              <>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary-foreground/70 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary-foreground/70 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary-foreground/70 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span>Confirming arrival...</span>
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5 group-hover:animate-icon-float" />
                <span>Arrived at Lab A</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Ambient guidance at bottom */}
      {!showSuccess && !isArriving && (
        <div className="text-center mt-2">
          <p className="text-xs text-muted-foreground/60">
            Tap when you reach your destination
          </p>
        </div>
      )}
    </div>
  )
}
