import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  isSameDay,
  isWithinInterval,
  isSameMonth,
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";

import { CalendarDay, MonthData, DayStatus, DateRange } from "@/types/calendar";

export function buildMonthData(year: number, month: number): MonthData {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(firstDay);

  // Get the full calendar grid (start from Monday)
  const calendarStart = startOfWeek(firstDay, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(lastDay, { weekStartsOn: 1 });

  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const days: CalendarDay[] = allDays.map((date) => {
    const dow = getDay(date); // 0=Sunday, 6=Saturday
    return {
      date,
      isCurrentMonth: isSameMonth(date, firstDay),
      isToday: isToday(date),
      isWeekend: dow === 0 || dow === 6,
      dayOfWeek: dow,
    };
  });

  return { year, month, days };
}

export function getDayStatus(
  day: CalendarDay,
  range: DateRange,
  hoveredDate: Date | null,
): DayStatus {
  const { start, end } = range;
  const date = day.date;

  const isStart = start ? isSameDay(date, start) : false;
  const isEnd = end ? isSameDay(date, end) : false;

  let isInRange = false;
  if (start && end) {
    const rangeStart = start < end ? start : end;
    const rangeEnd = start < end ? end : start;
    isInRange =
      isWithinInterval(date, { start: rangeStart, end: rangeEnd }) &&
      !isStart &&
      !isEnd;
  } else if (start && hoveredDate && !end) {
    const rangeStart = start < hoveredDate ? start : hoveredDate;
    const rangeEnd = start < hoveredDate ? hoveredDate : start;
    isInRange =
      isWithinInterval(date, { start: rangeStart, end: rangeEnd }) &&
      !isSameDay(date, start);
  }
  const isHovered = hoveredDate ? isSameDay(date, hoveredDate) : false;

  return { isStart, isEnd, isInRange, isHovered };
}
export function formatMonthYear(year: number, month: number): string {
  return format(new Date(year, month), "MMMM yyyy");
}

export function formatMonthOnly(year: number, month: number): string {
  return format(new Date(year, month), "MMMM");
}

export function formatYearOnly(year: number, month: number): string {
  return format(new Date(year, month), "yyyy");
}

export function formatDateShort(date: Date): string {
  return format(date, "MMM d");
}

export function formatDateFull(date: Date): string {
  return format(date, "MMMM d, yyyy");
}

export function getNextMonth(
  year: number,
  month: number,
): { year: number; month: number } {
  const next = addMonths(new Date(year, month), 1);
  return { year: next.getFullYear(), month: next.getMonth() };
}

export function getPrevMonth(
  year: number,
  month: number,
): { year: number; month: number } {
  const prev = subMonths(new Date(year, month), 1);
  return { year: prev.getFullYear(), month: prev.getMonth() };
}

export const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function generateNoteId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
