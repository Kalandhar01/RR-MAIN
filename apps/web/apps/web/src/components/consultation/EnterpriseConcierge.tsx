"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  DraftingCompass,
  Gem,
  Globe,
  HardHat,
  Home,
  Mail,
  Phone,
  Send,
  Shield,
  User,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Validation schemas ─── */

const nameSchema = z
  .string()
  .trim()
  .min(1, "Please enter your name.")
  .min(3, "Name must be at least 3 characters.")
  .max(120, "Name is too long.");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .refine((v) => emailPattern.test(v), "Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .max(40, "Phone number is too long."),
});

/* ─── Vertical options ─── */

const verticals = [
  { id: "architecture", label: "Architecture & Design", icon: DraftingCompass, emoji: "🏛️" },
  { id: "construction", label: "Construction & Infrastructure", icon: HardHat, emoji: "🏗️" },
  { id: "realestate", label: "Real Estate", icon: Home, emoji: "🏠" },
  { id: "importexport", label: "Import & Export", icon: Globe, emoji: "🚢" },
  { id: "otc", label: "OTC Exchange", icon: Building2, emoji: "💹" },
] as const;

type VerticalId = (typeof verticals)[number]["id"];

const verticalToServiceType: Record<VerticalId, string> = {
  architecture: "Architecture & Design",
  construction: "Construction & Infrastructure",
  realestate: "Real Estate",
  importexport: "Import & Export",
  otc: "OTC Exchange",
};

/* ─── Step type ─── */

type Step = "welcome" | "name" | "contact" | "vertical" | "submitting" | "success";

/* ─── Slide animation variants ─── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

/* ─── Progress dots ─── */

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            width: i === current ? 20 : 6,
            backgroundColor: i <= current ? "#c6a45b" : "rgba(198,164,91,0.2)",
          }}
          transition={{ duration: 0.4, ease }}
          className="h-1.5 rounded-full sm:h-2"
        />
      ))}
    </div>
  );
}

/* ─── Back button ─── */

function BackBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      onClick={onClick}
      className="group flex items-center gap-2 text-[13px] font-medium text-[#17243a]/50 transition-colors hover:text-[#17243a]/80"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
      {label}
    </motion.button>
  );
}

/* ─── Input field ─── */

function ConciergeInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  icon: Icon,
  inputRef,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#c6a45b] sm:text-[11px]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#17243a]/30 sm:left-4">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
        </span>
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "name"}
          inputMode={type === "email" ? "email" : type === "tel" ? "tel" : "text"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              (e.target as HTMLInputElement).closest("form")?.requestSubmit();
            }
          }}
          className={cn(
            "h-12 w-full rounded-xl border bg-[#17243a]/[0.06] pl-10 pr-3 text-[15px] font-medium text-[#17243a] outline-none transition-all duration-300 placeholder:text-[#17243a]/25 sm:h-14 sm:rounded-2xl sm:pl-12 sm:pr-4 sm:text-[16px]",
            "focus:border-[#c6a45b]/60 focus:bg-[#17243a]/[0.06] focus:shadow-[0_0_0_3px_rgba(198,164,91,0.1)] sm:focus:shadow-[0_0_0_4px_rgba(198,164,91,0.1)]",
            error
              ? "border-[#d56a5e]/60 focus:border-[#d56a5e]"
              : "border-[#17243a]/10"
          )}
        />
      </div>
      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-[11px] font-medium text-[#d56a5e] sm:text-xs"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}

/* ─── Main Component ─── */

export function EnterpriseConcierge() {
  const [step, setStep] = useState<Step>("welcome");
  const [direction, setDirection] = useState(1);

  // Form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vertical, setVertical] = useState<VerticalId | "">("");

  // Server state
  const [serverError, setServerError] = useState("");

  // Refs for scrolling inputs into view
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const stepOrder = useMemo<Step[]>(() => ["welcome", "name", "contact", "vertical"], []);
  const currentStepIndex = stepOrder.indexOf(step);
  const totalSteps = 4;

  const goTo = useCallback(
    (next: Step) => {
      setDirection(stepOrder.indexOf(next) > currentStepIndex ? 1 : -1);
      setStep(next);
    },
    [currentStepIndex, stepOrder]
  );

  const goBack = useCallback(() => {
    if (step === "name") goTo("welcome");
    else if (step === "contact") goTo("name");
    else if (step === "vertical") goTo("contact");
  }, [step, goTo]);

  /* ─── Step: Welcome ─── */

  function WelcomeStep() {
    return (
      <div className="flex h-full flex-col items-center justify-center px-5 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c6a45b] to-[#9a7428] shadow-[0_20px_60px_rgba(198,164,91,0.3)] sm:mb-8 sm:h-20 sm:w-20 sm:rounded-3xl"
        >
          <Gem className="h-7 w-7 text-white sm:h-9 sm:w-9" strokeWidth={1.8} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease }}
          className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c6a45b] sm:text-[11px] sm:tracking-[0.18em]"
        >
          Ractysh Enterprise Concierge
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease }}
          className="mt-4 max-w-sm font-display text-[1.8rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#17243a] sm:mt-5 sm:max-w-lg sm:text-[2.2rem] md:text-[2.8rem]"
        >
          Let&apos;s Build Something{" "}
          <span className="bg-gradient-to-r from-[#c6a45b] to-[#e8d48b] bg-clip-text text-transparent">
            Extraordinary
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease }}
          className="mt-4 max-w-xs text-[14px] leading-[1.7] text-[#17243a]/50 sm:mt-5 sm:max-w-md sm:text-[15px]"
        >
          4 quick steps. No scrolling. We&apos;ll match you with the right
          enterprise advisory team.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => goTo("name")}
          className="mt-8 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#c6a45b] to-[#d4aa5a] px-7 py-3.5 text-[14px] font-bold text-[#0a0f1a] shadow-[0_16px_48px_rgba(198,164,91,0.3)] transition-shadow hover:shadow-[0_20px_60px_rgba(198,164,91,0.4)] sm:mt-10 sm:gap-3 sm:px-8 sm:py-4 sm:text-[15px]"
        >
          Begin Consultation
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center gap-2 text-[11px] text-[#17243a]/30 sm:mt-8 sm:text-[12px]"
        >
          <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
          Secure & encrypted
        </motion.div>
      </div>
    );
  }

  /* ─── Step: Name ─── */

  function NameStep() {
    const [localName, setLocalName] = useState(fullName);
    const [localError, setLocalError] = useState("");

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const result = nameSchema.safeParse(localName);
      if (!result.success) {
        setLocalError(result.error.errors[0].message);
        return;
      }
      setFullName(localName);
      goTo("contact");
    }

    return (
      <div className="flex h-full flex-col px-5 pt-20 sm:px-6 sm:pt-24">
        <BackBtn onClick={goBack} label="Back" />

        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c6a45b] sm:mb-4 sm:text-[11px]">
                Step 1 of 3
              </p>
              <h2 className="font-display text-[1.5rem] font-semibold leading-[1.1] text-[#17243a] sm:text-[1.8rem] md:text-[2.2rem]">
                What&apos;s your name?
              </h2>
              <p className="mt-2 text-[13px] text-[#17243a]/40 sm:mt-3 sm:text-[14px]">
                We&apos;ll address you by this name throughout the process.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
              onSubmit={handleSubmit}
              className="mt-8 sm:mt-10"
            >
              <ConciergeInput
                id="fullName"
                label="Full Name"
                value={localName}
                onChange={(v) => {
                  setLocalName(v);
                  setLocalError("");
                }}
                error={localError}
                placeholder="Enter your full name"
                icon={User}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c6a45b] to-[#d4aa5a] py-3.5 text-[14px] font-bold text-[#0a0f1a] shadow-[0_12px_40px_rgba(198,164,91,0.25)] transition-shadow hover:shadow-[0_16px_50px_rgba(198,164,91,0.35)] sm:mt-8 sm:rounded-2xl sm:py-4 sm:text-[15px]"
              >
                Continue
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Bottom safe area spacer */}
        <div className="h-6 shrink-0 sm:h-8" />
      </div>
    );
  }

  /* ─── Step: Contact ─── */

  function ContactStep() {
    const [localEmail, setLocalEmail] = useState(email);
    const [localPhone, setLocalPhone] = useState(phone);
    const [localEmailError, setLocalEmailError] = useState("");
    const [localPhoneError, setLocalPhoneError] = useState("");

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const result = contactSchema.safeParse({ email: localEmail, phone: localPhone });
      if (!result.success) {
        result.error.errors.forEach((err) => {
          if (err.path[0] === "email") setLocalEmailError(err.message);
          if (err.path[0] === "phone") setLocalPhoneError(err.message);
        });
        return;
      }
      setEmail(localEmail);
      setPhone(localPhone);
      goTo("vertical");
    }

    return (
      <div className="flex h-full flex-col px-5 pt-20 sm:px-6 sm:pt-24">
        <BackBtn onClick={goBack} label="Back" />

        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c6a45b] sm:mb-4 sm:text-[11px]">
                Step 2 of 3
              </p>
              <h2 className="font-display text-[1.5rem] font-semibold leading-[1.1] text-[#17243a] sm:text-[1.8rem] md:text-[2.2rem]">
                How can we reach you?
              </h2>
              <p className="mt-2 text-[13px] text-[#17243a]/40 sm:mt-3 sm:text-[14px]">
                We&apos;ll use this to send your consultation details.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
              onSubmit={handleSubmit}
              className="mt-8 space-y-4 sm:mt-10 sm:space-y-5"
            >
              <ConciergeInput
                id="email"
                label="Email Address"
                type="email"
                value={localEmail}
                onChange={(v) => {
                  setLocalEmail(v);
                  setLocalEmailError("");
                }}
                error={localEmailError}
                placeholder="you@company.com"
                icon={Mail}
                inputRef={emailRef}
              />

              <ConciergeInput
                id="phone"
                label="Phone Number"
                type="tel"
                value={localPhone}
                onChange={(v) => {
                  setLocalPhone(v);
                  setLocalPhoneError("");
                }}
                error={localPhoneError}
                placeholder="+91 000 000 0000"
                icon={Phone}
                inputRef={phoneRef}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c6a45b] to-[#d4aa5a] py-3.5 text-[14px] font-bold text-[#0a0f1a] shadow-[0_12px_40px_rgba(198,164,91,0.25)] transition-shadow hover:shadow-[0_16px_50px_rgba(198,164,91,0.35)] sm:mt-6 sm:rounded-2xl sm:py-4 sm:text-[15px]"
              >
                Continue
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Bottom safe area spacer */}
        <div className="h-6 shrink-0 sm:h-8" />
      </div>
    );
  }

  /* ─── Step: Vertical ─── */

  function VerticalStep() {
    const [selected, setSelected] = useState<VerticalId | "">(vertical);
    const [localError, setLocalError] = useState("");

    function handleSubmit() {
      if (!selected) {
        setLocalError("Please select a vertical.");
        return;
      }
      setVertical(selected);
      setLocalError("");
      submitForm();
    }

    return (
      <div className="flex h-full flex-col px-5 pt-20 sm:px-6 sm:pt-24">
        <BackBtn onClick={goBack} label="Back" />

        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-lg text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c6a45b] sm:mb-4 sm:text-[11px]">
                Step 3 of 3
              </p>
              <h2 className="font-display text-[1.5rem] font-semibold leading-[1.1] text-[#17243a] sm:text-[1.8rem] md:text-[2.2rem]">
                What are you building?
              </h2>
              <p className="mt-2 text-[13px] text-[#17243a]/40 sm:mt-3 sm:text-[14px]">
                Select the vertical that best fits your project.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
              className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3"
            >
              {verticals.map((v, i) => {
                const Icon = v.icon;
                const isSelected = selected === v.id;

                return (
                  <motion.button
                    key={v.id}
                    type="button"
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.4, ease }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelected(v.id);
                      setLocalError("");
                    }}
                    className={cn(
                      "group relative flex flex-col items-center gap-2 rounded-xl border p-3.5 transition-all duration-300 sm:gap-3 sm:rounded-2xl sm:p-5",
                      isSelected
                        ? "border-[#c6a45b]/60 bg-[#c6a45b]/15 shadow-[0_0_0_2px_rgba(198,164,91,0.2),0_16px_48px_rgba(198,164,91,0.15)]"
                        : "border-[#17243a]/10 bg-[#17243a]/[0.04] hover:border-[#17243a]/20 hover:bg-[#17243a]/[0.07]"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c6a45b] text-[#0a0f1a] sm:-right-1.5 sm:-top-1.5 sm:h-6 sm:w-6"
                      >
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} />
                      </motion.span>
                    )}

                    <span className="text-lg sm:text-2xl">{v.emoji}</span>

                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 sm:h-10 sm:w-10 sm:rounded-xl",
                        isSelected
                          ? "bg-[#c6a45b]/20 text-[#c6a45b]"
                          : "bg-[#17243a]/[0.06] text-[#17243a]/40 group-hover:text-[#17243a]/60"
                      )}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
                    </span>

                    <span
                      className={cn(
                        "text-[11px] font-medium leading-tight transition-colors duration-300 sm:text-[13px]",
                        isSelected ? "text-[#17243a]" : "text-[#17243a]/60 group-hover:text-[#17243a]/80"
                      )}
                    >
                      {v.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>

            {localError ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-[11px] font-medium text-[#d56a5e] sm:mt-4 sm:text-xs"
              >
                {localError}
              </motion.p>
            ) : null}

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c6a45b] to-[#d4aa5a] py-3.5 text-[14px] font-bold text-[#0a0f1a] shadow-[0_12px_40px_rgba(198,164,91,0.25)] transition-shadow hover:shadow-[0_16px_50px_rgba(198,164,91,0.35)] sm:mt-8 sm:rounded-2xl sm:py-4 sm:text-[15px]"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
              Submit Request
            </motion.button>
          </div>
        </div>

        {/* Bottom safe area spacer */}
        <div className="h-6 shrink-0 sm:h-8" />
      </div>
    );
  }

  /* ─── Step: Submitting ─── */

  function SubmittingStep() {
    return (
      <div className="flex h-full flex-col items-center justify-center px-5 text-center sm:px-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#c6a45b]/20 border-t-[#c6a45b] sm:h-16 sm:w-16"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-[13px] font-medium text-[#17243a]/50 sm:mt-6 sm:text-[14px]"
        >
          Securing your request...
        </motion.p>
      </div>
    );
  }

  /* ─── Step: Success ─── */

  function SuccessStep() {
    return (
      <div className="flex h-full flex-col items-center justify-center px-5 text-center sm:px-6">
        {/* Animated ring */}
        <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-[#c6a45b]/25"
            animate={{ opacity: [0.5, 0.15, 0.5], scale: [1, 1.25, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            initial={{ scale: 0.6, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#c6a45b] to-[#9a7428] shadow-[0_20px_60px_rgba(198,164,91,0.35)] sm:h-24 sm:w-24"
          >
            <svg viewBox="0 0 56 56" className="h-10 w-10 sm:h-12 sm:w-12">
              <motion.circle
                cx="28"
                cy="28"
                r="23"
                fill="none"
                stroke="white"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.path
                d="M17 29.4L24.4 36.4L39.5 20.5"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease }}
        >
          <p className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#c6a45b] sm:mt-8 sm:text-[11px]">
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
            Request Secured
          </p>

          <h2 className="mt-3 max-w-sm font-display text-[1.5rem] font-semibold leading-[1.1] text-[#17243a] sm:mt-4 sm:text-[1.8rem] md:text-[2.2rem]">
            Your consultation is on its way.
          </h2>

          <p className="mt-3 max-w-xs text-[13px] leading-[1.7] text-[#17243a]/45 sm:mt-4 sm:max-w-sm sm:text-[14px]">
            Our enterprise advisory team will review your request and reach
            out within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease }}
          className="mt-8 sm:mt-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#17243a]/15 bg-[#17243a]/[0.06] px-5 py-2.5 text-[13px] font-medium text-[#17243a]/70 backdrop-blur-xl transition-all duration-300 hover:border-[#17243a]/25 hover:bg-[#17243a]/[0.06] hover:text-[#17243a] sm:px-6 sm:py-3 sm:text-[14px]"
          >
            Return to Ecosystem
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ─── Submit to API ─── */

  async function submitForm() {
    goTo("submitting");
    setServerError("");

    try {
      const payload = new FormData();
      payload.append("fullName", fullName);
      payload.append("emailAddress", email);
      payload.append("phoneNumber", phone);
      payload.append("serviceType", verticalToServiceType[vertical as VerticalId]);

      const response = await fetch("/api/book-consultation", {
        method: "POST",
        body: payload,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (await response.json().catch(() => null)) as Record<string, any> | null;

      if (!response.ok) {
        throw new Error(result?.message || "Unable to send request. Please try again.");
      }

      // Persist tracker
      if (result?.consultation?._id && result.consultation.trackingToken) {
        try {
          window.localStorage.setItem(
            "ractysh-consultation-tracker",
            JSON.stringify({
              id: result.consultation._id,
              trackingToken: result.consultation.trackingToken,
              version: 2,
              createdAt: new Date().toISOString(),
            })
          );
          window.dispatchEvent(
            new CustomEvent("ractysh-consultation-submitted", { detail: result.consultation })
          );
        } catch {}
      }

      setStep("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      goTo("vertical");
    }
  }

  /* ─── Render ─── */

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#faf8f5]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#faf8f5] to-[#f5f0e8]" />

      {/* Gold radial glow */}
      <div className="absolute left-1/2 top-[30%] -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,164,91,0.12),transparent_60%)] blur-3xl sm:h-[60rem] sm:w-[60rem] sm:top-1/2 sm:-translate-y-1/2" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(198,164,91,0.5) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top bar: progress + step label */}
      {step !== "welcome" && step !== "success" && step !== "submitting" && (
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17243a]/[0.06] sm:h-8 sm:w-8">
              <Gem className="h-3.5 w-3.5 text-[#c6a45b] sm:h-4 sm:w-4" strokeWidth={2} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#17243a]/40 sm:text-[12px] sm:tracking-[0.12em]">
              Ractysh
            </span>
          </div>
          <ProgressDots current={currentStepIndex} total={totalSteps} />
        </div>
      )}

      {/* Error toast */}
      <AnimatePresence>
        {serverError ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-4 left-4 right-4 z-[60] flex max-w-md items-center gap-3 rounded-xl border border-[#d56a5e]/30 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:rounded-2xl sm:px-5 sm:py-3.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d56a5e]/20 text-[12px] sm:h-8 sm:w-8 sm:text-sm">
              ⚠️
            </span>
            <span className="text-[12px] font-medium text-[#17243a]/80 sm:text-[13px]">{serverError}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Step content with slide transitions */}
      <div className="relative z-10 flex-1">
        <AnimatePresence mode="wait" custom={direction}>
          {step === "welcome" && (
            <motion.div
              key="welcome"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease }}
              className="absolute inset-0"
            >
              <WelcomeStep />
            </motion.div>
          )}

          {step === "name" && (
            <motion.div
              key="name"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease }}
              className="absolute inset-0"
            >
              <NameStep />
            </motion.div>
          )}

          {step === "contact" && (
            <motion.div
              key="contact"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease }}
              className="absolute inset-0"
            >
              <ContactStep />
            </motion.div>
          )}

          {step === "vertical" && (
            <motion.div
              key="vertical"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease }}
              className="absolute inset-0"
            >
              <VerticalStep />
            </motion.div>
          )}

          {step === "submitting" && (
            <motion.div
              key="submitting"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease }}
              className="absolute inset-0"
            >
              <SubmittingStep />
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease }}
              className="absolute inset-0"
            >
              <SuccessStep />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
