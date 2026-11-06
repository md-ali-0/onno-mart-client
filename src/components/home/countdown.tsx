"use client";

import { useEffect, useState } from "react";

type Parts = { hours: string; minutes: string; seconds: string };

function remaining(): Parts {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const total = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));

    return {
        hours: String(Math.floor(total / 3600)).padStart(2, "0"),
        minutes: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
        seconds: String(total % 60).padStart(2, "0"),
    };
}

/**
 * Counts down to midnight. Placeholders until mounted so the server markup and
 * the first client render agree.
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
        <div className="flex items-start gap-4" aria-label="Time left today">
            {cells.map(([label, value], index) => (
                <div key={label} className="flex items-start gap-4">
                    <div className="text-center">
                        <span className="block font-display text-[26px] leading-none tabular-nums text-primary-foreground">
                            {value}
                        </span>
                        <span className="mt-1.5 block text-[8px] font-medium uppercase tracking-[0.2em] text-primary-foreground/45">
                            {label}
                        </span>
                    </div>
                    {index < cells.length - 1 && (
                        <span aria-hidden className="pt-1 text-[18px] leading-none text-primary-foreground/25">
                            :
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
