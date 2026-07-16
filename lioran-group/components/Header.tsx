"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Compass,
  Headphones,
  House,
  Info,
  Mail,
  Package,
  UserRound,
  Users,
} from "lucide-react";
import { companyLinks, discordUrl } from "@/app/lib/site";

type NavGroup = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  links: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
};

const navGroups: NavGroup[] = [
  {
    id: "explore",
    label: "Explore",
    icon: Compass,
    links: [
      { href: "/companies", label: "Companies", icon: Building2 },
      { href: "/companies/lcs", label: "LDS", icon: Building2 },
      { href: "/products", label: "Products", icon: Package },
      { href: "/companies/future", label: "Future Products", icon: Compass },
    ],
  },
  {
    id: "company",
    label: "Company",
    icon: Info,
    links: [
      { href: "/about", label: "About", icon: Info },
      { href: "/founder", label: "Founder", icon: UserRound },
      { href: "/careers", label: "Careers", icon: BriefcaseBusiness },
    ],
  },
  {
    id: "connect",
    label: "Connect",
    icon: Headphones,
    links: [
      { href: "/contact", label: "Contact", icon: Mail },
      { href: "/support", label: "Support", icon: Headphones },
      { href: discordUrl, label: "Discord", icon: Users },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("http")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-shell-wide site-header-inner">
        <div className="site-brand">
          <Link href="/" onClick={() => setOpenGroup(null)}>
            Lioran Group
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={mobileOpen}
            aria-controls="site-nav"
            onClick={() => setMobileOpen((state) => !state)}
          >
            Menu
          </button>
        </div>

        <nav
          id="site-nav"
          ref={navRef}
          className="site-nav"
          data-open={mobileOpen}
        >
          <Link
            href="/"
            className="nav-link"
            data-active={isActive(pathname, "/")}
            onClick={() => {
              setOpenGroup(null);
              setMobileOpen(false);
            }}
          >
            <House className="nav-icon" />
            <span>Home</span>
          </Link>

          {navGroups.map((group) => {
            const active = group.links.some((link) => isActive(pathname, link.href));
            const Icon = group.icon;
            const expanded = openGroup === group.id;

            return (
              <div key={group.id} className="nav-group">
                <button
                  type="button"
                  className="nav-group-trigger"
                  data-active={active}
                  aria-expanded={expanded}
                  onClick={() =>
                    setOpenGroup((current) =>
                      current === group.id ? null : group.id,
                    )
                  }
                >
                  <span className="nav-trigger-label">
                    <Icon className="nav-icon" />
                    <span>{group.label}</span>
                  </span>
                  <ChevronDown
                    className={`nav-chevron${expanded ? " is-open" : ""}`}
                  />
                </button>

                {expanded ? (
                  <div className="nav-dropdown">
                    {group.links.map((link) => {
                      const LinkIcon = link.icon;

                      return link.href.startsWith("http") ? (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="nav-link"
                          style={{ padding: "10px" }}
                          onClick={() => {
                            setOpenGroup(null);
                            setMobileOpen(false);
                          }}
                        >
                          <LinkIcon className="nav-icon" />
                          <span>{link.label}</span>
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="nav-link"
                          style={{ padding: "10px" }}
                          data-active={isActive(pathname, link.href)}
                          onClick={() => {
                            setOpenGroup(null);
                            setMobileOpen(false);
                          }}
                        >
                          <LinkIcon className="nav-icon" />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="mobile-subnav">
            {companyLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                data-active={isActive(pathname, item.href)}
                onClick={() => {
                  setOpenGroup(null);
                  setMobileOpen(false);
                }}
              >
                <Building2 className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <nav className="subnav" aria-label="Ecosystem">
          {companyLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive(pathname, item.href)}
              onClick={() => {
                setOpenGroup(null);
                setMobileOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
