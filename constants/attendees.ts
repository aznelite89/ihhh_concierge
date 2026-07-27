import { Attendee, AttendeeRole } from "./event"

/**
 * Dry-run attendance list supplied by IHH (Notion task 561).
 * This is the seed only — the live list is edited at /admin and stored in
 * the browser. Roles default to Staff until tagged in the admin screen.
 */
export const DEFAULT_ATTENDEES: Attendee[] = [
  {
    id: "att-1",
    name: "Soh Poh Choo Mona",
    email: "mona.soh@parkwaycollege.sg",
    seatId: "H1",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-2",
    name: "Isabelle Wong Jia Ling",
    email: "jialing.wong@ihhhealthcare.com",
    seatId: "H2",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-3",
    name: "Andy Kok",
    email: "andy.kok@ihhhealthcare.com",
    seatId: "H3",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-4",
    name: "Desmond Goh",
    email: "desmond.goh@ihhhealthcare.com",
    seatId: "H4",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-5",
    name: "Bullecer Silahis Lao",
    email: "silahis.bullecer@ihhhealthcare.com",
    seatId: "H5",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-6",
    name: "Tan Ai Wei",
    email: "aiwei.tan@parkwaycollege.sg",
    seatId: "H6",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-7",
    name: "Jacqueline Tan Lee Lee",
    email: "jacq.tan@parkwaycollege.sg",
    seatId: "H7",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-8",
    name: "Ng Siew Hua Helen",
    email: "helen.ng@parkwaycollege.sg",
    seatId: "H8",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-9",
    name: "Tan Hui Ping, Connie",
    email: "connie.tan@parkwaycollege.sg",
    seatId: "K1",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-10",
    name: "Lee Yee Ren Marcus",
    email: "marcus.lee@ihhhealthcare.com",
    seatId: "K2",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-11",
    name: "Elin How Yi Ning",
    email: "elin.how@ihhhealthcare.com",
    seatId: "J1",
    role: AttendeeRole.STAFF
  },
  {
    id: "att-12",
    name: "Lim Seok Bin Diana (Lin Shumin Diana)",
    email: "diana.lim@ihhhealthcare.com",
    seatId: "J2",
    role: AttendeeRole.STAFF
  }
]
