import type { LucideIcon } from "lucide-react";

type CardTitleProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  as?: "h2" | "h3";
};

export default function CardTitle({
  icon: Icon,
  children,
  as = "h2",
}: CardTitleProps) {
  const Tag = as;

  return (
    <Tag className="card-title">
      <span className="card-title-inner">
        <Icon className="card-title-icon" />
        <span>{children}</span>
      </span>
    </Tag>
  );
}
