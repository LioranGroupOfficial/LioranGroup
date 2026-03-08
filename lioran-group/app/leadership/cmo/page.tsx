import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

/* -------------------- METADATA -------------------- */
export const metadata: Metadata = {
  title: "CMO | Saiprasad Nalamwar | Lioran Group",
  description:
    "Saiprasad Nalamwar serves as the Chief Marketing Officer (CMO) at Lioran Group, leading marketing strategy, brand positioning, and customer engagement.",
  keywords: [
    "Saiprasad Nalamwar",
    "CMO Lioran Group",
    "Chief Marketing Officer",
    "Marketing Strategy",
    "Brand Development",
    "Customer Engagement",
  ],
  openGraph: {
    title: "Saiprasad Nalamwar | Chief Marketing Officer | Lioran Group",
    description:
      "Chief Marketing Officer at Lioran Group responsible for marketing strategy, brand growth, and customer engagement.",
    type: "profile",
    images: [
      {
        url: "/founders/Saiprasad-smp.png",
        width: 1200,
        height: 630,
        alt: "Saiprasad Nalamwar - Chief Marketing Officer of Lioran Group",
      },
    ],
  },
};

/* -------------------- PAGE -------------------- */
export default function CMOPage() {
  return (
    <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <Image
          src="/founders/saiprasad-f.jpeg"
          alt="Saiprasad Nalamwar - Chief Marketing Officer of Lioran Group"
          width={160}
          height={160}
          className="rounded-2xl border border-slate-800 object-cover"
          priority
        />

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            Saiprasad Nalamwar
          </h1>

          <p className="text-sky-400 mt-2 text-lg">
            Chief Marketing Officer — Lioran Group
          </p>

          <p className="text-slate-300 mt-4 leading-relaxed">
            Saiprasad Nalamwar serves as the Chief Marketing Officer (CMO) of
            Lioran Group. He is responsible for shaping the company’s marketing
            strategy, strengthening brand presence, and building meaningful
            connections with customers. His role focuses on expanding market
            reach and ensuring that the company's messaging clearly communicates
            its vision and products.
          </p>

          {/* Social */}
          <div className="flex justify-center sm:justify-start gap-5 mt-5">
            <Link
              href="https://www.instagram.com/sai.prasad.163/"
              target="_blank"
              aria-label="Instagram"
              className="text-slate-400 hover:text-sky-400 transition"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mt-14 space-y-12">

        {/* Role */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Role & Responsibilities
          </h2>

          <p className="text-slate-300 leading-relaxed">
            As Chief Marketing Officer, Saiprasad leads the marketing direction
            of Lioran Group. His responsibilities include developing marketing
            strategies, managing brand positioning, coordinating promotional
            campaigns, and ensuring that the company's products effectively
            reach their target audience. He works closely with leadership and
            product teams to align marketing efforts with the company's overall
            business goals.
          </p>
        </section>

        {/* Focus Areas */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Marketing Focus
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
            <li>Brand development & positioning</li>
            <li>Marketing strategy planning</li>
            <li>Customer engagement</li>
            <li>Digital marketing initiatives</li>
            <li>Market research & audience insights</li>
            <li>Campaign execution & promotion</li>
          </ul>
        </section>

        {/* Philosophy */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Marketing Philosophy
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Saiprasad believes that strong brands are built through trust,
            clear communication, and consistent engagement with users. His
            approach focuses on understanding customer needs, creating
            meaningful messaging, and building long-term relationships between
            the company and its audience.
          </p>
        </section>

        {/* Impact */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Impact at Lioran Group
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Through strategic marketing and brand development, Saiprasad helps
            strengthen the public presence of Lioran Group. His work supports
            the company’s growth by ensuring its products and initiatives reach
            the right audience and communicate value clearly.
          </p>
        </section>

      </div>
    </section>
  );
}