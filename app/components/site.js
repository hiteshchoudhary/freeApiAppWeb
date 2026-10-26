"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { DOCS_URL, REPO_URL } from "../config";

// Height the docs reserve above Scalar's sticky sidebar (nav + its top margin)
export const NAV_HEIGHT = 72;

export function LogoMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="8" fill="#0071e3" />
      <path
        d="M12.5 9.5c-2 0-3 1-3 3v1.5c0 1.2-.6 2-1.8 2 1.2 0 1.8.8 1.8 2v1.5c0 2 1 3 3 3M19.5 9.5c2 0 3 1 3 3v1.5c0 1.2.6 2 1.8 2-1.2 0-1.8.8-1.8 2v1.5c0 2-1 3-3 3"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="FreeAPI home">
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight">freeAPI</span>
    </Link>
  );
}

const NAV_LINKS = [
  { label: "Explore", href: "/#explore" },
  { label: "Responses", href: "/#responses" },
  { label: "Quick start", href: "/#quick-start" },
  { label: "Open source", href: "/#open-source" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl pl-4 pr-2 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled ? "glass-thick" : "border border-transparent"
        }`}
      >
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:bg-black/[0.04] hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="FreeAPI on GitHub"
            className="grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-black/[0.04] hover:text-ink"
          >
            <Github className="size-[18px]" aria-hidden />
          </a>
          <Link
            href={DOCS_URL}
            className="rounded-full bg-azure px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-azure-hover"
          >
            Docs
          </Link>
        </div>
      </nav>
    </header>
  );
}

/** A soft pool of blue light for the glass above it to frost. */
export function Glow({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full bg-azure opacity-[0.16] blur-[110px] ${className}`}
    />
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 text-[13px] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={20} />
          <span>FreeAPI is free, open source and MIT licensed.</span>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href={DOCS_URL} className="hover:text-ink">Docs</Link>
          </li>
          <li>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/playlist?list=PLu71SKxNbfoBAaWGtn9GA2PTw0HO0tXzq"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              Video course
            </a>
          </li>
          <li>
            <a href="https://chaicode.com" target="_blank" rel="noreferrer" className="hover:text-ink">
              Made by Chaicode
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
