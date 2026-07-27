"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Attendee,
  EVENT_STEP_ORDER,
  EventStep,
  StorageKey
} from "@/constants/event"
import { useEventData } from "@/hooks/use-event-data"
import { readJson, removeKey, writeJson } from "@/utils/storage"
import { EventShell } from "./EventShell"
import { IdentifyScreen } from "./IdentifyScreen"
import { TodaysPlanScreen } from "./TodaysPlanScreen"
import { SeatNavigationScreen } from "./SeatNavigationScreen"
import { SeatedScreen } from "./SeatedScreen"
import { EventControls } from "./EventControls"

export function EventFlow() {
  const { attendees, content, hydrated } = useEventData()
  const [step, setStep] = useState<EventStep>(EventStep.IDENTIFY)
  const [attendeeId, setAttendeeId] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  // Restore the checked-in attendee so a phone reload doesn't ask again.
  useEffect(() => {
    if (!hydrated) return
    const savedId = readJson<string | null>(StorageKey.IDENTITY, null)
    if (savedId && attendees.some(a => a.id === savedId)) {
      setAttendeeId(savedId)
      setStep(EventStep.TODAYS_PLAN)
    }
  }, [hydrated, attendees])

  const attendee = useMemo(
    () => attendees.find(a => a.id === attendeeId) ?? null,
    [attendees, attendeeId]
  )

  const identify = useCallback((next: Attendee) => {
    setAttendeeId(next.id)
    writeJson(StorageKey.IDENTITY, next.id)
    setStep(EventStep.TODAYS_PLAN)
  }, [])

  const reset = useCallback(() => {
    setAttendeeId(null)
    removeKey(StorageKey.IDENTITY)
    setVersion(v => v + 1)
    setStep(EventStep.IDENTIFY)
  }, [])

  const goPrevious = () => {
    const idx = EVENT_STEP_ORDER.indexOf(step)
    if (idx <= 0) return
    const target = EVENT_STEP_ORDER[idx - 1]
    if (target === EventStep.IDENTIFY) {
      reset()
      return
    }
    setStep(target)
  }

  const goNext = () => {
    const idx = EVENT_STEP_ORDER.indexOf(step)
    if (idx < EVENT_STEP_ORDER.length - 1 && attendee) {
      setStep(EVENT_STEP_ORDER[idx + 1])
    }
  }

  const pickAttendee = (id: string) => {
    if (!id) {
      reset()
      return
    }
    setAttendeeId(id)
    writeJson(StorageKey.IDENTITY, id)
    if (step === EventStep.IDENTIFY) setStep(EventStep.TODAYS_PLAN)
  }

  const renderScreen = () => {
    if (!attendee || step === EventStep.IDENTIFY) {
      return (
        <IdentifyScreen
          content={content}
          attendees={attendees}
          onIdentified={identify}
        />
      )
    }

    switch (step) {
      case EventStep.TODAYS_PLAN:
        return (
          <TodaysPlanScreen
            content={content}
            attendee={attendee}
            onFindSeat={() => setStep(EventStep.SEAT_NAVIGATION)}
          />
        )
      case EventStep.SEAT_NAVIGATION:
        return (
          <SeatNavigationScreen
            content={content}
            attendee={attendee}
            attendees={attendees}
            onSeated={() => setStep(EventStep.SEATED)}
          />
        )
      case EventStep.SEATED:
        return (
          <SeatedScreen
            content={content}
            attendee={attendee}
            attendees={attendees}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <EventShell
        content={content}
        attendee={step === EventStep.IDENTIFY ? null : attendee}
      >
        <div key={`${step}-${version}`}>{renderScreen()}</div>
      </EventShell>

      <EventControls
        step={step}
        attendees={attendees}
        activeAttendeeId={attendeeId}
        onPrevious={goPrevious}
        onNext={goNext}
        onReset={reset}
        onPickAttendee={pickAttendee}
      />
    </>
  )
}
