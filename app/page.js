"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github, Terminal, Copy, Check, RotateCw } from "lucide-react";
import { API_BASE_URL, API_HOST, DOCS_URL, REPO_URL } from "./config";
import { GlassBadge, SiteFooter, SiteNav, Wallpaper } from "./components/site";

// The accent the illustrations use: Apple system cyan
const ACCENT = "#64d2ff";

/* ─────────────── animation helpers ─────────────── */

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─────────────── live API ─────────────── */

function useApiStatus() {
  const [status, setStatus] = useState("checking");
  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/healthcheck`)
      .then((res) => !cancelled && setStatus(res.ok ? "online" : "offline"))
      .catch(() => !cancelled && setStatus("offline"));
    return () => {
      cancelled = true;
    };
  }, []);
  return status;
}

function ApiStatus() {
  const status = useApiStatus();
  const label = {
    checking: "Checking the API",
    online: "API online",
    offline: "API unreachable",
  }[status];
  const dot = {
    checking: "bg-white/40",
    online: "bg-emerald-400",
    offline: "bg-red-400",
  }[status];
  return (
    <span className="flex items-center gap-2">
      <span className={`size-1.5 rounded-full ${dot} pulse-soft`} />
      {label}
    </span>
  );
}

/* ─────────────── shared bits ─────────────── */

function SolidButton({ href, children, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)] transition-colors duration-200 hover:bg-white/85"
    >
      {children} <ArrowUpRight className="-ml-1 size-4" aria-hidden />
    </a>
  );
}

function OutlineButton({ href, children, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="glass inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
    >
      {children}
    </a>
  );
}

function SectionHead({ title, children, center = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={center ? "text-center" : ""}
    >
      <motion.h2 variants={rise} className="text-3xl font-semibold tracking-tight sm:text-[40px]">
        {title}
      </motion.h2>
      <motion.p
        variants={rise}
        className={`mt-3 max-w-2xl text-white/60 sm:text-lg ${center ? "mx-auto" : ""}`}
      >
        {children}
      </motion.p>
    </motion.div>
  );
}

function MethodTag({ method }) {
  return (
    <span className="inline-block w-12 shrink-0 font-mono text-[11px] font-semibold text-white/90">
      {method}
    </span>
  );
}

/* ─────────────── Hero centerpiece SVG: API constellation ─────────────── */

function ConstellationSVG() {
  const nodes = [
    { x: 80, y: 70, label: "GET /users", color: "#e5e5e5" },
    { x: 360, y: 50, label: "POST /todos", color: ACCENT },
    { x: 540, y: 130, label: "GET /products", color: "#e5e5e5" },
    { x: 520, y: 320, label: "POST /login", color: ACCENT },
    { x: 300, y: 380, label: "GET /quotes", color: "#e5e5e5" },
    { x: 70, y: 300, label: "GET /jokes", color: "#e5e5e5" },
  ];
  const hub = { x: 300, y: 210 };

  return (
    <svg
      viewBox="0 0 600 440"
      className="h-auto w-full"
      role="img"
      aria-label="Animated diagram of FreeAPI endpoints connected to a central hub"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18" />
          <stop offset="60%" stopColor="#262626" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#262626" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <g className="orbit-slow" style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}>
        <circle cx={hub.x} cy={hub.y} r="170" fill="none" stroke="rgba(255,255,255,0.12)" strokeDasharray="2 6" />
      </g>
      <g className="orbit-fast" style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}>
        <circle cx={hub.x} cy={hub.y} r="120" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="1 7" />
      </g>

      <circle cx={hub.x} cy={hub.y} r="120" fill="url(#hub-glow)" />

      {nodes.map((n, i) => {
        const cx = (n.x + hub.x) / 2;
        const cy = (n.y + hub.y) / 2 - 30;
        const d = `M${n.x},${n.y} Q${cx},${cy} ${hub.x},${hub.y}`;
        return (
          <g key={i}>
            <path d={d} stroke="url(#line-grad)" strokeWidth="1.2" fill="none" opacity="0.7" />
            <path
              d={d}
              stroke={n.color}
              strokeWidth="1.2"
              fill="none"
              className="dash-flow"
              style={{ animationDuration: `${3 + i * 0.4}s`, opacity: 0.6 }}
            />
            <circle r="2.6" fill={n.color}>
              <animateMotion dur={`${3.2 + i * 0.4}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        );
      })}

      {nodes.map((n, i) => {
        const labelW = n.label.length * 6.4 + 14;
        const onLeft = n.x > hub.x;
        const dx = onLeft ? -(labelW + 22) : 22;
        const textX = onLeft ? labelW - 7 : 7;
        return (
          <g key={`n-${i}`}>
            <circle cx={n.x} cy={n.y} r="18" fill="rgba(20,20,28,0.7)" stroke={n.color} strokeOpacity="0.7" strokeWidth="1.4" />
            <circle cx={n.x} cy={n.y} r="4.5" fill={n.color} className="pulse-soft" />
            <g transform={`translate(${n.x + dx}, ${n.y + 4})`}>
              <rect x="0" y="-12" rx="6" ry="6" width={labelW} height="22" fill="rgba(20,20,28,0.7)" stroke="rgba(255,255,255,0.18)" />
              <text
                x={textX}
                y="3"
                textAnchor={onLeft ? "end" : "start"}
                fill="#d4d4d8"
                fontSize="10.5"
                fontFamily="var(--font-mono)"
              >
                {n.label}
              </text>
            </g>
          </g>
        );
      })}

      <g>
        <circle cx={hub.x} cy={hub.y} r="40" fill="rgba(20,20,28,0.7)" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.6" />
        <circle cx={hub.x} cy={hub.y} r="40" fill="none" stroke={ACCENT} strokeOpacity="0.5">
          <animate attributeName="r" values="40;52;40" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <text x={hub.x} y={hub.y - 2} textAnchor="middle" fill="#fafafa" fontSize="14" fontFamily="var(--font-body)" fontWeight="600">
          freeAPI
        </text>
        <text x={hub.x} y={hub.y + 13} textAnchor="middle" fill="#a3a3a3" fontSize="9" fontFamily="var(--font-mono)">
          v1, public
        </text>
      </g>
    </svg>
  );
}

