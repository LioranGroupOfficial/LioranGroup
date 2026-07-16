import { Clock3 } from "lucide-react";
import CardTitle from "@/components/CardTitle";

const roadmap = [
  ["Now", "Stabilize the Lioran Group public surface and ecosystem navigation."],
  ["Next", "Expand LDS documentation and link operational materials to LioranDB."],
  ["Later", "Publish future products only after architecture and docs are ready."],
];

export default function RoadmapPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Roadmap</span>
        <h1>Roadmap for the public ecosystem</h1>
        <p>
          Roadmap items are grouped by readiness rather than speculative
          marketing timelines.
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
