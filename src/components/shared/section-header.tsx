import { cn } from "@/lib/utils";
import Link from "next/link";

type SectionHeaderProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    href?: string;
    linkLabel?: string;
    className?: string;
};

/** One heading treatment for every home section, instead of five variations. */
export function SectionHeader({
    eyebrow,
    title,
    description,
    href,
    linkLabel = "View all",
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8",
                className
            )}
        >
            <div>
                {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
                <h2 className="section-heading">{title}</h2>
                {description && (
                    <p className="mt-1.5 max-w-prose text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {href && (
                <Link
                    href={href}
                    className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-secondary"
                >
                    {linkLabel}
                </Link>
            )}
        </div>
    );
}

export default SectionHeader;