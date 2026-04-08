"use client";

import { useState, useCallback } from "react";
import { isSameDay } from "date-fns";
import type { DateRange } from "@/types/calendar";

interface UseDateRangeReturn {
  range: DateRange;
  hoveredDate: Date | null;
  isSelectingEnd: boolean;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date | null) => void;
  clearRange: () => void;
}

export function useDateRange(): UseDateRangeReturn {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!isSelectingEnd || !range.start) {
        // Starting a new selection
        setRange({ start: date, end: null });
        setIsSelectingEnd(true);
      } else {
        // Completing the range
        if (isSameDay(date, range.start)) {
          // Clicking same day clears
          setRange({ start: null, end: null });
          setIsSelectingEnd(false);
        } else {
          const start = range.start < date ? range.start : date;
          const end = range.start < date ? date : range.start;
          setRange({ start, end });
          setIsSelectingEnd(false);
        }
      }
    },
    [isSelectingEnd, range.start]
  );

  const handleDayHover = useCallback((date: Date | null) => {
    setHoveredDate(date);
  }, []);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setIsSelectingEnd(false);
    setHoveredDate(null);
  }, []);

  return {
    range,
    hoveredDate,
    isSelectingEnd,
    handleDayClick,
    handleDayHover,
    clearRange,
  };
}