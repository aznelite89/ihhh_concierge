"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Attendee,
  DEFAULT_EVENT_CONTENT,
  EventContent,
  StorageKey
} from "@/constants/event"
import { DEFAULT_ATTENDEES } from "@/constants/attendees"
import { readJson, removeKey, writeJson } from "@/utils/storage"

function mergeContent(stored: Partial<EventContent> | null): EventContent {
  if (!stored) return DEFAULT_EVENT_CONTENT
  return {
    ...DEFAULT_EVENT_CONTENT,
    ...stored,
    programme:
      Array.isArray(stored.programme) && stored.programme.length > 0
        ? stored.programme
        : DEFAULT_EVENT_CONTENT.programme
  }
}

/**
 * Attendance list + event copy, seeded from /constants and persisted to
 * localStorage. Values load after mount so server and client markup match.
 * Changes made in /admin propagate to an open /event tab via the storage event.
 */
export function useEventData() {
  const [attendees, setAttendeesState] = useState<Attendee[]>(DEFAULT_ATTENDEES)
  const [content, setContentState] =
    useState<EventContent>(DEFAULT_EVENT_CONTENT)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setAttendeesState(readJson<Attendee[]>(StorageKey.ATTENDEES, DEFAULT_ATTENDEES))
    setContentState(mergeContent(readJson<EventContent | null>(StorageKey.CONTENT, null)))
    setHydrated(true)
  }, [])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === StorageKey.ATTENDEES) {
        setAttendeesState(readJson<Attendee[]>(StorageKey.ATTENDEES, DEFAULT_ATTENDEES))
      }
      if (event.key === StorageKey.CONTENT) {
        setContentState(mergeContent(readJson<EventContent | null>(StorageKey.CONTENT, null)))
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const setAttendees = useCallback((next: Attendee[]) => {
    setAttendeesState(next)
    writeJson(StorageKey.ATTENDEES, next)
  }, [])

  const setContent = useCallback((next: EventContent) => {
    setContentState(next)
    writeJson(StorageKey.CONTENT, next)
  }, [])

  const resetAttendees = useCallback(() => {
    setAttendeesState(DEFAULT_ATTENDEES)
    removeKey(StorageKey.ATTENDEES)
  }, [])

  const resetContent = useCallback(() => {
    setContentState(DEFAULT_EVENT_CONTENT)
    removeKey(StorageKey.CONTENT)
  }, [])

  return {
    attendees,
    content,
    hydrated,
    setAttendees,
    setContent,
    resetAttendees,
    resetContent
  }
}
