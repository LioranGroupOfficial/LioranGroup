import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lioran Group",
  metadataBase: new URL("https://lioran.group"),
  description:
    "Lioran Group builds infrastructure-focused products with a unified engineering-first ecosystem.",
  keywords: [
    "Lioran Group",
    "LioranDB",
    "LDS",
    "Lioran Developer Solutions",
    "Infrastructure",
    "Engineering",
  ],
  openGraph: {
    title: "Lioran Group",
    description:
      "Engineering-first products, documentation, and infrastructure built under one ecosystem.",
    images: [
      {
        url: "/Lioran-smp.png",
        width: 1200,
        height: 630,
        alt: "Lioran Group",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}else{document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
