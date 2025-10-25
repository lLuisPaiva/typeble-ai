import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import FloatingCursor from "@/components/floating-cursor";
import type { Metadata } from 'next'; // Import Metadata type

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { // Add Metadata type
  title: "Mono - MINIMAL BRUTALIST DESIGN",
  description: "We create minimalist digital experiences that make an impact. Raw, unfiltered, and straight to the point.",
  generator: "Mohamed Djoudir",
  // Add manifest and icons metadata
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png", // Assumes apple-touch-icon.png exists in /public
  },
  // Add Open Graph metadata
  openGraph: {
    title: "Mono - MINIMAL BRUTALIST DESIGN",
    description: "We create minimalist digital experiences that make an impact. Raw, unfiltered, and straight to the point.",
    url: "https://your-website-url.com", // Replace with your actual website URL
    siteName: "Mono",
    images: [
      {
        url: "/image.png", // Path to your image in the public folder
        width: 1200, // Optional: Specify image width
        height: 630, // Optional: Specify image height
        alt: "Mono Website Preview", // Optional: Alt text for the image
      },
    ],
    locale: "en_US", // Optional: Specify locale
    type: "website", // Optional: Specify content type
  },
  // Optional: Add Twitter card metadata if needed
  twitter: {
    card: "summary_large_image",
    title: "Mono - MINIMAL BRUTALIST DESIGN",
    description: "We create minimalist digital experiences that make an impact. Raw, unfiltered, and straight to the point.",
    // creator: "@yourTwitterHandle", // Optional: Your Twitter handle
    images: ["/image.png"], // Path to your image in the public folder
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

