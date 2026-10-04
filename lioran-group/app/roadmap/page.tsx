import { Clock3 } from "lucide-react";
import CardTitle from "@/components/CardTitle";

const roadmap = [
  ["Now", "Maintain Lioran S3 (Bastion) v1 Pre-Alpha on liorans3.sbs and stabilize group navigation."],
  ["29 Oct 2026", "Release Lioran S3 (Bastion) Alpha milestone with expanded CLI and driver improvements."],
  ["Next", "Expand LDS documentation and link operational materials to LioranDB."],
  ["Later", "Publish Lioran Auth and future platform infrastructure once architecture and docs are ready."],
];

export default function RoadmapPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Roadmap</span>
        <h1>Roadmap for the public ecosystem</h1>
        <p>
          Roadmap items are grouped by technical readiness and concrete version milestones.
        </p>
      </section>

      <div className="card-grid">
        {roadmap.map(([phase, detail]) => (
          <article key={phase} className="card">
            <CardTitle icon={Clock3}>{phase}</CardTitle>
            <p className="card-copy">{detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
