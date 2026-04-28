import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata, type Viewport } from "next";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Analytics } from "@vercel/analytics/next"

// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
// });

import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  // ═══════════════════════════════════════════════════════════════════════════
  // BASIC METADATA
  // ═══════════════════════════════════════════════════════════════════════════
  title: {
    default: "Paw Point Clicker | Princeton's Ultimate Idle Clicker Game",
    template: "%s | Paw Point Clicker",
  },
  description:
    "Scan your prox, earn Paw Points, and build your Princeton empire! Paw Point Clicker is a free incremental idle game featuring Late Meals, Prox Scanners, Farms, Space Stations, and more. Compete on the global leaderboard, unlock 30+ achievements, and prestige your way to quadrillions of points. Play instantly—no download required!",
  applicationName: "Paw Point Clicker",
  authors: [
    {
      name: "Kevin Liu",
      url: "https://github.com/Kevin-Liu-01",
    },
  ],
  generator: "Next.js",
  keywords: [
    "Paw Point Clicker",
    "idle clicker game",
    "incremental game",
    "Princeton game",
    "prox scanner game",
    "clicker game",
    "idle game",
    "browser game",
    "free online game",
    "Cookie Clicker alternative",
    "prestige game",
    "passive income game",
    "Tiger Apps",
    "Princeton University",
    "college game",
    "Late Meal",
    "Resco",
    "space station clicker",
    "achievement game",
    "leaderboard game",
    "addictive games",
    "casual games",
    "web game",
    "no download game",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Kevin Liu",
  publisher: "Paw Point Clicker",
  category: "Games",
  classification: "Idle Clicker Game",

  // ═══════════════════════════════════════════════════════════════════════════
  // ICONS & FAVICON
  // ═══════════════════════════════════════════════════════════════════════════
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/favicon.ico", sizes: "180x180", type: "image/x-icon" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPEN GRAPH (Facebook, LinkedIn, Discord, etc.)
  // ═══════════════════════════════════════════════════════════════════════════
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Paw Point Clicker",
    title: "Paw Point Clicker | Princeton's Ultimate Idle Clicker Game 🐾",
    description:
      "Scan your prox to earn Paw Points and build your Princeton empire! Buy collectors like Late Meals, Prox Scanners, Farms, and Space Stations. Prestige to unlock multipliers, compete on the global leaderboard, and unlock 30+ achievements. Free to play in your browser!",
    images: [
      {
        url: "/images/pawpointclicker.png",
        width: 1200,
        height: 630,
        alt: "Paw Point Clicker - The addictive Princeton-themed idle clicker game",
        type: "image/png",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TWITTER CARD
  // ═══════════════════════════════════════════════════════════════════════════
  twitter: {
    card: "summary_large_image",
    site: "@kevskgs",
    title: "Paw Point Clicker 🐾 | Free Idle Clicker Game",
    description:
      "Scan your prox, collect Paw Points, and dominate the leaderboard! A Princeton-inspired incremental game with 12 collectors, prestige system, and 30+ achievements. Play free now!",
    images: ["/images/pawpointclicker.png"],
    creator: "@kevskgs",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ROBOTS & INDEXING
  // ═══════════════════════════════════════════════════════════════════════════
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL METADATA
  // ═══════════════════════════════════════════════════════════════════════════
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://pawpointclicker.vercel.app/"
  ),
  alternates: {
    canonical: "/",
  },
  other: {
    "msapplication-TileColor": "#FF6B00",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "PawPoint",
    "mobile-web-app-capable": "yes",
    "theme-color": "#FF6B00",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// VIEWPORT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF6B00" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
    // className={roboto.className}
    >
      <body>
        <Theme>
          <SessionProvider session={session}>{children}</SessionProvider>
        </Theme>
        <Analytics />
      </body>
    </html>
  );
}
