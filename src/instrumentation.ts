export async function register() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  try {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || "0.1"),
      enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
    });
  } catch {
    // Sentry unavailable
  }
}
