import Link from "next/link";
import { Cpu, Settings2 } from "lucide-react";
import CardTitle from "@/components/CardTitle";

const leaders = [
  {
    name: "Swaraj Puppalwar",
    role: "Founder & CTO",
    focus: "Architecture, infrastructure, product direction",
    href: "/leadership/cto",
  },
  {
    name: "Pranay Kumeriya",
    role: "COO",
    focus: "Operations, execution, coordination",
    href: "/founder",
  },
];

export default function LeadershipPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Leadership</span>
        <h1>Leadership presented as responsibilities, not profiles.</h1>
        <p>
          Public leadership surfaces follow the same system as the rest of the
          site: no portraits, no decorative cards, only role and accountability.
        </p>
      </section>

      <section className="card-grid">
        {leaders.map((leader) => (
          <article key={leader.name} className="card">
            <CardTitle icon={leader.role.includes("CTO") ? Cpu : Settings2}>
              {leader.name}
            </CardTitle>
            <p className="card-copy">{leader.role}</p>
            <p className="card-copy">{leader.focus}</p>
            <div>
              <Link href={leader.href} className="button-link">
                View details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
