import { Attendee, ContentToken, EventContent } from "@/constants/event"
import { firstNameOf } from "./attendees"
import { getSeat } from "./seats"

export interface TokenContext {
  attendee?: Attendee | null
  content: EventContent
}

/**
 * Replaces {name} / {firstName} / {seat} / {row} / {venue} / {venueDetail} /
 * {eventDate} in any editable copy field. Unknown tokens are left untouched so
 * a typo in /admin is visible rather than silently blanked.
 */
export function applyTokens(template: string, ctx: TokenContext): string {
  const { attendee, content } = ctx
  const seat = getSeat(attendee?.seatId)

  const values: Record<string, string> = {
    [ContentToken.NAME]: attendee?.name ?? "",
    [ContentToken.FIRST_NAME]: attendee ? firstNameOf(attendee.name) : "",
    [ContentToken.SEAT]: attendee?.seatId ?? "",
    [ContentToken.ROW]: seat?.row ?? "",
    [ContentToken.VENUE]: content.venue,
    [ContentToken.VENUE_DETAIL]: content.venueDetail,
    [ContentToken.EVENT_DATE]: content.eventDate
  }

  return Object.entries(values).reduce(
    (out, [token, value]) => out.split(token).join(value),
    template
  )
}
