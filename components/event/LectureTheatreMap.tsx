"use client"

import { useMemo } from "react"
import {
  FixtureKind,
  MapView,
  PLAN_FIXTURES,
  PLAN_HEIGHT,
  PLAN_WIDTH,
  SEAT_FOCUS_SCALE,
  SEAT_FOCUS_TRANSITION_MS,
  SEAT_SIZE,
  SeatStatus,
  SeatZone
} from "@/constants/event"
import { SEATS, Seat, getSeat } from "@/utils/seats"
import { cn } from "@/lib/utils"

interface LectureTheatreMapProps {
  /** Seat to highlight and (in focus view) zoom to. */
  highlightSeatId?: string
  /** Seats already tagged to an attendee — drawn with a filled marker. */
  assignedSeatIds?: ReadonlySet<string>
  view?: MapView
  onSelectSeat?: (seatId: string) => void
  /** Text in the pin above the highlighted seat. */
  calloutLabel?: string
  className?: string
}

const ZONE_FILL: Record<SeatZone, string> = {
  [SeatZone.PRIORITY]: "var(--seat-priority)",
  [SeatZone.STANDARD]: "var(--seat-standard)",
  [SeatZone.GENERAL]: "var(--seat-general)"
}

function statusOf(
  seat: Seat,
  highlightSeatId: string | undefined,
  assigned: ReadonlySet<string> | undefined
): SeatStatus {
  if (seat.isBlocked) return SeatStatus.BLOCKED
  if (highlightSeatId && seat.id === highlightSeatId) return SeatStatus.MINE
  if (assigned?.has(seat.id)) return SeatStatus.ASSIGNED
  return SeatStatus.AVAILABLE
}

