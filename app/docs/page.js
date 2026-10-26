"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { API_BASE_URL, SPEC_URL } from "../config";
import { Glow, NAV_HEIGHT, SiteNav } from "../components/site";
import { useTheme } from "../components/theme";

const ApiReferenceReact = dynamic(
  () => import("@scalar/api-reference-react").then((m) => m.ApiReferenceReact),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-ink-2">
        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
        Loading the reference…
      </div>
    ),
  }
);

import "@scalar/api-reference-react/style.css";

// Scalar in the site's glass style: Apple greys, one blue, a frosted sidebar, in both themes
const SCALAR_CSS = `
  .light-mode, .dark-mode {
    --scalar-custom-header-height: ${NAV_HEIGHT}px;
    --scalar-font: -apple-system, BlinkMacSystemFont, var(--font-body), system-ui, sans-serif;
    --scalar-font-code: ui-monospace, "SF Mono", var(--font-mono), Menlo, monospace;
    --scalar-radius: 0.75rem;
    --scalar-radius-lg: 1rem;
    --scalar-radius-xl: 1.25rem;
    --scalar-button-1-color: #ffffff;
  }
  .light-mode {
    --scalar-background-1: rgb(245 245 247 / 0.85);
    --scalar-background-2: rgb(255 255 255 / 0.7);
    --scalar-background-3: rgb(0 0 0 / 0.04);
    --scalar-background-accent: #e8f2fd;
    --scalar-border-color: rgb(0 0 0 / 0.07);
    --scalar-color-1: #1d1d1f;
    --scalar-color-2: #6e6e73;
    --scalar-color-3: #86868b;
    --scalar-color-accent: #0071e3;
    --scalar-button-1: #0071e3;
    --scalar-button-1-hover: #0077ed;
    --scalar-sidebar-background-1: rgb(255 255 255 / 0.55);
    --scalar-sidebar-border-color: rgb(0 0 0 / 0.06);
    --scalar-sidebar-color-1: #1d1d1f;
    --scalar-sidebar-color-2: #6e6e73;
    --scalar-sidebar-color-active: #0071e3;
    --scalar-sidebar-item-hover-background: rgb(0 0 0 / 0.04);
    --scalar-sidebar-item-active-background: #e8f2fd;
    --scalar-sidebar-search-background: rgb(255 255 255 / 0.8);
    --scalar-sidebar-search-border-color: rgb(0 0 0 / 0.08);
  }
  .dark-mode {
    --scalar-background-1: rgb(10 10 12 / 0.85);
    --scalar-background-2: rgb(44 44 46 / 0.55);
    --scalar-background-3: rgb(255 255 255 / 0.06);
    --scalar-background-accent: rgb(10 132 255 / 0.16);
    --scalar-border-color: rgb(255 255 255 / 0.08);
    --scalar-color-1: #f5f5f7;
    --scalar-color-2: #a1a1a6;
    --scalar-color-3: #6e6e73;
    --scalar-color-accent: #0a84ff;
    --scalar-button-1: #0a84ff;
    --scalar-button-1-hover: #409cff;
    --scalar-sidebar-background-1: rgb(28 28 30 / 0.55);
    --scalar-sidebar-border-color: rgb(255 255 255 / 0.08);
    --scalar-sidebar-color-1: #f5f5f7;
    --scalar-sidebar-color-2: #a1a1a6;
    --scalar-sidebar-color-active: #0a84ff;
    --scalar-sidebar-item-hover-background: rgb(255 255 255 / 0.06);
    --scalar-sidebar-item-active-background: rgb(10 132 255 / 0.16);
    --scalar-sidebar-search-background: rgb(255 255 255 / 0.06);
    --scalar-sidebar-search-border-color: rgb(255 255 255 / 0.1);
  }
  .t-doc__sidebar {
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    backdrop-filter: blur(28px) saturate(180%);
  }
  .references-layout {
    background: transparent;
  }
`;

export default function DocsPage() {
  const [theme] = useTheme();

  return (
    <div className="relative isolate min-h-screen">
      <Glow className="left-1/3 top-0 h-[420px] w-[700px]" />
      <SiteNav />
      <ApiReferenceReact
        // Scalar reads darkMode once, so remount it when the site theme changes
        key={theme}
        configuration={{
          spec: { url: SPEC_URL },
          // The spec still names the old host; point "Try it" and the code samples at the live server
          servers: [{ url: API_BASE_URL, description: "FreeAPI (live)" }],
          theme: "none",
          darkMode: theme === "dark",
          hideDarkModeToggle: true,
          withDefaultFonts: false,
          showDeveloperTools: "never",
          metaData: {
            title: "FreeAPI docs",
            description:
              "Run any FreeAPI endpoint live: auth, e-commerce, social media, todos and more.",
          },
          customCss: SCALAR_CSS,
        }}
      />
    </div>
  );
}
