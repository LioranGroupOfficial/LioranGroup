import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Lioran Group",
  metadataBase: new URL("https://lioran.group"),
  description:
    "Lioran Group – Building technology-driven ventures from India. Head Office in Chandrapur, Maharashtra.",
  keywords: ["Lioran Group", "LCS", "Hushar Spreadsheet", "Lioran Cloud", "Lioran Spreadsheet", "Lioran"],
  openGraph: {
    title: "Lioran Group",
    description:
      "Lioran Group – Building technology-driven ventures from India. Head Office in Chandrapur, Maharashtra.",
    images: [
      {
        url: "/Lioran-smp.png",
        width: 1200,
        height: 630,
        alt: "Lioran Group.",
      },
    ],
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} bg-black text-slate-100 font-sans antialiased`}>
        <Header />
        <main className="min-h-screen bg-black">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
