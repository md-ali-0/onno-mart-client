import NewsletterFields from "./newsletter-fields";

/** Server wrapper: the copy is static HTML, only the form hydrates. */
export default function NewsletterSection() {
    return (
        <section id="newsletter" className="scroll-mt-24 pb-10 sm:pb-14">
            <div className="container-page">
                <div className="band-tint grid items-center gap-5 rounded-2xl border px-6 py-7 sm:px-9 lg:grid-cols-2 lg:gap-10">
                    <div>
                        <h2 className="text-[22px] font-extrabold tracking-[-0.02em] sm:text-[26px]">
                            Subscribe to our newsletter
                        </h2>
                        <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                            Latest updates and offers, once a week. No spam,
                            unsubscribe anytime.
                        </p>
                    </div>

                    <NewsletterFields />
                </div>
            </div>
        </section>
    );
}
