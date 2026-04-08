"use client";

import { useState, useCallback } from "react";
import { getNextMonth, getPrevMonth } from "@/lib/calendar-utils";

type Direction = "next" | "prev" | null;

interface UseCalendarReturn {
  year: number;
  month: number;
  direction: Direction;
  isAnimating: boolean;
  goToNext: () => void;
  goToPrev: () => void;
}

type YearMonth = { year: number; month: number };

export function useCalendar(
  initialYear?: number,
  initialMonth?: number
): UseCalendarReturn {
  const now = new Date();

  const [current, setCurrent] = useState<YearMonth>({
    year: initialYear ?? now.getFullYear(),
    month: initialMonth ?? now.getMonth(),
  });

  const [direction, setDirection] = useState<Direction>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating) return;

      setDirection(dir);
      setIsAnimating(true);

      setTimeout(() => {
        setCurrent((prev) => (dir === "next" ? getNextMonth(prev.year, prev.month) : getPrevMonth(prev.year, prev.month)));
        setIsAnimating(false);
        setDirection(null);
      }, 350);
    },
    [isAnimating]
  );

  const goToNext = useCallback(() => navigate("next"), [navigate]);
  const goToPrev = useCallback(() => navigate("prev"), [navigate]);

  return { year: current.year, month: current.month, direction, isAnimating, goToNext, goToPrev };
}