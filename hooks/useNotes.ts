"use client";

import { useState, useCallback } from "react";
import type { CalendarNote } from "@/types/calendar";
import { generateNoteId } from "@/lib/calendar-utils";

const STORAGE_KEY = "wall-calendar-notes";

function loadNotesFromStorage(): CalendarNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<{
      id: string;
      content: string;
      createdAt: string;
      rangeStart?: string;
      rangeEnd?: string;
    }>;
    return parsed.map((n) => ({
      ...n,
      createdAt: new Date(n.createdAt),
      rangeStart: n.rangeStart ? new Date(n.rangeStart) : undefined,
      rangeEnd: n.rangeEnd ? new Date(n.rangeEnd) : undefined,
    }));
  } catch {
    return [];
  }
}

function saveNotesToStorage(notes: CalendarNote[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Storage might be unavailable
  }
}

interface UseNotesReturn {
  notes: CalendarNote[];
  addNote: (content: string, rangeStart?: Date, rangeEnd?: Date) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
}

export function useNotes(): UseNotesReturn {
  // Lazy init: runs once on first client render (no effect + no cascading render)
  const [notes, setNotes] = useState<CalendarNote[]>(() => loadNotesFromStorage());

  const addNote = useCallback((content: string, rangeStart?: Date, rangeEnd?: Date) => {
    if (!content.trim()) return;

    const note: CalendarNote = {
      id: generateNoteId(),
      content: content.trim(),
      createdAt: new Date(),
      rangeStart,
      rangeEnd,
    };

    setNotes((prev) => {
      const updated = [...prev, note];
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  const updateNote = useCallback((id: string, content: string) => {
    setNotes((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, content } : n));
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  return { notes, addNote, updateNote, deleteNote };
}