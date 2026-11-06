/** @type {import('next').NextConfig} */
const nextConfig = {
    /* Lets a local build go to a scratch directory (NEXT_DIST_DIR=.next-preview)
       when the default .next is locked by a running server. Vercel leaves this
       unset and gets the normal .next output. */
    distDir: process.env.NEXT_DIST_DIR || ".next",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
            },
        ],
    },
};

export default nextConfig;
