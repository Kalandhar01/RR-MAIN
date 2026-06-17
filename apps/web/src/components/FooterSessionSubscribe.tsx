"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const motionEase = [0.22, 1, 0.36, 1] as const;
const SESSION_KEY = "ractysh_subscribed_session";

type State = "idle" | "expanded" | "loading";

function isSessionSubscribed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markSessionSubscribed() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // non-critical
  }
}

export function FooterSessionSubscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>(isSessionSubscribed() ? "idle" : "idle");
  const [error, setError] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const errorId = useId();
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, []);

  if (isSessionSubscribed() && !toastVisible) {
    return null;
  }

  function showToast(msg: string) {
    setToastMsg(msg);
    setToastVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => {
        setToastMsg(null);
        setState("idle");
      }, 400);
    }, 3000);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setError("");
    setState("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "footer_session_subscribe" })
      });
      const data = await res.json().catch(() => ({}));
      markSessionSubscribed();
      setEmail("");
      if (res.status === 409) {
        showToast(data.message || "Already subscribed");
      } else if (!res.ok) {
        throw new Error(data.message || "Subscription failed. Try again.");
      } else {
        showToast(data.message || "Subscribed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("expanded");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.34, ease: motionEase }}
    >
      <AnimatePresence mode="wait">
        {toastVisible && toastMsg ? (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: motionEase }}
            className="mt-6 flex items-center gap-2.5 rounded-[10px] border border-[#d6b45f]/30 bg-[#111111] px-4 py-3.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d6b45f] text-[#0B0B0B]">
              <Check className="h-4 w-4" strokeWidth={2.8} />
            </span>
            <span className="text-[0.88rem] font-semibold text-[#fff8ec]">{toastMsg}</span>
          </motion.div>
        ) : state === "expanded" || state === "loading" ? (
          <motion.form
            key="subscribe-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: motionEase }}
            className="overflow-hidden mt-6"
          >
            <label className="block min-w-0">
              <span className="sr-only">Email Address</span>
              <input
                required
                disabled={state === "loading"}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                type="email"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                placeholder="Enter your email"
                className="mb-2 h-11 w-full rounded-[8px] border border-[#d6b45f]/22 bg-[#151515] px-4 text-[0.85rem] font-medium text-[#fff8ec] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#f4e6cc]/34 focus:border-[#d6b45f]/82 focus:shadow-[0_0_0_3px_rgba(214,180,95,0.16)]"
              />
            </label>
            <button
              type="submit"
              disabled={state === "loading"}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-gradient-to-r from-[#8b1118] to-[#c0392b] px-4 text-[0.8rem] font-semibold text-[#fff8ec] shadow-[0_8px_20px_rgba(139,17,24,0.3)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(139,17,24,0.45)] active:scale-[0.98] disabled:opacity-70"
            >
              {state === "loading" ? (
                <span className="flex items-center gap-2">
                  Subscribing
                  <span className="h-3.5 w-3.5 rounded-full border border-[#d6b45f]/38 border-t-[#d6b45f] motion-safe:animate-spin" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
              )}
            </button>
            {error ? (
              <p id={errorId} className="mt-1.5 text-[0.72rem] font-semibold text-[#d6b45f]">{error}</p>
            ) : null}
          </motion.form>
        ) : (
          <motion.button
            key="subscribe-button"
            onClick={() => setState("expanded")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: motionEase }}
            className="group mt-6 inline-flex h-[2.8rem] w-full items-center justify-center gap-2 rounded-[8px] bg-gradient-to-r from-[#8b1118] to-[#c0392b] px-5 text-[0.8rem] font-semibold text-[#fff8ec] shadow-[0_8px_20px_rgba(139,17,24,0.3)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(139,17,24,0.45)] active:scale-[0.98]"
          >
            Subscribe
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
