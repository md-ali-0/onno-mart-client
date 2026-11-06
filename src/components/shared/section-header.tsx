import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type SectionHeaderProps = {
    /** Catalogue-style index, e.g. "01". Gives sections a printed order. */
    index?: string;
    eyebrow?: string;
    title: string;
    description?: string;
    href?: string;
    linkLabel?: string;
    className?: string;
};

/**
 * Editorial section head: a numbered meta line, the title sitting on a hairline
 * rule, and a plain arrow link. No pills, no repeated "eyebrow + h2 + button"
 * block — that pattern on every section is what made the page feel generated.
 */
export function SectionHeader({
    index,
    eyebrow,
    title,
    description,
    href,
    linkLabel = "View all",
    className,
}: SectionHeaderProps) {
    return (
        <div className={cn("mb-7 sm:mb-9", className)}>
            <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    {index && (
                        <span className="font-display text-[11px] tabular-nums text-primary">
                            {index}
                        </span>
                    )}
                    <span aria-hidden className="h-px w-6 bg-primary/40" />
                    {eyebrow && <span className="label-caps">{eyebrow}</span>}
                </div>

                {href && (
                    <Link href={href} className="link-arrow shrink-0">
                        <span>{linkLabel}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                )}
            </div>

            <div className="mt-2 border-b pb-3">
                <h2 className="section-heading">{title}</h2>
            </div>

            {description && (
                <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}

export default SectionHeader;
