"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Github, Loader2 } from "lucide-react";

const ApiReferenceReact = dynamic(
  () =>
    import("@scalar/api-reference-react").then((m) => m.ApiReferenceReact),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[60vh] text-stone-400 text-sm">
        <Loader2 className="animate-spin mr-2" size={16} />
        Loading reference…
      </div>
    ),
  }
);

import "@scalar/api-reference-react/style.css";

const SPEC_URL =
  "https://raw.githubusercontent.com/hiteshchoudhary/apihub/main/src/swagger.yaml";
const REPO_URL = "https://github.com/hiteshchoudhary/apihub";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0a]/85 border-b border-stone-800">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-5 sm:px-8 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-300 hover:text-white text-[13px] transition"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
          <span className="text-[12px] font-mono text-stone-500 hidden sm:inline">
            interactive · live API
          </span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-stone-400 hover:text-white transition"
          >
            <Github size={13} /> source
          </a>
        </div>
      </div>

      <ApiReferenceReact
        configuration={{
          spec: { url: SPEC_URL },
          theme: "default",
          darkMode: true,
          hideDarkModeToggle: true,
          metaData: {
            title: "FreeAPI · Interactive API Reference",
            description:
              "Run any FreeAPI endpoint live — auth, e-commerce, social, todos, and more.",
          },
          customCss: `
            :root {
              --scalar-font: var(--font-body);
              --scalar-font-code: var(--font-mono);
            }
          `,
        }}
      />
    </main>
  );
}
