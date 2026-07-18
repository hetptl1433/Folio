/* ============================================================================
 * Vercel serverless function powering Sushi, the portfolio chat.
 *
 * The browser POSTs { message, history, currentPath } here; this function calls OpenAI
 * with the server-held key and returns { reply }. The key lives ONLY in the
 * OPENAI_API_KEY environment variable (Vercel dashboard → Settings →
 * Environment Variables) — never in the repo.
 * ========================================================================== */

import { getSiteDestination, SYSTEM_PROMPT } from "../src/lib/birdAI.js";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_MESSAGE_CHARS = 1200;
const MAX_HISTORY_MESSAGES = 24;
const MAX_HISTORY_ITEM_CHARS = 2000;
const MAX_HISTORY_TOTAL_CHARS = 12000;
const MAX_REPLY_TOKENS = 500;
const UPSTREAM_TIMEOUT_MS = 20000;

const sanitizeHistory = (history) => {
  if (!Array.isArray(history)) return [];

  let remainingChars = MAX_HISTORY_TOTAL_CHARS;
  const sanitized = [];

  // Start with the most recent items so an oversized client payload cannot
  // crowd out the conversation turns that matter most.
  for (const item of history.slice(-MAX_HISTORY_MESSAGES).reverse()) {
    if (
      !item ||
      (item.role !== "user" && item.role !== "assistant") ||
      typeof item.content !== "string"
    ) {
      continue;
    }

    const content = item.content.trim().slice(0, MAX_HISTORY_ITEM_CHARS);
    if (!content || remainingChars <= 0) continue;

    const boundedContent = content.slice(0, remainingChars);
    sanitized.unshift({ role: item.role, content: boundedContent });
    remainingChars -= boundedContent.length;
  }

  return sanitized;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const contentType = req.headers?.["content-type"] || "";
  if (!contentType.includes("application/json")) {
    return res.status(415).json({ error: "Content-Type must be application/json" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ error: "A JSON object is required" });
  }

  const { message, history, currentPath } = req.body;
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }

  if (message.length > MAX_MESSAGE_CHARS) {
    return res.status(400).json({ error: `message must be ${MAX_MESSAGE_CHARS} characters or fewer` });
  }

  if (history !== undefined && !Array.isArray(history)) {
    return res.status(400).json({ error: "history must be an array" });
  }

  const currentDestination = getSiteDestination(currentPath);
  const safeCurrentPath = currentDestination?.kind === "internal"
    ? currentDestination.href
    : "/";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        max_completion_tokens: MAX_REPLY_TOKENS,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "system",
            content: `The visitor is currently viewing ${safeCurrentPath}. This is location context only: you still know the entire portfolio. Use it to avoid unnecessary navigation and to recommend the most specific different section when useful.`,
          },
          ...sanitizeHistory(history),
          { role: "user", content: message.trim().slice(0, MAX_MESSAGE_CHARS) },
        ],
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      let providerCode = "unknown_error";
      try {
        const parsedDetail = JSON.parse(detail);
        providerCode = parsedDetail?.error?.code || parsedDetail?.error?.type || providerCode;
      } catch {
        // Keep provider messages out of logs because authentication errors can
        // contain fragments of the submitted API key.
      }
      console.error("openai error", upstream.status, providerCode);
      const status = upstream.status === 429 ? 429 : 502;
      return res.status(status).json({
        error: status === 429 ? "Sushi is busy right now" : "upstream AI call failed",
      });
    }

    const data = await upstream.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ error: "empty AI reply" });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    if (err?.name === "AbortError") {
      return res.status(504).json({ error: "upstream AI call timed out" });
    }
    console.error("chat handler failed", err);
    return res.status(502).json({ error: "upstream AI call failed" });
  } finally {
    clearTimeout(timeout);
  }
}
