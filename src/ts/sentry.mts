import * as Sentry from "@sentry/browser";

if (import.meta.env.PROD) {
    Sentry.init({
        dsn: "https://fd67b78fc5bc4a05bdd2297d68a44d08@o292714.ingest.us.sentry.io/1536614",
        release: `prototypicalpro@${__APP_VERSION__}`,
        integrations: [Sentry.captureConsoleIntegration()],
    });
}
