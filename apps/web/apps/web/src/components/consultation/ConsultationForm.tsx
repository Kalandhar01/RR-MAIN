"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2, Send, Shield, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CompanyContactPanel } from "@/components/CompanyContactPanel";
import { Button } from "@/components/ui/button";
import { PremiumSelect } from "@/components/ui/PremiumSelect";
import type { ConsultationRequest } from "@/lib/types";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const serviceTypes = [
  "Architecture & Design",
  "Construction & Infrastructure",
  "Real Estate",
  "Import & Export",
  "OTC Exchange",
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toSelectOptions = (items: readonly string[]) =>
  items.map((item) => ({ value: item, label: item }));

const serviceTypeOptions = toSelectOptions(serviceTypes);

const consultationFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .min(3, "Full name must be at least 3 characters.")
    .max(120, "Full name is too long."),
  emailAddress: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(180, "Email is too long.")
    .refine(
      (value) => emailPattern.test(value),
      "Please enter a valid email."
    ),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .max(40, "Phone number is too long."),
  serviceType: z
    .string()
    .trim()
    .min(1, "Please select a consultation topic.")
    .refine(
      (value) =>
        serviceTypes.includes(value as (typeof serviceTypes)[number]),
      "Please select a consultation topic."
    ),
});

type ConsultationFormInput = z.input<typeof consultationFormSchema>;
type ConsultationFormValues = z.output<typeof consultationFormSchema>;

type FieldError = string | undefined;
type ApiValidationIssue = {
  path?: Array<string | number>;
  message?: string;
};

type SubmissionResult = {
  message?: string;
  issues?: ApiValidationIssue[];
  submittedAt?: string;
  consultation?: ConsultationRequest;
  notification?: ConsultationRequest["notification"];
  workflow?: {
    created?: boolean;
    fallback?: boolean;
    upstreamError?: string;
  };
};

const formFieldNames = [
  "fullName",
  "emailAddress",
  "phoneNumber",
  "serviceType",
] as const;

type ConsultationFormField = (typeof formFieldNames)[number];

function isConsultationFormField(
  value: string
): value is ConsultationFormField {
  return (formFieldNames as readonly string[]).includes(value);
}

