import { Award, BriefcaseBusiness, GraduationCap, Mail, SearchCheck } from "lucide-react";
import CardTitle from "@/components/CardTitle";

const roles = [
  [
    "Full Stack Developer Intern",
    "3 months",
    "Daily 4 hours",
    "6:00 PM to 10:00 PM",
    "Unpaid internship focused on product and platform engineering.",
  ],
  [
    "Rust Developer Intern",
    "3 months",
    "Daily 4 hours",
    "6:00 PM to 10:00 PM",
    "Unpaid internship focused on systems work and infrastructure implementation.",
  ],
  [
    "Developer Support Intern",
    "3 months",
    "Daily 4 hours",
    "6:00 PM to 10:00 PM",
    "Unpaid internship focused on user support, issue handling, and developer assistance.",
  ],
];

export default function CareersPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Careers</span>
        <h1>Jobs at LDS.</h1>
        <p>
          Lioran Group itself is the parent organization. The active openings
          here are internship roles under LDS.
        </p>
      </section>

      <section className="card-grid">
        <article className="card">
          <CardTitle icon={GraduationCap}>LDS Internship Program</CardTitle>
          <p className="card-copy">
            Each internship runs for 3 months, 4 hours daily, from 6:00 PM to
            10:00 PM. These are unpaid roles.
          </p>
          <p className="card-copy">
            Interns receive certificates from Lioran Group and LDS, along with
            GitHub badges for their contribution record.
          </p>
        </article>
      </section>

      <table className="data-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Duration</th>
            <th>Commitment</th>
            <th>Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(([role, duration, commitment, time, details]) => (
            <tr key={role}>
              <td>{role}</td>
              <td>{duration}</td>
              <td>{commitment}</td>
              <td>{time}</td>
              <td>{details}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="card-grid two-column">
        <article className="card">
          <CardTitle icon={SearchCheck}>What LDS Looks For</CardTitle>
          <ul className="plain-list">
            <li>People who ship instead of just discussing shipping.</li>
            <li>Comfort with TypeScript, backend work, or systems programming depending on role.</li>
            <li>Willingness to work inside infrastructure-oriented products with discipline.</li>
            <li>Clear communication and consistent contribution habits.</li>
          </ul>
        </article>
        <article className="card">
          <CardTitle icon={Mail}>How To Apply</CardTitle>
          <p className="card-copy">
            Send role preference, work samples, GitHub profile, and a short
            introduction to <a href="mailto:careers@lioran.group">careers@lioran.group</a>.
          </p>
          <p className="card-copy">
            Mention whether you are applying for Full Stack Developer Intern,
            Rust Developer Intern, or Developer Support Intern.
          </p>
        </article>
      </section>
    </div>
  );
}
