const items = [
    { title: "Complimentary delivery", body: "On orders over ৳2,000" },
    { title: "Secure payment", body: "SSLCommerz protected" },
    { title: "Seven-day returns", body: "Unused items, no questions" },
    { title: "Client care", body: "9am to 9pm, every day" },
];

/** A hairline service row, not a row of cards. */
export default function TrustStrip() {
    return (
        <section className="border-b">
            <div className="container-page">
                <ul className="grid grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <li
                            key={item.title}
                            className={
                                "border-border py-6 pr-4 lg:px-8 lg:first:pl-0 lg:last:pr-0 " +
                                (index % 2 === 1 ? "border-l pl-4 lg:pl-8 " : "") +
                                (index < 2 ? "border-b lg:border-b-0 " : "") +
                                (index > 0 ? "lg:border-l" : "")
                            }
                        >
                            <p className="text-[10px] font-medium uppercase tracking-[0.18em]">
                                {item.title}
                            </p>
                            <p className="mt-1.5 text-[12px] text-muted-foreground">
                                {item.body}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
