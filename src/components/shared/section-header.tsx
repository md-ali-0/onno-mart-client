import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeaderProps = {
    title: string;
    description?: string;
    href?: string;
    linkLabel?: string;
    /** Extra controls (e.g. filter pills) rendered on the right. */
    action?: ReactNode;
    className?: string;
};

/** Title on the left, "View all →" on the right. Used by every home section. */
export function SectionHeader({
    title,
    description,
    href,
    linkLabel = "View all",
    action,
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-3",
                className
            )}
        >
            <div>
                <h2 className="section-heading">{title}</h2>
                {description && (
                    <p className="mt-1 text-[13px] text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {action ??
                (href && (
                    <Link href={href} className="link-arrow shrink-0 pb-0.5">
                        {linkLabel}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                ))}
        </div>
    );
}

export default SectionHeader;
