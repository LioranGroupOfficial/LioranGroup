import { Building2, Database, ExternalLink, HardDrive, ShieldCheck } from "lucide-react";
import { lioranS3DocsUrl, lioranS3Url } from "@/app/lib/site";
import CardTitle from "@/components/CardTitle";

export default function LcsProductsPage() {
  return (
    <section className="card-grid">
      <article className="card">
        <div className="flex items-center justify-between">
          <span className="badge-pill">Current Product</span>
          <span className="text-xs font-mono text-[var(--muted)]">liorandb.com</span>
        </div>
        <CardTitle icon={Database}>LioranDB</CardTitle>
        <p className="card-copy">
          LioranDB is the primary document database product under LDS. It is positioned as an
          infrastructure-grade system with a strong focus on predictable performance,
          operational transparency, and long-term maintainability.
        </p>
        <p className="card-copy text-xs font-mono text-[var(--muted)]">
          Public domain: <span className="inline-code">liorandb.com</span>
        </p>
        <div className="pt-2">
          <a
            href="https://liorandb.com"
            target="_blank"
            rel="noreferrer"
            className="button-link"
          >
            <span>Open liorandb.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>

      <article className="card">
        <div className="flex items-center justify-between">
          <span className="badge-pill">v1 Pre-Alpha</span>
          <span className="text-xs font-mono text-[var(--muted)]">liorans3.sbs</span>
        </div>
        <CardTitle icon={HardDrive}>Lioran Bastion (Lioran S3)</CardTitle>
        <p className="card-copy">
          A self-hosted, Rust-based object storage engine built with RocksDB metadata management,
          native object APIs, expiring HMAC-SHA256 signed URLs, and FFmpeg media processing.
          Launched on <strong>1st Oct 2026</strong> as v1 Pre-Alpha on <span className="inline-code">liorans3.sbs</span>.
          The next version is planned for <strong>29th Oct 2026</strong> as <strong>Alpha</strong>.
        </p>
        <p className="card-copy text-xs font-mono text-[var(--muted)]">
          Engine: Rust · Metadata: RocksDB · Next release: 29 Oct 2026 (Alpha)
        </p>
        <div className="flex items-center gap-4 pt-2">
          <a
            href={lioranS3Url}
            target="_blank"
            rel="noreferrer"
            className="button-link"
          >
            <span>Open liorans3.sbs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={lioranS3DocsUrl}
            target="_blank"
            rel="noreferrer"
            className="button-link"
          >
            <span>Documentation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>

      <article className="card">
        <div className="flex items-center justify-between">
          <span className="badge-pill">Future Product</span>
          <span className="text-xs font-mono text-[var(--muted)]">lioransolutions.com</span>
        </div>
        <CardTitle icon={ShieldCheck}>Lioran Auth</CardTitle>
        <p className="card-copy">
          Backend authentication infrastructure planned under LDS for tighter
          control, Indian data locality, and long-term platform ownership.
        </p>
        <p className="card-copy text-xs font-mono text-[var(--muted)]">
          Status: Architecture design & planning
        </p>
      </article>

      <article className="card">
        <div className="flex items-center justify-between">
          <span className="badge-pill">Division</span>
          <span className="text-xs font-mono text-[var(--muted)]">lioransolutions.com</span>
        </div>
        <CardTitle icon={Building2}>LDS</CardTitle>
        <p className="card-copy">
          These products are engineered and operated under Lioran Developer Solutions (LDS),
          the infrastructure company of Lioran Group.
        </p>
        <div className="pt-2">
          <a
            href="https://lioransolutions.com"
            target="_blank"
            rel="noreferrer"
            className="button-link"
          >
            <span>Open lioransolutions.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>
    </section>
  );
}
