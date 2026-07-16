import { Compass, Flag, Shield } from "lucide-react";
import CardTitle from "@/components/CardTitle";

const principles = [
  "Professional, stable, technical, serious, minimal, fast, trustworthy, premium.",
  "No corporate buzzwords, decorative graphics, or social-media styling.",
  "Interfaces should feel closer to GitHub, Stripe Docs, Linear, and Rust documentation.",
];

export default function AboutPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">About</span>
        <h1>One ecosystem. One operating philosophy.</h1>
        <p>
          Lioran Group exists to build infrastructure-oriented products with
          clear engineering standards. The company voice, interface rules, and
          product architecture are treated as one system.
        </p>
      </section>

      <section className="card-grid three-column">
        <article className="card">
          <CardTitle icon={Flag}>Mission</CardTitle>
          <p className="card-copy">
            Build durable software systems that remain understandable as they
            scale.
          </p>
        </article>
        <article className="card">
          <CardTitle icon={Compass}>Philosophy</CardTitle>
          <p className="card-copy">
            Engineering first. Documentation before marketing. Benchmarks and
            architecture over slogans.
          </p>
        </article>
        <article className="card">
          <CardTitle icon={Shield}>Identity</CardTitle>
          <p className="card-copy">
            Dark theme only, strict palette control, nearly square components,
            and minimal motion.
          </p>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Brand Principles</h2>
          <p>The interface is designed to communicate technical confidence.</p>
        </div>
        <ul className="rule-list">
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
