"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  Star,
  Code2,
  Database,
  Zap,
  Server,
  BookOpen,
  Shield,
  ShoppingCart,
  MessageSquare,
  Users,
  ArrowRight,
  Globe,
  ExternalLink,
  Sparkles,
  GitFork,
  Box,
  CheckSquare,
} from "lucide-react";

// ─── Animation Variants ──────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Animated Counter ────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Hero Terminal ───────────────────────────────────────────

function HeroTerminal() {
  const lines = [
    {
      text: "$ curl https://api.freeapi.app/api/v1/public/quotes/random",
      color: "text-emerald-400",
    },
    { text: "", color: "" },
    { text: "{", color: "text-slate-400" },
    {
      text: '  "statusCode": 200,',
      color: "text-slate-400",
    },
    { text: '  "data": {', color: "text-slate-400" },
    {
      text: '    "quote": "The only way to do great work is to love what you do.",',
      color: "text-amber-300",
    },
    {
      text: '    "author": "Steve Jobs"',
      color: "text-sky-300",
    },
    { text: "  },", color: "text-slate-400" },
    {
      text: '  "success": true',
      color: "text-emerald-400",
    },
    { text: "}", color: "text-slate-400" },
  ];

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
    >
      {/* Glow behind terminal */}
      <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/10 via-transparent to-sky-500/10 rounded-3xl blur-2xl" />

      <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-[#0D1117] shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-slate-700/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-slate-500 font-mono ml-2">
            ~ terminal
          </span>
        </div>

        {/* Code content */}
        <div className="p-5 font-mono text-[13px] leading-relaxed">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.0 + i * 0.08 }}
              className={`${line.color} ${line.text === "" ? "h-4" : ""}`}
            >
              {line.text}
            </motion.div>
          ))}
          <motion.span
            className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 mt-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Feature Card ────────────────────────────────────────────

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      className="glass-card rounded-xl p-6 group cursor-default"
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/5 flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-amber-500/15 transition-colors duration-300">
        <Icon className="w-5 h-5 text-orange-400" />
      </div>
      <h3 className="text-[17px] font-semibold text-white mb-2 font-display">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ─── API Category Card ───────────────────────────────────────

function APICard({ icon: Icon, title, description, colorClass }) {
  return (
    <motion.div
      className="glass-card rounded-xl p-5 group cursor-default"
      variants={scaleIn}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-white text-sm font-display">
            {title}
          </h4>
          <span className="text-xs text-slate-500">{description}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Code Examples ───────────────────────────────────────────

function CodeShowcase() {
  const [activeTab, setActiveTab] = useState("javascript");

  const tabs = [
    { id: "javascript", label: "JavaScript" },
    { id: "python", label: "Python" },
    { id: "curl", label: "cURL" },
  ];

  const codeExamples = {
    javascript: `const response = await fetch(
  "https://api.freeapi.app/api/v1/public/quotes/random",
  { headers: { "accept": "application/json" } }
);

const { data } = await response.json();
console.log(data.quote);   // → "The only way to..."
console.log(data.author);  // → "Steve Jobs"`,

    python: `import requests

url = "https://api.freeapi.app/api/v1/public/quotes/random"
headers = {"accept": "application/json"}

response = requests.get(url, headers=headers)
data = response.json()["data"]

print(data["quote"])   # → "The only way to..."
print(data["author"])  # → "Steve Jobs"`,

    curl: `curl -X GET \\
  "https://api.freeapi.app/api/v1/public/quotes/random" \\
  -H "accept: application/json"

# Response:
# {
#   "statusCode": 200,
#   "data": {
#     "quote": "The only way to do great work...",
#     "author": "Steve Jobs"
#   },
#   "success": true
# }`,
  };

  return (
    <div className="relative">
      <div className="absolute -inset-3 bg-gradient-to-r from-orange-500/5 via-sky-500/5 to-emerald-500/5 rounded-2xl blur-xl" />

      <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-[#0D1117]">
        {/* Tab bar */}
        <div className="flex items-center border-b border-slate-700/50 bg-[#161B22]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-3 text-sm font-mono font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-orange-400 bg-[#0D1117]"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  layoutId="activeCodeTab"
                />
              )}
            </button>
          ))}
        </div>

        {/* Code display */}
        <div className="p-5 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[13px] text-emerald-300/90 leading-relaxed overflow-x-auto"
            >
              <code>{codeExamples[activeTab]}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Section Heading ─────────────────────────────────────────

