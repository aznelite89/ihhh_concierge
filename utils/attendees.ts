import {
  ATTENDEE_CSV_HEADERS,
  Attendee,
  AttendeeRole,
  ATTENDEE_ROLE_LABEL,
  ATTENDEE_ROLE_ORDER
} from "@/constants/event"
import { parseCsv, toCsv } from "./csv"
import { getSeat, normalizeSeatId } from "./seats"

/** Emails in the supplied list carry trailing semicolons — strip them. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase().replace(/[;,]+$/, "")
}

export function findAttendeeByEmail(
  attendees: readonly Attendee[],
  email: string
): Attendee | undefined {
  const target = normalizeEmail(email)
  if (!target) return undefined
  return attendees.find(a => normalizeEmail(a.email) === target)
}

export function findAttendeeBySeat(
  attendees: readonly Attendee[],
  seatId: string
): Attendee | undefined {
  const target = normalizeSeatId(seatId)
  return attendees.find(a => normalizeSeatId(a.seatId) === target)
}

export function firstNameOf(name: string): string {
  const cleaned = name.replace(/\(.*?\)/g, "").trim()
  const [first] = cleaned.split(/[\s,]+/)
  return first || cleaned
}

export function assignedSeatIds(attendees: readonly Attendee[]): Set<string> {
  return new Set(attendees.map(a => normalizeSeatId(a.seatId)).filter(Boolean))
}

/** Seat ids tagged to more than one attendee — surfaced as a warning in admin. */
export function duplicateSeatIds(attendees: readonly Attendee[]): Set<string> {
  const seen = new Set<string>()
  const dupes = new Set<string>()
  for (const a of attendees) {
    const seat = normalizeSeatId(a.seatId)
    if (!seat) continue
    if (seen.has(seat)) dupes.add(seat)
    seen.add(seat)
  }
  return dupes
}

export function createAttendeeId(): string {
  return `att-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`
}

export function createEmptyAttendee(): Attendee {
  return {
    id: createAttendeeId(),
    name: "",
    email: "",
    seatId: "",
    role: AttendeeRole.STAFF
  }
}

export function parseRole(value: string | undefined): AttendeeRole {
  if (!value) return AttendeeRole.STAFF
  const target = value.trim().toLowerCase()
  const match = ATTENDEE_ROLE_ORDER.find(
    role =>
      role.toLowerCase() === target ||
      ATTENDEE_ROLE_LABEL[role].toLowerCase() === target
  )
  return match ?? AttendeeRole.STAFF
}

export function attendeesToCsv(attendees: readonly Attendee[]): string {
  return toCsv([
    ATTENDEE_CSV_HEADERS,
    ...attendees.map(a => [
      a.name,
      a.email,
      a.seatId,
      ATTENDEE_ROLE_LABEL[a.role]
    ])
  ])
}

export interface CsvImportResult {
  attendees: Attendee[]
  errors: string[]
  warnings: string[]
}

/**
 * Accepts the IHH-supplied column order (Name, Email, Seat Number[, Role]),
 * with or without a header row.
 */
export function csvToAttendees(text: string): CsvImportResult {
  const rows = parseCsv(text)
  const errors: string[] = []
  const warnings: string[] = []

  if (rows.length === 0) {
    return { attendees: [], errors: ["The file is empty."], warnings }
  }

  const [maybeHeader] = rows
  const hasHeader = /name/i.test(maybeHeader[0] ?? "")
  const dataRows = hasHeader ? rows.slice(1) : rows

  const attendees: Attendee[] = []

  dataRows.forEach((row, i) => {
    const lineNo = i + (hasHeader ? 2 : 1)
    const [name = "", email = "", seat = "", role = ""] = row

    if (!name.trim() && !email.trim()) return

    if (!name.trim()) {
      errors.push(`Line ${lineNo}: missing name.`)
      return
    }

    const seatId = normalizeSeatId(seat)
    if (seatId && !getSeat(seatId)) {
      warnings.push(
        `Line ${lineNo}: seat "${seat.trim()}" is not on the Lecture Theatre plan — imported unassigned.`
      )
    } else if (getSeat(seatId)?.isBlocked) {
      warnings.push(
        `Line ${lineNo}: seat ${seatId} is marked unavailable on the plan.`
      )
    }

    attendees.push({
      id: createAttendeeId(),
      name: name.trim(),
      email: normalizeEmail(email),
      seatId: getSeat(seatId) ? seatId : "",
      role: parseRole(role)
    })
  })

  if (attendees.length === 0) {
    errors.push("No attendee rows found. Expected: Name, Email, Seat Number.")
  }

  duplicateSeatIds(attendees).forEach(seat =>
    warnings.push(`Seat ${seat} is tagged to more than one attendee.`)
  )

  return { attendees, errors, warnings }
}
