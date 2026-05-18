"use client";

import { useState } from "react";

/**
 * Progressive profiling: the landing page asks only for email to keep
 * conversion friction near zero. Here, post-conversion, we optionally
 * enrich the same GHL contact with a first name. Skipping is frictionless.
 */
export function ThankYouProfile({ email }: { email?: string }) {
  const [firstName, setFirstName] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "done">("idle");

  if (!email) return null;

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = firstName.trim();
    if (!name || state === "saving") return;

    setState("saving");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: name }),
      });
    } catch {
      // Non-blocking: the subscription already succeeded.
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <p className="mt-8 rounded-xl border border-brand/30 bg-brand/10 px-5 py-4 text-sm text-white/75">
        Got it{firstName.trim() ? `, ${firstName.trim()}` : ""}. Talk soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={save}
      className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left"
    >
      <label
        htmlFor="firstName"
        className="block text-sm font-medium text-white/75"
      >
        One quick thing — what should Maciej call you?
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={state === "saving"}
          className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/40 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === "saving" || !firstName.trim()}
          className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "saving" ? "Saving…" : "Save"}
        </button>
      </div>
      <p className="mt-2 text-xs text-white/35">
        Optional — it just makes the emails feel less like a robot wrote them.
      </p>
    </form>
  );
}