function SectionHeading({ label, title, highlight, description }) {
  return (
    <motion.div
      className="text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      <motion.span
        variants={fadeUp}
        className="text-sm font-mono text-orange-400 tracking-wider uppercase"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-4"
      >
        {title}{" "}
        {highlight && <span className="gradient-text-warm">{highlight}</span>}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="text-slate-400 max-w-xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="noise-overlay">
      {/* ── Background Orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-orange-500/[0.03] rounded-full blur-[128px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[128px]" />
      </div>

      {/* ══════════════════════════════════════════════════════
          NAVBAR
          ══════════════════════════════════════════════════════ */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0B0F1A]/70 border-b border-slate-800/50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              FreeAPI
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#apis"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              APIs
            </a>
            <a
              href="#code"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Examples
            </a>
            <a
              href="https://chaicode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Chaicode
            </a>
            <a
              href="https://github.com/hiteshchoudhary/apihub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-slate-700/80"
            >
              <Github className="w-4 h-4" />
              <span>Star</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="font-semibold text-xs">9k+</span>
              </div>
            </a>
          </div>

          {/* Mobile GitHub link */}
          <a
            href="https://github.com/hiteshchoudhary/apihub"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden text-slate-300 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/50 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs text-slate-300 font-medium">
              Open Source
            </span>
            <span className="text-xs text-slate-600">•</span>
            <span className="text-xs text-orange-400 font-semibold">
              9,000+ GitHub Stars
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-white">Free APIs.</span>
            <br />
            <span className="gradient-text-warm">Real Projects.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            An open-source API hub with 50+ endpoints — authentication,
            e-commerce, social media, chat, and more. Master API integration in
            any language, completely free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <a
              href="https://freeapi.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
            >
              Explore APIs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://github.com/hiteshchoudhary/apihub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium px-7 py-3.5 rounded-xl transition-colors border border-slate-700"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </motion.div>

          {/* Terminal */}
          <HeroTerminal />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { value: 9000, suffix: "+", label: "GitHub Stars" },
              { value: 50, suffix: "+", label: "API Endpoints" },
              { value: 24, suffix: "+", label: "Contributors" },
              { value: 100, suffix: "%", label: "Free & Open Source" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeUp}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES
          ══════════════════════════════════════════════════════ */}
      <section id="features" className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="Features"
            title="Everything You Need to"
            highlight="Master APIs"
            description="From basic GET requests to full-stack backends — all the APIs you need to build real-world projects."
          />

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <FeatureCard
              icon={Server}
              title="Production-Ready APIs"
              description="Complete backend APIs for authentication, todos, social media, and e-commerce — built like real production systems."
            />
            <FeatureCard
              icon={Zap}
              title="Real-time WebSocket"
              description="Build socket-based chat applications with real-time messaging, typing indicators, and online presence."
            />
            <FeatureCard
              icon={Database}
              title="Multi-Format Responses"
              description="Work with various response formats including JSON, Brotli, GZIP compression, and image handling."
            />
            <FeatureCard
              icon={BookOpen}
              title="Interactive Documentation"
              description="Every endpoint comes with interactive Swagger docs. Test APIs directly in your browser."
            />
            <FeatureCard
              icon={Globe}
              title="One-Click Deploy"
              description="Deploy your own instance with Docker or Railway in minutes. Full control, zero vendor lock-in."
            />
            <FeatureCard
              icon={Code2}
              title="Multi-Language Support"
              description="Examples in JavaScript, Python, cURL, and more. Learn API integration in your preferred language."
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CODE EXAMPLES
          ══════════════════════════════════════════════════════ */}
      <section id="code" className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            label="Code Examples"
            title="Start in"
            highlight="Seconds"
            description="Three lines of code. That's all it takes to get started."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CodeShowcase />
          </motion.div>

          {/* CTA below code */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="https://freeapi.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors"
            >
              Explore the full API documentation
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          API ECOSYSTEM
          ══════════════════════════════════════════════════════ */}
      <section id="apis" className="relative py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            label="API Ecosystem"
            title="Built for"
            highlight="Real Projects"
            description="Production-grade APIs across multiple domains. Build your portfolio with real backend integrations."
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <APICard
              icon={Shield}
              title="Authentication"
              description="JWT, OAuth, Sessions"
              colorClass="bg-emerald-500/20"
            />
            <APICard
              icon={Users}
              title="Social Media"
              description="Posts, Likes, Follows"
              colorClass="bg-sky-500/20"
            />
            <APICard
              icon={ShoppingCart}
              title="E-Commerce"
              description="Products, Cart, Orders"
              colorClass="bg-orange-500/20"
            />
            <APICard
              icon={CheckSquare}
              title="Todo App"
              description="CRUD Operations"
              colorClass="bg-purple-500/20"
            />
            <APICard
              icon={MessageSquare}
              title="Chat App"
              description="Real-time, WebSocket"
              colorClass="bg-rose-500/20"
            />
            <APICard
              icon={Box}
              title="Kitchen Sink"
              description="Random Data, Quotes, Jokes"
              colorClass="bg-amber-500/20"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OPEN SOURCE CTA
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-6"
            >
              <GitFork className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-mono text-orange-400 tracking-wider uppercase">
                Open Source
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
            >
              Built by the Community,
              <br />
              <span className="gradient-text-warm">For the Community</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              FreeAPI is fully open source. Contribute endpoints, fix bugs,
              improve docs — every contribution makes learning easier for
              developers worldwide.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            >
              <a
                href="https://github.com/hiteshchoudhary/apihub"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                <Github className="w-5 h-5" />
                Contribute on GitHub
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://chaicode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-colors border border-slate-700 hover:border-slate-600"
              >
                Visit Chaicode.com
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-600"
            >
              {["Node.js", "Express", "MongoDB", "Docker", "Swagger"].map(
                (tech) => (
                  <span key={tech} className="text-xs font-mono">
                    {tech}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════ */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-semibold text-white">
                FreeAPI
              </span>
              <span className="text-slate-600 text-sm">by</span>
              <a
                href="https://chaicode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
              >
                Chaicode.com
              </a>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a
                href="https://github.com/hiteshchoudhary/apihub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://freeapi.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Documentation
              </a>
              <a
                href="https://chaicode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Chaicode
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-slate-600">
              &copy; {new Date().getFullYear()} FreeAPI. Open Source under MIT.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
