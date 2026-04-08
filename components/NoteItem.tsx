"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { formatDateShort } from "@/lib/calendar-utils";
import type { CalendarNote } from "@/types/calendar";

interface NoteItemProps {
  note: CalendarNote;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function NoteItem({ note, onUpdate, onDelete }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(note.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  function handleSave() {
    if (draft.trim()) {
      onUpdate(note.id, draft.trim());
    } else {
      setDraft(note.content);
    }
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSave();
    if (e.key === "Escape") {
      setDraft(note.content);
      setIsEditing(false);
    }
  }

  return (
    <div
      className={cn(
        "group relative rounded-md p-2.5 md:p-3",
        "bg-white/60 border border-paper-dark",
        "transition-all duration-150 hover:bg-white/80 hover:shadow-note"
      )}
    >
      {/* Range tag */}
      {note.rangeStart && (
        <div className="flex items-center gap-1 mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          <span className="text-[9px] font-body font-semibold tracking-wider text-accent uppercase">
            {formatDateShort(note.rangeStart)}
            {note.rangeEnd && note.rangeEnd.getTime() !== note.rangeStart.getTime()
              ? ` → ${formatDateShort(note.rangeEnd)}`
              : ""}
          </span>
        </div>
      )}

      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          rows={2}
          className={cn(
            "w-full resize-none bg-transparent",
            "text-xs font-body text-ink leading-relaxed",
            "border-0 outline-none focus:outline-none",
            "placeholder:text-ink-faint"
          )}
          placeholder="Write your note…"
        />
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          className="text-xs font-body text-ink leading-relaxed cursor-text whitespace-pre-wrap"
        >
          {note.content}
        </p>
      )}

      {/* Action buttons */}
      <div
        className={cn(
          "absolute top-2 right-2 flex items-center gap-1",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-150",
          isEditing && "opacity-100"
        )}
      >
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Edit note"
            className={cn(
              "w-5 h-5 rounded flex items-center justify-center",
              "text-ink-faint hover:text-accent hover:bg-accent-light",
              "transition-all duration-100"
            )}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M7 1.5L8.5 3L3.5 8H2V6.5L7 1.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
          className={cn(
            "w-5 h-5 rounded flex items-center justify-center",
            "text-ink-faint hover:text-danger hover:bg-danger-light",
            "transition-all duration-100"
          )}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M1 1L8 8M8 1L1 8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}