"use client";

import { useRef, useEffect, useState } from "react";
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
  const prevMonth = useRef(month);

  // Trigger flip animation on month change
  useEffect(() => {
    if (prevMonth.current !== month) {
      setFlipClass("calendar-flip-enter");
      const t = setTimeout(() => setFlipClass(""), 400);
      prevMonth.current = month;
      return () => clearTimeout(t);
    }
  }, [month]);

  return (
    <div
      className={cn(
        "w-full max-w-5xl",
        "rounded-lg overflow-hidden shadow-calendar",
        "bg-paper paper-texture"
      )}
      style={{ boxShadow: "var(--shadow-calendar)" }}
    >
      {/* Spiral binding at top */}
      <CalendarBinding />

      {/* Main calendar body */}
      <div className="flex flex-col md:flex-row">
        {/* ── LEFT: Hero Image ── */}
        <div className="md:w-[45%] flex-shrink-0">
          <HeroImage
            month={month}
            year={year}
            className="w-full h-56 md:h-full min-h-[280px]"
          />
        </div>

        {/* ── RIGHT: Calendar panel ── */}
        <div className="flex-1 flex flex-col">
          {/* Calendar section */}
          <div
            className={cn("p-4 md:p-6 border-b border-paper-dark", flipClass)}
          >
            {/* Navigation */}
            <CalendarNav
              year={year}
              month={month}
              isAnimating={isAnimating}
              onPrev={goToPrev}
              onNext={goToNext}
              className="mb-4"
            />

            {/* Grid */}
            <CalendarGrid
              year={year}
              month={month}
              range={range}
              hoveredDate={hoveredDate}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
            />

            {/* Range display */}
            <div className="mt-3 pt-3 border-t border-paper-dark">
              <RangeDisplay
                range={range}
                isSelectingEnd={isSelectingEnd}
                onClear={clearRange}
              />
            </div>
          </div>

          {/* Notes section */}
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

      {/* Footer */}
      <div className="border-t border-paper-dark px-6 py-2 flex items-center justify-between bg-paper-dark/40">
        <p className="text-[9px] text-ink-faint font-body tracking-widest uppercase">
          Wall Calendar
        </p>
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