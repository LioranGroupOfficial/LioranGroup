import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BadgeHelp,
  Building2,
  FileClock,
  FileText,
  Github,
  Globe,
  LifeBuoy,
  Mail,
  MapPinned,
  Scale,
  ScrollText,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import {
  discordUrl,
  ecosystemLinks,
  footerSections,
  githubUrl,
  siteVersion,
} from "@/app/lib/site";

const footerSectionIcons: Record<string, LucideIcon> = {
  Ecosystem: Sparkles,
  Company: Building2,
  Legal: Scale,
};

const footerLinkIcons: Record<string, LucideIcon> = {
  LDS: Building2,
  "LDS Products": Sparkles,
  LioranDB: Globe,
  "Future Products": FileClock,
  Roadmap: FileClock,
  Changelog: ScrollText,
  About: BadgeHelp,
  Founder: Users,
  Careers: Users,
  Contact: Mail,
  Support: LifeBuoy,
  "Privacy Policy": Shield,
  Terms: FileText,
  License: ScrollText,
  Security: Shield,
  Status: Globe,
  Sitemap: MapPinned,
};

const utilityLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "GitHub", href: githubUrl, icon: Github },
  { label: "Discord", href: discordUrl, icon: Users },
  { label: "Email", href: "mailto:contact@lioran.group", icon: Mail },
  ...ecosystemLinks.map((link) => ({
    label: link.name,
    href: link.href,
    icon:
      link.name === "Lioran Group"
        ? Building2
        : link.name === "LDS"
          ? Sparkles
          : link.name === "LioranDB"
            ? Globe
            : Globe,
  })),
].filter(
  (link, index, allLinks) =>
    allLinks.findIndex(
      (candidate) =>
        candidate.label === link.label && candidate.href === link.href,
    ) === index,
);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell-wide site-footer-grid">
        <div className="footer-group">
          <h3>Lioran Group</h3>
          <p>
            Parent organization holding LDS. Lioran Group defines the ecosystem
            identity, while LDS builds the actual infrastructure products.
          </p>
          <p className="footer-meta">
            Version {siteVersion} · Chandrapur, Maharashtra, India
          </p>
          <p className="footer-meta">
            Contact: <a href="mailto:contact@lioran.group">contact@lioran.group</a>
          </p>
        </div>

        {footerSections.map((section) => {
          const SectionIcon = footerSectionIcons[section.title] ?? FileText;

          return (
            <div key={section.title} className="footer-group">
              <h4 className="card-title">
                <span className="card-title-inner">
                  <SectionIcon className="card-title-icon" />
                  <span>{section.title}</span>
                </span>
              </h4>
              <ul className="footer-links">
                {section.links.map((link) => {
                  const LinkIcon = footerLinkIcons[link.label] ?? FileText;

                  return (
                    <li key={link.href}>
                      <Link href={link.href} className="nav-link">
                        <LinkIcon className="footer-link-icon" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="site-shell-wide footer-utility-row">
        {utilityLinks.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon className="footer-link-icon" />
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>

      <div className="site-shell-wide">
        <p className="footer-meta">
          © {new Date().getFullYear()} Lioran Group. Parent organization of LDS
          and the Lioran ecosystem.
        </p>
      </div>
    </footer>
  );
}