function FieldShell({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <motion.div
      animate={error ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="group relative">
        {children}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#9a7428]/70 transition duration-300 group-focus-within:text-[#9a7428]"
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-[#c6a45b]" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      </div>
      {error ? (
        <motion.p
          id={errorId}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs font-medium leading-relaxed text-[#a33a2e]"
        >
          {error}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

function fieldClass(error?: FieldError) {
  return cn(
    "consult-glass-input h-[4.2rem] w-full rounded-2xl bg-white/55 px-4 pb-1.5 pt-7 text-[15px] font-medium text-[#17243a] outline-none transition duration-300 placeholder:text-transparent",
    "focus:border-[#c6a45b]/60 focus:bg-white/80 focus:shadow-[0_0_0_4px_rgba(198,164,91,0.1)]",
    "disabled:cursor-not-allowed disabled:bg-[#f3efe4]/60 disabled:text-[#8b8578]",
    error
      ? "border-[#d56a5e] bg-[#fff7f5]/80 shadow-[0_0_0_4px_rgba(213,106,94,0.1)] focus:border-[#d56a5e] focus:bg-[#fffafa] focus:shadow-[0_0_0_4px_rgba(213,106,94,0.12)]"
      : "border-[#c6a45b]/15"
  );
}

function SuccessState({ submittedAt }: { submittedAt?: string }) {
  return (
    <motion.div
      key="consultation-success"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.98 }}
      transition={{ duration: 0.6, ease }}
      className="consult-glass-card relative mx-auto mt-10 overflow-hidden rounded-[2rem] px-6 py-14 text-center md:px-12 md:py-16"
    >
      {/* Gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-12 h-48 w-48 -translate-x-1/2 rounded-full bg-[#c6a45b]/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
        {/* Animated checkmark */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-[#c6a45b]/30"
            animate={{ opacity: [0.5, 0.15, 0.5], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            initial={{ scale: 0.7, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease }}
            className="relative flex h-[5rem] w-[5rem] items-center justify-center rounded-full bg-[#17243a] shadow-[0_20px 60px_rgba(198,164,91,0.3)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 56 56"
              className="h-12 w-12"
            >
              <motion.circle
                cx="28"
                cy="28"
                r="23"
                fill="none"
                stroke="#c6a45b"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.path
                d="M17 29.4L24.4 36.4L39.5 20.5"
                fill="none"
                stroke="#f5df9a"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-8 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#9a7428]"
        >
          <Shield className="h-3.5 w-3.5" strokeWidth={2} />
          Secure Delivery Confirmed
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease }}
          className="mt-4 text-center font-display text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.02em] text-[#17243a] md:text-[2rem]"
        >
          Your consultation request has been securely delivered.
        </motion.h3>

        {submittedAt ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease }}
            className="mt-6 rounded-full border border-[#c6a45b]/20 bg-white/50 px-5 py-2.5 text-[12px] font-medium text-[#68645b] backdrop-blur-xl"
          >
            Submitted at {submittedAt}
          </motion.p>
        ) : null}
      </div>
    </motion.div>
  );
}

export function ConsultationForm() {
  const [serverError, setServerError] = useState("");
  const [deliveryReceipt, setDeliveryReceipt] =
    useState<SubmissionResult | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormInput, unknown, ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      serviceType: "",
    },
  });

  const serviceTypeValue = watch("serviceType") ?? "";
  const isDelivered = Boolean(deliveryReceipt);

  useEffect(() => {
    if (!serverError) return undefined;
    const timeoutId = window.setTimeout(() => setServerError(""), 5200);
    return () => window.clearTimeout(timeoutId);
  }, [serverError]);

  function persistConsultationTracker(
    consultation: ConsultationRequest | undefined
  ) {
    if (!consultation?._id || !consultation.trackingToken) return;
    try {
      const tracker = {
        id: consultation._id,
        trackingToken: consultation.trackingToken,
        version: 2,
        createdAt: new Date().toISOString(),
      };
      window.localStorage.setItem(
        "ractysh-consultation-tracker",
        JSON.stringify(tracker)
      );
      window.dispatchEvent(
        new CustomEvent("ractysh-consultation-submitted", {
          detail: consultation,
        })
      );
    } catch (error) {
      console.warn(
        "Consultation tracker persistence failed after successful submission:",
        error
      );
    }
  }

  function completeSubmission(result: SubmissionResult | null) {
    setDeliveryReceipt({
      message:
        result?.message ||
        "Your consultation request has been securely delivered.",
      submittedAt: result?.submittedAt,
    });
    persistConsultationTracker(result?.consultation);
    reset({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      serviceType: "",
    });
  }

  async function onSubmit(values: ConsultationFormValues) {
    setServerError("");
    try {
      const payload = new FormData();
      payload.append("fullName", values.fullName);
      payload.append("emailAddress", values.emailAddress);
      payload.append("phoneNumber", values.phoneNumber);
      payload.append("serviceType", values.serviceType);

      const response = await fetch("/api/book-consultation", {
        method: "POST",
        body: payload,
      });

      const result = (await response
        .json()
        .catch(() => null)) as SubmissionResult | null;
      const deliveredDespiteHttpError = Boolean(
        result?.consultation &&
          (result.notification?.sent ||
            result.consultation.notification?.sent)
      );

      if (!response.ok && !deliveredDespiteHttpError) {
        if (result?.issues?.length) {
          let hasMappedIssue = false;
          result.issues.forEach((issue) => {
            const [fieldName] = issue.path ?? [];
            if (
              typeof fieldName === "string" &&
              isConsultationFormField(fieldName)
            ) {
              hasMappedIssue = true;
              setError(fieldName, {
                type: "server",
                message: issue.message || "Please review this field.",
              });
            }
          });
          setServerError(
            hasMappedIssue
              ? "Please review the highlighted fields."
              : "Unable to send request. Please try again."
          );
          return;
        }
        throw new Error("Unable to send request. Please try again.");
      }

      completeSubmission(result);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to send request. Please try again."
      );
    }
  }

  return (
    <section
      id="consultation-form"
      className="relative px-5 pb-0 pt-[4rem] md:px-8 md:pb-0 md:pt-20"
    >
      {/* Background glows */}
      <div className="absolute left-[-14rem] top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#c6a45b]/5 blur-3xl" />
      <div className="absolute right-[-10rem] bottom-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#17243a]/3 blur-3xl" />

      <div className="mx-auto max-w-[82rem]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c6a45b]/25 bg-white/50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9a7428] backdrop-blur-xl">
            <Lock className="h-3 w-3" strokeWidth={2.5} />
            Private Enterprise Intake
          </div>
          <h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#17243a] md:text-[2.2rem] lg:text-[2.6rem]">
            Tell us what you are building.
            <br />
            <span className="text-[#9a7428]">
              We will shape the advisory path.
            </span>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.8] text-[#68645b]/80 md:text-[16px]">
            Submit the core requirement. The request is securely delivered to
            the consultation desk for senior review.
          </p>
        </motion.div>

        {/* Form / Success */}
        <AnimatePresence mode="wait">
          {isDelivered ? (
            <SuccessState submittedAt={deliveryReceipt?.submittedAt} />
          ) : (
            <motion.form
              key="consultation-form"
              noValidate
              onSubmit={handleSubmit(onSubmit, () => {
                setServerError("Please review the highlighted fields.");
              })}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease }}
              className="consult-glass-card mx-auto mt-10 max-w-3xl overflow-hidden rounded-[2rem] p-5 pb-0 md:p-8 md:pb-0"
            >
              {/* Security badge */}
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-[#c6a45b]/15 bg-[#fffaf0]/50 px-4 py-2.5">
                <Shield className="h-4 w-4 text-[#c6a45b]" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#8a7a62]">
                  Your information is encrypted and securely processed
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FieldShell
                  id="fullName"
                  label="Full Name"
                  required
                  error={errors.fullName?.message}
                >
                  <input
                    id="fullName"
                    placeholder="Full Name"
                    required
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    className={fieldClass(errors.fullName?.message)}
                    {...register("fullName")}
                  />
                </FieldShell>

                <FieldShell
                  id="emailAddress"
                  label="Email Address"
                  required
                  error={errors.emailAddress?.message}
                >
                  <input
                    id="emailAddress"
                    type="email"
                    placeholder="Email Address"
                    required
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.emailAddress)}
                    aria-describedby={
                      errors.emailAddress ? "emailAddress-error" : undefined
                    }
                    className={fieldClass(errors.emailAddress?.message)}
                    {...register("emailAddress")}
                  />
                </FieldShell>

                <FieldShell
                  id="phoneNumber"
                  label="Phone Number"
                  required
                  error={errors.phoneNumber?.message}
                >
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.phoneNumber)}
                    aria-describedby={
                      errors.phoneNumber ? "phoneNumber-error" : undefined
                    }
                    className={fieldClass(errors.phoneNumber?.message)}
                    {...register("phoneNumber")}
                  />
                </FieldShell>

                <FieldShell
                  id="serviceType"
                  label="Consultation Topic"
                  required
                  error={errors.serviceType?.message}
                >
                  <input type="hidden" {...register("serviceType")} />
                  <PremiumSelect
                    id="serviceType"
                    required
                    disabled={isSubmitting}
                    invalid={Boolean(errors.serviceType)}
                    describedBy={
                      errors.serviceType ? "serviceType-error" : undefined
                    }
                    value={serviceTypeValue}
                    placeholder="Select topic"
                    options={serviceTypeOptions}
                    onChange={(nextValue) =>
                      setValue("serviceType", nextValue, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  />
                </FieldShell>
              </div>

              {/* Footer */}
              <div className="mt-6 flex flex-col gap-4 border-t border-[#c6a45b]/10 pt-5 xl:flex-row xl:items-center xl:justify-between">
                <CompanyContactPanel
                  mode="consultation"
                  tone="transparent"
                  compact
                  className="w-full xl:max-w-[44rem]"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group min-w-[14rem] md:min-w-60"
                >
                  {isSubmitting ? (
                    <Loader2
                      className="h-5 w-5 animate-spin"
                      strokeWidth={1.8}
                    />
                  ) : (
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
                  )}
                  {isSubmitting
                    ? "Securing Request..."
                    : "Submit Consultation Request"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Error toast */}
        <AnimatePresence>
          {serverError && !isDelivered ? (
            <motion.div
              role="alert"
              key="consultation-error-toast"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.35, ease }}
              className="fixed bottom-6 left-1/2 z-[90] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border border-[#e3b1a9] bg-[#fff8f6]/95 px-4 py-3.5 text-left shadow-[0_24px_68px_rgba(111,42,31,0.18)] backdrop-blur-xl md:left-auto md:right-6 md:translate-x-0"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#a33a2e] text-white">
                <AlertTriangle
                  className="h-4.5 w-4.5"
                  strokeWidth={1.8}
                />
              </span>
              <span>
                <span className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#8d3227]">
                  Delivery Paused
                </span>
                <span className="mt-1 block text-[14px] font-medium leading-relaxed text-[#5f2b24]">
                  {serverError}
                </span>
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
