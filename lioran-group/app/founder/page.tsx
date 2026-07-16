import {
  Award,
  BookUser,
  BriefcaseBusiness,
  ChartColumn,
  FlaskConical,
  Quote,
  Trophy,
  UserRound,
} from "lucide-react";
import CardTitle from "@/components/CardTitle";

export default function FounderPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Founder</span>
        <div
          style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/79976106?v=4"
            alt="Swaraj Puppalwar"
            width="112"
            height="112"
            style={{
              borderRadius: "999px",
              border: "1px solid var(--border)",
              objectFit: "cover",
            }}
          />
          <div style={{ display: "grid", gap: 8 }}>
            <h1>Swaraj Puppalwar</h1>
            <p className="text-soft">UltronTheAI 👾</p>
          </div>
        </div>
        <p>
          The guy who started coding at 11 and still has not touched grass
          since. Founder and CTO at Lioran Group, leading LDS and shipping real
          products instead of tweeting about them.
        </p>
      </section>

      <section className="card-grid two-column">
        <article className="card">
          <CardTitle icon={UserRound}>Huh, who is he?</CardTitle>
          <p className="card-copy">
            Swaraj Puppalwar is a full-stack developer with 2 years of real
            production experience. He writes TypeScript heavily, breaks things
            in Rust for science, and keeps multiple products alive.
          </p>
          <p className="card-copy">
            Founder and CTO at Lioran Group, leading 2 developers and advising
            startup friends when chai is involved.
          </p>
          <p className="card-copy">
            Portfolio: <a href="https://swaraj.lioransolutions.com" target="_blank" rel="noreferrer">swaraj.lioransolutions.com</a>
          </p>
          <p className="card-copy">
            GitHub Org: <a href="https://github.com/LioranGroupOfficial" target="_blank" rel="noreferrer">LioranGroupOfficial</a>
          </p>
        </article>
        <article className="card">
          <CardTitle icon={FlaskConical}>Engineering Vibe</CardTitle>
          <ul className="plain-list">
            <li>Clean code is better than fancy patterns.</li>
            <li>Ship fast, cry later, fix on weekends.</li>
            <li>"It works on my machine" is not a deployment strategy.</li>
            <li>Indian data should stay in India. Period.</li>
          </ul>
        </article>
      </section>

      <section className="card-grid two-column">
        <article className="card">
          <CardTitle icon={ChartColumn}>Platform Metrics</CardTitle>
          <ul className="plain-list">
            <li>Post-Acle: around 100 monthly readers.</li>
            <li>Vortexly: 23 friends, 17 active, 98 posts and 16 reels.</li>
            <li>Others: Rust when dangerous, Python for life-saving scripts.</li>
          </ul>
        </article>
        <article className="card">
          <CardTitle icon={BriefcaseBusiness}>Systems and Products</CardTitle>
          <ul className="plain-list">
            <li>Lioran Auth: authentication that does not sell your soul.</li>
            <li>Lioran Deployments: CI/CD that sometimes works on first try.</li>
            <li>LioranDB: lightweight local-first document DB with 10 plus pilot clients.</li>
            <li>Hushar Spreadsheet: MVP with paying customers.</li>
            <li>AiCompanion, DEAD-CORRIDOR, MeetFound, P2P-Chat, Sanyam, and more.</li>
          </ul>
        </article>
      </section>

      <section className="card-grid two-column">
        <article className="card">
          <CardTitle icon={Award}>Recognition</CardTitle>
          <ul className="plain-list">
            <li>Nagpur Post feature on May 23, 2023.</li>
            <li>Navarashtra Chandrapur Edition feature on May 23, 2023.</li>
            <li>Tarun Bharat Purva Vidarbha Edition feature on May 29, 2023.</li>
            <li>Listed among top Indian GitHub contributors and active developers.</li>
          </ul>
        </article>
        <article className="card">
          <CardTitle icon={Trophy}>Academic and Technical Achievements</CardTitle>
          <ul className="plain-list">
            <li>Crest Cyber Olympiad Western Region Rank 17.</li>
            <li>Cyber Olympiad State Rank 1.</li>
            <li>International Computer Olympiad State Rank 30.</li>
            <li>International Mathematics Olympiad State Rank 30.</li>
            <li>Participated in the 30th National Children's Science Congress.</li>
            <li>Certificate of Excellence in Exam Pe Charcha 2023.</li>
          </ul>
        </article>
      </section>

      <section className="card-grid two-column">
        <article className="card">
          <CardTitle icon={BookUser}>Connect</CardTitle>
          <ul className="plain-list">
            <li><a href="https://swaraj.lioransolutions.com" target="_blank" rel="noreferrer">Portfolio</a></li>
            <li><a href="https://lioran.group" target="_blank" rel="noreferrer">Lioran Group</a></li>
            <li><a href="https://github.com/LioranGroupOfficial" target="_blank" rel="noreferrer">GitHub Org</a></li>
            <li><a href="https://twitter.com/PuppalwarSwaraj" target="_blank" rel="noreferrer">Twitter</a></li>
          </ul>
        </article>
        <article className="card">
          <CardTitle icon={Quote}>Quote</CardTitle>
          <p className="card-copy">
            "I don't always write perfect code... but when I do, it's after 47
            failed attempts and one very strong coffee."
          </p>
        </article>
      </section>
    </div>
  );
}
