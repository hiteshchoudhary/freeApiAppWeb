"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { DOCS_URL, REPO_URL } from "../config";

// Height the docs reserve above Scalar's sticky sidebar (nav pill + its top margin)
export const NAV_HEIGHT = 76;

export function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#64d2ff" />
          <stop offset="100%" stopColor="#bf5af2" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#logo-grad)" />
      <rect x="1.5" y="1.5" width="37" height="37" rx="10.5" fill="none" stroke="#fff" strokeOpacity="0.35" />
      <path d="M11 26 L17 14 L29 14" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="29" cy="14" r="2.8" fill="#fff" />
      <circle cx="11" cy="26" r="2.4" fill="#fff" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="FreeAPI home">
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight text-white">freeAPI</span>
    </Link>
  );
}

const NAV_LINKS = [
  { label: "Endpoints", href: "/#endpoints" },
  { label: "Playground", href: "/#playground" },
  { label: "Docs", href: DOCS_URL },
  { label: "Learn", href: "https://www.chaicode.com/", external: true },
];

/** A floating frosted pill that stays at the top; it gets denser once the page scrolls. */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-5 rounded-full pl-4 pr-2 transition-[background-color,box-shadow] duration-300 sm:pl-5 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        <Logo />
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label} <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="rounded-full px-3.5 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={DOCS_URL}
            className="rounded-full px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            Docs
          </Link>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-white/85"
          >
            <Github className="size-4" aria-hidden />
            <span className="hidden sm:inline">GitHub</span>
            <span className="text-xs text-black/50">9.3k</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

/** The colourful backdrop the glass blurs. `dim` tones it down behind long reading pages. */
export function Wallpaper({ dim = false }) {
  return (
    <div className={`wallpaper ${dim ? "dim" : ""}`} aria-hidden>
      <span className="orb-1" />
      <span className="orb-2" />
      <span className="orb-3" />
    </div>
  );
}

export function GlassBadge({ children }) {
  return (
    <span className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/80">
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

const FOOTER_LINKS = [
  { label: "GitHub", href: REPO_URL, external: true },
  { label: "Docs", href: DOCS_URL },
  {
    label: "YouTube",
    href: "https://www.youtube.com/playlist?list=PLu71SKxNbfoBAaWGtn9GA2PTw0HO0tXzq",
    external: true,
  },
  { label: "Chaicode", href: "https://chaicode.com", external: true },
];

export function SiteFooter() {
  return (
    <footer className="px-4 pb-6 sm:px-6">
      <div className="glass mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl px-6 py-8 sm:flex-row sm:px-8">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-sm text-white/50">Free, open source and MIT licensed.</p>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-1">
          {FOOTER_LINKS.map((link) => {
            const cls =
              "rounded-full px-3 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white";
            return (
              <li key={link.label}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noreferrer" className={cls}>
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={cls}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
