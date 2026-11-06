import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 160, height: 160 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
                    borderRadius: 36,
                    position: "relative",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 96,
                        height: 96,
                        borderRadius: 999,
                        border: "10px solid #ffffff",
                    }}
                >
                    <div
                        style={{
                            width: 26,
                            height: 26,
                            borderRadius: 999,
                            background: "#ffffff",
                        }}
                    />
                </div>
            </div>
        ),
        { ...size }
    );
}