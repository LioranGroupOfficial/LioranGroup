import type { Metadata } from "next";
import PageClient from "./pageClient";

export const metadata: Metadata = {
  title: "LDEP — Lioran Developer Environment Platform",
  description:
    "Register for early beta access to LDEP — an end-to-end developer infrastructure platform by Lioran Group.",
  keywords: [
    "LDEP",
    "Lioran",
    "Developer Platform",
    "PaaS",
    "India SaaS",
    "Backend Infrastructure",
    "P2P",
  ],
  openGraph: {
    title: "LDEP — Developer Infrastructure Platform",
    description:
      "Build faster. Deploy smarter. Scale infinitely. Join LDEP Beta.",
    type: "website",
  },
};

export default function Page() {
  return <PageClient />;
}