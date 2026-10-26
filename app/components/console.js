"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Copy } from "lucide-react";
import { API_BASE_URL, API_HOST } from "../config";
import { PRESETS } from "../catalog";

const STATUS_TEXT = { 200: "OK", 201: "Created", 401: "Unauthorized", 404: "Not Found", 418: "I'm a teapot", 422: "Unprocessable", 429: "Too Many Requests", 500: "Server Error" };

function formatBytes(n) {
  return n < 1024 ? `${n} B` : `${(n / 1024).toFixed(1)} KB`;
}

// Pretty-prints JSON: keys grey, strings ink, numbers and literals blue
export function JsonView({ value }) {
  const json = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  const parts = [];
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)/gi;
  let last = 0;
  let m;
  while ((m = re.exec(json))) {
    if (m.index > last) parts.push(json.slice(last, m.index));
    if (m[1] && m[2]) {
      parts.push(<span key={m.index} className="text-ink-3">{m[1]}</span>, m[2]);
    } else if (m[1]) {
      parts.push(<span key={m.index} className="text-ink">{m[1]}</span>);
    } else {
      parts.push(<span key={m.index} className="text-azure">{m[0]}</span>);
    }
    last = re.lastIndex;
  }
  parts.push(json.slice(last));
  return <>{parts}</>;
}

export function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-ink-2 transition-colors hover:bg-ink/[0.05] hover:text-ink"
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      {copied ? "Copied" : label}
    </button>
  );
}

/**
 * A working GET console against the live API. `runToken` changes whenever the page wants it to send
 * (for example after "Try" in the explorer); it also sends once on mount.
 */
export function RequestConsole({ path, onPathChange, runToken }) {
  const [draft, setDraft] = useState(path);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inFlight = useRef(0);

  useEffect(() => setDraft(path), [path]);

  const send = useCallback(async (target) => {
    const id = ++inFlight.current;
    const clean = target.startsWith("/") ? target : `/${target}`;
    setLoading(true);
    const started = performance.now();
    try {
      // One quiet retry: an idle API instance can drop the first connection while it wakes up
      const res = await fetch(`${API_BASE_URL}${clean}`).catch(() => fetch(`${API_BASE_URL}${clean}`));
      const text = await res.text();
      if (id !== inFlight.current) return;
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
      setResult({ status: res.status, ms: Math.round(performance.now() - started), bytes: new Blob([text]).size, body });
    } catch {
      if (id !== inFlight.current) return;
      setResult({ error: "Could not reach the API. Check your connection and try again." });
    } finally {
      if (id === inFlight.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    send(path);
    // path is read at the moment of the run; a new runToken is the trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runToken, send]);

  const submit = (e) => {
    e.preventDefault();
    onPathChange(draft);
    send(draft);
  };

  const pick = (p) => {
    onPathChange(p);
    send(p);
  };

  const ok = result?.status >= 200 && result?.status < 300;
  const bodyText = result?.body != null ? (typeof result.body === "string" ? result.body : JSON.stringify(result.body, null, 2)) : "";

  return (
    <div className="glass overflow-hidden rounded-[28px]">
      <form onSubmit={submit} className="flex items-center gap-2 p-2.5 sm:gap-3 sm:p-3">
        <div className="well flex min-w-0 flex-1 items-center gap-2 rounded-2xl py-2 pl-2 pr-3 font-mono text-[13px] sm:text-sm">
          <span className="shrink-0 rounded-lg bg-azure-soft px-2 py-1 text-xs font-semibold text-azure">GET</span>
          <span className="-mr-2 shrink-0 text-ink-3" title={API_HOST}>/api/v1</span>
          <label htmlFor="console-path" className="sr-only">
            Request path
          </label>
          <input
            id="console-path"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-3"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-2xl bg-azure px-4 text-sm font-medium text-white transition-colors hover:bg-azure-hover disabled:opacity-60 sm:px-5"
        >
          Send <ArrowUp className="size-4 rotate-45" aria-hidden />
        </button>
      </form>

      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-3 pb-3 sm:px-4">
        {PRESETS.map((p) => (
          <button
            key={p.path}
            type="button"
            onClick={() => pick(p.path)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
              path === p.path ? "bg-ink text-canvas" : "bg-ink/[0.04] text-ink-2 hover:bg-ink/[0.07] hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="border-t border-ink/[0.06] bg-surface/40">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-5" aria-live="polite">
          {result?.status ? (
            <span className="flex items-center gap-3 text-ink-2">
              <span className="flex items-center gap-1.5 font-medium text-ink">
                <span className={`size-1.5 rounded-full ${ok ? "bg-azure" : "bg-ink-3"}`} />
                {result.status} {STATUS_TEXT[result.status] ?? ""}
              </span>
              <span>{result.ms} ms</span>
              <span>{formatBytes(result.bytes)}</span>
            </span>
          ) : (
            <span className="text-ink-3">{loading ? "Sending…" : "Response"}</span>
          )}
          {bodyText && <CopyButton text={bodyText} label="Copy JSON" />}
        </div>
        <div className="h-[320px] overflow-auto px-4 pb-5 sm:h-[360px] sm:px-5">
          {result?.error ? (
            <p className="text-sm text-ink-2">{result.error}</p>
          ) : result ? (
            <pre className={`whitespace-pre-wrap break-words font-mono text-[12.5px] leading-[1.7] transition-opacity ${loading ? "opacity-40" : ""}`}>
              <JsonView value={result.body} />
            </pre>
          ) : (
            <div className="space-y-2.5 pt-1" aria-hidden>
              {[60, 85, 45, 70, 55].map((w, i) => (
                <div key={i} className="h-3 rounded-full bg-ink/[0.05]" style={{ width: `${w}%` }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
