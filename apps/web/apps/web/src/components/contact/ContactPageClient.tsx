"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactPageClient() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || "",
          company: formData.get("company") || "",
          service: formData.get("service") || "",
          subject: formData.get("subject") || "",
          message: formData.get("message"),
          sourcePage: window.location.pathname,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_16px_40px_rgba(16,185,129,0.3)]">
            <CheckCircle className="h-8 w-8 text-white" strokeWidth={1.8} />
          </div>
        </div>
        <h3 className="mt-5 font-display text-[1.4rem] font-semibold text-[#17243a] sm:text-[1.6rem]">
          Message Sent!
        </h3>
        <p className="mt-2 max-w-xs text-[14px] text-[#17243a]/50">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#c6a45b]/25 bg-[#c6a45b]/10 px-5 py-2.5 text-[13px] font-medium text-[#9a7428] transition-all hover:border-[#c6a45b]/50 hover:bg-[#c6a45b]/20"
        >
          Send Another Message
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-[#17243a]/10 bg-[#faf8f5] pl-4 pr-3 text-[14px] font-medium text-[#17243a] outline-none transition-all duration-300 placeholder:text-[#17243a]/30 focus:border-[#c6a45b]/60 focus:bg-white focus:shadow-[0_0_0_3px_rgba(198,164,91,0.08)] sm:h-13 sm:rounded-2xl sm:pl-5 sm:pr-4 sm:text-[15px]";

  const labelClass =
    "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#17243a]/45 sm:text-[12px]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full Name <span className="text-[#c6a45b]">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="text-[#c6a45b]">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            className={inputClass}
            placeholder="Your company"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className={labelClass}>
          Service Interested In
        </label>
        <select
          id="contact-service"
          name="service"
          className={cn(inputClass, "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2317243a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat pr-10")}
        >
          <option value="">Select a service...</option>
          <option value="Architecture & Design">Architecture & Design</option>
          <option value="Construction & Infrastructure">Construction & Infrastructure</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Import & Export">Import & Export</option>
          <option value="OTC Exchange">OTC Exchange</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className={inputClass}
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="text-[#c6a45b]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className={cn(inputClass, "h-auto resize-none py-3 sm:py-3.5")}
          placeholder="Tell us about your project..."
        />
      </div>

      {errorMsg && (
        <div className="rounded-xl border border-[#d56a5e]/20 bg-[#d56a5e]/5 px-4 py-3 text-[13px] text-[#d56a5e]">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#c6a45b] to-[#d4aa5a] py-3.5 text-[14px] font-bold text-[#0a0f1a] shadow-[0_12px_40px_rgba(198,164,91,0.25)] transition-all duration-300 hover:shadow-[0_16px_50px_rgba(198,164,91,0.35)] sm:rounded-2xl sm:py-4 sm:text-[15px]",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" strokeWidth={2} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
