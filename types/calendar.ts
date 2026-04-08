export interface DateRange {
    start: Date | null;
    end: Date | null;
}

export interface CalendarNote {
    id: string;
    content: string;
    createdAt: Date;
    rangeStart?: Date;
    rangeEnd?: Date;
}

export interface MonthData {
    year: number;
    month: number; // 0-indexed
    days: CalendarDay[];
}

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
    dayOfWeek: number; 
}

export type SelectionState = 
| "idle"
| "selecting-start"
| "selecting-end"

export interface DayStatus {
    isStart: boolean;
    isEnd: boolean;
    isInRange: boolean;
    isHovered: boolean;
}

export interface MonthImage {
    url: string;
    alt: string;
    credit?: string;
}