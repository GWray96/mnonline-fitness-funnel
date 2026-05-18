import type { Metadata } from "next";
import Link from "next/link";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../_lib/site";
import { ThankYouProfile } from "./ThankYouProfile";

export const metadata: Metadata = {
  title: "You're in — MN Online Coach",
  robots: { index: false, follow: false },
};

export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-2xl text-brand">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          You&apos;re in.
        </h1>
        <p className="mt-4 text-white/65">
          {email ? (
            <>
              Confirmation&apos;s on the way to{" "}
              <span className="text-white/90">{email}</span>. Check your inbox
              (and spam, just in case) — the next issue lands this week.
            </>
          ) : (
            <>
              Check your inbox (and spam, just in case) — the next issue lands
              this week.
            </>
          )}
        </p>

        <ThankYouProfile email={email} />

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-sm text-white/45">
            While you wait, see the day-to-day:
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-brand/40 hover:text-brand"
          >
            Follow @{INSTAGRAM_HANDLE} on Instagram
          </a>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-sm text-white/40 transition hover:text-white/70"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
