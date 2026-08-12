import { useEffect, useState } from "react";

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hour = now?.getHours() ?? 0;
  const label =
    hour < 11 ? "MORNING MODE" : hour < 17 ? "FOCUS MODE" : hour < 21 ? "PEAK MODE" : "NIGHT MODE";

  return (
    <div className="text-shadow-soft select-none">
      <div className="whitespace-nowrap font-mono text-lg tracking-[0.12em] text-white/95 sm:text-xl">
        {now
          ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase()
          : "--:--"}
      </div>
      <div className="mt-0.5 font-mono text-[10px] tracking-[0.28em] text-white/45">{label}</div>
    </div>
  );
}