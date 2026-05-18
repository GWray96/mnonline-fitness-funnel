"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { EMAIL_RE } from "../_lib/email";
import { track } from "../_lib/track";

type Props = {
  /** Distinguishes hero vs. footer form for analytics/labels. */
  variant?: "hero" | "footer";
  buttonLabel?: string;
};

export function SubscribeForm({
  variant = "hero",
  buttonLabel = "Send Me the Weekly Email",
}: Props) {
  const router = useRouter();
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");
    track("newsletter_submit_attempt");

    const company =
      (e.currentTarget.elements.namedItem("company") as HTMLInputElement)
        ?.value ?? "";

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, company }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      track("newsletter_subscribe");
      router.push(`/thank-you?email=${encodeURIComponent(trimmed)}`);
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full"
      aria-label="Newsletter signup"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`${variant}-${emailId}`} className="sr-only">
            Email address
          </label>
          <input
            id={`${variant}-${emailId}`}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            aria-invalid={status === "error"}
            aria-describedby={
              status === "error" ? `${variant}-${emailId}-err` : undefined
            }
            disabled={status === "loading"}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-base text-paper placeholder:text-white/35 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/40 disabled:opacity-60"
          />
        </div>

        {/* Honeypot — visually hidden, off-screen, ignored by real users. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${variant}-company`}>Company</label>
          <input
            id={`${variant}-company`}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-brand px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : buttonLabel}
        </button>
      </div>

      {status === "error" ? (
        <p
          id={`${variant}-${emailId}-err`}
          role="alert"
          className="mt-2 text-sm text-red-400"
        >
          {error}
        </p>
      ) : null}

      <p className="mt-3 text-sm text-white/45">
        Free. One email a week. Unsubscribe in one click.
      </p>
    </form>
  );
}
