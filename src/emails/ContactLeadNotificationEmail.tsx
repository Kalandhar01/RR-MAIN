import { Column, Heading, Hr, Link, Row, Section, Text } from "./emailPrimitives";
import { render } from "@react-email/render";
import * as React from "react";
import type { CSSProperties } from "react";
import { EmailLayout } from "./EmailLayout";
import { EmailSummaryCard, type EmailSummaryItem } from "./EmailSummaryCard";
import { getRactyshEmailBrand, ractyshEmailPalette, type RactyshEmailBrand } from "./branding";

export interface ContactLeadNotificationEmailProps {
  brand?: RactyshEmailBrand;
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

const palette = ractyshEmailPalette;
const fontSans = "Arial, Helvetica, sans-serif";
const fontSerif = "Georgia, 'Times New Roman', serif";

const styles = {
  intro: {
    margin: "0 0 20px",
    color: palette.muted,
    fontFamily: fontSans,
    fontSize: "15px",
    lineHeight: "26px",
    textAlign: "center"
  } satisfies CSSProperties,
  badgeRow: {
    margin: "0 0 30px",
    textAlign: "center"
  } satisfies CSSProperties,
  badge: {
    display: "inline-block",
    margin: "0 5px 8px",
    padding: "8px 12px",
    border: `1px solid ${palette.goldSoft}`,
    borderRadius: "999px",
    backgroundColor: palette.paper,
    color: palette.ink,
    fontFamily: fontSans,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    lineHeight: "15px",
    textTransform: "uppercase"
  } satisfies CSSProperties,
  badgeAccent: {
    color: palette.red
  } satisfies CSSProperties,
  sectionTitle: {
    margin: "0 0 18px",
    color: palette.ink,
    fontFamily: fontSerif,
    fontSize: "23px",
    fontWeight: 700,
    lineHeight: "29px"
  } satisfies CSSProperties,
  detailCard: {
    padding: "18px",
    border: `1px solid ${palette.goldSoft}`,
    borderRadius: "14px",
    backgroundColor: palette.paper,
    verticalAlign: "top"
  } satisfies CSSProperties,
  detailLabel: {
    margin: "0 0 8px",
    color: palette.deepGold,
    fontFamily: fontSans,
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    lineHeight: "14px",
    textTransform: "uppercase"
  } satisfies CSSProperties,
  detailValue: {
    margin: "0",
    color: palette.ink,
    fontFamily: fontSans,
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "22px"
  } satisfies CSSProperties,
  detailsWrap: {
    margin: "0 0 30px"
  } satisfies CSSProperties,
  messagePanel: {
    margin: "0 0 30px",
    padding: "24px",
    border: `1px solid ${palette.goldSoft}`,
    borderLeft: `4px solid ${palette.gold}`,
    borderRadius: "14px",
    backgroundColor: "#fffdf8"
  } satisfies CSSProperties,
  message: {
    margin: "0",
    color: palette.ink,
    fontFamily: fontSans,
    fontSize: "15px",
    lineHeight: "27px",
    whiteSpace: "pre-wrap"
  } satisfies CSSProperties,
  actionPanel: {
    padding: "24px",
    border: `1px solid ${palette.goldSoft}`,
    borderRadius: "16px",
    backgroundColor: palette.paper
  } satisfies CSSProperties,
  actionTitle: {
    margin: "0 0 16px",
    color: palette.ink,
    fontFamily: fontSerif,
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: "28px"
  } satisfies CSSProperties,
  actionButton: {
    display: "block",
    margin: "0 0 10px",
    padding: "13px 16px",
    borderRadius: "8px",
    backgroundColor: palette.ink,
    color: palette.ivory,
    fontFamily: fontSans,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    lineHeight: "18px",
    textAlign: "center",
    textDecoration: "none",
    textTransform: "uppercase"
  } satisfies CSSProperties,
  secondaryButton: {
    backgroundColor: palette.ivory,
    color: palette.red,
    border: `1px solid ${palette.goldSoft}`
  } satisfies CSSProperties,
  hr: {
    margin: "0 0 28px",
    border: "none",
    borderTop: `1px solid ${palette.goldSoft}`
  } satisfies CSSProperties,
  footerNote: {
    margin: "0",
    color: palette.muted,
    fontFamily: fontSans,
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "center"
  } satisfies CSSProperties
};

function display(value?: string | null): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Not provided";
}

