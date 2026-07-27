"use client"

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import { EventContent, ProgrammeItem } from "@/constants/event"
import { cn } from "@/lib/utils"

interface ProgrammeEditorProps {
  content: EventContent
  onChange: (next: EventContent) => void
}

function createItem(): ProgrammeItem {
  return {
    id: `prog-${Date.now().toString(36)}`,
    time: "",
    title: "",
    detail: ""
  }
}

export function ProgrammeEditor({ content, onChange }: ProgrammeEditorProps) {
  const setProgramme = (programme: ProgrammeItem[]) =>
    onChange({ ...content, programme })

  const update = (id: string, patch: Partial<ProgrammeItem>) =>
    setProgramme(
      content.programme.map(item =>
        item.id === id ? { ...item, ...patch } : item
      )
    )

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= content.programme.length) return
    const next = [...content.programme]
    ;[next[index], next[target]] = [next[target], next[index]]
    setProgramme(next)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start gap-3">
        <div className="mr-auto">
          <h2 className="text-lg font-semibold text-foreground">
            Programme lineup
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Shown as &ldquo;Today&rsquo;s Plan&rdquo; on the attendee&rsquo;s
            phone, in this order.
          </p>
        </div>
        <button
          onClick={() => setProgramme([...content.programme, createItem()])}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium transition-colors hover:bg-secondary/70"
        >
          <Plus className="w-4 h-4" />
          Add item
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {content.programme.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-[7rem_1fr_auto] gap-2 items-start rounded-xl border border-border bg-card p-3"
          >
            <input
              value={item.time}
              onChange={e => update(item.id, { time: e.target.value })}
              placeholder="12:00 PM"
              suppressHydrationWarning
              className={cn(inputClass, "tabular-nums")}
            />
            <div className="flex flex-col gap-2">
              <input
                value={item.title}
                onChange={e => update(item.id, { title: e.target.value })}
                placeholder="Item title"
                suppressHydrationWarning
                className={inputClass}
              />
              <input
                value={item.detail}
                onChange={e => update(item.id, { detail: e.target.value })}
                placeholder="Optional detail, e.g. By Dr Peter Chow"
                suppressHydrationWarning
                className={cn(inputClass, "text-xs")}
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className={iconButton}
                aria-label="Move up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => move(index, 1)}
                disabled={index === content.programme.length - 1}
                className={iconButton}
                aria-label="Move down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setProgramme(content.programme.filter(p => p.id !== item.id))
                }
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
const iconButton =
  "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
