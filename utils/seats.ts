import {
  BLOCKED_SEAT_IDS,
  CENTRE_ROW_COUNT,
  PLAN_CENTRE_X,
  SEAT_PITCH,
  SEAT_ROW_SPECS,
  SEAT_SIZE,
  SeatBlock,
  SeatRow,
  SeatZone
} from "@/constants/event"

export interface Seat {
  id: string
  row: SeatRow
  number: number
  /** 0-based position within its own run of seats. */
  indexInRun: number
  runCount: number
  block: SeatBlock
  zone: SeatZone
  rowFromFront: number
  /** Top-left corner on the plan canvas. */
  x: number
  y: number
  centreX: number
  centreY: number
  isBlocked: boolean
}

function buildSeats(): Seat[] {
  const seats: Seat[] = []

  for (const spec of SEAT_ROW_SPECS) {
    for (let i = 0; i < spec.count; i++) {
      const number = spec.firstNumber + i
      const id = `${spec.row}${number}`
      const centreX =
        spec.centreX !== undefined
          ? spec.centreX + (i - (spec.count - 1) / 2) * SEAT_PITCH
          : (spec.startX ?? 0) + i * SEAT_PITCH

      seats.push({
        id,
        row: spec.row,
        number,
        indexInRun: i,
        runCount: spec.count,
        block: spec.block,
        zone: spec.zone,
        rowFromFront: spec.rowFromFront,
        x: centreX - SEAT_SIZE / 2,
        y: spec.y - SEAT_SIZE / 2,
        centreX,
        centreY: spec.y,
        isBlocked: BLOCKED_SEAT_IDS.includes(id)
      })
    }
  }

  return seats
}

export const SEATS: readonly Seat[] = buildSeats()

export const SEAT_BY_ID: Readonly<Record<string, Seat>> = SEATS.reduce<
  Record<string, Seat>
>((acc, seat) => {
  acc[seat.id] = seat
  return acc
}, {})

/** Seat ids in plan order — used for the admin seat picker. */
export const SEAT_IDS: readonly string[] = SEATS.map(s => s.id)

export const SELECTABLE_SEAT_IDS: readonly string[] = SEATS.filter(
  s => !s.isBlocked
).map(s => s.id)

/** Seats grouped by row letter — drives the grouped seat picker in /admin. */
export const SEATS_BY_ROW: ReadonlyArray<{ row: SeatRow; seats: Seat[] }> =
  Object.values(SeatRow).map(row => ({
    row,
    seats: SEATS.filter(s => s.row === row).sort((a, b) => a.number - b.number)
  }))

export function getSeat(seatId: string | undefined | null): Seat | undefined {
  if (!seatId) return undefined
  return SEAT_BY_ID[normalizeSeatId(seatId)]
}

export function normalizeSeatId(seatId: string): string {
  return seatId.trim().toUpperCase().replace(/\s+/g, "")
}

export function isValidSeatId(seatId: string): boolean {
  const seat = getSeat(seatId)
  return Boolean(seat) && !seat!.isBlocked
}

export function blockLabel(block: SeatBlock): string {
  if (block === SeatBlock.LEFT) return "left side block"
  if (block === SeatBlock.RIGHT) return "right side block"
  return "centre block"
}

export function ordinal(n: number): string {
  const suffix =
    n % 100 >= 11 && n % 100 <= 13
      ? "th"
      : n % 10 === 1
        ? "st"
        : n % 10 === 2
          ? "nd"
          : n % 10 === 3
            ? "rd"
            : "th"
  return `${n}${suffix}`
}

export interface SeatDirection {
  instruction: string
  detail: string
}

/**
 * Walking directions from the Lecture Theatre entrance (front-left on the
 * supplied plan) to a seat. Derived from plan geometry — nothing hardcoded
 * per attendee.
 */
export function buildSeatDirections(seat: Seat): SeatDirection[] {
  const steps: SeatDirection[] = [
    {
      instruction: "Enter the Lecture Theatre",
      detail: "Main door on the front-left, past the Cert Table"
    }
  ]

  if (seat.block === SeatBlock.CENTRE) {
    steps.push({
      instruction: `Walk to Row ${seat.row}`,
      detail: `${ordinal(seat.rowFromFront)} row from the front, centre block (${CENTRE_ROW_COUNT} rows in total)`
    })
  } else {
    steps.push({
      instruction: `Head to the ${seat.block === SeatBlock.LEFT ? "left" : "right"} side block`,
      detail: `Row ${seat.row}, beside the centre seating`
    })
  }

  const fromLeft = seat.indexInRun + 1
  const fromRight = seat.runCount - seat.indexInRun
  const side =
    fromLeft <= fromRight
      ? `${ordinal(fromLeft)} seat from the left`
      : `${ordinal(fromRight)} seat from the right`

  steps.push({
    instruction: `Seat ${seat.id}`,
    detail: `${side} of ${blockLabel(seat.block)}`
  })

  return steps
}

/**
 * Distance of a seat from the plan centre line, normalised to -1…1.
 * Used to nudge the callout label so it never runs off the map edge.
 */
export function horizontalBias(seat: Seat): number {
  return (seat.centreX - PLAN_CENTRE_X) / PLAN_CENTRE_X
}
