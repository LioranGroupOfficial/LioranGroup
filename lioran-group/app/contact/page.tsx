import ContactCard from "@/components/ContactCard";
import { discordUrl } from "@/app/lib/site";
import { Clock3, MapPin } from "lucide-react";
import CardTitle from "@/components/CardTitle";

export default function ContactPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Contact</span>
        <h1>Official communication channels.</h1>
        <p>
          Keep contact surfaces direct, technical, and easy to verify. No chat
          widgets. No marketing forms.
        </p>
      </section>

      <section className="card-grid three-column">
        <ContactCard
          title="General"
          value="contact@lioran.group"
          link="mailto:contact@lioran.group"
          detail="For official communication, product introductions, and partnerships."
        />
        <ContactCard
          title="Support"
          value="support@lioran.group"
          link="mailto:support@lioran.group"
          detail="For product issues, account questions, and documentation gaps."
        />
        <ContactCard
          title="Community"
          value="Discord Server"
          link={discordUrl}
          detail="Public engineering discussion and ecosystem updates."
        />
      </section>

      <section className="card-grid two-column">
        <article className="card">
          <CardTitle icon={MapPin}>Location</CardTitle>
          <p className="card-copy">Chandrapur, Maharashtra, India</p>
          <p className="card-copy">Visits are scheduled by prior appointment only.</p>
        </article>
        <article className="card">
          <CardTitle icon={Clock3}>Working Hours</CardTitle>
          <p className="card-copy">Monday to Friday</p>
          <p className="card-copy">09:00 to 17:00 IST</p>
        </article>
      </section>
    </div>
  );
}
