export type NavItem = {
  href: string;
  label: string;
};

export type ProductItem = {
  name: string;
  href: string;
  domain: string;
  status: string;
  owner: string;
  summary: string;
};

export const siteVersion = "v1.0";
export const discordUrl = "https://discord.gg/WsWWThjPMp";
export const githubUrl = "https://github.com/LioranGroupOfficial";
export const lioranS3Url = "https://liorans3.sbs";
export const lioranS3DocsUrl = "https://docs.liorans3.sbs";

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/founder", label: "Founder" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
];

export const ecosystemLinks = [
  { name: "Lioran Group", href: "https://lioran.group" },
  { name: "LDS", href: "https://lioransolutions.com" },
  { name: "LioranDB", href: "https://liorandb.com" },
  { name: "Lioran S3", href: lioranS3Url },
  { name: "GitHub", href: githubUrl },
  { name: "Discord", href: discordUrl },
];

export const products: ProductItem[] = [
  {
    name: "LioranDB",
    href: "/companies/lcs/products",
    domain: "liorandb.com",
    status: "Current product",
    owner: "Built under LDS",
    summary:
      "A database product under LDS focused on predictable performance, operational clarity, and infrastructure-grade reliability.",
  },
  {
    name: "Lioran Bastion (Lioran S3)",
    href: lioranS3Url,
    domain: "liorans3.sbs",
    status: "v1 Pre-Alpha",
    owner: "Built under LDS",
    summary:
      "Self-hosted Rust-based object storage engine with RocksDB metadata, signed URLs, and FFmpeg media processing. Launched 1st Oct 2026 as v1 Pre-Alpha; next Alpha release planned for 29th Oct 2026.",
  },
  {
    name: "Lioran Auth",
    href: "/companies/future",
    domain: "lioransolutions.com",
    status: "Future product",
    owner: "Planned under LDS",
    summary:
      "Backend authentication infrastructure planned for sovereignty, data locality, and tighter control over critical auth systems.",
  },
];

export const companyLinks = [
  { href: "/companies", label: "Companies" },
  { href: "/companies/lcs", label: "LDS" },
  { href: "/companies/future", label: "Future Products" },
  { href: "/products", label: "LDS Products" },
];

export const footerSections = [
  {
    title: "Ecosystem",
    links: [
      { href: "/companies/lcs", label: "LDS" },
      { href: "/products", label: "LDS Products" },
      { href: "/companies/lcs/products", label: "LioranDB" },
      { href: lioranS3Url, label: "Lioran S3 (Bastion)" },
      { href: "/companies/future", label: "Future Products" },
      { href: "/roadmap", label: "Roadmap" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/founder", label: "Founder" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
      { href: "/support", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/license", label: "License" },
      { href: "/security", label: "Security" },
      { href: "/status", label: "Status" },
      { href: "/sitemap.xml", label: "Sitemap" },
    ],
  },
];