export function ContactLeadNotificationEmail({
  brand = getRactyshEmailBrand(),
  leadId,
  name,
  email,
  phone,
  service,
  company,
  subject,
  message,
  sourceWebsite,
  submittedAt
}: ContactLeadNotificationEmailProps) {
  const summaryItems: EmailSummaryItem[] = [
    { label: "Name", value: name },
    { label: "Company", value: company },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Service", value: service || "General Inquiry" },
    { label: "Lead ID", value: leadId }
  ];

  const subjectLine = `New Contact Lead: ${name} - ${service || "General Inquiry"}`;

  return (
    <EmailLayout
      brand={brand}
      eyebrow="Executive CRM Notification"
      headerDeskLabel="Enterprise Contact Desk"
      preview={`New contact lead from ${name}`}
      title={subjectLine}
    >
      <Text style={styles.intro}>
        A new contact lead has been submitted through the Ractysh ecosystem.
      </Text>

      <Section style={styles.badgeRow}>
        <Text style={styles.badge}>
          Priority <span style={styles.badgeAccent}>NEW LEAD</span>
        </Text>
        <Text style={styles.badge}>
          Time <span style={styles.badgeAccent}>Received Just Now</span>
        </Text>
      </Section>

      <EmailSummaryCard items={summaryItems} title="Contact Summary" />

      <Hr style={styles.hr} />

      <Section style={styles.detailsWrap}>
        <Heading as="h2" style={styles.sectionTitle}>
          Lead Details
        </Heading>
        <Row>
          <Column style={{ width: "50%", padding: "0 8px 12px 0" }}>
            <Section style={styles.detailCard}>
              <Text style={styles.detailLabel}>Subject</Text>
              <Text style={styles.detailValue}>{display(subject)}</Text>
            </Section>
          </Column>
          <Column style={{ width: "50%", padding: "0 0 12px 8px" }}>
            <Section style={styles.detailCard}>
              <Text style={styles.detailLabel}>Source Website</Text>
              <Link href={sourceWebsite} style={{ ...styles.detailValue, color: palette.red, textDecoration: "none" }}>
                {display(sourceWebsite)}
              </Link>
            </Section>
          </Column>
        </Row>
        <Row>
          <Column style={{ width: "50%", padding: "0 8px 12px 0" }}>
            <Section style={styles.detailCard}>
              <Text style={styles.detailLabel}>Email</Text>
              <Link href={`mailto:${email}`} style={{ ...styles.detailValue, color: palette.red, textDecoration: "none" }}>
                {display(email)}
              </Link>
            </Section>
          </Column>
          <Column style={{ width: "50%", padding: "0 0 12px 8px" }}>
            <Section style={styles.detailCard}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{display(phone)}</Text>
            </Section>
          </Column>
        </Row>
        <Row>
          <Column style={{ width: "50%", padding: "0 8px 0 0" }}>
            <Section style={styles.detailCard}>
              <Text style={styles.detailLabel}>Submitted At</Text>
              <Text style={styles.detailValue}>{display(submittedAt)}</Text>
            </Section>
          </Column>
          <Column style={{ width: "50%", padding: "0 0 0 8px" }}>
            <Section style={styles.detailCard}>
              <Text style={styles.detailLabel}>Lead ID</Text>
              <Text style={styles.detailValue}>{display(leadId)}</Text>
            </Section>
          </Column>
        </Row>
      </Section>

      <Section style={styles.messagePanel}>
        <Text style={styles.detailLabel}>Message</Text>
        <Text style={styles.message}>{display(message)}</Text>
      </Section>

      <Section style={styles.actionPanel}>
        <Text style={styles.actionTitle}>Quick Actions</Text>
        <Link href={`mailto:${email}`} style={styles.actionButton}>
          Reply to Lead
        </Link>
        <Link href={`tel:${phone.replace(/[^\d+]/g, "")}`} style={{ ...styles.actionButton, ...styles.secondaryButton }}>
          Call Lead
        </Link>
      </Section>
    </EmailLayout>
  );
}

export function contactLeadNotificationPlainText(input: ContactLeadNotificationEmailProps): string {
  const lines = [
    `New Contact Lead: ${input.name} - ${input.service || "General Inquiry"}`,
    "A new contact lead has been submitted through the Ractysh ecosystem.",
    "",
    `Priority: NEW LEAD`,
    `Time: Received Just Now`,
    "",
    `Name: ${display(input.name)}`,
    `Company: ${display(input.company)}`,
    `Email: ${display(input.email)}`,
    `Phone: ${display(input.phone)}`,
    `Service: ${display(input.service || "General Inquiry")}`,
    `Lead ID: ${input.leadId}`,
    "",
    `Subject: ${display(input.subject)}`,
    `Source Website: ${display(input.sourceWebsite)}`,
    `Submitted At: ${input.submittedAt}`,
    "",
    "Message:",
    display(input.message)
  ];

  return lines.filter(Boolean).join("\n");
}

export async function renderContactLeadNotificationEmail(input: ContactLeadNotificationEmailProps) {
  const component = <ContactLeadNotificationEmail {...input} />;
  const html = await render(component, { pretty: true });

  return {
    html,
    text: contactLeadNotificationPlainText(input)
  };
}
