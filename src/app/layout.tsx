import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galek Prompt Gallery - Descubre Prompts de IA",
  description:
    "Explora nuestra colección de imágenes creadas con IA y obtén acceso a los prompts detrás de cada obra de arte.",
  keywords: [
    "Prompts",
    "IA",
    "Inteligencia Artificial",
    "Midjourney",
    "DALL-E",
    "Stable Diffusion",
    "Arte Generativo",
    "Galek",
  ],
  authors: [{ name: "Galek" }],
  icons: {
    icon: "/logo-g.png",
  },
  openGraph: {
    title: "Galek Prompt Gallery - Prompts de IA",
    description:
      "Explora nuestra colección de imágenes creadas con IA y obtén acceso a los prompts detrás de cada obra de arte.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galek Prompt Gallery - Prompts de IA",
    description:
      "Explora nuestra colección de imágenes creadas con IA y obtén acceso a los prompts detrás de cada obra de arte.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />

        {/* Adsterra global script */}
        <Script
          id="adsterra-global"
          src="https://processesshaken.com/22/86/f2/2286f26fbcfe36e39fa84628dbc02bb5.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
