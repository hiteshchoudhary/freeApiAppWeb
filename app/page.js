"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Terminal,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

const BASE_URL = "https://api.freeapi.app";
const DOCS_URL = "https://api.freeapi.app";
const REPO_URL = "https://github.com/hiteshchoudhary/apihub";

/* ─────────────── animation helpers ─────────────── */

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─────────────── reusable bits ─────────────── */

function GradientBorder({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-400/40 via-violet-500/30 to-lime-400/30 opacity-50 blur-sm" />
      <div className="relative rounded-2xl surface">{children}</div>
    </div>
  );
}

function SectionLabel({ children, color = "cyan" }) {
  const colorMap = {
    cyan: "text-cyan-300 bg-cyan-400/5 border-cyan-400/20",
    lime: "text-lime-300 bg-lime-400/5 border-lime-400/20",
    violet: "text-violet-300 bg-violet-400/5 border-violet-400/20",
  };
  return (
    <span
      className={`chip ${colorMap[color]}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full pulse-soft"
        style={{ background: "currentColor" }}
      />
      {children}
    </span>
  );
}

/* ─────────────── Top nav ─────────────── */

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-4">
        <div className="surface rounded-2xl flex items-center justify-between px-4 sm:px-5 py-3">
          <a href="#top" className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <span
              className="text-[15px] tracking-tight font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              freeAPI<span className="text-cyan-400">.</span>
              <span className="text-slate-400 font-normal">app</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-[13px] text-slate-300">
            <a href="#endpoints" className="hover:text-white transition">Endpoints</a>
            <a href="#anatomy" className="hover:text-white transition">Anatomy</a>
            <a href="#playground" className="hover:text-white transition">Playground</a>
            <a href="#why" className="hover:text-white transition">Why</a>
            <a href={DOCS_URL} target="_blank" rel="noreferrer" className="hover:text-white transition inline-flex items-center gap-1">
              Docs <ArrowUpRight size={13} />
            </a>
          </nav>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[13px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-3 py-1.5 rounded-xl transition"
          >
            <Github size={14} />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="text-slate-400">9.3k</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────── Brand mark (animated SVG) ─────────────── */

function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="lg-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="60%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#lg-mark)" opacity="0.18" />
      <path
        d="M11 25 L17 13 L29 13"
        stroke="url(#lg-mark)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="29" cy="13" r="2.6" fill="#a3e635">
        <animate attributeName="r" values="2.6;3.6;2.6" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="11" cy="25" r="2.2" fill="#22d3ee" />
    </svg>
  );
}

/* ─────────────── Hero centerpiece SVG: API constellation ─────────────── */

function ConstellationSVG() {
  const nodes = [
    { x: 80, y: 70, label: "GET /users", color: "#22d3ee" },
    { x: 360, y: 50, label: "POST /todos", color: "#a3e635" },
    { x: 540, y: 130, label: "GET /products", color: "#f472b6" },
    { x: 520, y: 320, label: "POST /login", color: "#a855f7" },
    { x: 300, y: 380, label: "GET /quotes", color: "#22d3ee" },
    { x: 70, y: 300, label: "GET /jokes", color: "#a3e635" },
  ];
  const hub = { x: 300, y: 210 };

  return (
    <svg
      viewBox="0 0 600 440"
      className="w-full h-auto"
      role="img"
      aria-label="Animated diagram of FreeAPI endpoints orbiting a central hub"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#a3e635" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
        </linearGradient>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* orbit rings */}
      <g className="orbit-slow" style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}>
        <circle
          cx={hub.x}
          cy={hub.y}
          r="170"
          fill="none"
          stroke="rgba(148,163,184,0.18)"
          strokeDasharray="2 6"
        />
      </g>
      <g className="orbit-fast" style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}>
        <circle
          cx={hub.x}
          cy={hub.y}
          r="120"
          fill="none"
          stroke="rgba(34,211,238,0.18)"
          strokeDasharray="1 7"
        />
      </g>

      {/* hub glow */}
      <circle cx={hub.x} cy={hub.y} r="120" fill="url(#hub-glow)" />

      {/* connecting paths */}
      {nodes.map((n, i) => {
        const cx = (n.x + hub.x) / 2;
        const cy = (n.y + hub.y) / 2 - 30;
        const d = `M${n.x},${n.y} Q${cx},${cy} ${hub.x},${hub.y}`;
        return (
          <g key={i}>
            <path
              d={d}
              stroke="url(#line-grad)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.7"
            />
            <path
              d={d}
              stroke={n.color}
              strokeWidth="1.4"
              fill="none"
              className="dash-flow"
              style={{ animationDuration: `${3 + i * 0.4}s`, opacity: 0.85 }}
            />
            <circle r="3" fill={n.color} filter="url(#soft-glow)">
              <animateMotion dur={`${3.2 + i * 0.4}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => {
        const labelW = n.label.length * 6.4 + 14;
        const onLeft = n.x > hub.x;
        const dx = onLeft ? -(labelW + 22) : 22;
        const textX = onLeft ? labelW - 7 : 7;
        return (
          <g key={`n-${i}`}>
            <circle cx={n.x} cy={n.y} r="18" fill="#0a0f1f" stroke={n.color} strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="5" fill={n.color} className="pulse-soft" />
            <g transform={`translate(${n.x + dx}, ${n.y + 4})`}>
              <rect
                x="0"
                y="-12"
                rx="6"
                ry="6"
                width={labelW}
                height="22"
                fill="rgba(10,15,31,0.85)"
                stroke="rgba(148,163,184,0.18)"
              />
              <text
                x={textX}
                y="3"
                textAnchor={onLeft ? "end" : "start"}
                fill="#cbd5e1"
                fontSize="10.5"
                fontFamily="var(--font-mono)"
              >
                {n.label}
              </text>
            </g>
          </g>
        );
      })}

      {/* hub */}
      <g>
        <circle cx={hub.x} cy={hub.y} r="40" fill="#0a0f1f" stroke="rgba(34,211,238,0.4)" />
        <circle cx={hub.x} cy={hub.y} r="40" fill="none" stroke="#22d3ee" strokeOpacity="0.6">
          <animate attributeName="r" values="40;52;40" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <text
          x={hub.x}
          y={hub.y - 4}
          textAnchor="middle"
          fill="#e6edf6"
          fontSize="12"
          fontFamily="var(--font-display)"
          fontWeight="700"
        >
          freeAPI
        </text>
        <text
          x={hub.x}
          y={hub.y + 11}
          textAnchor="middle"
          fill="#67e8f9"
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
        >
          v1 · public
        </text>
      </g>
    </svg>
  );
}

