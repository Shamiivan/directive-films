import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
// import SmoothScroll from "../components/SmoothScroll"; // TEMPORARILY DISABLED
import SmoothCursor from "../components/SmoothCursor";

// Premium font pairing for DirectiveFilms
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DirectiveFilms - Driven by Purpose, Defined by Excellence",
  description: "Award-winning video production and marketing that generates measurable results",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ overflowY: 'auto' }}>
      <body className={`${playfairDisplay.variable} ${inter.variable} ${spaceMono.variable}`} style={{ overflowY: 'auto' }}>
        {/* Only render cursor on desktop */}
        {typeof window !== 'undefined' && !/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) && <SmoothCursor />}
        {children}
      </body>
    </html>
  );
}
