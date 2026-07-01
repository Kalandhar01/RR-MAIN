import { parseEmailList, sendResendEmail, type EmailDeliveryResult } from "./emailDelivery";
import { senderFromEnv } from "./ractyshEmail";
import { getRactyshEmailBrand } from "@/emails/branding";
import { renderContactLeadNotificationEmail } from "@/emails/ContactLeadNotificationEmail";

export interface ContactLeadPayload {
  leadId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  company: string;
  subject: string;
  message: string;
  sourceWebsite: string;
  submittedAt: string;
}

function recipients(): string[] {
  return parseEmailList(
    process.env.CONTACT_MAIL_TO || process.env.MAIL_TO
  );
}

export async function sendContactLeadNotification(
  payload: ContactLeadPayload
): Promise<{ sent: boolean; error?: string }> {
  try {
    const to = recipients();

    if (!to.length) {
      return { sent: false, error: "No recipients configured." };
    }

    const brand = getRactyshEmailBrand();
    const subject = `New Contact Lead: ${payload.name} - ${payload.service || "General Inquiry"}`;
    const content = await renderContactLeadNotificationEmail({
      ...payload,
      brand
    });

    const result: EmailDeliveryResult = await sendResendEmail({
      from: senderFromEnv("CONTACT_NOTIFICATION_FROM", "CONTACT_MAIL_FROM", "MAIL_FROM", "RESEND_FROM"),
      to,
      replyTo: payload.email,
      subject,
      text: content.text,
      html: content.html,
      tags: [{ name: "source", value: "contact-lead" }],
      idempotencyKey: payload.leadId
    });

    return { sent: result.sent, error: result.error };
  } catch (error) {
    return {
      sent: false,
      error: error instanceof Error ? error.message : "Failed to send contact lead notification."
    };
  }
}
