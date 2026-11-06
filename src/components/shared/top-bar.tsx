import Link from "next/link";

/** Slim announcement strip. Centred note, service links on the right. */
export default function TopBar() {
    return (
        <div className="hidden border-b sm:block">
            <div className="container-page relative flex h-10 items-center justify-center">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Complimentary delivery on orders over ৳2,000
                </p>

                <ul className="absolute right-5 flex items-center gap-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:right-8 lg:right-10">
                    <li>
                        <Link
                            href="/user/purchased-items"
                            className="transition-colors hover:text-foreground"
                        >
                            Track order
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="transition-colors hover:text-foreground"
                        >
                            Client care
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
