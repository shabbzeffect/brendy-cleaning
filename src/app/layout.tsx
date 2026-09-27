import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brendyclean.com"),
  title: {
    default: "Brendy Clean Services | A cleaner home, more you time.",
    template: "%s | Brendy Clean Services",
  },
  description:
    "Vetted, insured and eco-friendly house, office and turnover cleaning across the metro and surrounding suburbs. Free quote, no card required.",
  keywords: [
    "house cleaning",
    "deep cleaning",
    "move in move out cleaning",
    "office cleaning",
    "post construction cleaning",
    "airbnb turnover",
  ],
  authors: [{ name: "Brendy Clean Services" }],
  openGraph: {
    type: "website",
    title: "Brendy Clean Services | A cleaner home, more you time.",
    description:
      "Vetted, insured and eco-friendly cleaning across the metro and surrounding suburbs. Free quote, no card required.",
    siteName: "Brendy Clean Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brendy Clean Services",
    description: "A cleaner home, more you time.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-pt-20">
      <body className="min-h-dvh bg-white font-sans text-slate-800 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-2xl focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
