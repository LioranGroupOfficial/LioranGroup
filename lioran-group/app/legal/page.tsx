import Link from "next/link";
import { FileText, ReceiptText, Shield, Stamp } from "lucide-react";
import CardTitle from "@/components/CardTitle";

const links = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Use" },
  { href: "/legal/refund", label: "Refund Policy" },
  { href: "/license", label: "License" },
  { href: "/security", label: "Security" },
];

export default function LegalPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Legal</span>
        <h1>Policy surfaces for the Lioran ecosystem.</h1>
        <p>
          Legal pages stay plain, readable, and structured. No visual clutter,
          no decorative content.
        </p>
      </section>

      <section className="card-grid">
        {links.map((link) => (
          <article key={link.href} className="card">
            <CardTitle
              icon={
                link.label === "Privacy Policy"
                  ? Shield
                  : link.label === "Terms of Use"
                    ? FileText
                    : link.label === "Refund Policy"
                      ? ReceiptText
                      : Stamp
              }
            >
              {link.label}
            </CardTitle>
            <div>
              <Link href={link.href} className="button-link">
                Open page
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
