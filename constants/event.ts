/**
 * IHH Healthcare event concierge — Lecture Theatre seating, programme, and
 * editable journey copy.
 *
 * Source of truth for the seat plan is the GEH Lecture Theatre layout supplied
 * by IHH (Notion task 561). Coordinates below mirror that drawing so the on-screen
 * map is recognisable against the printed plan.
 */

export const EventStep = {
  IDENTIFY: "IDENTIFY",
  TODAYS_PLAN: "TODAYS_PLAN",
  SEAT_NAVIGATION: "SEAT_NAVIGATION",
  SEATED: "SEATED"
} as const

export type EventStep = (typeof EventStep)[keyof typeof EventStep]

export const EVENT_STEP_ORDER: EventStep[] = [
  EventStep.IDENTIFY,
  EventStep.TODAYS_PLAN,
  EventStep.SEAT_NAVIGATION,
  EventStep.SEATED
]

export const EVENT_STEP_LABEL: Record<EventStep, string> = {
  [EventStep.IDENTIFY]: "Check in",
  [EventStep.TODAYS_PLAN]: "Today's Plan",
  [EventStep.SEAT_NAVIGATION]: "Find my seat",
  [EventStep.SEATED]: "Seated"
}

/** localStorage keys. Versioned so a shape change never crashes an old device. */
export const StorageKey = {
  ATTENDEES: "ihh.event.attendees.v1",
  CONTENT: "ihh.event.content.v1",
  IDENTITY: "ihh.event.identity.v1"
} as const

export type StorageKey = (typeof StorageKey)[keyof typeof StorageKey]

/* ------------------------------------------------------------------ *
 * Seat plan
 * ------------------------------------------------------------------ */

export const SeatRow = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  H: "H",
  J: "J",
  K: "K"
} as const

export type SeatRow = (typeof SeatRow)[keyof typeof SeatRow]

export const SeatBlock = {
  CENTRE: "CENTRE",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
} as const

export type SeatBlock = (typeof SeatBlock)[keyof typeof SeatBlock]

/** Colour bands on the supplied IHH floor plan. */
export const SeatZone = {
  PRIORITY: "PRIORITY", // rows A–B (purple on the printed plan)
  STANDARD: "STANDARD", // rows C–D and the J/K side blocks (green)
  GENERAL: "GENERAL" // rows E–H (teal)
} as const

export type SeatZone = (typeof SeatZone)[keyof typeof SeatZone]

export const SEAT_ZONE_LABEL: Record<SeatZone, string> = {
  [SeatZone.PRIORITY]: "Front reserved",
  [SeatZone.STANDARD]: "Middle / side",
  [SeatZone.GENERAL]: "Main seating"
}

export const SeatStatus = {
  MINE: "MINE",
  ASSIGNED: "ASSIGNED",
  AVAILABLE: "AVAILABLE",
  BLOCKED: "BLOCKED"
} as const

export type SeatStatus = (typeof SeatStatus)[keyof typeof SeatStatus]

/** Drawing canvas — matches the aspect ratio of the supplied layout PNG. */
export const PLAN_WIDTH = 1882
export const PLAN_HEIGHT = 1291
export const SEAT_SIZE = 48
export const SEAT_PITCH = 69.7
export const PLAN_CENTRE_X = 940

/** Seats crossed out on the supplied plan (not usable). */
export const BLOCKED_SEAT_IDS: readonly string[] = ["C5", "C6"]

export interface SeatRowSpec {
  row: SeatRow
  block: SeatBlock
  zone: SeatZone
  /** Vertical centre of the row on the plan canvas. */
  y: number
  count: number
  /** Seat number of the first seat in this run (J6–J10 continue the J row). */
  firstNumber: number
  /** Centre-aligned rows use this; side blocks use startX instead. */
  centreX?: number
  startX?: number
  /** Row order from the front of the theatre, for walking directions. */
  rowFromFront: number
}

