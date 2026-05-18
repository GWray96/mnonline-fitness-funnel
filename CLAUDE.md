# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-goal newsletter landing page for **MN Online Coach** (online fitness
coach, Maciej). The only conversion action is an email capture that feeds the
existing GoHighLevel (LeadConnector) CRM. Voice is direct and no-fluff — match
it in any copy changes.

## Commands

```bash
npm run dev        # local dev server (Turbopack) on :3000
npm run build      # production build — run before considering work done
npm run lint       # ESLint (flat config, eslint-config-next)
npm run typecheck  # tsc --noEmit
```

There is no test suite. Verification = `typecheck` + `lint` + `build` all
green, plus manually exercising the form against `/api/subscribe`. Do NOT send
test submissions to the live GHL webhook without explicit permission — they
create real CRM contacts.

## Architecture

Next.js 16 App Router, React 19 (React Compiler enabled in `next.config.ts` —
do not hand-add `useMemo`/`useCallback` for perf), Tailwind v4, deployed on
Vercel.

**Conversion flow:** `app/page.tsx` (server component, all static sections) →
`SubscribeForm` (client island) POSTs `{email}` to `app/api/subscribe/route.ts`
→ route validates + forwards to the GHL webhook → client redirects to
`app/thank-you/page.tsx` → `ThankYouProfile` (client) optionally enriches the
same GHL contact with a first name (progressive profiling).

**Server/client boundary:** `page.tsx`, `layout.tsx`, and the thank-you page
are server components. Only `SubscribeForm`, `StickyCta`, `ThankYouProfile`,
and `Analytics` ship client JS. Keep it that way — add `"use client"` only to
genuine interactive islands.

**GHL integration (`app/api/subscribe/route.ts`):** the single backend. Reads
`GHL_WEBHOOK_URL` (env, with a fallback to the existing LeadConnector trigger),
validates email, honeypots the `company` field (silently 200s bots without
forwarding), and POSTs `{ email, firstName?, source: "Newsletter", tags }` to
GHL with an 8s abort timeout. This same endpoint is reused by the thank-you
page to add the first name to the already-created contact (GHL upserts by
email).

**Conversion tracking:** `track("newsletter_subscribe")` fires exactly once,
in `SubscribeForm` on confirmed POST success — NOT on the thank-you page (that
would double-count and fire on refresh/URL-share). `app/_lib/track.ts` is a
no-op until `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID` are set;
`Analytics.tsx` only injects scripts when those env vars exist.

**Shared constants:** email regex in `app/_lib/email.ts` (imported by both the
client form and the server route — keep them in sync via this one file);
Instagram handle/URL in `app/_lib/site.ts`.

## Placeholder convention

Proof assets are intentionally NOT fabricated. Anything a launch needs is
marked `PLACEHOLDER:` or bracketed `[Replace before launch]` — subscriber
count and Instagram handle (`app/_lib/site.ts`, `app/page.tsx`), testimonials,
coach bio/photo, and the sample issue excerpt in `app/page.tsx`. Do not invent
real-looking numbers or quotes to fill these; leave them clearly editable.

## Environment

Copy `.env.example` to `.env.local`. `.env*.local` is gitignored. The GHL
webhook URL also has a hardcoded fallback in the route so the form works
out-of-the-box in dev.
