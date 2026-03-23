import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Youtube,
  Instagram,
  Twitter,
  Globe,
} from "lucide-react";

/* -------------------- METADATA -------------------- */
export const metadata: Metadata = {
  title: "Leadership | Lioran Group",
  description:
    "Meet the leadership team behind Lioran Group — founders driving technology, strategy, and execution.",
  keywords: [
    "Lioran Group",
    "Leadership",
    "Founders",
    "Startup Team",
    "Technology Leadership",
  ],
  openGraph: {
    title: "Leadership | Lioran Group",
    description:
      "Founders and leaders driving innovation, execution, and long-term growth at Lioran Group.",
    type: "website",
    url: "https://lioran.group/leadership",
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

/* -------------------- TYPES -------------------- */
type SocialLinks = {
  github?: string;
  youtube?: string;
  instagram?: string;
  x?: string;
  website?: string;
};

type Leader = {
  name: string;
  roles: string;
  tag: string;
  image: string;
  description: string;
  background: string;
  focus: string;
  socials: SocialLinks;
};

/* -------------------- DATA -------------------- */
const leaders: Leader[] = [
  {
    name: "Swaraj Puppalwar",
    roles: "Co-Founder & CTO",
    tag: "cto",
    image: "/founders/swaraj-f.jpeg",
    description:
      "Technology-driven builder focused on scalable systems, software architecture, and long-term technological innovation.",
    background: "Full-stack engineering, systems design",
    focus: "Platform architecture, engineering culture",
    socials: {
      github: "https://github.com/UltronTheAI",
      youtube: "https://youtube.com/@proepiccoder",
      instagram: "https://instagram.com/pro_epic_programmer",
      x: "https://x.com/PuppalwarSwaraj",
      website: "https://swarajpuppalwar.onrender.com",
    },
  },
];

/* -------------------- ICON MAP -------------------- */
const socialIconMap = {
  github: Github,
  youtube: Youtube,
  instagram: Instagram,
  x: Twitter,
  website: Globe,
};

/* -------------------- PAGE -------------------- */
export default function LeadershipPage() {
  return (
    <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">Leadership</h1>
        <p className="text-slate-400 mt-3 max-w-2xl mx-auto sm:mx-0">
          The people responsible for building, scaling, and guiding Lioran
          Group.
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {leaders.map((leader) => (
          <div
            key={leader.name}
            className="bg-black border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:border-slate-700 transition"
          >
            {/* Image */}
            <div className="flex justify-center sm:justify-start shrink-0">
              <Image
                src={leader.image}
                alt={leader.name}
                width={300}
                height={150}
                className="rounded-xl object-cover border border-slate-800"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold">{leader.name}</h2>

              <p className="text-sky-400 text-sm mt-1">
                {leader.roles}
              </p>

              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                {leader.description}
              </p>

              <p className="text-slate-400 text-sm mt-3">
                <span className="text-slate-300">Background:</span>{" "}
                {leader.background}
              </p>

              <p className="text-slate-400 text-sm">
                <span className="text-slate-300">Focus:</span>{" "}
                {leader.focus}
              </p>

              {/* Social Icons */}
              <div className="flex justify-center sm:justify-start gap-5 mt-4">
                {Object.entries(leader.socials).map(([key, value]) => {
                  if (!value) return null;

                  const Icon =
                    socialIconMap[key as keyof typeof socialIconMap];

                  return (
                    <Link
                      key={key}
                      href={value}
                      target="_blank"
                      aria-label={`${leader.name} ${key}`}
                      className="text-slate-400 hover:text-sky-400 transition"
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-slate-800 my-4"></div>

              {/* View more */}
              <div className="flex justify-center sm:justify-start">
                <Link
                  href={`/leadership/${leader.tag}`}
                  className="text-slate-400 hover:text-sky-400 transition"
                >
                  View more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}