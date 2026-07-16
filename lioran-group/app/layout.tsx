import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
