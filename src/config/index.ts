/**
 * Single source of truth for the API origin.
 *
 * NEXT_PUBLIC_BASE_URL is inlined at build time by Next.js, so it works both in
 * server components and in the browser bundle. Set it to the deployed API URL in
 * production and to http://localhost:5000 for local development.
 */
const config = {
    host: process.env.NEXT_PUBLIC_BASE_URL,
};

export default config;
