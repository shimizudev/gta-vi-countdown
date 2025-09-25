export const DOMAIN = (() => {
  if (process.env.NODE_ENV !== "production")
    return process.env.DOMAIN ?? "http://localhost:3000";

  if (Number(process.env.VERCEL) === 1) {
    return (
      process.env.VERCEL_URL ?? process.env.DOMAIN ?? "http://localhost:3000"
    );
  }

  // biome-ignore lint/complexity/noExtraBooleanCast: Dotenv
  if (Boolean(process.env.NETLIFY)) {
    return process.env.URL ?? process.env.DOMAIN ?? "http://localhost:3000";
  }

  return process.env.DOMAIN ?? "http://localhost:3000";
})();
