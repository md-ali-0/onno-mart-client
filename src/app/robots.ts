import type { MetadataRoute } from "next";
import { privateRoutes, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: privateRoutes,
            },
        ],
        sitemap: `${site.url}/sitemap.xml`,
        host: site.url,
    };
}