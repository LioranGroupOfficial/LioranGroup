type Props = {
  title: string;
  value: string;
  link?: string;
  detail?: string;
};

export default function ContactCard({ title, value, link, detail }: Props) {
  return (
    <article className="card">
      <h3 className="card-title">{title}</h3>

      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="card-copy whitespace-pre-line text-[var(--text-link)] hover:underline">
          {value}
        </a>
      ) : (
        <p className="card-copy whitespace-pre-line">{value}</p>
      )}

      {detail ? <p className="card-copy text-sm text-[var(--muted)]">{detail}</p> : null}
    </article>
  );
}
