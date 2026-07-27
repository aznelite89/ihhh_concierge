import type { Metadata } from "next"
import { EventFlow } from "@/components/event/EventFlow"

export const metadata: Metadata = {
  title: "Event Concierge — IHH Healthcare",
  description: "Find your seat and follow today's programme"
}

export default function EventPage() {
  return <EventFlow />
}
