const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = process.env.RESEND_TO_EMAIL || "damon@directivefilms.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "DirectiveFilms <damon@directivefilms.com>";

type LeadPayload = {
  formType?: string;
  name?: string;
  email?: string;
  companyRevenue?: string;
  needs?: string;
  goal?: string;
  page?: string;
};

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatLine(label: string, value: string) {
  return value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).json({});
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Email service is not configured" });
    return;
  }

  const body = (req.body ?? {}) as LeadPayload;
  const formType = asString(body.formType) || "Contact";
  const name = asString(body.name);
  const email = asString(body.email);
  const companyRevenue = asString(body.companyRevenue);
  const needs = asString(body.needs);
  const goal = asString(body.goal);
  const page = asString(body.page);

  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required" });
    return;
  }

  const subject = `New ${formType} lead: ${name}`;
  const html = [
    `<h2>${escapeHtml(subject)}</h2>`,
    formatLine("Name", name),
    formatLine("Email", email),
    formatLine("Company & revenue", companyRevenue),
    formatLine("Need", needs),
    formatLine("Goal", goal),
    formatLine("Page", page),
  ].join("");

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!resendResponse.ok) {
    res.status(502).json({ error: "Email delivery failed" });
    return;
  }

  res.status(200).json({ ok: true });
}
