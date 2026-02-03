"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent"
          >
            Lioran Group
          </Link>

          {/* Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black px-4 py-2 text-sm text-white hover:bg-white/5 transition"
          >
            Menu
            <span className="relative block w-4 h-4">
              <span
                className={`absolute top-[3px] left-0 h-0.5 w-full bg-white transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-[8px] left-0 h-0.5 w-full bg-white transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute top-[13px] left-0 h-0.5 w-full bg-white transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Dropdown Menu */}
      {open && (
        <div className="fixed top-16 inset-x-0 z-40 bg-black backdrop-blur border-b border-white/10">
          <nav className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              "Home",
              "About",
              "Leadership",
              "Team",
              "Companies",
              "Products",
              "Careers",
              "Contact",
              "Legal",
            ].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-sky-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
