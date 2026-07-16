type Props = {
  title: string;
  value: string;
  link?: string;
  detail?: string;
};

export default function ContactCard({ title, value, link, detail }: Props) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>

      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="card-copy whitespace-pre-line">
          {value}
        </a>
      ) : (
        <p className="card-copy whitespace-pre-line">{value}</p>
      )}

      {detail ? <p className="card-copy">{detail}</p> : null}
    </div>
  );
}
