export const DemoStep = {
  PATIENT_PLAN: "PATIENT_PLAN",
  PLAN_CONFIRMED: "PLAN_CONFIRMED",
  NAVIGATION: "NAVIGATION",
  SMART_SUGGESTION: "SMART_SUGGESTION",
  CEO_DASHBOARD: "CEO_DASHBOARD"
} as const

export type DemoStep = (typeof DemoStep)[keyof typeof DemoStep]

export const DEMO_STEP_ORDER: DemoStep[] = [
  DemoStep.PATIENT_PLAN,
  DemoStep.PLAN_CONFIRMED,
  DemoStep.NAVIGATION,
  DemoStep.SMART_SUGGESTION,
  DemoStep.CEO_DASHBOARD
]

export const PLAN_CONFIRMED_DURATION_MS = 1500

export const ActionCardType = {
  RESCHEDULE: "reschedule",
  BLOODTEST: "bloodtest",
  CONFIRMED: "confirmed"
} as const

export type ActionCardType =
  (typeof ActionCardType)[keyof typeof ActionCardType]

export const PatientPlanItem = {
  TYPING_1: "typing-1",
  MONITORING: "monitoring",
  TYPING_2: "typing-2",
  DELAY_MESSAGE: "delay-message",
  DELAY_CARD: "delay-card",
  REORDER_MESSAGE: "reorder-message",
  BLOODTEST_CARD: "bloodtest-card",
  TIME_OPTIMIZATION: "time-optimization",
  ACTION_BUTTONS: "action-buttons"
} as const

export type PatientPlanItem =
  (typeof PatientPlanItem)[keyof typeof PatientPlanItem]

export const PATIENT_PLAN_TIMELINE: ReadonlyArray<{
  id: PatientPlanItem
  delayMs: number
}> = [
  { id: PatientPlanItem.TYPING_1, delayMs: 1000 },
  { id: PatientPlanItem.MONITORING, delayMs: 5000 },
  { id: PatientPlanItem.TYPING_2, delayMs: 9000 },
  { id: PatientPlanItem.DELAY_MESSAGE, delayMs: 11800 },
  { id: PatientPlanItem.DELAY_CARD, delayMs: 12300 },
  { id: PatientPlanItem.REORDER_MESSAGE, delayMs: 12800 },
  { id: PatientPlanItem.BLOODTEST_CARD, delayMs: 13800 },
  { id: PatientPlanItem.TIME_OPTIMIZATION, delayMs: 14600 },
  { id: PatientPlanItem.ACTION_BUTTONS, delayMs: 15500 }
]
