"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import { useCalendar } from "@/hooks/useCalendar";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";

import { CalendarBinding } from "./CalenderBinding";
import { HeroImage } from "./HeroImage";
import { CalendarNav } from "./CalendarNav";
import { CalendarGrid } from "./CalendarGrid";
import { RangeDisplay } from "./RangeDisplay";
import { NotesPanel } from "./NotesPanel";

export function WallCalendar() {
  const { year, month, isAnimating, goToNext, goToPrev } = useCalendar();
  const { range, hoveredDate, isSelectingEnd, handleDayClick, handleDayHover, clearRange } =
    useDateRange();
  const { notes, addNote, updateNote, deleteNote } = useNotes();

  const [flipClass, setFlipClass] = useState("");
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerFlip = useCallback(() => {
    // Restart animation if user clicks quickly
    if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);

    setFlipClass("calendar-flip-enter");
    flipTimeoutRef.current = setTimeout(() => {
      setFlipClass("");
      flipTimeoutRef.current = null;
    }, 400);
  }, []);

  // Cleanup only (no setState here)
  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    triggerFlip();
    goToPrev();
  }, [isAnimating, triggerFlip, goToPrev]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    triggerFlip();
    goToNext();
  }, [isAnimating, triggerFlip, goToNext]);

  return (
    <div
      className={cn(
        "w-full max-w-5xl",
        "rounded-lg overflow-hidden shadow-calendar",
        "bg-paper paper-texture"
      )}
      style={{ boxShadow: "var(--shadow-calendar)" }}
    >
      <CalendarBinding />

      <div className="flex flex-col md:flex-row">
        <div className="md:w-[45%] flex-shrink-0">
          <HeroImage
            month={month}
            year={year}
            className="w-full h-56 md:h-full min-h-[280px]"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className={cn("p-4 md:p-6 border-b border-paper-dark", flipClass)}>
            <CalendarNav
              year={year}
              month={month}
              isAnimating={isAnimating}
              onPrev={handlePrev}
              onNext={handleNext}
              className="mb-4"
            />

            <CalendarGrid
              year={year}
              month={month}
              range={range}
              hoveredDate={hoveredDate}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
            />

            <div className="mt-3 pt-3 border-t border-paper-dark">
              <RangeDisplay range={range} isSelectingEnd={isSelectingEnd} onClear={clearRange} />
            </div>
          </div>

          <div className="flex-1 p-4 md:p-6 min-h-[200px] md:min-h-[260px]">
            <NotesPanel
              notes={notes}
              range={range}
              onAddNote={addNote}
              onUpdateNote={updateNote}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-paper-dark px-6 py-2 flex items-center justify-between bg-paper-dark/40">
        <p className="text-[9px] text-ink-faint font-body tracking-widest uppercase">Wall Calendar</p>
        {isSelectingEnd && (
          <p className="text-[10px] text-accent font-body font-medium animate-pulse">
            Now click an end date
          </p>
        )}
        <p className="text-[9px] text-ink-faint font-body tracking-widest uppercase">
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}