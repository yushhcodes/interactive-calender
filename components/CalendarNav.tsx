"use client";

import { cn } from "@/lib/cn";
import { formatMonthYear } from "@/lib/calendar-utils";

interface CalendarNavProps {
  year: number;
  month: number;
  isAnimating: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export function CalendarNav({
  year,
  month,
  isAnimating,
  onPrev,
  onNext,
  className,
}: CalendarNavProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <button
        onClick={onPrev}
        disabled={isAnimating}
        aria-label="Previous month"
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "text-ink-muted hover:text-ink hover:bg-paper-dark",
          "transition-all duration-150 focus-ring focus:outline-none",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "group"
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-150 group-hover:-translate-x-0.5"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <h2 className="font-display text-base md:text-lg font-bold text-ink tracking-wide">
        {formatMonthYear(year, month)}
      </h2>

      <button
        onClick={onNext}
        disabled={isAnimating}
        aria-label="Next month"
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "text-ink-muted hover:text-ink hover:bg-paper-dark",
          "transition-all duration-150 focus-ring focus:outline-none",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "group"
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}