export const DemoStep = {
  PATIENT_PLAN: "PATIENT_PLAN",
  PLAN_CONFIRMED: "PLAN_CONFIRMED",
  NAVIGATION: "NAVIGATION",
  SMART_SUGGESTION: "SMART_SUGGESTION",
  CEO_DASHBOARD: "CEO_DASHBOARD",
} as const

export type DemoStep = (typeof DemoStep)[keyof typeof DemoStep]

export const DEMO_STEP_ORDER: DemoStep[] = [
  DemoStep.PATIENT_PLAN,
  DemoStep.PLAN_CONFIRMED,
  DemoStep.NAVIGATION,
  DemoStep.SMART_SUGGESTION,
  DemoStep.CEO_DASHBOARD,
]

export const PLAN_CONFIRMED_DURATION_MS = 1500

export const ActionCardType = {
  RESCHEDULE: "reschedule",
  BLOODTEST: "bloodtest",
  CONFIRMED: "confirmed",
} as const

export type ActionCardType = (typeof ActionCardType)[keyof typeof ActionCardType]
