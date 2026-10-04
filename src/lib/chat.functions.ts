import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { buildKnowledgeBase, businessInfo } from "./restaurant";

const UNKNOWN_TOKEN = "[[UNANSWERED]]";

const SYSTEM = `You are the official customer assistant for Thè 1971, a Bangladeshi restaurant in Harpenden, UK.
Help customers with accurate information about Thè 1971. Only use information in the APPROVED KNOWLEDGE BASE below.
Never invent menu items, prices, ingredients, allergens, opening times, awards, reviews, history, chef names, booking availability, delivery services, promotions or discounts.
If information is not available, say: "I don't have that information available at the moment. Please contact Thè 1971 directly on ${businessInfo.phone} or ${businessInfo.email} and the team can help you." and then append the exact token ${UNKNOWN_TOKEN} at the very end.
For allergy questions never make assumptions or say a dish is safe. Say: "Because allergies can be serious, I can't confirm that a dish is safe based only on the information available here. Please speak directly with Thè 1971 before ordering on ${businessInfo.phone}." Customers with any allergy eat at their own risk.
For booking questions never claim a table is available; direct them to the booking method in the knowledge base.
If someone asks about private dining, parties, events, birthdays, corporate events, large groups or catering, tell them they can send an enquiry using the form that appears below, and do not promise availability. Append the token [[ENQUIRY]] at the end.
Be warm, concise (2-4 sentences), professional. Plain text, no markdown headings.

APPROVED KNOWLEDGE BASE:
${buildKnowledgeBase()}`;

export const askChat = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({
      messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(1000) })).min(1).max(20),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const key = process.env['LOVABLE_API_KEY'];
    const fallback = `I'm having trouble right now. Please contact Thè 1971 on ${businessInfo.phone} or ${businessInfo.email}.`;
    if (!key) return { reply: fallback, enquiry: false };
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Lovable-API-Key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: SYSTEM,
        input: data.messages.map((m) => ({ role: m.role, content: m.content })),
        store: false,
        reasoning: { effort: "low" },
      }),
    });
    if (res.status === 429) return { reply: "We're receiving a lot of questions right now — please try again in a moment.", enquiry: false };
    if (!res.ok) {
      console.error("AI error", res.status, await res.text());
      return { reply: fallback, enquiry: false };
    }
    const json = (await res.json()) as {
      output_text?: string;
      output?: { type: string; content?: { type: string; text?: string }[] }[];
    };
    const text =
      json.output_text ??
      json.output?.filter((o) => o.type === "message").flatMap((o) => o.content ?? []).filter((c) => c.type === "output_text").map((c) => c.text).join("");
    let reply = text || fallback;
    const unanswered = reply.includes(UNKNOWN_TOKEN);
    const enquiry = reply.includes("[[ENQUIRY]]");
    reply = reply.replace(UNKNOWN_TOKEN, "").replace("[[ENQUIRY]]", "").trim();
    if (unanswered) {
      const last = [...data.messages].reverse().find((m) => m.role === "user");
      if (last) {
        const sb = createClient(process.env['SUPABASE_URL']!, process.env['SUPABASE_PUBLISHABLE_KEY']!, { auth: { persistSession: false } });
        await sb.from("unanswered_questions").insert({ question: last.content.slice(0, 1000) });
      }
    }
    return { reply, enquiry };
  });
