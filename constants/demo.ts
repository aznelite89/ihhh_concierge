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

export const PLAN_CONFIRMED_DURATION_MS = 8000

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
  { id: PatientPlanItem.MONITORING, delayMs: 5000 }, // + 4000
  { id: PatientPlanItem.TYPING_2, delayMs: 9000 }, // + 4000
  { id: PatientPlanItem.DELAY_MESSAGE, delayMs: 12000 }, // + 3000
  { id: PatientPlanItem.DELAY_CARD, delayMs: 13500 }, // + 1500
  { id: PatientPlanItem.REORDER_MESSAGE, delayMs: 15500 }, // + 2000
  { id: PatientPlanItem.BLOODTEST_CARD, delayMs: 17500 }, // + 2000
  { id: PatientPlanItem.TIME_OPTIMIZATION, delayMs: 18500 }, // + 1000
  { id: PatientPlanItem.ACTION_BUTTONS, delayMs: 19500 } // + 1000
]

export const CompanionState = {
  HIDDEN: "HIDDEN",
  APPEARING: "APPEARING",
  IDLE: "IDLE",
  SPEAKING: "SPEAKING",
  MINIMIZED: "MINIMIZED"
} as const

export type CompanionState =
  (typeof CompanionState)[keyof typeof CompanionState]

export const CompanionAction = {
  EXPLAIN_PLAN: "EXPLAIN_PLAN",
  GUIDE_ME: "GUIDE_ME",
  TALK_TO_STAFF: "TALK_TO_STAFF",
  SPEAK: "SPEAK"
} as const

export type CompanionAction =
  (typeof CompanionAction)[keyof typeof CompanionAction]

export const COMPANION_APPEAR_DURATION_MS = 600
export const COMPANION_SPEECH_DURATION_MS = 5000
export const COMPANION_LABEL_DURATION_MS = 3000

// Show companion this long after TIME_OPTIMIZATION reveals
export const COMPANION_REVEAL_AFTER_OPTIMIZATION_MS = 1500
export const COMPANION_PATIENT_PLAN_REVEAL_MS =
  PATIENT_PLAN_TIMELINE.find(t => t.id === PatientPlanItem.TIME_OPTIMIZATION)!
    .delayMs + COMPANION_REVEAL_AFTER_OPTIMIZATION_MS

export const COMPANION_DEFAULT_MESSAGE =
  "Hi Sarah, I've reorganized your visit to save you 25 minutes."
