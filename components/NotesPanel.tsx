"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/cn";
import { NoteItem } from "./NoteItem";
import { formatDateShort } from "@/lib/calendar-utils";
import type { CalendarNote, DateRange } from "@/types/calendar";

interface NotesPanelProps {
  notes: CalendarNote[];
  range: DateRange;
  onAddNote: (content: string, rangeStart?: Date, rangeEnd?: Date) => void;
  onUpdateNote: (id: string, content: string) => void;
  onDeleteNote: (id: string) => void;
  className?: string;
}

export function NotesPanel({
  notes,
  range,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  className,
}: NotesPanelProps) {
  const [input, setInput] = useState("");
  const [attachRange, setAttachRange] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasRange = !!(range.start && range.end);

  function handleAdd() {
    if (!input.trim()) return;
    const rangeStart = attachRange && range.start ? range.start : undefined;
    const rangeEnd = attachRange && range.end ? range.end : undefined;
    onAddNote(input.trim(), rangeStart, rangeEnd);
    setInput("");
    setAttachRange(false);
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleAdd();
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Minimal header */}
      <div className="flex items-end justify-between mb-3">
        <h3 className="font-display text-sm font-bold text-ink tracking-wide">Notes</h3>
        <span className="text-[10px] text-ink-faint font-body">
          {notes.length} {notes.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* Input area (lined) */}
      <div className="relative mb-3">
        <div className={cn("rounded-md border border-paper-dark/60 bg-white/60")}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a note… (Ctrl+Enter to add)"
            rows={3}
            className={cn(
              "w-full bg-transparent resize-none",
              "text-xs font-body text-ink leading-relaxed",
              "px-3 pt-3 pb-1",
              "border-0 outline-none focus:outline-none",
              "placeholder:text-ink-faint",
              "note-lines"
            )}
          />

          <div className="flex items-center justify-between px-3 pb-2 pt-1">
            {hasRange ? (
              <button
                onClick={() => setAttachRange((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-body font-medium",
                  "transition-colors duration-150",
                  attachRange ? "text-accent" : "text-ink-muted hover:text-ink"
                )}
              >
                <div
                  className={cn(
                    "w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0",
                    "transition-all duration-150",
                    attachRange ? "bg-accent border-accent" : "border-ink-faint"
                  )}
                >
                  {attachRange && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path
                        d="M1 3L3 5L7 1"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                Attach to {formatDateShort(range.start!)}
                {range.end && range.end.getTime() !== range.start!.getTime()
                  ? ` – ${formatDateShort(range.end)}`
                  : ""}
              </button>
            ) : (
              <span className="text-[10px] text-ink-faint font-body italic">
                Select a range to attach
              </span>
            )}

            <button
              onClick={handleAdd}
              disabled={!input.trim()}
              className={cn(
                "px-3 py-1 rounded-md text-[11px] font-body font-semibold",
                "transition-colors duration-150",
                input.trim()
                  ? "bg-accent text-white hover:bg-blue-700"
                  : "bg-paper-dark/70 text-ink-faint cursor-not-allowed"
              )}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
        {notes.length === 0 ? (
          <div className="py-8">
            <p className="text-ink-muted text-xs font-body">No notes yet</p>
            <p className="text-ink-faint text-[10px] font-body mt-0.5">
              Add your first note above
            </p>
          </div>
        ) : (
          [...notes].reverse().map((note) => (
            <NoteItem key={note.id} note={note} onUpdate={onUpdateNote} onDelete={onDeleteNote} />
          ))
        )}
      </div>
    </div>
  );
}