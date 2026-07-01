export interface AutoReplyInput {
  clientName: string;
  email: string;
  serviceType?: string | null;
  inquiryId?: string;
}

const defaultLocalUrl = "https://www.ractysh.com";

function absoluteUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function brandUrl(): string {
  return (
    absoluteUrl(process.env.EMAIL_PUBLIC_BASE_URL) ||
    absoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    absoluteUrl(process.env.SITE_URL) ||
    absoluteUrl(process.env.PUBLIC_SITE_URL) ||
    defaultLocalUrl
  );
}

const sites = [
  { name: "RACTYSH GROUP", url: "https://www.ractysh.com", description: "Parent Enterprise" },
  { name: "RACTYSH Design", url: "https://architects.ractysh.com", description: "Architecture & Interiors" },
  { name: "RACTYSH Infra", url: "https://construction.ractysh.com", description: "Construction & Engineering" },
  { name: "RACTYSH Real Estate", url: "https://estates.ractysh.com", description: "Premium Properties" },
  { name: "RACTYSH Exim", url: "https://exports.ractysh.com", description: "Global Trade" },
  { name: "RACTYSH Associates", url: "https://exchange.ractysh.com", description: "OTC Exchange" },
];

export function renderAutoReplyHtml(input: AutoReplyInput): string {
  const serviceInfo = input.serviceType
    ? `<tr>
        <td style="padding:0 0 12px;font-size:15px;line-height:22px;color:#62584e">
          <span style="font-weight:600;color:#20130f">Service Interested:</span> ${escapeHtml(input.serviceType)}
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You — RACTYSH Group</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f8f3ea;font-family:Georgia,'Times New Roman',serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f3ea">
      <tr>
        <td align="center" style="padding:40px 16px">
          <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#0a0806 0%,#1c120e 100%);border-radius:12px 12px 0 0;padding:32px 40px 24px;text-align:center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto">
                  <tr>
                    <td style="font-size:28px;font-weight:700;letter-spacing:2px;color:#d9bd7a;font-family:Georgia,'Times New Roman',serif">
                      RACTYSH
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:11px;font-weight:400;letter-spacing:4px;color:#d9bd7a/60;padding-top:4px;text-transform:uppercase">
                      Group of Companies
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background-color:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8ddca;border-right:1px solid #e8ddca">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="font-size:28px;font-weight:700;color:#20130f;padding-bottom:8px;font-family:Georgia,'Times New Roman',serif">
                      Thank You, ${escapeHtml(input.clientName)}
                    </td>
                  </tr>
                  <tr>
                    <td style="height:3px;width:48px;background-color:#d9bd7a;margin:0 0 24px;display:block"></td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;line-height:26px;color:#62584e;padding-bottom:16px">
                      We have received your inquiry and our team will review it shortly.
                      A member of our executive office will reach out to you within
                      <strong style="color:#20130f">24–48 business hours</strong>.
                    </td>
                  </tr>
                  ${serviceInfo}
                  <tr>
                    <td style="padding:16px 0 0;border-top:1px solid #e8ddca">
                      <p style="font-size:14px;line-height:22px;color:#62584e;margin:0 0 8px">
                        <strong style="color:#20130f">Reference ID:</strong>
                        <span style="font-family:monospace;color:#8b6f28">${escapeHtml(input.inquiryId || "—")}</span>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Sites Grid -->
            <tr>
              <td style="background-color:#fcf9f4;padding:32px 40px;border-left:1px solid #e8ddca;border-right:1px solid #e8ddca">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#8b1118;padding-bottom:16px;text-align:center;font-family:Arial,Helvetica,sans-serif">
                      Explore the RACTYSH Ecosystem
                    </td>
                  </tr>
                  ${sites.map((site) => `
                  <tr>
                    <td style="padding:6px 0">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff;border-radius:6px;border:1px solid #e8ddca">
                        <tr>
                          <td style="padding:12px 16px">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td style="font-size:15px;font-weight:600;color:#20130f;font-family:Georgia,'Times New Roman',serif">
                                  <a href="${escapeHtml(site.url)}" style="color:#20130f;text-decoration:none;display:block">
                                    ${escapeHtml(site.name)}
                                  </a>
                                </td>
                                <td align="right" style="font-size:12px;color:#8b6f28;font-family:Arial,Helvetica,sans-serif">
                                  ${escapeHtml(site.description)}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>`).join("")}
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:linear-gradient(135deg,#0a0806 0%,#1c120e 100%);border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;border-left:1px solid #2a1e16;border-right:1px solid #2a1e16;border-bottom:1px solid #2a1e16">
                <p style="font-size:12px;line-height:18px;color:#9d8a74;margin:0;font-family:Arial,Helvetica,sans-serif">
                  RACTYSH GROUP OF COMPANIES
                </p>
                <p style="font-size:11px;line-height:18px;color:#7a6a58;margin:4px 0 0;font-family:Arial,Helvetica,sans-serif">
                  This is an automated acknowledgement. Please do not reply directly to this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderAutoReplyText(input: AutoReplyInput): string {
  const serviceInfo = input.serviceType ? `\nService Interested: ${input.serviceType}` : "";

  return [
    `Thank You, ${input.clientName}`,
    "",
    "We have received your inquiry and our team will review it shortly.",
    "A member of our executive office will reach out to you within 24–48 business hours.",
    serviceInfo,
    "",
    `Reference ID: ${input.inquiryId || "—"}`,
    "",
    "Explore the RACTYSH Ecosystem:",
    ...sites.map((site) => `  ${site.name} — ${site.url}`),
    "",
    "— RACTYSH Group of Companies"
  ].filter(Boolean).join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
