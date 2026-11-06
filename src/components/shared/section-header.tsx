import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeaderProps = {
    title: string;
    description?: string;
    href?: string;
    linkLabel?: string;
    action?: ReactNode;
    className?: string;
};

/** Serif title on the left, quiet link on the right, hairline above. */
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
                "mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t pt-7",
                className
            )}
        >
            <div>
                <h2 className="section-heading">{title}</h2>
                {description && (
                    <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {action ??
                (href && (
                    <Link href={href} className="link-arrow shrink-0 pb-1">
                        {linkLabel}
                        <ArrowRight className="h-3 w-3" aria-hidden />
                    </Link>
                ))}
        </div>
    );
}

export default SectionHeader;