/* ─────────────── Hero ─────────────── */

const MARQUEE_ROUTES = [
  "GET /api/v1/public/quotes/quote/random",
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
];

function Hero() {
  return (
    <section id="top" className="pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="mx-auto flex max-w-6xl gap-8 px-6 max-md:flex-col sm:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="my-auto flex flex-col gap-y-2.5 sm:gap-y-4 md:w-3/5"
        >
          <motion.div variants={rise}>
            <GlassBadge>Open source and free forever</GlassBadge>
          </motion.div>
          <motion.h1
            variants={rise}
            className="text-[42px] font-semibold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
          >
            Real APIs to practice,{" "}
            <span className="text-accent-gradient">build and ship</span>
          </motion.h1>
          <motion.p
            variants={rise}
            className="mt-4 max-w-2xl text-base text-white/60 sm:mt-6 md:text-xl"
          >
            A hub of production-style endpoints for auth, e-commerce, social media, todos and
            more, so you learn <span className="text-accent-gradient font-medium">API integration on real patterns</span>.
            No keys, no quotas, just send a request.
          </motion.p>
          <motion.div variants={rise} className="mt-6 flex flex-wrap items-center gap-4">
            <SolidButton href={DOCS_URL}>Read the docs</SolidButton>
            <OutlineButton href={REPO_URL} external>
              <Github className="-ml-1 size-4" aria-hidden /> Star on GitHub
            </OutlineButton>
          </motion.div>
          <motion.div
            variants={rise}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/45"
          >
            <ApiStatus />
            <span>50+ endpoints</span>
            <span>MIT license</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
          className="relative [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_75%)] md:w-2/5"
        >
          <ConstellationSVG />
        </motion.div>
      </div>

      <div className="relative mt-16 overflow-hidden border-y border-white/10 bg-white/[0.03] backdrop-blur-md sm:mt-20">
        <div className="py-4">
          <div className="marquee-track font-mono text-xs text-white/45">
            {[0, 1].map((k) => (
              <span key={k} className="inline-flex items-center gap-10" aria-hidden={k === 1}>
                {MARQUEE_ROUTES.map((route) => {
                  const [method, path] = route.split(" ");
                  return (
                    <span key={`${k}-${route}`} className="inline-flex items-center gap-3">
                      <span className="font-semibold text-white/90">{method}</span>
                      <span>{path}</span>
                    </span>
                  );
                })}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Endpoint category icons (custom SVG) ─────────────── */

const ICON_STROKE = "rgba(229,229,229,0.85)";

function IconShop() {
  return (
    <svg viewBox="0 0 56 56" className="size-11" aria-hidden>
      <rect x="6" y="14" width="44" height="34" rx="6" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <path d="M18 14 V10 a10 10 0 0 1 20 0 V14" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <circle cx="22" cy="26" r="2" fill={ACCENT}>
        <animate attributeName="cy" values="26;30;26" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="34" cy="26" r="2" fill="#e5e5e5">
        <animate attributeName="cy" values="26;30;26" dur="2.4s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function IconAuth() {
  return (
    <svg viewBox="0 0 56 56" className="size-11" aria-hidden>
      <path d="M28 8 L46 16 V28 C46 38 38 46 28 50 C18 46 10 38 10 28 V16 Z" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <circle cx="28" cy="26" r="4" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <path d="M28 30 V36" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconTodo() {
  return (
    <svg viewBox="0 0 56 56" className="size-11" aria-hidden>
      <rect x="10" y="8" width="36" height="40" rx="5" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <path d="M16 20 H40 M16 28 H40 M16 36 H32" stroke="rgba(212,212,216,0.3)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 19 l3 3 l5 -6" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dasharray" values="0 20;20 0" dur="1.8s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function IconSocial() {
  return (
    <svg viewBox="0 0 56 56" className="size-11" aria-hidden>
      <circle cx="16" cy="20" r="6" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <circle cx="40" cy="14" r="5" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <circle cx="42" cy="40" r="6" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <path d="M21 22 L36 16 M22 24 L37 38" stroke="rgba(212,212,216,0.35)" strokeWidth="1.2" strokeDasharray="2 3" />
      <circle r="2" fill={ACCENT}><animateMotion dur="2.6s" repeatCount="indefinite" path="M21 22 L36 16" /></circle>
      <circle r="2" fill="#e5e5e5"><animateMotion dur="3s" repeatCount="indefinite" path="M22 24 L37 38" /></circle>
    </svg>
  );
}

function IconPublic() {
  return (
    <svg viewBox="0 0 56 56" className="size-11" aria-hidden>
      <circle cx="28" cy="28" r="18" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <ellipse cx="28" cy="28" rx="18" ry="8" fill="none" stroke="rgba(212,212,216,0.35)" strokeWidth="1.2" />
      <ellipse cx="28" cy="28" rx="8" ry="18" fill="none" stroke="rgba(212,212,216,0.35)" strokeWidth="1.2" />
      <g className="orbit-fast" style={{ transformOrigin: "28px 28px" }}>
        <circle cx="46" cy="28" r="2.4" fill={ACCENT} />
      </g>
    </svg>
  );
}

function IconKitchen() {
  return (
    <svg viewBox="0 0 56 56" className="size-11" aria-hidden>
      <rect x="8" y="14" width="40" height="32" rx="4" fill="none" stroke={ICON_STROKE} strokeWidth="1.5" />
      <path d="M8 22 H48" stroke="rgba(212,212,216,0.3)" strokeWidth="1.2" />
      <circle cx="13" cy="18" r="1.3" fill="#737373" />
      <circle cx="18" cy="18" r="1.3" fill="#737373" />
      <circle cx="23" cy="18" r="1.3" fill="#737373" />
      <text x="14" y="34" fill="#d4d4d8" fontSize="6" fontFamily="var(--font-mono)">GET POST</text>
      <text x="14" y="42" fill="#a3a3a3" fontSize="6" fontFamily="var(--font-mono)">PUT DELETE</text>
      <rect x="40" y="30" width="3" height="5" fill={ACCENT}>
        <animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

/* ─────────────── Endpoints section ─────────────── */

const CATEGORIES = [
  {
    icon: <IconPublic />,
    name: "Public",
    count: "30+ endpoints",
    desc: "Quotes, jokes, meals, books, dogs, random users and products. Perfect first calls.",
    sample: ["GET /public/quotes/quote/random", "GET /public/meals", "GET /public/books"],
  },
  {
    icon: <IconAuth />,
    name: "Authentication",
    count: "8 endpoints",
    desc: "Register, login, refresh tokens and OAuth flows. Real JWT behaviour, not a demo.",
    sample: ["POST /users/register", "POST /users/login", "POST /users/refresh-token"],
  },
  {
    icon: <IconShop />,
    name: "E-commerce",
    count: "20+ endpoints",
    desc: "Carts, products, categories, addresses, orders and coupons: the full transaction loop.",
    sample: ["GET /ecommerce/products", "POST /ecommerce/cart/item/:id", "POST /ecommerce/orders/provider/paypal"],
  },
  {
    icon: <IconTodo />,
    name: "Todos",
    count: "6 endpoints",
    desc: "A classic CRUD playground, and your first end-to-end app.",
    sample: ["GET /todos", "POST /todos", "PATCH /todos/:id"],
  },
  {
    icon: <IconSocial />,
    name: "Social media",
    count: "15+ endpoints",
    desc: "Posts, comments, bookmarks, likes and follows. Model a tiny Twitter in a weekend.",
    sample: ["GET /social-media/posts", "POST /social-media/comments/post/:id"],
  },
  {
    icon: <IconKitchen />,
    name: "Kitchen sink",
    count: "Every HTTP verb",
    desc: "GET, POST, PUT, PATCH and DELETE, status codes, cookies and redirects to test any client.",
    sample: ["GET /kitchen-sink/http-methods/get", "GET /kitchen-sink/status-codes/418"],
  },
];

function Endpoints() {
  return (
    <section id="endpoints" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <SectionHead title="Six categories, fifty plus endpoints">
          Each category mirrors <span className="text-accent-gradient font-medium">a backend you might build</span>, so
          the skills carry over the moment you start your own project.
        </SectionHead>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CATEGORIES.map((c) => (
            <motion.article
              key={c.name}
              variants={rise}
              className="glass-card flex flex-col p-5"
            >
              <div className="mb-4 flex items-start justify-between">
                {c.icon}
                <span className="glass-chip">
                  {c.count}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug">{c.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{c.desc}</p>
              <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4">
                {c.sample.map((s) => {
                  const [method, path] = s.split(" ");
                  return (
                    <li key={s} className="flex items-center font-mono text-xs text-white/60">
                      <MethodTag method={method} />
                      <span className="truncate">{path}</span>
                    </li>
                  );
                })}
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
    <svg viewBox="0 0 760 260" className="h-auto w-full" role="img" aria-label="A request travelling from your app to the API and a JSON response coming back">
      <defs>
        <linearGradient id="rf-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor={ACCENT} />
        </linearGradient>
        <linearGradient id="rf-line-back" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={ACCENT} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <g>
        <rect x="20" y="60" width="160" height="140" rx="14" fill="rgba(20,20,28,0.7)" stroke="rgba(255,255,255,0.18)" />
        <text x="100" y="86" textAnchor="middle" fill="#a3a3a3" fontSize="11" fontFamily="var(--font-mono)">your app</text>
        {["fetch(url)", "await res", "render(data)"].map((line, i) => (
          <g key={line} transform={`translate(40,${108 + i * 30})`}>
            <rect width="120" height="22" rx="5" fill="rgba(255,255,255,0.04)" />
            <text x="10" y="15" fill="#d4d4d8" fontSize="11" fontFamily="var(--font-mono)">{line}</text>
          </g>
        ))}
      </g>

      <g>
        <rect x="580" y="60" width="160" height="140" rx="14" fill="rgba(20,20,28,0.7)" stroke="rgba(255,255,255,0.18)" />
        <text x="660" y="86" textAnchor="middle" fill="#a3a3a3" fontSize="11" fontFamily="var(--font-mono)">freeAPI</text>
        <g transform="translate(600, 100)">
          {["/quotes", "/products", "/login", "/todos"].map((route, i) => (
            <g key={route}>
              <circle cx="8" cy={8 + i * 20} r="3" fill={i === 1 ? ACCENT : "#e5e5e5"} />
              <text x="20" y={12 + i * 20} fill="#e7e5e4" fontSize="11" fontFamily="var(--font-mono)">{route}</text>
            </g>
          ))}
        </g>
      </g>

      <path id="req-path" d="M180 110 C 320 70, 440 70, 580 110" fill="none" stroke="url(#rf-line)" strokeWidth="1.6" strokeDasharray="4 6" />
      <text x="380" y="60" textAnchor="middle" fill="#e5e5e5" fontSize="11" fontFamily="var(--font-mono)">
        GET /api/v1/public/quotes/quote/random
      </text>
      <circle r="4.5" fill={ACCENT}>
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#req-path" />
        </animateMotion>
      </circle>

      <path id="res-path" d="M580 150 C 440 190, 320 190, 180 150" fill="none" stroke="url(#rf-line-back)" strokeWidth="1.6" strokeDasharray="4 6" />
      <text x="380" y="220" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontFamily="var(--font-mono)">
        200 OK, application/json
      </text>
      <circle r="4.5" fill="#ffffff">
        <animateMotion dur="3s" begin="1.4s" repeatCount="indefinite">
          <mpath href="#res-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}

function Anatomy() {
  return (
    <section id="anatomy" className="py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHead title="From fetch to render, the same shape as production">
            Every endpoint returns a status code, a readable message and a typed{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white/90">data</code>{" "}
            payload, so <span className="text-accent-gradient font-medium">the contract you learn still holds</span> on
            your own backend.
          </SectionHead>
          <ul className="mt-7 space-y-3">
            {[
              "Predictable response envelope across all routes",
              "Pagination metadata where it matters",
              "Real error shapes: 400, 401, 404 and 422",
              "Cookie and bearer auth, both supported",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-5 sm:p-8"
        >
          <RequestFlowSVG />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Playground (a real request against the live API) ─────────────── */

const PLAYGROUND_PATH = "/public/quotes/quote/random";

function useTypewriter(text, speed = 22, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
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

// Pretty-prints JSON with keys in cream and strings in green
function JsonView({ value }) {
  const json = JSON.stringify(value, null, 2);
  const parts = [];
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)/gi;
  let last = 0;
  let m;
  while ((m = re.exec(json))) {
    if (m.index > last) parts.push(json.slice(last, m.index));
    if (m[1] && m[2]) {
      parts.push(<span key={m.index} className="text-sky-300">{m[1]}</span>, m[2]);
    } else if (m[1]) {
      parts.push(<span key={m.index} className="text-emerald-300">{m[1]}</span>);
    } else {
      parts.push(<span key={m.index} className="text-white">{m[0]}</span>);
    }
    last = re.lastIndex;
  }
  parts.push(json.slice(last));
  return <>{parts}</>;
}

function Playground() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const url = `${API_BASE_URL}${PLAYGROUND_PATH}`;
  const cmd = `curl ${url}`;
  const typed = useTypewriter(cmd, 18, inView);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const send = async () => {
    setLoading(true);
    const started = performance.now();
    try {
      const res = await fetch(url);
      const body = await res.json();
      setResult({ status: res.status, ok: res.ok, ms: Math.round(performance.now() - started), body });
    } catch (error) {
      setResult({ error: "Could not reach the API. Try again in a moment." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typed.length === cmd.length && !result && !loading) send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed]);

  const copy = async () => {
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="playground" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <SectionHead title="One request away from a live response" center>
          This runs <span className="text-accent-gradient font-medium">against the real API</span> right now. No API
          key, no sign up.
        </SectionHead>

        <div ref={ref} className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="glass-card flex flex-col p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-xs text-white/45">
                <Terminal className="size-3" aria-hidden /> terminal
              </span>
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-brand"
                aria-label="Copy command"
              >
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="whitespace-pre-wrap break-all font-mono text-[13px] leading-6 text-white/90">
              <span className="text-white/45">$</span> {typed}
              {typed.length < cmd.length && <span className="caret" />}
            </pre>
            <div className="mt-auto pt-6">
              <button
                onClick={send}
                disabled={loading || typed.length < cmd.length}
                className="inline-flex h-8 min-w-24 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <RotateCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden />
                Send again
              </button>
            </div>
          </div>

          <div className="glass-card min-h-[300px] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between font-mono text-xs">
              {result?.status ? (
                <span
                  className={`rounded-full border px-2.5 py-0.5 ${
                    result.ok
                      ? "border-emerald-400/40 text-emerald-300"
                      : "border-red-400/40 text-red-300"
                  }`}
                >
                  {result.status} {result.ok ? "OK" : "Error"}
                </span>
              ) : (
                <span className="text-white/45">response</span>
              )}
              {result?.ms != null && (
                <span className="text-white/45">application/json, {result.ms}ms</span>
              )}
            </div>
            {loading && !result ? (
              <p className="font-mono text-[13px] text-white/60">Sending the request…</p>
            ) : result?.error ? (
              <p className="font-mono text-[13px] text-red-300">{result.error}</p>
            ) : result ? (
              <motion.pre
                key={result.ms}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-h-[360px] overflow-auto whitespace-pre-wrap break-words font-mono text-[13px] leading-6 text-white/60"
              >
                <JsonView value={result.body} />
              </motion.pre>
            ) : (
              <p className="font-mono text-[13px] text-white/45">Waiting for the request…</p>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/45">
          The base URL is{" "}
          <code className="break-all rounded bg-white/10 px-1.5 py-0.5 font-mono text-white/90">
            {API_BASE_URL}
          </code>
        </p>
      </div>
    </section>
  );
}

/* ─────────────── Why ─────────────── */

const REASONS = [
  {
    title: "Built for learning",
    body: "Auth headers, paginated lists and typed errors, just like production APIs. The muscle memory transfers.",
  },
  {
    title: "Community driven",
    body: "9.3k+ stars and 1.4k+ forks. New endpoints, fixes and docs ship continuously, and PRs are welcome.",
  },
  {
    title: "Yours to self host",
    body: "MIT licensed. Clone the repo, run it locally with Docker, or deploy it to your own infra in minutes.",
  },
  {
    title: "Documented and tested",
    body: "Interactive docs, a Swagger spec and Playwright integration tests come baked in.",
  },
];

function Why() {
  return (
    <section id="why" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <SectionHead title="Not a fake API, a real one that stays free" center>
          Everything you need to <span className="text-accent-gradient font-medium">practice like it is production</span>,
          without paying for a backend.
        </SectionHead>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {REASONS.map((it) => (
            <motion.div key={it.title} variants={rise} className="glass-card p-5">
              <h3 className="text-base font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{it.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Stats ─────────────── */

function useCount(target, when) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!when) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    const dur = 1400;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, when]);
  return n;
}

function Stat({ value, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const n = useCount(value, inView);
  return (
    <div ref={ref}>
      <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <div className="glass-card grid grid-cols-2 gap-8 p-8 sm:p-12 md:grid-cols-4">
          <Stat value={9300} suffix="+" label="GitHub stars" />
          <Stat value={1400} suffix="+" label="Forks" />
          <Stat value={50} suffix="+" label="Endpoints" />
          <Stat value={100} suffix="%" label="Free, always" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CTA ─────────────── */

function CTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <div className="glass-card px-6 py-12 text-center sm:px-16 sm:py-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-[40px]">
            Build the project you have been putting off
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60 sm:text-lg">
            Pick a category, read a few pages of docs and{" "}
            <span className="text-accent-gradient font-medium">ship something this weekend</span>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <SolidButton href={DOCS_URL}>Start with the docs</SolidButton>
            <OutlineButton href={REPO_URL} external>
              <Github className="-ml-1 size-4" aria-hidden /> View source
            </OutlineButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Page ─────────────── */

export default function Page() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      <Wallpaper />
      <SiteNav />
      <main>
        <Hero />
        <Endpoints />
        <Anatomy />
        <Playground />
        <Why />
        <Stats />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
