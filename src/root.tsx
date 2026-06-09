import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import "./i18n";

// ... (imports remain same)
import "./globals.css";
import Preloader from "./components/Preloader";
import { EditModeProvider } from "./cms/EditModeProvider";
import { ModeToggle } from "./cms/ModeToggle";
import { EditorBar } from "./cms/EditorBar";

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const pathLang = location.pathname.split('/')[1];
  const htmlLang = pathLang === "fr" ? "fr" : "en";

  // Construct alternate links
  const pathParts = location.pathname.split('/');
  const remainingPath = pathParts.slice(2).join('/');
  const baseUrl = "https://directivefilms.com"; // Replace with actual production URL if known

  const enLink = `${baseUrl}/en/${remainingPath}`;
  const frLink = `${baseUrl}/fr/${remainingPath}`;

  return (
    <html lang={htmlLang}>
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

        {/* Fonts — Fraunces (serif display), Archivo (body), Archivo Expanded (brand caps), JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,400;9..144,0,600;9..144,0,700;9..144,1,400;9..144,1,600&family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Expanded:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body>
        <Preloader />
        <EditModeProvider>
          {children}
          <ModeToggle />
          <EditorBar status="Editing" />
        </EditModeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
