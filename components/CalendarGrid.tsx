"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { buildMonthData, getDayStatus, WEEKDAY_LABELS } from "@/lib/calendar-utils";
import { CalendarDayCell } from "./CalendarDayCell";
import type { DateRange } from "@/types/calendar";

interface CalendarGridProps {
  year: number;
  month: number;
  range: DateRange;
  hoveredDate: Date | null;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date | null) => void;
  className?: string;
}

export function CalendarGrid({
  year,
  month,
  range,
  hoveredDate,
  onDayClick,
  onDayHover,
  className,
}: CalendarGridProps) {
  const monthData = useMemo(() => buildMonthData(year, month), [year, month]);

  return (
    <div className={cn("select-none", className)}>
      {/* Weekday header row */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={cn(
              "flex items-center justify-center",
              "text-[9px] md:text-[10px] font-body font-semibold tracking-[0.15em]",
              "h-7 md:h-8",
              // Sat and Sun are the last two (since we start from MON)
              i >= 5 ? "text-weekend" : "text-ink-muted"
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {monthData.days.map((day) => {
          const status = getDayStatus(day, range, hoveredDate);
          return (
            <CalendarDayCell
              key={day.date.toISOString()}
              day={day}
              status={status}
              onClick={() => day.isCurrentMonth && onDayClick(day.date)}
              onMouseEnter={() => day.isCurrentMonth && onDayHover(day.date)}
              onMouseLeave={() => onDayHover(null)}
            />
          );
        })}
      </div>
    </div>
  );
}