export function LectureTheatreMap({
  highlightSeatId,
  assignedSeatIds,
  view = MapView.FULL,
  onSelectSeat,
  calloutLabel = "Your seat",
  className
}: LectureTheatreMapProps) {
  const target = getSeat(highlightSeatId)
  const focused = view === MapView.FOCUS && Boolean(target)

  const { transform } = useMemo(() => {
    if (!focused || !target) return { transform: "none" }
    const k = SEAT_FOCUS_SCALE
    const tx = clamp(
      PLAN_WIDTH / 2 - k * target.centreX,
      PLAN_WIDTH * (1 - k),
      0
    )
    const ty = clamp(
      PLAN_HEIGHT / 2 - k * target.centreY,
      PLAN_HEIGHT * (1 - k),
      0
    )
    return { transform: `translate(${tx}px, ${ty}px) scale(${k})` }
  }, [focused, target])

  return (
    <svg
      viewBox={`0 0 ${PLAN_WIDTH} ${PLAN_HEIGHT}`}
      className={cn("w-full h-auto select-none", className)}
      role="img"
      aria-label={
        target
          ? `Lecture Theatre seating plan, seat ${target.id} highlighted`
          : "Lecture Theatre seating plan"
      }
    >
      <rect
        x={0}
        y={0}
        width={PLAN_WIDTH}
        height={PLAN_HEIGHT}
        rx={24}
        fill="var(--map-surface)"
      />

      <g
        style={{
          transform,
          transformOrigin: "0 0",
          transition: `transform ${SEAT_FOCUS_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
        }}
      >
        {PLAN_FIXTURES.map(fixture => {
          const isEntrance = fixture.kind === FixtureKind.ENTRANCE
          const isStage = fixture.kind === FixtureKind.STAGE
          return (
            <g key={fixture.id}>
              <rect
                x={fixture.x}
                y={fixture.y}
                width={fixture.width}
                height={fixture.height}
                rx={10}
                fill={
                  isStage
                    ? "var(--map-stage)"
                    : isEntrance
                      ? "var(--map-entrance)"
                      : "var(--map-fixture)"
                }
                stroke={
                  isEntrance ? "var(--color-primary)" : "var(--map-fixture-line)"
                }
                strokeWidth={2}
                strokeDasharray={isEntrance ? "8 6" : undefined}
              />
              <text
                x={fixture.x + fixture.width / 2}
                y={fixture.y + fixture.height / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={24}
                fill={
                  isEntrance
                    ? "var(--color-primary)"
                    : "var(--map-fixture-text)"
                }
                letterSpacing={1}
              >
                {fixture.label}
              </text>
            </g>
          )
        })}

        {SEATS.map(seat => {
          const status = statusOf(seat, highlightSeatId, assignedSeatIds)
          const isMine = status === SeatStatus.MINE
          const isBlocked = status === SeatStatus.BLOCKED
          const isAssigned = status === SeatStatus.ASSIGNED
          const interactive = Boolean(onSelectSeat) && !isBlocked

          return (
            <g
              key={seat.id}
              onClick={interactive ? () => onSelectSeat!(seat.id) : undefined}
              className={cn(interactive && "cursor-pointer")}
            >
              <rect
                x={seat.x}
                y={seat.y}
                width={SEAT_SIZE}
                height={SEAT_SIZE}
                rx={8}
                fill={
                  isMine
                    ? "var(--color-primary)"
                    : isBlocked
                      ? "var(--seat-blocked)"
                      : ZONE_FILL[seat.zone]
                }
                stroke={
                  isMine
                    ? "var(--color-primary)"
                    : isAssigned
                      ? "var(--seat-assigned-line)"
                      : "transparent"
                }
                strokeWidth={isAssigned ? 3 : 2}
                className={cn(isMine && "animate-seat-pulse")}
              />

              {isBlocked ? (
                <g
                  stroke="var(--map-fixture-text)"
                  strokeWidth={5}
                  strokeLinecap="round"
                >
                  <line
                    x1={seat.x + 12}
                    y1={seat.y + 12}
                    x2={seat.x + SEAT_SIZE - 12}
                    y2={seat.y + SEAT_SIZE - 12}
                  />
                  <line
                    x1={seat.x + SEAT_SIZE - 12}
                    y1={seat.y + 12}
                    x2={seat.x + 12}
                    y2={seat.y + SEAT_SIZE - 12}
                  />
                </g>
              ) : (
                <text
                  x={seat.centreX}
                  y={seat.centreY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={seat.id.length > 2 ? 18 : 20}
                  fontWeight={isMine ? 700 : 500}
                  fill={isMine ? "var(--color-primary-foreground)" : "var(--seat-text)"}
                >
                  {seat.id}
                </text>
              )}
            </g>
          )
        })}

        {target && !target.isBlocked && (
          <g pointerEvents="none">
            <circle
              cx={target.centreX}
              cy={target.centreY}
              r={SEAT_SIZE * 0.9}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={6}
              className="animate-seat-ping"
            />
            <g
              transform={`translate(${calloutX(target.centreX)}, ${target.centreY - SEAT_SIZE * 0.85})`}
            >
              <rect
                x={-95}
                y={-66}
                width={190}
                height={56}
                rx={18}
                fill="var(--color-primary)"
              />
              <polygon
                points={`${calloutTailX(target.centreX) - 12},-11 ${calloutTailX(target.centreX) + 12},-11 ${calloutTailX(target.centreX)},4`}
                fill="var(--color-primary)"
              />
              <text
                x={0}
                y={-38}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={30}
                fontWeight={700}
                fill="var(--color-primary-foreground)"
              >
                {calloutLabel}
              </text>
            </g>
          </g>
        )}
      </g>
    </svg>
  )
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Keeps the "Your seat" callout inside the plan when the seat is near an edge. */
const CALLOUT_HALF_WIDTH = 95

function calloutX(seatCentreX: number): number {
  return clamp(
    seatCentreX,
    CALLOUT_HALF_WIDTH + 8,
    PLAN_WIDTH - CALLOUT_HALF_WIDTH - 8
  )
}

/** Tail position relative to the (possibly shifted) callout body. */
function calloutTailX(seatCentreX: number): number {
  return seatCentreX - calloutX(seatCentreX)
}

export function MapLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground",
        className
      )}
    >
      <LegendSwatch color="var(--color-primary)" label="Your seat" />
      <LegendSwatch
        color="var(--seat-standard)"
        borderColor="var(--seat-assigned-line)"
        label="Assigned"
      />
      <LegendSwatch color="var(--seat-general)" label="Unassigned" />
      <LegendSwatch color="var(--seat-blocked)" label="Unavailable" />
    </div>
  )
}

function LegendSwatch({
  color,
  borderColor,
  label
}: {
  color: string
  borderColor?: string
  label: string
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="w-3 h-3 rounded-[4px]"
        style={{
          background: color,
          border: borderColor ? `1.5px solid ${borderColor}` : undefined
        }}
      />
      {label}
    </span>
  )
}
