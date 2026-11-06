import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${site.name} — ${site.tagline}`,
        short_name: site.name,
        description: site.shortDescription,
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#f97316",
        categories: ["shopping", "lifestyle"],
        lang: site.language,
        icons: [
            {
                src: "/icon",
                sizes: "160x160",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/apple-icon",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}