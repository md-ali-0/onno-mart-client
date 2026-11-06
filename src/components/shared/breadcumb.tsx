"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";

/**
 * Page masthead: the page name set in the display face on the left, the trail
 * on the right. The old version was a grey band with an orange breadcrumb and
 * an h3, which left every inner page without an h1.
 */
const Breadcumb: FC = () => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter((x) => x);
    const lastIndex = pathnames.length - 1;
    const title = (pathnames[lastIndex] ?? "shop").replace(/-/g, " ");

    return (
        <section className="border-b">
            <div className="container-page flex flex-col gap-3 py-7 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="font-display text-[32px] capitalize leading-none tracking-[-0.02em] sm:text-[40px]">
                    {title}
                </h1>

                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        <li>
                            <Link href="/" className="transition-colors hover:text-foreground">
                                Home
                            </Link>
                        </li>

                        {pathnames.map((value, index) => {
                            const currentPath = `/${pathnames
                                .slice(0, index + 1)
                                .join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <Fragment key={currentPath}>
                                    <li aria-hidden>
                                        <ChevronRight className="h-3 w-3" />
                                    </li>
                                    <li
                                        aria-current={isLast ? "page" : undefined}
                                        className={isLast ? "text-foreground" : undefined}
                                    >
                                        {isLast ? (
                                            value.replace(/-/g, " ")
                                        ) : (
                                            <Link
                                                href={currentPath}
                                                className="transition-colors hover:text-foreground"
                                            >
                                                {value.replace(/-/g, " ")}
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
