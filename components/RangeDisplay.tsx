"use client";

import { cn } from "@/lib/cn";
import { formatDateShort, formatDateFull } from "@/lib/calendar-utils";
import { differenceInDays } from "date-fns";
import type { DateRange } from "@/types/calendar";

interface RangeDisplayProps {
  range: DateRange;
  isSelectingEnd: boolean;
  onClear: () => void;
  className?: string;
}

export function RangeDisplay({
  range,
  isSelectingEnd,
  onClear,
  className,
}: RangeDisplayProps) {
  const { start, end } = range;

  if (!start && !end) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="w-2 h-2 rounded-full bg-ink-faint" />
        <p className="text-ink-muted text-xs font-body italic">
          Click a day to start selecting a range
        </p>
      </div>
    );
  }

  const dayCount = start && end ? differenceInDays(end, start) + 1 : null;

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Start date chip */}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-semibold",
            "bg-accent text-white"
          )}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {formatDateShort(start!)}
        </span>

        {/* Arrow or "select end" prompt */}
        {isSelectingEnd && !end ? (
          <span className="text-ink-muted text-xs font-body animate-pulse">
            → pick end date
          </span>
        ) : end ? (
          <>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="text-ink-faint">
              <path
                d="M0 5H12M12 5L8 1M12 5L8 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-semibold",
                "bg-accent text-white"
              )}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {formatDateShort(end)}
            </span>
            {dayCount && (
              <span className="text-ink-muted text-xs font-body">
                ({dayCount} {dayCount === 1 ? "day" : "days"})
              </span>
            )}
          </>
        ) : null}
      </div>

      {/* Clear button */}
      <button
        onClick={onClear}
        aria-label="Clear date range"
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
          "text-ink-muted hover:text-danger hover:bg-danger-light",
          "transition-all duration-150 focus-ring focus:outline-none"
        )}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M1 1L9 9M9 1L1 9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}