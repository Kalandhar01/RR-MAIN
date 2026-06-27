"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle, Send } from "lucide-react";

export function ContactForm() {
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
      <div className="flex flex-col items-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Message Sent!</h3>
        <p className="mt-2 text-sm text-gray-500">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
          <input id="contact-name" name="name" type="text" required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
            placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
          <input id="contact-email" name="email" type="email" required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
            placeholder="you@example.com" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input id="contact-phone" name="phone" type="tel"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
            placeholder="+91 98765 43210" />
        </div>
        <div>
          <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700">Company</label>
          <input id="contact-company" name="company" type="text"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
            placeholder="Your company" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="block text-sm font-medium text-gray-700">Service Interested In</label>
        <select id="contact-service" name="service"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20">
          <option value="">Select a service...</option>
          <option value="Architecture">Architecture</option>
          <option value="Construction">Construction</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Import & Export">Import & Export</option>
          <option value="OTC Exchange">OTC Exchange</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
        <textarea id="contact-message" name="message" required rows={4}
          className="mt-1 block w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
          placeholder="Tell us about your project..." />
      </div>

      {errorMsg && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</div>
      )}

      <button type="submit" disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A15A] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#b8914a] disabled:cursor-not-allowed disabled:opacity-60">
        {status === "submitting" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
        ) : (
          <><Send className="h-4 w-4" /> Send Message</>
        )}
      </button>
    </form>
  );
}
