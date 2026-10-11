import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const KNOWLEDGE_BASE = `
ZINO DIGITAL — a subsidiary of Zino Consulting (Pty) Ltd, Reg. 2025/626542/07.
Address: 908 Sangro House, 417 Anton Lembede, Durban, 4001, KwaZulu-Natal.
Email: sales@zinoconsulting.co.za

SERVICES
1. Website Design — purpose-built websites: responsive design, clear user journeys, content-led structure.
2. Web Hosting — dependable hosting and ongoing care: managed setup, website maintenance, practical support.
3. Digital Foundations — domain guidance, business email setup, launch support.

APPROACH (4 steps)
- Discover: understand the business, audience and the result the website must deliver.
- Design: distinctive experience with strong hierarchy, considered content, responsive layouts.
- Build: fast, polished website that works across devices.
- Launch: put the website online, connect the essentials, remain available for ongoing care.

NOT IN KNOWLEDGE BASE: pricing, turnaround times, contracts, refunds, account-specific issues, outages, billing. These need a human.
`;

const Body = z.object({
  ref: z.string().min(1).max(40),
  category: z.string().min(1).max(60),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(4000) }))
    .min(1)
    .max(40),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return json({ error: "Please verify your email first." }, 401);
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const { data: claims, error: authErr } = await supabase.auth.getClaims(auth.replace("Bearer ", ""));
  if (authErr || !claims?.claims?.sub) return json({ error: "Session expired. Please verify again." }, 401);

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Invalid request" }, 400);
  const { ref, category, messages } = parsed.data;

  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return json({ error: "Assistant is not configured." }, 500);

  const instructions = `You are Siza, the friendly support assistant for Zino Digital.
The client is verified. Ticket reference: ${ref}. Enquiry type: ${category}.
Answer ONLY using the knowledge base below. Be warm, concise (max ~120 words), plain language.
If the question cannot be answered from the knowledge base, or the client is upset/complaining about a specific issue, or asks for a person,
reply with a short empathetic sentence saying you'll connect them to a team member on WhatsApp, and END your reply with the exact token [[ESCALATE]].
Never invent prices, dates or policies.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`;

  const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
      Authorization: `Bearer ${key}`,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      instructions,
      input: messages.map((m) => ({ role: m.role, content: m.content })),
      reasoning: { effort: "low" },
      store: false,
      stream: true,
    }),
    signal: req.signal,
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    console.error("gateway error", upstream.status, text);
    let msg = "Siza is unavailable right now. Please use WhatsApp to reach our team.";
    if (upstream.status === 429) msg = "Siza is busy — please try again in a moment.";
    if (upstream.status === 402) msg = "Siza is temporarily unavailable (AI credits exhausted). Please use WhatsApp.";
    return json({ error: msg, escalate: true }, upstream.status);
  }

  const reader = upstream.body.pipeThrough(new TextDecoderStream()).getReader();
  let buf = "";
  let answer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += value;
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === "response.output_text.delta") answer += evt.delta ?? "";
      } catch { /* ignore */ }
    }
  }

  const escalate = answer.includes("[[ESCALATE]]") || !answer.trim();
  answer = answer.replace("[[ESCALATE]]", "").trim() ||
    "I'm not able to answer that one — let me connect you with a team member on WhatsApp.";

  if (escalate) {
    await supabase.from("support_tickets").update({ escalated: true, status: "escalated" }).eq("ref_number", ref);
  }

  return json({ answer, escalate });
});
