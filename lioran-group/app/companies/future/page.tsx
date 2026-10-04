import { ExternalLink, HardDrive, ShieldCheck } from "lucide-react";
import { lioranS3Url } from "@/app/lib/site";
import CardTitle from "@/components/CardTitle";

export default function FutureVenturesPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Product Pipeline</span>
        <h1>Product roadmap and released infrastructure.</h1>
        <p>
          New entries appear here during architecture planning and advance to active
          releases once public evaluation builds are deployed under LDS.
        </p>
      </section>

      <section className="card-grid two-column">
        <article className="card">
          <div className="flex items-center justify-between">
            <span className="badge-pill">Released v1 Pre-Alpha</span>
            <span className="text-xs font-mono text-[var(--muted)]">liorans3.sbs</span>
          </div>
          <CardTitle icon={HardDrive}>Lioran Bastion (Lioran S3)</CardTitle>
          <p className="card-copy">
            Self-hosted Rust-based object storage engine with RocksDB metadata management.
            Launched on <strong>1st Oct 2026</strong> as v1 Pre-Alpha on <span className="inline-code">liorans3.sbs</span>.
            Next major version is planned for <strong>29th Oct 2026</strong> as <strong>Alpha</strong>.
          </p>
          <div className="pt-2">
            <a
              href={lioranS3Url}
              target="_blank"
              rel="noreferrer"
              className="button-link"
            >
              <span>Open liorans3.sbs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>

        <article className="card">
          <div className="flex items-center justify-between">
            <span className="badge-pill">In Development</span>
            <span className="text-xs font-mono text-[var(--muted)]">lioransolutions.com</span>
          </div>
          <CardTitle icon={ShieldCheck}>Lioran Auth</CardTitle>
          <p className="card-copy">
            Backend authentication and identity infrastructure planned under LDS for tighter
            control, Indian data locality, and long-term platform ownership.
          </p>
          <p className="card-copy text-xs font-mono text-[var(--muted)]">
            Status: Architecture design & planning
          </p>
        </article>
      </section>
    </div>
  );
}
