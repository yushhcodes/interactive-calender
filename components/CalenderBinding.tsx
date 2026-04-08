import { cn } from "@/lib/cn";

interface CalendarBindingProps {
  className?: string;
}

export function CalendarBinding({ className }: CalendarBindingProps) {
  const holes = Array.from({ length: 13 });

  return (
    <div
      className={cn(
        "relative flex items-center justify-around px-6 py-2",
        "bg-gradient-to-b from-gray-700 to-gray-800",
        "border-b-2 border-gray-900",
        className
      )}
    >
      {holes.map((_, i) => (
        <div
          key={i}
          className="binding-hole"
          style={{
            width: "18px",
            height: "18px",
          }}
        />
      ))}
    </div>
  );
}