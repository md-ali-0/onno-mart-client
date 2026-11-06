"use client";

import { useEffect, useState } from "react";

type Parts = { hours: string; minutes: string; seconds: string };

function remaining(): Parts {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const diff = Math.max(0, end.getTime() - now.getTime());
    const total = Math.floor(diff / 1000);

    return {
        hours: String(Math.floor(total / 3600)).padStart(2, "0"),
        minutes: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
        seconds: String(total % 60).padStart(2, "0"),
    };
}

/**
 * Counts down to midnight. Renders placeholders until mounted so the server
 * markup and the first client render agree.
 */
export default function Countdown() {
    const [time, setTime] = useState<Parts | null>(null);

    useEffect(() => {
        setTime(remaining());
        const id = window.setInterval(() => setTime(remaining()), 1000);
        return () => window.clearInterval(id);
    }, []);

    const cells: Array<[string, string]> = [
        ["Hrs", time?.hours ?? "--"],
        ["Min", time?.minutes ?? "--"],
        ["Sec", time?.seconds ?? "--"],
    ];

    return (
        <div className="flex items-center gap-2" aria-label="Time left today">
            {cells.map(([label, value]) => (
                <div
                    key={label}
                    className="flex w-11 flex-col items-center rounded-lg bg-card/15 px-1 py-1.5 backdrop-blur"
                >
                    <span className="text-[15px] font-bold leading-none tabular-nums">
                        {value}
                    </span>
                    <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-primary-foreground/70">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}
