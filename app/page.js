"use client";

import { useState } from "react";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Github, Star, GitFork, Scale } from "lucide-react";
import { API_BASE_URL, DOCS_URL, REPO_URL } from "./config";
import { CATALOG, PRESETS } from "./catalog";
import { Glow, SiteFooter, SiteNav } from "./components/site";
import { CopyButton, JsonView, RequestConsole } from "./components/console";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
};

function SectionIntro({ eyebrow, title, children }) {
  return (
    <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium text-azure">{eyebrow}</p>
      <h2 className="mt-2 text-[34px] font-semibold leading-[1.1] tracking-display sm:text-5xl">{title}</h2>
      <p className="mt-4 text-lg text-ink-2">{children}</p>
    </motion.div>
  );
}

/* ─────────────── Hero: the console is the hero ─────────────── */

function Hero({ path, setPath, runToken }) {
  return (
    <section className="relative px-4 pb-8 pt-12 sm:px-6 sm:pt-20">
      <div aria-hidden className="dot-grid absolute inset-x-0 top-0 -z-10 h-[760px]" />
      <Glow className="left-1/2 top-[300px] h-[420px] w-[min(900px,90vw)] -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-medium text-azure">Free and open source</p>
        <h1 className="mt-3 text-[44px] font-semibold leading-[1.04] tracking-display sm:text-7xl">
          Practice on a real API.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-2 sm:text-xl">
          50+ endpoints for auth, e-commerce, social media, todos and more. No keys, no sign up.
          Send a request and see what comes back.
        </p>
      </motion.div>

      <motion.div
        id="console"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        className="mx-auto mt-10 max-w-4xl scroll-mt-24 sm:mt-12"
      >
        <RequestConsole path={path} onPathChange={setPath} runToken={runToken} />
      </motion.div>

      <div className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-ink-2">
        <span>Base URL</span>
        <code className="break-all font-mono text-ink">{API_BASE_URL}</code>
        <CopyButton text={API_BASE_URL} />
      </div>
    </section>
  );
}

/* ─────────────── Explore: categories and endpoints ─────────────── */

