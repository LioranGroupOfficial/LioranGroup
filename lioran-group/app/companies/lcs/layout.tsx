import Link from "next/link";

const links = [
  { href: "/companies/lcs", label: "Overview" },
  { href: "/companies/lcs/products", label: "Products" },
  { href: "/companies/lcs/technology", label: "Technology" },
  { href: "/companies/lcs/roadmap", label: "Roadmap" },
  { href: "/companies/lcs/contact", label: "Contact" },
];

export default function LcsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">LDS</span>
        <h1>Lioran Developer Solutions</h1>
        <p>
          The engineering division behind product delivery, tooling, platform
          operations, and the build-out of LioranDB.
        </p>
        <p className="text-soft">Primary domain: lioransolutions.com</p>
      </section>

      <nav className="subnav" aria-label="LDS navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
