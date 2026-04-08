"use client";

import { cn } from "@/lib/cn";
import type { CalendarDay as CalendarDayType, DayStatus } from "@/types/calendar";

interface CalendarDayProps {
  day: CalendarDayType;
  status: DayStatus;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function CalendarDayCell({
  day,
  status,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: CalendarDayProps) {
  const { isStart, isEnd, isInRange, isHovered } = status;
  const { isCurrentMonth, isToday, isWeekend, date } = day;

  const isEndpoint = isStart || isEnd;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        // Range background spans full cell width
        isInRange && "bg-range",
        isStart && "bg-range rounded-l-full",
        isEnd && "bg-range rounded-r-full",
        // Handle single-day selection
        isStart && !isEnd && isEndpoint && "",
        isEnd && !isStart && isEndpoint && "",
      )}
    >
      <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={!isCurrentMonth}
        aria-label={date.toDateString()}
        aria-pressed={isEndpoint}
        className={cn(
          "relative z-10 w-8 h-8 md:w-9 md:h-9 rounded-full",
          "flex items-center justify-center",
          "text-xs md:text-sm font-body font-medium",
          "transition-all duration-150 ease-out",
          "focus-ring focus:outline-none",

          // Default state
          !isEndpoint && !isInRange && isCurrentMonth && !isToday &&
            "hover:bg-blue-100 hover:text-blue-700 cursor-pointer",

          // Not current month
          !isCurrentMonth && "text-ink-faint cursor-default",

          // Today marker
          isToday && !isEndpoint &&
            "ring-2 ring-blue-400 ring-offset-1 font-bold text-blue-600",

          // Weekend color
          isWeekend && isCurrentMonth && !isEndpoint && "text-weekend",

          // Hovered preview (while selecting)
          isHovered && !isEndpoint &&
            "bg-blue-100 text-blue-700 scale-105",

          // Endpoint styles
          isEndpoint && [
            "bg-accent text-white font-bold shadow-md",
            "scale-110",
            isStart && "shadow-blue-300",
            isEnd && "shadow-blue-300",
          ],
        )}
        style={{
          // Subtle pulse for today
          animation: isToday && !isEndpoint ? undefined : undefined,
        }}
      >
        {date.getDate()}

        {/* Today dot */}
        {isToday && !isEndpoint && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
        )}
      </button>
    </div>
  );
}