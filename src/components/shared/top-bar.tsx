import { Truck } from "lucide-react";
import Link from "next/link";

/** Slim announcement strip above the header. Hidden on small screens. */
export default function TopBar() {
    return (
        <div className="hidden border-b bg-secondary sm:block">
            <div className="container-page flex h-9 items-center justify-between text-[11px] text-muted-foreground">
                <p className="flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-primary" aria-hidden />
                    Free delivery on orders over ৳2,000
                </p>

                <ul className="flex items-center gap-5">
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
                            Support
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="transition-colors hover:text-foreground"
                        >
                            FAQ
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