/* ─────────────── Hero ─────────────── */

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg fade-radial opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={rise} className="mb-5">
            <SectionLabel color="cyan">open-source · community-built</SectionLabel>
          </motion.div>
          <motion.h1
            variants={rise}
            className="text-[44px] sm:text-6xl lg:text-[72px] leading-[1.02] tracking-tight font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Real APIs to{" "}
            <span className="text-gradient">practice</span>,<br />
            build, and <span className="text-gradient-cool">ship</span>.
          </motion.h1>
          <motion.p
            variants={rise}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-300"
          >
            FreeAPI is a hub of production-style endpoints — auth, e-commerce, social,
            todos, and dozens more — so you can learn API integration on the same
            patterns you ship to production. No keys. No quotas. Just{" "}
            <code className="text-cyan-300 font-mono text-[15px]">curl</code> and go.
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-medium text-slate-900 bg-gradient-to-r from-cyan-300 via-lime-300 to-emerald-300 hover:from-cyan-200 hover:to-lime-200 transition"
            >
              <BookOpen size={16} />
              Read the docs
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition" />
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition"
            >
              <Github size={16} />
              Star the repo
              <span className="ml-1 text-slate-400 text-[12px] font-mono">★ 9.3k</span>
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-10 flex items-center gap-6 text-[12px] text-slate-400 font-mono"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-soft" />
              api online
            </span>
            <span>·</span>
            <span>50+ endpoints</span>
            <span>·</span>
            <span>MIT license</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          <ConstellationSVG />
        </motion.div>
      </div>

      {/* Endpoint marquee */}
      <div className="relative mt-16 sm:mt-24 border-y border-white/[0.06] bg-black/30 overflow-hidden">
        <div className="py-4">
          <div className="marquee-track text-[12px] font-mono text-slate-400">
            {[...Array(2)].map((_, k) => (
              <span key={k} className="inline-flex items-center gap-10">
                {[
                  "GET /api/v1/public/quotes/random",
                  "GET /api/v1/public/randomusers",
                  "GET /api/v1/public/randomjokes",
                  "GET /api/v1/public/randomproducts",
                  "POST /api/v1/users/login",
                  "GET /api/v1/ecommerce/categories",
                  "POST /api/v1/todos",
                  "GET /api/v1/kitchen-sink/http-methods/get",
                  "POST /api/v1/social-media/posts",
                  "GET /api/v1/public/meals",
                  "GET /api/v1/public/dogs",
                  "GET /api/v1/public/books",
                ].map((p, i) => (
                  <span key={`${k}-${i}`} className="inline-flex items-center gap-3">
                    <span className="text-cyan-300/80">{p.split(" ")[0]}</span>
                    <span className="text-slate-400">{p.split(" ")[1]}</span>
                    <span className="text-slate-700">/</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Endpoint category icons (custom SVG) ─────────────── */

function IconShop() {
  return (
    <svg viewBox="0 0 56 56" className="w-12 h-12">
      <defs>
        <linearGradient id="ig-shop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect x="6" y="14" width="44" height="34" rx="6" fill="none" stroke="url(#ig-shop)" strokeWidth="1.6" />
      <path d="M18 14 V10 a10 10 0 0 1 20 0 V14" fill="none" stroke="url(#ig-shop)" strokeWidth="1.6" />
      <circle cx="22" cy="26" r="2" fill="#22d3ee">
        <animate attributeName="cy" values="26;30;26" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="34" cy="26" r="2" fill="#a855f7">
        <animate attributeName="cy" values="26;30;26" dur="2.4s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function IconAuth() {
  return (
    <svg viewBox="0 0 56 56" className="w-12 h-12">
      <defs>
        <linearGradient id="ig-auth" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3e635" /><stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M28 8 L46 16 V28 C46 38 38 46 28 50 C18 46 10 38 10 28 V16 Z"
        fill="none" stroke="url(#ig-auth)" strokeWidth="1.6" />
      <circle cx="28" cy="26" r="4" fill="none" stroke="#a3e635" strokeWidth="1.6" />
      <path d="M28 30 V36" stroke="#a3e635" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="28" cy="26" r="4" fill="#a3e635" opacity="0">
        <animate attributeName="opacity" values="0;0.4;0" dur="2.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function IconTodo() {
  return (
    <svg viewBox="0 0 56 56" className="w-12 h-12">
      <defs>
        <linearGradient id="ig-todo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect x="10" y="8" width="36" height="40" rx="5" fill="none" stroke="url(#ig-todo)" strokeWidth="1.6" />
      <path d="M16 20 H40 M16 28 H40 M16 36 H32" stroke="rgba(203,213,225,0.4)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 19 l3 3 l5 -6" fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dasharray" values="0 20;20 0" dur="1.8s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function IconSocial() {
  return (
    <svg viewBox="0 0 56 56" className="w-12 h-12">
      <defs>
        <linearGradient id="ig-social" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="20" r="6" fill="none" stroke="url(#ig-social)" strokeWidth="1.6" />
      <circle cx="40" cy="14" r="5" fill="none" stroke="url(#ig-social)" strokeWidth="1.6" />
      <circle cx="42" cy="40" r="6" fill="none" stroke="url(#ig-social)" strokeWidth="1.6" />
      <path d="M21 22 L36 16 M22 24 L37 38" stroke="rgba(148,163,184,0.5)" strokeWidth="1.2" strokeDasharray="2 3" />
      <circle r="2" fill="#22d3ee"><animateMotion dur="2.6s" repeatCount="indefinite" path="M21 22 L36 16" /></circle>
      <circle r="2" fill="#f472b6"><animateMotion dur="3s" repeatCount="indefinite" path="M22 24 L37 38" /></circle>
    </svg>
  );
}

function IconPublic() {
  return (
    <svg viewBox="0 0 56 56" className="w-12 h-12">
      <defs>
        <linearGradient id="ig-pub" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3e635" /><stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="18" fill="none" stroke="url(#ig-pub)" strokeWidth="1.6" />
      <ellipse cx="28" cy="28" rx="18" ry="8" fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth="1.2" />
      <ellipse cx="28" cy="28" rx="8" ry="18" fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth="1.2" />
      <g className="orbit-fast" style={{ transformOrigin: "28px 28px" }}>
        <circle cx="46" cy="28" r="2.4" fill="#a3e635" />
      </g>
    </svg>
  );
}

function IconKitchen() {
  return (
    <svg viewBox="0 0 56 56" className="w-12 h-12">
      <defs>
        <linearGradient id="ig-ks" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="8" y="14" width="40" height="32" rx="4" fill="none" stroke="url(#ig-ks)" strokeWidth="1.6" />
      <path d="M8 22 H48" stroke="rgba(148,163,184,0.4)" strokeWidth="1.2" />
      <circle cx="13" cy="18" r="1.4" fill="#f472b6" />
      <circle cx="18" cy="18" r="1.4" fill="#a3e635" />
      <circle cx="23" cy="18" r="1.4" fill="#22d3ee" />
      <text x="14" y="34" fill="#cbd5e1" fontSize="6" fontFamily="var(--font-mono)">GET POST</text>
      <text x="14" y="42" fill="#67e8f9" fontSize="6" fontFamily="var(--font-mono)">PUT DELETE</text>
      <rect x="40" y="30" width="4" height="4" fill="#a3e635">
        <animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

/* ─────────────── Endpoints section ─────────────── */

function Endpoints() {
  const cats = [
    {
      icon: <IconPublic />, name: "Public", count: "30+ endpoints",
      desc: "Quotes, jokes, meals, books, dogs, random users, products — perfect first calls.",
      sample: ["GET /public/quotes/random", "GET /public/meals", "GET /public/books"],
    },
    {
      icon: <IconAuth />, name: "Authentication", count: "8 endpoints",
      desc: "Register, login, refresh tokens, OAuth flows. Real JWT behaviour, not a demo.",
      sample: ["POST /users/register", "POST /users/login", "POST /users/refresh-token"],
    },
    {
      icon: <IconShop />, name: "E-commerce", count: "20+ endpoints",
      desc: "Carts, products, categories, addresses, orders, coupons — the full transaction loop.",
      sample: ["GET /ecommerce/products", "POST /ecommerce/cart/item/:id", "POST /ecommerce/orders"],
    },
    {
      icon: <IconTodo />, name: "Todos", count: "6 endpoints",
      desc: "A classic CRUD playground — your first end-to-end app, fully working.",
      sample: ["GET /todos", "POST /todos", "PATCH /todos/:id"],
    },
    {
      icon: <IconSocial />, name: "Social Media", count: "15+ endpoints",
      desc: "Posts, comments, bookmarks, likes, follows — model a tiny Twitter in a weekend.",
      sample: ["GET /social-media/posts", "POST /social-media/comments/post/:id"],
    },
    {
      icon: <IconKitchen />, name: "Kitchen Sink", count: "All HTTP verbs",
      desc: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS — test every client behaviour.",
      sample: ["GET /kitchen-sink/http-methods/get", "POST /kitchen-sink/http-methods/post"],
    },
  ];

  return (
    <section id="endpoints" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.div variants={rise}>
            <SectionLabel color="lime">/explore the surface area</SectionLabel>
          </motion.div>
          <motion.h2
            variants={rise}
            className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Six lanes. <span className="text-gradient">Fifty-plus endpoints.</span>
          </motion.h2>
          <motion.p variants={rise} className="mt-4 max-w-2xl text-slate-300 text-[16px]">
            Each category mirrors a real backend you might build — so the skills carry over
            the moment you start your own project.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cats.map((c) => (
            <motion.article
              key={c.name}
              variants={rise}
              className="surface surface-hover rounded-2xl p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                {c.icon}
                <span className="chip">{c.count}</span>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.name}
              </h3>
              <p className="text-[14px] text-slate-400 leading-relaxed">{c.desc}</p>
              <ul className="mt-5 pt-5 border-t border-white/[0.06] space-y-1.5">
                {c.sample.map((s) => (
                  <li key={s} className="text-[12px] font-mono text-slate-400 flex items-center gap-2">
                    <span className="text-cyan-400/80">›</span>
                    <span className="truncate">{s}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Request anatomy / flow SVG ─────────────── */

function RequestFlowSVG() {
  return (
    <svg viewBox="0 0 760 260" className="w-full h-auto">
      <defs>
        <linearGradient id="rf-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="rf-line-back" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="rf-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Client box */}
      <g>
        <rect x="20" y="60" width="160" height="140" rx="14" fill="rgba(10,15,31,0.7)" stroke="rgba(34,211,238,0.4)" />
        <text x="100" y="86" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="var(--font-mono)">your app</text>
        <g transform="translate(40,108)">
          <rect width="120" height="22" rx="5" fill="rgba(34,211,238,0.08)" />
          <text x="10" y="15" fill="#67e8f9" fontSize="11" fontFamily="var(--font-mono)">fetch(url)</text>
        </g>
        <g transform="translate(40,138)">
          <rect width="120" height="22" rx="5" fill="rgba(163,230,53,0.08)" />
          <text x="10" y="15" fill="#bef264" fontSize="11" fontFamily="var(--font-mono)">await res</text>
        </g>
        <g transform="translate(40,168)">
          <rect width="120" height="22" rx="5" fill="rgba(168,85,247,0.08)" />
          <text x="10" y="15" fill="#d8b4fe" fontSize="11" fontFamily="var(--font-mono)">render(data)</text>
        </g>
      </g>

      {/* Server box */}
      <g>
        <rect x="580" y="60" width="160" height="140" rx="14" fill="rgba(10,15,31,0.7)" stroke="rgba(168,85,247,0.4)" />
        <text x="660" y="86" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="var(--font-mono)">api.freeapi.app</text>
        <g transform="translate(600, 100)">
          <circle cx="8" cy="8" r="3" fill="#22d3ee" />
          <text x="20" y="12" fill="#cbd5e1" fontSize="11" fontFamily="var(--font-mono)">/quotes</text>
          <circle cx="8" cy="28" r="3" fill="#a3e635" />
          <text x="20" y="32" fill="#cbd5e1" fontSize="11" fontFamily="var(--font-mono)">/products</text>
          <circle cx="8" cy="48" r="3" fill="#f472b6" />
          <text x="20" y="52" fill="#cbd5e1" fontSize="11" fontFamily="var(--font-mono)">/login</text>
          <circle cx="8" cy="68" r="3" fill="#a855f7" />
          <text x="20" y="72" fill="#cbd5e1" fontSize="11" fontFamily="var(--font-mono)">/todos</text>
        </g>
      </g>

      {/* request path */}
      <path id="req-path" d="M180 110 C 320 70, 440 70, 580 110" fill="none" stroke="url(#rf-line)" strokeWidth="1.6" strokeDasharray="4 6" />
      <text x="380" y="60" textAnchor="middle" fill="#67e8f9" fontSize="11" fontFamily="var(--font-mono)">
        GET /api/v1/public/quotes/random
      </text>
      <circle r="5" fill="#22d3ee" filter="url(#rf-glow)">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#req-path" />
        </animateMotion>
      </circle>

      {/* response path */}
      <path id="res-path" d="M580 150 C 440 190, 320 190, 180 150" fill="none" stroke="url(#rf-line-back)" strokeWidth="1.6" strokeDasharray="4 6" />
      <text x="380" y="220" textAnchor="middle" fill="#bef264" fontSize="11" fontFamily="var(--font-mono)">
        200 OK · application/json
      </text>
      <circle r="5" fill="#a3e635" filter="url(#rf-glow)">
        <animateMotion dur="3s" begin="1.4s" repeatCount="indefinite">
          <mpath href="#res-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}

function Anatomy() {
  return (
    <section id="anatomy" className="relative py-24 sm:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={rise}>
              <SectionLabel color="violet">{"// how it flows"}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={rise}
              className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              From <span className="text-gradient-cool">fetch</span> to{" "}
              <span className="text-gradient-cool">render</span> — the same{" "}
              shape as production.
            </motion.h2>
            <motion.p variants={rise} className="mt-5 text-slate-300 text-[16px] leading-relaxed">
              Every endpoint returns a consistent envelope: a status code, a
              human-readable message, and a typed{" "}
              <code className="font-mono text-cyan-300">data</code> payload. So when you
              move to your own backend, the contract you learned still holds.
            </motion.p>
            <motion.ul variants={rise} className="mt-7 space-y-3">
              {[
                "Predictable response envelope across all routes",
                "Pagination metadata where it matters",
                "Real error shapes — 400s, 401s, 404s, 422s",
                "Cookie & bearer auth, both supported",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14px] text-slate-300">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <GradientBorder>
              <div className="p-6 sm:p-8">
                <RequestFlowSVG />
              </div>
            </GradientBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Playground (typing curl + JSON response) ─────────────── */

function useTypewriter(text, speed = 22, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

function Playground() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const cmd = "curl https://api.freeapi.app/api/v1/public/quotes/random";
  const typed = useTypewriter(cmd, 24, inView);
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typed.length === cmd.length) {
      const t = setTimeout(() => setShowJson(true), 500);
      return () => clearTimeout(t);
    }
  }, [typed, cmd.length]);

  const copy = async () => {
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="playground" className="relative py-24 sm:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <SectionLabel color="cyan">$ try it now</SectionLabel>
          <h2
            className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One line away from a <span className="text-gradient">live response</span>.
          </h2>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-5">
          {/* terminal */}
          <GradientBorder>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <Terminal size={11} /> ~/freeapi
                </span>
                <button
                  onClick={copy}
                  className="text-[11px] text-slate-400 hover:text-white inline-flex items-center gap-1.5"
                  aria-label="Copy command"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "copied" : "copy"}
                </button>
              </div>
              <pre className="font-mono text-[13px] leading-6 text-slate-200 whitespace-pre-wrap">
                <span className="text-emerald-400">$</span>{" "}
                <span className="text-cyan-300">curl</span>{" "}
                <span className="text-slate-200">{typed.slice("curl ".length)}</span>
                <span className="caret text-slate-200" />
              </pre>
            </div>
          </GradientBorder>

          {/* response */}
          <GradientBorder>
            <div className="p-5 sm:p-6 min-h-[270px]">
              <div className="flex items-center justify-between mb-4">
                <span className="chip"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 200 OK</span>
                <span className="text-[11px] font-mono text-slate-500">application/json · 84ms</span>
              </div>
              {!showJson ? (
                <div className="flex items-center gap-2 text-slate-500 text-[13px] font-mono">
                  <span className="inline-flex">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mx-0.5 pulse-soft" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mx-0.5 pulse-soft" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mx-0.5 pulse-soft" style={{ animationDelay: "0.4s" }} />
                  </span>
                  awaiting request…
                </div>
              ) : (
                <motion.pre
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-mono text-[13px] leading-6 text-slate-300"
                >
{`{
  `}<span className="text-cyan-300">&quot;statusCode&quot;</span>{`: `}<span className="text-amber-300">200</span>{`,
  `}<span className="text-cyan-300">&quot;data&quot;</span>{`: {
    `}<span className="text-cyan-300">&quot;content&quot;</span>{`: `}<span className="text-lime-300">&quot;Stay hungry, stay foolish.&quot;</span>{`,
    `}<span className="text-cyan-300">&quot;author&quot;</span>{`: `}<span className="text-lime-300">&quot;Steve Jobs&quot;</span>{`,
    `}<span className="text-cyan-300">&quot;tags&quot;</span>{`: [`}<span className="text-lime-300">&quot;wisdom&quot;</span>{`, `}<span className="text-lime-300">&quot;life&quot;</span>{`]
  },
  `}<span className="text-cyan-300">&quot;message&quot;</span>{`: `}<span className="text-lime-300">&quot;Quote fetched successfully&quot;</span>{`,
  `}<span className="text-cyan-300">&quot;success&quot;</span>{`: `}<span className="text-violet-300">true</span>{`
}`}
                </motion.pre>
              )}
            </div>
          </GradientBorder>
        </div>

        <div className="mt-8 text-center text-[13px] text-slate-400">
          No API key. No sign-up. The base URL is{" "}
          <code className="font-mono text-cyan-300">{BASE_URL}</code>.
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Why / features ─────────────── */

function IconLearn() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14">
      <defs>
        <linearGradient id="il-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M8 22 L32 12 L56 22 L32 32 Z" fill="none" stroke="url(#il-1)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 28 V40 C 22 46, 42 46, 46 40 V28" fill="none" stroke="url(#il-1)" strokeWidth="1.6" />
      <line x1="56" y1="22" x2="56" y2="40" stroke="#a3e635" strokeWidth="1.6" />
      <circle cx="56" cy="42" r="2" fill="#a3e635">
        <animate attributeName="cy" values="42;46;42" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function IconOSS() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14">
      <defs>
        <linearGradient id="ix-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3e635" /><stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="22" r="6" fill="none" stroke="url(#ix-1)" strokeWidth="1.6" />
      <circle cx="44" cy="22" r="6" fill="none" stroke="url(#ix-1)" strokeWidth="1.6" />
      <circle cx="32" cy="48" r="6" fill="none" stroke="url(#ix-1)" strokeWidth="1.6" />
      <path d="M20 28 V36 C 20 42, 32 42, 32 48 M44 28 V36 C 44 42, 32 42, 32 48" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="1.4" />
      <circle cx="20" cy="22" r="2.5" fill="#22d3ee" className="pulse-soft" />
      <circle cx="44" cy="22" r="2.5" fill="#a855f7" className="pulse-soft" />
      <circle cx="32" cy="48" r="2.5" fill="#a3e635" className="pulse-soft" />
    </svg>
  );
}

function IconSelfHost() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14">
      <defs>
        <linearGradient id="ish-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="10" y="12" width="44" height="14" rx="3" fill="none" stroke="url(#ish-1)" strokeWidth="1.6" />
      <rect x="10" y="30" width="44" height="14" rx="3" fill="none" stroke="url(#ish-1)" strokeWidth="1.6" />
      <rect x="10" y="48" width="44" height="10" rx="3" fill="none" stroke="url(#ish-1)" strokeWidth="1.6" />
      <circle cx="16" cy="19" r="1.6" fill="#a3e635">
        <animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="37" r="1.6" fill="#22d3ee">
        <animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="53" r="1.6" fill="#f472b6">
        <animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="0.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function IconTested() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14">
      <defs>
        <linearGradient id="it-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#a3e635" />
        </linearGradient>
      </defs>
      <path d="M16 8 H40 L52 20 V52 a4 4 0 0 1 -4 4 H16 a4 4 0 0 1 -4 -4 V12 a4 4 0 0 1 4 -4 Z"
        fill="none" stroke="url(#it-1)" strokeWidth="1.6" />
      <path d="M40 8 V20 H52" fill="none" stroke="url(#it-1)" strokeWidth="1.6" />
      <path d="M22 38 l6 6 l14 -14" fill="none" stroke="#a3e635" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="40">
        <animate attributeName="stroke-dashoffset" values="40;0;0;40" dur="3.4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function Why() {
  const items = [
    { icon: <IconLearn />, title: "Built for learning", body: "Mirror the patterns of real production APIs — auth headers, paginated lists, typed errors. The muscle memory transfers." },
    { icon: <IconOSS />, title: "Community-driven", body: "9.3k+ stars, 1.4k+ forks. PRs welcome. New endpoints, fixes, and docs ship continuously." },
    { icon: <IconSelfHost />, title: "Yours to self-host", body: "MIT-licensed. Clone the repo, run it locally with Docker, or deploy to your own infra in minutes." },
    { icon: <IconTested />, title: "Documented & tested", body: "Swagger docs, Postman collections, and Playwright integration tests come baked in." },
  ];
  return (
    <section id="why" className="relative py-24 sm:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-14">
          <SectionLabel color="violet">{"/* why developers choose it */"}</SectionLabel>
          <h2
            className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Not a fake API. A <span className="text-gradient">real one</span>, free forever.
          </h2>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items.map((it) => (
            <motion.div key={it.title} variants={rise} className="surface surface-hover rounded-2xl p-6">
              <div className="mb-5">{it.icon}</div>
              <h3 className="text-[17px] font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {it.title}
              </h3>
              <p className="text-[13.5px] text-slate-400 leading-relaxed">{it.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Stats bar ─────────────── */

function useCount(target, when) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!when) return;
    const dur = 1600;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(e * target));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, when]);
  return n;
}

function Stat({ value, suffix = "", label, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const n = useCount(value, inView);
  return (
    <div ref={ref} className="relative">
      <div
        className="text-5xl sm:text-6xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-display)", color }}
      >
        {n.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-[12px] uppercase tracking-[0.18em] text-slate-500 font-mono">{label}</div>
    </div>
  );
}

function StatsBar() {
  return (
    <section className="relative py-20 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="surface rounded-2xl p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value={9300} suffix="+" label="GitHub stars" color="#67e8f9" />
          <Stat value={1400} suffix="+" label="Forks" color="#bef264" />
          <Stat value={50} suffix="+" label="Endpoints" color="#f0abfc" />
          <Stat value={100} suffix="%" label="Free, always" color="#a3e635" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CTA / footer ─────────────── */

function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.08] via-violet-500/[0.06] to-lime-500/[0.08] p-10 sm:p-16 text-center">
          {/* decorative SVG */}
          <svg className="absolute -top-20 -right-20 w-80 h-80 opacity-40" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="rgba(34,211,238,0.4)" strokeDasharray="2 6" />
            <circle cx="100" cy="100" r="60" stroke="rgba(168,85,247,0.4)" strokeDasharray="2 6" />
            <circle cx="100" cy="100" r="40" stroke="rgba(163,230,53,0.4)" strokeDasharray="2 6" />
          </svg>

          <div className="relative">
            <Sparkles className="mx-auto mb-4 text-cyan-300" size={22} />
            <h2
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Build the project<br />
              you’ve been <span className="text-gradient">putting off</span>.
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-slate-300">
              Pick a category, read three pages of docs, and ship something this weekend.
              The endpoints are waiting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-medium text-slate-900 bg-gradient-to-r from-cyan-300 via-lime-300 to-emerald-300 hover:from-cyan-200 hover:to-lime-200 transition"
              >
                <BookOpen size={16} /> Start with the docs <ArrowRight size={15} />
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-medium border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition"
              >
                <Github size={16} /> View source
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-slate-500">
        <div className="flex items-center gap-2.5">
          <LogoMark size={22} />
          <span className="font-mono">freeapi.app · MIT</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-1.5">
            <Github size={14} /> GitHub
          </a>
          <a href={DOCS_URL} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-1.5">
            <BookOpen size={14} /> Docs
          </a>
          <a href="https://www.youtube.com/playlist?list=PLu71SKxNbfoBAaWGtn9GA2PTw0HO0tXzq" target="_blank" rel="noreferrer" className="hover:text-white">
            YouTube
          </a>
        </div>
        <a
          href="https://chaicode.com"
          target="_blank"
          rel="noreferrer"
          className="font-mono hover:text-white transition"
        >
          made with ♥ by chaicode
        </a>
      </div>
    </footer>
  );
}

/* ─────────────── Page ─────────────── */

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <Hero />
      <Endpoints />
      <Anatomy />
      <Playground />
      <Why />
      <StatsBar />
      <CTA />
      <Footer />
    </main>
  );
}
