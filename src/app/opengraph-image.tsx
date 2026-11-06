import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#09090b",
                    padding: "72px 80px",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -220,
                        right: -160,
                        width: 620,
                        height: 620,
                        borderRadius: 999,
                        background:
                            "radial-gradient(circle, rgba(249,115,22,0.55) 0%, rgba(249,115,22,0) 68%)",
                    }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 64,
                            height: 64,
                            borderRadius: 18,
                            background: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
                        }}
                    >
                        <div
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: 999,
                                border: "6px solid #ffffff",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            fontSize: 34,
                            fontWeight: 600,
                            color: "#fafafa",
                            letterSpacing: -0.5,
                        }}
                    >
                        {site.name}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                    <div
                        style={{
                            fontSize: 76,
                            lineHeight: 1.05,
                            fontWeight: 700,
                            color: "#fafafa",
                            letterSpacing: -2,
                            maxWidth: 900,
                        }}
                    >
                        Everything you need, from shops you can trust.
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            color: "#a1a1aa",
                            maxWidth: 820,
                            lineHeight: 1.35,
                        }}
                    >
                        Electronics, fashion, home, beauty and grocery — one cart,
                        many vendors, cash on delivery.
                    </div>
                </div>

                <div style={{ display: "flex", gap: 14 }}>
                    {["Electronics", "Fashion", "Home", "Beauty", "Grocery"].map(
                        (label) => (
                            <div
                                key={label}
                                style={{
                                    display: "flex",
                                    padding: "12px 22px",
                                    borderRadius: 999,
                                    border: "1px solid rgba(250,250,250,0.16)",
                                    color: "#e4e4e7",
                                    fontSize: 24,
                                }}
                            >
                                {label}
                            </div>
                        )
                    )}
                </div>
            </div>
        ),
        { ...size }
    );
}