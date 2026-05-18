import type { Metadata } from "next";
import { SubscribeForm } from "./_components/SubscribeForm";
import { StickyCta } from "./_components/StickyCta";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "./_lib/site";

export const metadata: Metadata = {
  title: "The Weekly Coaching Email That Cuts Through the Fitness BS",
};

const SUBSCRIBER_COUNT = "1,200+"; // PLACEHOLDER: real subscriber count

const TESTIMONIALS = [
  {
    quote:
      "[Replace before launch] A real subscriber quote about how one weekly email changed how they train or eat.",
    name: "Client name",
    detail: "Result / context",
  },
  {
    quote:
      "[Replace before launch] A short, specific testimonial — the more concrete the result, the better it converts.",
    name: "Client name",
    detail: "Result / context",
  },
  {
    quote:
      "[Replace before launch] Keep these to one or two punchy sentences. Real names + a result outperform generic praise.",
    name: "Client name",
    detail: "Result / context",
  },
];

const WEEKLY = [
  {
    title: "One training principle",
    body: "A single idea you can apply to your next session — progressive overload, technique, programming. Not theory. Something you do.",
  },
  {
    title: "Nutrition in plain English",
    body: "Macros, deficits, and food choices broken down without the influencer noise. Just what actually moves the needle.",
  },
  {
    title: "A myth, debunked",
    body: "One piece of fitness nonsense I'm tired of seeing online — and what the evidence actually says.",
  },
  {
    title: "A real client question",
    body: "The exact stuff people pay me to answer. You get it free, every week, in your inbox.",
  },
];

const FAQ = [
  {
    q: "How often will you email me?",
    a: "Once a week. That's it. No daily blasts, no drip funnels, no fake urgency.",
  },
  {
    q: "Is this actually free?",
    a: "Yes. No card, no trial, no catch. If you want coaching later, you'll know where to find me — but the email costs nothing.",
  },
  {
    q: "Who is this for?",
    a: "Anyone who lifts, wants to get leaner or stronger, and is sick of contradictory advice. Beginner to intermediate gets the most out of it.",
  },
  {
    q: "Will you spam or sell my email?",
    a: "Never. One click unsubscribes you instantly, and your email is never shared or sold.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-16 sm:pt-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
            MN Online Coach · The Weekly Email
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            The Weekly Coaching Email That{" "}
            <span className="text-brand">Cuts Through the Fitness BS</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65 sm:text-xl">
            Every week, Maciej breaks down one training, nutrition, or mindset
            lesson you can actually apply. No fluff, no fads, no selling.
          </p>

          <div className="mx-auto mt-9 max-w-xl">
            <SubscribeForm variant="hero" />
          </div>

          <p className="mt-6 text-sm text-white/45">
            Join{" "}
            <span className="font-semibold text-white/70">
              {SUBSCRIBER_COUNT}
            </span>{" "}
            lifters getting it every week.
          </p>
        </div>
      </section>

      {/* ─────────────── What you get every week ─────────────── */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What lands in your inbox
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-white/55">
            Four things, every single week. Specific enough to use the same day.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {WEEKLY.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-brand/30 hover:bg-white/[0.05]"
              >
                <h3 className="text-lg font-semibold text-brand">
                  {item.title}
                </h3>
                <p className="mt-2 text-white/65">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── Who's writing this ─────────────────── */}
      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-[200px_1fr]">
          {/* PLACEHOLDER: swap for a real photo of Maciej via next/image */}
          <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand/30 to-brand-dark/20 text-sm text-white/40">
            Coach photo
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Who&apos;s actually writing this
            </h2>
            <p className="mt-4 text-white/65">
              I&apos;m Maciej — online coach behind MN Online Coach. I&apos;ve
              spent{" "}
              <span className="text-white/85">
                [X years] coaching [N+] clients
              </span>{" "}
              through fat loss, muscle gain, and everything that gets in the way
              of both. This email is the same thinking I use with paying
              clients, minus the invoice.
            </p>
            <p className="mt-3 text-white/65">
              <span className="text-white/50">
                [Replace bracketed text with Maciej&apos;s real credentials,
                years coaching, and client numbers.]
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Proof ───────────────────────── */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What readers say
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <blockquote className="flex-1 text-white/75">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-white/85">{t.name}</span>
                  <span className="block text-white/45">{t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Peek inside the last issue ─────────────── */}
      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Peek inside a recent issue
          </h2>
          <div className="mt-10 rounded-2xl border border-white/10 bg-ink p-7 sm:p-9">
            <p className="text-sm font-medium text-brand">
              Subject: You&apos;re not eating too much. You&apos;re eating too
              randomly.
            </p>
            <div className="mt-4 space-y-3 text-white/65">
              <p>
                Most people don&apos;t have a calorie problem. They have a
                consistency problem. Same week: 1,600 one day, 3,400 the next,
                &ldquo;being good&rdquo; until Friday…
              </p>
              <p className="text-white/40">
                [Replace this excerpt with a real paragraph from a recent issue
                — a genuine sample is the single best converter on this page.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FAQ ───────────────────────── */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Straight answers
          </h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="font-semibold text-white/90">{item.q}</h3>
                <p className="mt-2 text-white/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── Final CTA ─────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/10 px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            You&apos;ve got the target.{" "}
            <span className="text-brand">Let&apos;s build something real.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            One email a week. The lesson, the why, and exactly what to do with
            it. Free for as long as you want it.
          </p>
          <div className="mx-auto mt-9 max-w-xl">
            <SubscribeForm
              variant="footer"
              buttonLabel="Get This Week's Lesson"
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────── Footer ───────────────────────── */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
          <span>
            © {new Date().getFullYear()} MN Online Coach. All rights reserved.
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand"
          >
            @{INSTAGRAM_HANDLE} on Instagram
          </a>
        </div>
      </footer>

      <StickyCta />
    </main>
  );
}
