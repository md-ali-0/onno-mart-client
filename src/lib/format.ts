import { site } from "./site";

const numberFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
});

/**
 * OnnoMart trades in taka. Prices are stored as whole numbers, so no decimals
 * here — a marketplace listing that reads ৳42,999 is easier to scan than
 * ৳42,999.00.
 */
export function formatPrice(value: number): string {
    if (!Number.isFinite(value)) return `${site.currencySymbol}0`;
    return `${site.currencySymbol}${numberFormat.format(Math.round(value))}`;
}

export function discountedPrice(product: {
    price: number;
    discount?: number | null;
}): number {
    const discount = product.discount ?? 0;
    if (discount <= 0) return product.price;
    return Math.round(product.price - (product.price * discount) / 100);
}

export function savingsPercent(product: {
    price: number;
    discount?: number | null;
}): number {
    const discount = product.discount ?? 0;
    return discount > 0 ? Math.round(discount) : 0;
}

export function formatCompact(value: number): string {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);
}

export function truncate(text: string, max = 155): string {
    if (!text) return "";
    const clean = text.replace(/\s+/g, " ").trim();
    return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}