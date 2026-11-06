import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const items = [
    {
        icon: Truck,
        title: "Free shipping",
        body: "On orders over ৳2,000",
    },
    {
        icon: ShieldCheck,
        title: "Secure payment",
        body: "SSLCommerz protected",
    },
    {
        icon: RotateCcw,
        title: "Easy returns",
        body: "7 days, no questions",
    },
    {
        icon: Headphones,
        title: "24/7 support",
        body: "Real people, every day",
    },
];

/** Four promises in one card, sitting just under the hero. */
export default function TrustStrip() {
    return (
        <section className="container-page py-5">
            <ul className="grid grid-cols-2 divide-border rounded-xl border bg-card shadow-card md:grid-cols-4 md:divide-x">
                {items.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex items-start gap-2.5 p-3 sm:items-center sm:gap-3 sm:p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary sm:h-9 sm:w-9">
                            <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[12px] font-semibold leading-tight sm:text-[13px]">
                                {title}
                            </span>
                            <span className="mt-0.5 block text-[10.5px] leading-snug text-muted-foreground sm:text-[11px]">
                                {body}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