function Explore({ onTry }) {
  const [active, setActive] = useState(CATALOG[0].id);
  const category = CATALOG.find((c) => c.id === active);

  return (
    <section id="explore" className="relative scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <Glow className="-right-40 top-56 h-[460px] w-[520px]" />
      <SectionIntro eyebrow="Explore" title="Seven categories, one consistent API.">
        Pick a category to see its endpoints. Anything marked Try runs live in the console.
      </SectionIntro>

      <motion.div
        {...reveal}
        className="glass mx-auto mt-12 max-w-5xl overflow-hidden rounded-[28px] md:grid md:grid-cols-[220px_1fr]"
      >
        <div
          role="tablist"
          aria-label="Endpoint categories"
          className="no-scrollbar flex gap-1 overflow-x-auto border-b border-black/[0.06] p-2 md:flex-col md:overflow-visible md:border-b-0 md:border-r"
        >
          {CATALOG.map((c) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(c.id)}
                className={`flex shrink-0 items-center justify-between gap-4 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  selected
                    ? "bg-white font-medium text-ink shadow-[0_1px_3px_rgb(0_0_0/0.08)]"
                    : "text-ink-2 hover:bg-black/[0.04] hover:text-ink"
                }`}
              >
                {c.name}
                <span className="hidden text-xs text-ink-3 md:inline">{c.endpoints.length}</span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" className="min-w-0 p-5 sm:p-7">
          <h3 className="text-xl font-semibold tracking-tight">{category.name}</h3>
          <p className="mt-1 text-sm text-ink-2">{category.blurb}</p>
          <ul className="mt-5 divide-y divide-black/[0.06]">
            {category.endpoints.map((e) => (
              <li key={e.method + e.path} className="flex items-center gap-3 py-3 sm:gap-4">
                <span className="w-12 shrink-0 font-mono text-[11px] font-semibold text-ink-2">{e.method}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-[13px] text-ink">{e.path}</p>
                  <p className="mt-0.5 truncate text-[13px] text-ink-2">{e.label}</p>
                </div>
                {e.live ? (
                  <button
                    onClick={() => onTry(e.path)}
                    className="shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium text-azure transition-colors hover:bg-azure-soft"
                  >
                    Try
                  </button>
                ) : (
                  <Link
                    href={DOCS_URL}
                    className="inline-flex shrink-0 items-center gap-0.5 rounded-full px-3 py-1.5 text-[13px] text-ink-3 transition-colors hover:bg-black/[0.04] hover:text-ink"
                  >
                    Docs <ArrowUpRight className="size-3.5" aria-hidden />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────── Responses: the shared envelope ─────────────── */

const ENVELOPES = {
  success: {
    lines: [
      ["{", null],
      ['  "statusCode": 200,', 1],
      ['  "data": { "author": "Steve Jobs", "content": "Stay hungry, stay foolish." },', 2],
      ['  "message": "Quote fetched successfully",', 3],
      ['  "success": true', 4],
      ["}", null],
    ],
    fields: [
      ["statusCode", "The HTTP status again, so it is in the body when you log or store it."],
      ["data", "The payload. Lists also carry page, limit, totalPages and hasNextPage."],
      ["message", "A readable summary you can drop straight into a toast."],
      ["success", "A boolean for the happy path, so you never compare status codes."],
    ],
  },
  error: {
    lines: [
      ["{", null],
      ['  "statusCode": 422,', 1],
      ['  "errors": [{ "title": "Title is required" }],', 2],
      ['  "message": "Received data is not valid",', 3],
      ['  "success": false', 4],
      ["}", null],
    ],
    fields: [
      ["statusCode", "4xx for your mistakes, 5xx for ours. 401 means log in again."],
      ["errors", "One entry per invalid field, keyed by the field name. Show them next to the inputs."],
      ["message", "What went wrong, in a sentence you can show the user."],
      ["success", "Always false on errors, so one check covers both shapes."],
    ],
  },
};

function Marker({ n }) {
  return (
    <span className="inline-grid size-5 shrink-0 place-items-center rounded-full bg-azure-soft font-sans text-[11px] font-semibold text-azure">
      {n}
    </span>
  );
}

function Responses() {
  const [kind, setKind] = useState("success");
  const env = ENVELOPES[kind];

  return (
    <section id="responses" className="relative scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <SectionIntro eyebrow="Responses" title="Every response has the same shape.">
        Learn it once and every endpoint feels familiar. It is the contract you would design for
        your own backend.
      </SectionIntro>

      <motion.div {...reveal} className="mx-auto mt-12 grid max-w-5xl items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="glass min-w-0 rounded-[28px] p-3">
          <div className="flex items-center justify-between gap-2 px-2 pb-3 pt-1">
            <div role="tablist" aria-label="Response type" className="inline-flex rounded-full bg-black/[0.05] p-0.5">
              {["success", "error"].map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={kind === k}
                  onClick={() => setKind(k)}
                  className={`rounded-full px-3.5 py-1 text-[13px] capitalize transition-all ${
                    kind === k ? "bg-white font-medium text-ink shadow-[0_1px_3px_rgb(0_0_0/0.1)]" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <span className="font-mono text-xs text-ink-3">application/json</span>
          </div>
          <div className="well overflow-x-auto rounded-2xl p-4 font-mono text-[12.5px] leading-[2]">
            {env.lines.map(([line, n], i) => (
              <div key={i} className="flex items-center justify-between gap-4 whitespace-pre">
                <span>
                  <JsonView value={line} />
                </span>
                {n && <Marker n={n} />}
              </div>
            ))}
          </div>
        </div>

        <ol className="min-w-0 space-y-5 lg:pt-14">
          {env.fields.map(([name, text], i) => (
            <li key={name} className="flex gap-3">
              <Marker n={i + 1} />
              <div>
                <p className="font-mono text-sm font-medium">{name}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}

/* ─────────────── Quick start: snippets for the console's endpoint ─────────────── */

const SNIPPETS = {
  cURL: (url) => `curl "${url}"`,
  JavaScript: (url) =>
    `const res = await fetch("${url}");\nconst { data, message } = await res.json();\n\nconsole.log(message, data);`,
  Python: (url) =>
    `import requests\n\nres = requests.get("${url}")\nbody = res.json()\n\nprint(body["message"], body["data"])`,
};

function QuickStart({ path }) {
  const [lang, setLang] = useState("JavaScript");
  const code = SNIPPETS[lang](`${API_BASE_URL}${path}`);
  const steps = [
    ["Pick an endpoint", "Use the console at the top, or browse every route in the docs."],
    ["Copy a snippet", "These follow whatever is in the console, so they always run."],
    ["Add auth when you need it", "Log in, then send the access token as a Bearer header or keep the cookies."],
  ];

  return (
    <section id="quick-start" className="relative scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <Glow className="-left-40 top-48 h-[420px] w-[520px]" />
      <SectionIntro eyebrow="Quick start" title="Call it from anywhere.">
        Plain HTTP and JSON. It works from the browser, a mobile app, a script or a backend.
      </SectionIntro>

      <motion.div {...reveal} className="mx-auto mt-12 grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_1.5fr]">
        <ol className="space-y-7 lg:pt-4">
          {steps.map(([title, text], i) => (
            <li key={title} className="flex gap-4">
              <span className="font-mono text-sm text-ink-3">0{i + 1}</span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="glass min-w-0 rounded-[28px] p-3">
          <div className="flex items-center justify-between gap-2 px-2 pb-3 pt-1">
            <div role="tablist" aria-label="Language" className="inline-flex rounded-full bg-black/[0.05] p-0.5">
              {Object.keys(SNIPPETS).map((l) => (
                <button
                  key={l}
                  role="tab"
                  aria-selected={lang === l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-1 text-[13px] transition-all ${
                    lang === l ? "bg-white font-medium text-ink shadow-[0_1px_3px_rgb(0_0_0/0.1)]" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <CopyButton text={code} />
          </div>
          <pre className="well overflow-x-auto rounded-2xl p-4 font-mono text-[12.5px] leading-[1.8] text-ink">
            {code}
          </pre>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────── Open source ─────────────── */

const SELF_HOST = `git clone https://github.com/hiteshchoudhary/apihub.git
cd apihub
cp .env.sample .env
docker compose up`;

function OpenSource() {
  return (
    <section id="open-source" className="relative scroll-mt-20 px-4 pb-24 pt-8 sm:px-6 sm:pb-32">
      <Glow className="left-1/2 top-10 h-[380px] w-[min(800px,90vw)] -translate-x-1/2" />
      <motion.div
        {...reveal}
        className="glass mx-auto grid max-w-5xl items-center gap-10 rounded-[32px] p-7 sm:p-12 lg:grid-cols-2"
      >
        <div>
          <p className="text-sm font-medium text-azure">Open source</p>
          <h2 className="mt-2 text-[34px] font-semibold leading-[1.1] tracking-display sm:text-[44px]">
            Run your own copy in a minute.
          </h2>
          <p className="mt-4 text-lg text-ink-2">
            MIT licensed and built in the open by the community. Clone it, start it with Docker and
            point your app at localhost.
          </p>
          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              [Star, "9.3k", "stars"],
              [GitFork, "1.4k", "forks"],
              [Scale, "MIT", "license"],
            ].map(([Icon, value, label]) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-ink-3" aria-hidden />
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="font-semibold">{value}</span> <span className="text-ink-2">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-azure px-5 text-sm font-medium text-white transition-colors hover:bg-azure-hover"
            >
              <Github className="size-4" aria-hidden /> Star on GitHub
            </a>
            <Link
              href={DOCS_URL}
              className="inline-flex h-11 items-center gap-1 rounded-full px-4 text-sm font-medium text-azure transition-colors hover:bg-azure-soft"
            >
              Read the docs <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="well min-w-0 rounded-2xl">
          <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2">
            <span className="font-mono text-xs text-ink-3">Terminal</span>
            <CopyButton text={SELF_HOST} />
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.9] text-ink">
            {SELF_HOST.split("\n").map((line) => (
              <div key={line}>
                <span className="select-none text-ink-3">$ </span>
                {line}
              </div>
            ))}
          </pre>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────── Page ─────────────── */

export default function Page() {
  const [path, setPath] = useState(PRESETS[0].path);
  const [runToken, setRunToken] = useState(0);

  const tryEndpoint = (p) => {
    setPath(p);
    setRunToken((n) => n + 1);
    document.getElementById("console")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-x-clip">
        <SiteNav />
        <main>
          <Hero path={path} setPath={setPath} runToken={runToken} />
          <Explore onTry={tryEndpoint} />
          <Responses />
          <QuickStart path={path} />
          <OpenSource />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
