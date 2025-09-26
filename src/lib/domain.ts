export const DOMAIN =
  process.env.DOMAIN ??
  process.env.VERCEL_URL ??
  process.env.URL ??
  "http://localhost:3000";
