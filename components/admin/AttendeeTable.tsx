"use client"

import { ChangeEvent, useMemo, useRef, useState } from "react"
import {
  AlertTriangle,
  Download,
  Plus,
  RotateCcw,
  Trash2,
  Upload
} from "lucide-react"
import {
  ATTENDEE_CSV_FILENAME,
  ATTENDEE_ROLE_LABEL,
  ATTENDEE_ROLE_ORDER,
  Attendee,
  AttendeeRole,
  MapView
} from "@/constants/event"
import {
  assignedSeatIds,
  attendeesToCsv,
  createEmptyAttendee,
  csvToAttendees,
  duplicateSeatIds,
  firstNameOf,
  normalizeEmail
} from "@/utils/attendees"
import { SEATS_BY_ROW, normalizeSeatId } from "@/utils/seats"
import { downloadTextFile } from "@/utils/storage"
import { LectureTheatreMap, MapLegend } from "@/components/event/LectureTheatreMap"
import { cn } from "@/lib/utils"

interface AttendeeTableProps {
  attendees: Attendee[]
  onChange: (next: Attendee[]) => void
  onReset: () => void
}

export function AttendeeTable({
  attendees,
  onChange,
  onReset
}: AttendeeTableProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [notice, setNotice] = useState<{
    errors: string[]
    warnings: string[]
  } | null>(null)

  const duplicates = useMemo(() => duplicateSeatIds(attendees), [attendees])
  const assigned = useMemo(() => assignedSeatIds(attendees), [attendees])
  const selected = attendees.find(a => a.id === selectedId) ?? null

  const update = (id: string, patch: Partial<Attendee>) => {
    onChange(attendees.map(a => (a.id === id ? { ...a, ...patch } : a)))
  }

  const addRow = () => {
    const row = createEmptyAttendee()
    onChange([...attendees, row])
    setSelectedId(row.id)
  }

  const removeRow = (id: string) => {
    onChange(attendees.filter(a => a.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const handleExport = () => {
    downloadTextFile(
      ATTENDEE_CSV_FILENAME,
      attendeesToCsv(attendees),
      "text/csv;charset=utf-8"
    )
  }

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const result = csvToAttendees(text)
    if (result.attendees.length > 0) {
      onChange(result.attendees)
    }
    setNotice({ errors: result.errors, warnings: result.warnings })
    e.target.value = ""
  }

  const assignSeatFromMap = (seatId: string) => {
    if (!selected) return
    update(selected.id, { seatId })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground mr-auto">
          Attendees{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ({attendees.length})
          </span>
        </h2>

        <button onClick={addRow} className={toolbarButton}>
          <Plus className="w-4 h-4" />
          Add attendee
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className={toolbarButton}
        >
          <Upload className="w-4 h-4" />
          Import CSV
        </button>
        <button onClick={handleExport} className={toolbarButton}>
          <Download className="w-4 h-4" />
          Export CSV
        </button>
        <button
          onClick={() => {
            onReset()
            setNotice(null)
            setSelectedId(null)
          }}
          className={toolbarButton}
          title="Restore the list supplied by IHH"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      {notice && (notice.errors.length > 0 || notice.warnings.length > 0) && (
        <div className="rounded-xl border border-border bg-card p-3 flex flex-col gap-1.5">
          {notice.errors.map(msg => (
            <p key={msg} className="text-xs text-destructive flex gap-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              {msg}
            </p>
          ))}
          {notice.warnings.map(msg => (
            <p key={msg} className="text-xs text-muted-foreground flex gap-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              {msg}
            </p>
          ))}
        </div>
      )}

      {duplicates.size > 0 && (
        <p className="text-xs text-amber-400 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          Seat{duplicates.size > 1 ? "s" : ""} {[...duplicates].join(", ")} tagged
          to more than one attendee.
        </p>
      )}

      <div className="rounded-xl border border-border overflow-x-auto">
        <table className="w-full min-w-[46rem] text-sm">
          <thead>
            <tr className="bg-secondary/50 text-left">
              <th className={th}>Name</th>
              <th className={th}>Email</th>
              <th className={cn(th, "w-40")}>Seat</th>
              <th className={cn(th, "w-40")}>Tag</th>
              <th className={cn(th, "w-12")} />
            </tr>
          </thead>
          <tbody>
            {attendees.map(attendee => {
              const isDuplicate = duplicates.has(normalizeSeatId(attendee.seatId))
              const isSelected = selectedId === attendee.id
              return (
                <tr
                  key={attendee.id}
                  onFocus={() => setSelectedId(attendee.id)}
                  onClick={() => setSelectedId(attendee.id)}
                  className={cn(
                    "border-t border-border/60 transition-colors",
                    isSelected ? "bg-primary/5" : "hover:bg-secondary/20"
                  )}
                >
                  <td className={td}>
                    <input
                      value={attendee.name}
                      onChange={e => update(attendee.id, { name: e.target.value })}
                      placeholder="Full name"
                      suppressHydrationWarning
                      className={cellInput}
                    />
                  </td>
                  <td className={td}>
                    <input
                      value={attendee.email}
                      onChange={e => update(attendee.id, { email: e.target.value })}
                      onBlur={e =>
                        update(attendee.id, {
                          email: normalizeEmail(e.target.value)
                        })
                      }
                      placeholder="name@ihhhealthcare.com"
                      autoCapitalize="none"
                      spellCheck={false}
                      suppressHydrationWarning
                      className={cellInput}
                    />
                  </td>
                  <td className={td}>
                    <select
                      value={normalizeSeatId(attendee.seatId)}
                      onChange={e => update(attendee.id, { seatId: e.target.value })}
                      className={cn(
                        cellInput,
                        "cursor-pointer",
                        isDuplicate && "text-amber-400"
                      )}
                    >
                      <option value="">— unassigned —</option>
                      {SEATS_BY_ROW.map(group => (
                        <optgroup key={group.row} label={`Row ${group.row}`}>
                          {group.seats.map(seat => (
                            <option
                              key={seat.id}
                              value={seat.id}
                              disabled={seat.isBlocked}
                            >
                              {seat.id}
                              {seat.isBlocked ? " (unavailable)" : ""}
                              {assigned.has(seat.id) &&
                              seat.id !== normalizeSeatId(attendee.seatId)
                                ? " · taken"
                                : ""}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </td>
                  <td className={td}>
                    <select
                      value={attendee.role}
                      onChange={e =>
                        update(attendee.id, {
                          role: e.target.value as AttendeeRole
                        })
                      }
                      className={cn(cellInput, "cursor-pointer")}
                    >
                      {ATTENDEE_ROLE_ORDER.map(role => (
                        <option key={role} value={role}>
                          {ATTENDEE_ROLE_LABEL[role]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={cn(td, "text-right")}>
                    <button
                      onClick={() => removeRow(attendee.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label={`Remove ${attendee.name || "attendee"}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
            {attendees.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground text-sm">
                  No attendees yet. Add a row or import a CSV.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <h3 className="text-sm font-semibold text-foreground">
            Seat plan — click a seat to tag it
          </h3>
          <p className="text-xs text-muted-foreground">
            {selected
              ? `Tagging: ${selected.name || "unnamed attendee"}`
              : "Select a row above first"}
          </p>
        </div>
        <LectureTheatreMap
          highlightSeatId={selected?.seatId}
          assignedSeatIds={assigned}
          view={MapView.FULL}
          onSelectSeat={selected ? assignSeatFromMap : undefined}
          calloutLabel={
            selected?.name ? firstNameOf(selected.name) : "Selected"
          }
          className={cn(!selected && "opacity-70")}
        />
        <MapLegend className="mt-3" />
      </div>
    </div>
  )
}

const toolbarButton =
  "flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium transition-colors hover:bg-secondary/70"
const th =
  "px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
const td = "px-2 py-1.5 align-middle"
const cellInput =
  "w-full bg-transparent px-2 py-2 rounded-lg text-sm text-foreground outline-none border border-transparent focus:border-primary/50 focus:bg-input transition-colors"
