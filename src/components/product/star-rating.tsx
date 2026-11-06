import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    /** Icon edge length in pixels. Cards use a smaller size than detail pages. */
    size?: number;
    className?: string;
}

/**
 * Fractional ratings are drawn by clipping a filled row over a muted row, so
 * 4.5 shows four and a half stars instead of rounding up to five.
 */
export default function StarRating({
    rating,
    maxRating = 5,
    size = 16,
    className,
}: StarRatingProps) {
    const value = Math.max(0, Math.min(maxRating, Number(rating) || 0));
    const filled = (value / maxRating) * 100;

    const row = (color: string, fill: string) => (
        <div className="flex shrink-0 items-center gap-0.5" aria-hidden>
            {Array.from({ length: maxRating }).map((_, index) => (
                <Star
                    key={index}
                    width={size}
                    height={size}
                    strokeWidth={1.6}
                    className={cn("shrink-0", color, fill)}
                />
            ))}
        </div>
    );

    return (
        <span
            role="img"
            aria-label={`${value.toFixed(1)} out of ${maxRating} stars`}
            className={cn("relative inline-flex shrink-0", className)}
        >
            {row("text-border", "fill-border")}
            <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${filled}%` }}
            >
                {row("text-amber-500", "fill-amber-500")}
            </span>
        </span>
    );
}
