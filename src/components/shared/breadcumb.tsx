"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";

/** Route groups that exist only for routing, not for the visible trail. */
const HIDDEN_SEGMENTS = new Set(["category", "brand"]);

/**
 * Page masthead: the page name on the left, the trail on the right.
 * `/category/beauty-care` reads "Home > Beauty & Care" — the extra "category"
 * step was noise.
 */
const Breadcumb: FC<{ title?: string }> = ({ title: explicitTitle }) => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter(Boolean);

    const title =
        explicitTitle ??
        (pathnames[pathnames.length - 1] ?? "shop").replace(/-/g, " ");

    const trail = pathnames
        .map((value, index) => ({
            value,
            href: `/${pathnames.slice(0, index + 1).join("/")}`,
        }))
        .filter((item) => !HIDDEN_SEGMENTS.has(item.value));

    return (
        <section className="border-b">
            <div className="container-page flex flex-col gap-3 py-7 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="font-display text-[32px] capitalize leading-none tracking-[-0.02em] sm:text-[40px]">
                    {title}
                </h1>

                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        <li>
                            <Link
                                href="/"
                                className="transition-colors hover:text-foreground"
                            >
                                Home
                            </Link>
                        </li>

                        {trail.map((item, index) => {
                            const isLast = index === trail.length - 1;

                            return (
                                <Fragment key={item.href}>
                                    <li aria-hidden>
                                        <ChevronRight className="h-3 w-3" />
                                    </li>
                                    <li
                                        aria-current={isLast ? "page" : undefined}
                                        className={
                                            isLast
                                                ? "capitalize text-foreground"
                                                : "capitalize"
                                        }
                                    >
                                        {isLast ? (
                                            title
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="transition-colors hover:text-foreground"
                                            >
                                                {item.value.replace(/-/g, " ")}
                                            </Link>
                                        )}
                                    </li>
                                </Fragment>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </section>
    );
};

export default Breadcumb;
