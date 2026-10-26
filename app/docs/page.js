"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { API_BASE_URL, SPEC_URL } from "../config";
import { NAV_HEIGHT, SiteNav, Wallpaper } from "../components/site";

const ApiReferenceReact = dynamic(
  () => import("@scalar/api-reference-react").then((m) => m.ApiReferenceReact),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-white/60">
        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
        Loading the reference…
      </div>
    ),
  }
);

import "@scalar/api-reference-react/style.css";

// Scalar themed as frosted glass: translucent panels over the wallpaper, a blurred sidebar, Apple label colours
const SCALAR_CSS = `
  .dark-mode, .light-mode {
    --scalar-custom-header-height: ${NAV_HEIGHT}px;
    --scalar-font: -apple-system, BlinkMacSystemFont, "SF Pro Text", var(--font-body), system-ui, sans-serif;
    --scalar-font-code: ui-monospace, "SF Mono", var(--font-mono), monospace;
    --scalar-radius: 0.75rem;
    --scalar-radius-lg: 1.25rem;

    --scalar-background-1: rgb(8 9 14 / 0.78);
    --scalar-background-2: rgb(255 255 255 / 0.05);
    --scalar-background-3: rgb(255 255 255 / 0.09);
    --scalar-background-accent: rgb(100 210 255 / 0.12);
    --scalar-border-color: rgb(255 255 255 / 0.1);

    --scalar-color-1: #f5f5f7;
    --scalar-color-2: rgb(235 235 245 / 0.6);
    --scalar-color-3: rgb(235 235 245 / 0.38);
    --scalar-color-accent: #64d2ff;

    --scalar-sidebar-background-1: rgb(20 20 28 / 0.45);
    --scalar-sidebar-border-color: rgb(255 255 255 / 0.1);
    --scalar-sidebar-color-1: #f5f5f7;
    --scalar-sidebar-color-2: rgb(235 235 245 / 0.6);
    --scalar-sidebar-color-active: #64d2ff;
    --scalar-sidebar-item-hover-background: rgb(255 255 255 / 0.06);
    --scalar-sidebar-item-active-background: rgb(100 210 255 / 0.12);
    --scalar-sidebar-search-background: rgb(255 255 255 / 0.06);
    --scalar-sidebar-search-border-color: rgb(255 255 255 / 0.12);
  }
  .t-doc__sidebar {
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    backdrop-filter: blur(30px) saturate(180%);
  }
  .references-layout {
    background: transparent;
  }
`;

export default function DocsPage() {
  return (
    <div className="relative isolate min-h-screen">
      <Wallpaper dim />
      <SiteNav />
      <ApiReferenceReact
        configuration={{
          spec: { url: SPEC_URL },
          // The spec still names the old host; point "Try it" and the code samples at the live server
          servers: [{ url: API_BASE_URL, description: "FreeAPI (live)" }],
          theme: "none",
          darkMode: true,
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