export const SEAT_ROW_SPECS: readonly SeatRowSpec[] = [
  // Side blocks, level with the front rows
  {
    row: SeatRow.J,
    block: SeatBlock.LEFT,
    zone: SeatZone.STANDARD,
    y: 465,
    count: 5,
    firstNumber: 1,
    startX: 56,
    rowFromFront: 1
  },
  {
    row: SeatRow.J,
    block: SeatBlock.RIGHT,
    zone: SeatZone.STANDARD,
    y: 465,
    count: 5,
    firstNumber: 6,
    startX: 1547,
    rowFromFront: 1
  },
  {
    row: SeatRow.K,
    block: SeatBlock.LEFT,
    zone: SeatZone.STANDARD,
    y: 550,
    count: 4,
    firstNumber: 1,
    startX: 125,
    rowFromFront: 2
  },
  {
    row: SeatRow.K,
    block: SeatBlock.RIGHT,
    zone: SeatZone.STANDARD,
    y: 550,
    count: 4,
    firstNumber: 5,
    startX: 1547,
    rowFromFront: 2
  },
  // Centre block, front to back
  {
    row: SeatRow.A,
    block: SeatBlock.CENTRE,
    zone: SeatZone.PRIORITY,
    y: 550,
    count: 9,
    firstNumber: 1,
    centreX: PLAN_CENTRE_X,
    rowFromFront: 1
  },
  {
    row: SeatRow.B,
    block: SeatBlock.CENTRE,
    zone: SeatZone.PRIORITY,
    y: 637,
    count: 9,
    firstNumber: 1,
    centreX: PLAN_CENTRE_X,
    rowFromFront: 2
  },
  {
    row: SeatRow.C,
    block: SeatBlock.CENTRE,
    zone: SeatZone.STANDARD,
    y: 724,
    count: 10,
    firstNumber: 1,
    centreX: PLAN_CENTRE_X,
    rowFromFront: 3
  },
  {
    row: SeatRow.D,
    block: SeatBlock.CENTRE,
    zone: SeatZone.STANDARD,
    y: 811,
    count: 11,
    firstNumber: 1,
    centreX: PLAN_CENTRE_X,
    rowFromFront: 4
  },
  {
    row: SeatRow.E,
    block: SeatBlock.CENTRE,
    zone: SeatZone.GENERAL,
    y: 898,
    count: 12,
    firstNumber: 1,
    centreX: PLAN_CENTRE_X,
    rowFromFront: 5
  },
  {
    row: SeatRow.F,
    block: SeatBlock.CENTRE,
    zone: SeatZone.GENERAL,
    y: 1043,
    count: 11,
    firstNumber: 1,
    centreX: PLAN_CENTRE_X,
    rowFromFront: 6
  },
  {
    row: SeatRow.G,
    block: SeatBlock.CENTRE,
    zone: SeatZone.GENERAL,
    y: 1130,
    count: 10,
    firstNumber: 1,
    centreX: PLAN_CENTRE_X,
    rowFromFront: 7
  },
  {
    row: SeatRow.H,
    block: SeatBlock.CENTRE,
    zone: SeatZone.GENERAL,
    y: 1217,
    count: 9,
    firstNumber: 1,
    centreX: PLAN_CENTRE_X,
    rowFromFront: 8
  }
]

export const CENTRE_ROW_COUNT = SEAT_ROW_SPECS.filter(
  s => s.block === SeatBlock.CENTRE
).length

export const FixtureKind = {
  ENTRANCE: "ENTRANCE",
  STAGE: "STAGE",
  SUPPORT: "SUPPORT"
} as const

export type FixtureKind = (typeof FixtureKind)[keyof typeof FixtureKind]

export interface PlanFixture {
  id: string
  label: string
  kind: FixtureKind
  x: number
  y: number
  width: number
  height: number
}

export const PLAN_FIXTURES: readonly PlanFixture[] = [
  {
    id: "entrance",
    label: "Entrance",
    kind: FixtureKind.ENTRANCE,
    x: 90,
    y: 6,
    width: 128,
    height: 64
  },
  {
    id: "cert-table",
    label: "Cert Table",
    kind: FixtureKind.SUPPORT,
    x: 343,
    y: 105,
    width: 154,
    height: 50
  },
  {
    id: "projector",
    label: "Projector",
    kind: FixtureKind.STAGE,
    x: 667,
    y: 57,
    width: 549,
    height: 48
  },
  {
    id: "av-area",
    label: "AV Area",
    kind: FixtureKind.SUPPORT,
    x: 1384,
    y: 107,
    width: 139,
    height: 143
  },
  {
    id: "emcee",
    label: "Emcee",
    kind: FixtureKind.SUPPORT,
    x: 1384,
    y: 280,
    width: 139,
    height: 57
  }
]

/** Zoom applied when the map focuses on a single seat. */
export const SEAT_FOCUS_SCALE = 2.4
export const SEAT_FOCUS_TRANSITION_MS = 700

export const MapView = {
  FOCUS: "FOCUS",
  FULL: "FULL"
} as const

export type MapView = (typeof MapView)[keyof typeof MapView]

/* ------------------------------------------------------------------ *
 * Attendees
 * ------------------------------------------------------------------ */

export const AttendeeRole = {
  STAFF: "STAFF",
  SUPERVISOR: "SUPERVISOR",
  HOD: "HOD",
  GUEST: "GUEST"
} as const

export type AttendeeRole = (typeof AttendeeRole)[keyof typeof AttendeeRole]

export const ATTENDEE_ROLE_LABEL: Record<AttendeeRole, string> = {
  [AttendeeRole.STAFF]: "Staff",
  [AttendeeRole.SUPERVISOR]: "Supervisor",
  [AttendeeRole.HOD]: "HOD",
  [AttendeeRole.GUEST]: "Guest"
}

export const ATTENDEE_ROLE_ORDER: AttendeeRole[] = [
  AttendeeRole.STAFF,
  AttendeeRole.SUPERVISOR,
  AttendeeRole.HOD,
  AttendeeRole.GUEST
]

