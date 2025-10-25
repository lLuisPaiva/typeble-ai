import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import FloatingCursor from "@/components/floating-cursor";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Typeble — Strategic Engineering Partner",
  description:
    "Typeble architects mission-critical SaaS platforms, enterprise AI solutions, retrieval-augmented generation systems, and autonomous agents for operators who cannot afford failure.",
  generator: "Typeble",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Typeble — Strategic Engineering Partner",
    description:
      "Typeble architects mission-critical SaaS platforms, enterprise AI solutions, retrieval-augmented generation systems, and autonomous agents for operators who cannot afford failure.",
    url: "https://typeble.com",
    siteName: "Typeble",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Typeble platform preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typeble — Strategic Engineering Partner",
    description:
      "Typeble architects mission-critical SaaS platforms, enterprise AI solutions, retrieval-augmented generation systems, and autonomous agents for operators who cannot afford failure.",
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning >
      <body className={`${inter.className} bg-black mx-auto max-w-[1440px]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <FloatingCursor />
      </body>
    </html>
  );
}

