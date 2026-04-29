"use client"

import { useEffect, useState } from "react"
import { DemoStep, DEMO_STEP_ORDER, PLAN_CONFIRMED_DURATION_MS } from "@/constants/demo"
import { PhoneShell } from "./PhoneShell"
import { PatientPlanScreen } from "./PatientPlanScreen"
import { PlanConfirmedScreen } from "./PlanConfirmedScreen"
import { NavigationScreen } from "./NavigationScreen"
import { SmartSuggestionScreen } from "./SmartSuggestionScreen"
import { CEODashboardScreen } from "./CEODashboardScreen"
import { DemoControls } from "./DemoControls"

export function DemoFlow() {
  const [demoStep, setDemoStep] = useState<DemoStep>(DemoStep.PATIENT_PLAN)
  const [skipPatientAnimation, setSkipPatientAnimation] = useState(false)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (demoStep !== DemoStep.PLAN_CONFIRMED) return
    const timer = setTimeout(() => {
      setDemoStep(DemoStep.NAVIGATION)
    }, PLAN_CONFIRMED_DURATION_MS)
    return () => clearTimeout(timer)
  }, [demoStep])

  const goPrevious = () => {
    const idx = DEMO_STEP_ORDER.indexOf(demoStep)
    if (idx > 0) {
      setSkipPatientAnimation(false)
      setDemoStep(DEMO_STEP_ORDER[idx - 1])
    }
  }

  const goNext = () => {
    const idx = DEMO_STEP_ORDER.indexOf(demoStep)
    if (idx < DEMO_STEP_ORDER.length - 1) {
      setDemoStep(DEMO_STEP_ORDER[idx + 1])
    }
  }

  const reset = () => {
    setSkipPatientAnimation(false)
    setVersion(v => v + 1)
    setDemoStep(DemoStep.PATIENT_PLAN)
  }

  const skipAnimation = () => {
    if (demoStep === DemoStep.PATIENT_PLAN) {
      setSkipPatientAnimation(true)
    }
  }

  const renderScreen = () => {
    switch (demoStep) {
      case DemoStep.PATIENT_PLAN:
        return (
          <PatientPlanScreen
            skipAnimation={skipPatientAnimation}
            onAcceptPlan={() => setDemoStep(DemoStep.PLAN_CONFIRMED)}
          />
        )
      case DemoStep.PLAN_CONFIRMED:
        return <PlanConfirmedScreen />
      case DemoStep.NAVIGATION:
        return (
          <NavigationScreen onArrived={() => setDemoStep(DemoStep.SMART_SUGGESTION)} />
        )
      case DemoStep.SMART_SUGGESTION:
        return (
          <SmartSuggestionScreen
            onViewDashboard={() => setDemoStep(DemoStep.CEO_DASHBOARD)}
          />
        )
      case DemoStep.CEO_DASHBOARD:
        return <CEODashboardScreen />
    }
  }

  return (
    <>
      <PhoneShell showInput={demoStep !== DemoStep.CEO_DASHBOARD}>
        <div key={`${demoStep}-${version}`}>{renderScreen()}</div>
      </PhoneShell>

      <DemoControls
        step={demoStep}
        onPrevious={goPrevious}
        onNext={goNext}
        onReset={reset}
        onSkipAnimation={skipAnimation}
        canSkipAnimation={
          demoStep === DemoStep.PATIENT_PLAN && !skipPatientAnimation
        }
      />
    </>
  )
}