export interface Attendee {
  id: string
  name: string
  email: string
  seatId: string
  role: AttendeeRole
}

/* ------------------------------------------------------------------ *
 * Event content (all copy shown in the attendee journey is editable)
 * ------------------------------------------------------------------ */

export interface ProgrammeItem {
  id: string
  time: string
  title: string
  detail: string
}

export interface EventContent {
  eventName: string
  eventTagline: string
  eventDate: string
  venue: string
  venueDetail: string
  identifyTitle: string
  identifySubtitle: string
  identifyInputLabel: string
  identifyCta: string
  identifyNotFound: string
  planGreeting: string
  planTitle: string
  planSubtitle: string
  navigationTitle: string
  navigationHint: string
  navigationCta: string
  seatedTitle: string
  seatedMessage: string
  programme: ProgrammeItem[]
}

/** Tokens usable inside any editable copy field. */
export const ContentToken = {
  NAME: "{name}",
  FIRST_NAME: "{firstName}",
  SEAT: "{seat}",
  ROW: "{row}",
  VENUE: "{venue}",
  VENUE_DETAIL: "{venueDetail}",
  EVENT_DATE: "{eventDate}"
} as const

export type ContentToken = (typeof ContentToken)[keyof typeof ContentToken]

export const CONTENT_TOKEN_HINTS: ReadonlyArray<{
  token: ContentToken
  meaning: string
}> = [
  { token: ContentToken.NAME, meaning: "Attendee's full name" },
  { token: ContentToken.FIRST_NAME, meaning: "Attendee's first name" },
  { token: ContentToken.SEAT, meaning: "Seat number, e.g. H1" },
  { token: ContentToken.ROW, meaning: "Seat row letter, e.g. H" },
  { token: ContentToken.VENUE, meaning: "Venue name" },
  { token: ContentToken.VENUE_DETAIL, meaning: "Room / area" },
  { token: ContentToken.EVENT_DATE, meaning: "Event date" }
]

export const DEFAULT_PROGRAMME: ProgrammeItem[] = [
  {
    id: "prog-1",
    time: "11:45 AM",
    title: "Registration",
    detail: "To be seated by 11:55 AM"
  },
  { id: "prog-2", time: "12:00 PM", title: "Start of Event", detail: "" },
  {
    id: "prog-3",
    time: "12:05 PM",
    title: "Opening Speech",
    detail: "By Dr Peter Chow"
  },
  {
    id: "prog-4",
    time: "12:10 PM",
    title: "Award Presentation of Certificate in Workplace Learning & Coaching",
    detail: ""
  },
  {
    id: "prog-5",
    time: "12:20 PM",
    title: "Leadership Graduates Video Highlight",
    detail: "& Award Presentation of Leadership Development Programme"
  },
  { id: "prog-6", time: "12:45 PM", title: "End of Event", detail: "" }
]

export const DEFAULT_EVENT_CONTENT: EventContent = {
  eventName: "Learning & Development Awards",
  eventTagline: "IHH Healthcare Singapore",
  eventDate: "September 2026",
  venue: "Gleneagles Hospital",
  venueDetail: "Lecture Theatre",
  identifyTitle: "Welcome to {venue}",
  identifySubtitle:
    "Enter the email you registered with and I'll take you to your seat.",
  identifyInputLabel: "Work email",
  identifyCta: "Continue",
  identifyNotFound:
    "We couldn't find that email on the attendance list. Please check with a staff member at the registration desk.",
  planGreeting:
    "Welcome {name}, you're checked in. Your seat is {seat}, Row {row}.",
  planTitle: "Today's Plan",
  planSubtitle: "{venueDetail} · {eventDate}",
  navigationTitle: "Your seat is {seat}",
  navigationHint: "Your seat is highlighted on the Lecture Theatre plan below.",
  navigationCta: "I'm at my seat",
  seatedTitle: "You're seated at {seat}",
  seatedMessage: "Enjoy the ceremony. I'll keep you updated on the programme.",
  programme: DEFAULT_PROGRAMME
}

/** Demo pacing for the live programme pointer on the Seated screen. */
export const PROGRAMME_TICK_MS = 6000

/* ------------------------------------------------------------------ *
 * Admin
 * ------------------------------------------------------------------ */

export const AdminTab = {
  ATTENDEES: "ATTENDEES",
  CONTENT: "CONTENT",
  PROGRAMME: "PROGRAMME"
} as const

export type AdminTab = (typeof AdminTab)[keyof typeof AdminTab]

export const ADMIN_TAB_LABEL: Record<AdminTab, string> = {
  [AdminTab.ATTENDEES]: "Attendance list",
  [AdminTab.CONTENT]: "Event journey",
  [AdminTab.PROGRAMME]: "Programme"
}

export const ATTENDEE_CSV_HEADERS = ["Name", "Email", "Seat Number", "Role"]

export const ATTENDEE_CSV_FILENAME = "ihh-attendance-list.csv"
