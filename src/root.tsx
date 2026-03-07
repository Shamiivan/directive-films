import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import "./i18n";

// ... (imports remain same)
import "./globals.css";
import Preloader from "./components/Preloader";

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const location = useLocation();

  // Construct alternate links
  const pathParts = location.pathname.split('/');
  const remainingPath = pathParts.slice(2).join('/');
  const baseUrl = "https://directivefilms.com"; // Replace with actual production URL if known

  const enLink = `${baseUrl}/en/${remainingPath}`;
  const frLink = `${baseUrl}/fr/${remainingPath}`;

  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/icon.png" />

        {/* SEO: hreflang tags */}
        <link rel="alternate" hrefLang="en" href={enLink} />
        <link rel="alternate" hrefLang="fr" href={frLink} />
        <link rel="alternate" hrefLang="x-default" href={enLink} />

        <Meta />
        <Links />
      </head>
      <body>
        <Preloader />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
