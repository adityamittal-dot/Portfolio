import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";

// Archivo: a sturdy grotesque with a width axis, closer to the type of a
// printed test report than to the default developer-tool sans.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Martian Mono carries every identifier (file names, tags, data) at a
// narrow width, and the oversized numerals at its widest, heaviest cut:
// figures that read like numbers stencilled on a machine.
const martianMono = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  axes: ["wdth"],
});

const TITLE = "Aditya Mittal | Full-stack engineer";
const DESCRIPTION =
  "Aditya Mittal, a full-stack engineer who makes AI features hold up: React, Django, AI integrations, and the parts that break under load.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Aditya Mittal",
    "full stack engineer",
    "React developer",
    "Django developer",
    "AI integrations",
    "SDET",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#111315" },
  ],
};

const THEME_INIT_SCRIPT = `
  (function () {
    try {
      var stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${martianMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
