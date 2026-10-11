import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, ShieldCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const WHATSAPP = "27736456141";
const CATEGORIES = ["Website design enquiry", "Hosting enquiry", "Technical support", "Billing question", "Complaint", "Other"];

type Step = "screen" | "register" | "otp" | "chat";
type Msg = { role: "user" | "assistant"; content: string };

const regSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  summary: z.string().trim().min(5, "Briefly describe your enquiry").max(1000),
});

const SizaChat = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("screen");
  const [category, setCategory] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", summary: "" });
  const [code, setCode] = useState("");
  const [ref, setRef] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [escalated, setEscalated] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, step, busy]);

  const waLink = () => {
    const text = `Hello Zino Digital, I need assistance.\nRef: ${ref || "N/A"}\nName: ${form.full_name}\nEmail: ${form.email}\nType: ${category}\nIssue: ${form.summary}`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  const sendCode = async () => {
    setError("");
    const r = regSchema.safeParse(form);
    if (!r.success) return setError(r.error.errors[0].message);
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: form.email.trim(),
      options: { shouldCreateUser: true, emailRedirectTo: window.location.origin },
    });
    setBusy(false);
    if (error) return setError(error.message);
    setStep("otp");
  };

  const verify = async () => {
    setError("");
    setBusy(true);
    const { data, error } = await supabase.auth.verifyOtp({ email: form.email.trim(), token: code, type: "email" });
    if (error || !data.user) {
      setBusy(false);
      return setError(error?.message ?? "Invalid code");
    }
    const { data: ticket, error: tErr } = await supabase
      .from("support_tickets")
      .insert({
        user_id: data.user.id,
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        category,
        summary: form.summary.trim(),
      })
      .select("ref_number")
      .single();
    setBusy(false);
    if (tErr || !ticket) return setError("Could not create your reference. Please try again.");
    setRef(ticket.ref_number);
    setStep("chat");
    const first: Msg = { role: "user", content: form.summary.trim() };
    setMessages([
      { role: "assistant", content: `You're verified ✅ Your reference number is **${ticket.ref_number}**. Let me look into your enquiry.` },
      first,
    ]);
    ask([first], ticket.ref_number);
  };

  const ask = async (history: Msg[], refNo = ref) => {
    setBusy(true);
    setError("");
    const { data, error } = await supabase.functions.invoke("siza-chat", {
      body: { ref: refNo, category, messages: history.slice(-20) },
    });
    setBusy(false);
    const answer: string | undefined = data?.answer ?? data?.error;
    if (error && !data) {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't reach our system. Please continue with our team on WhatsApp." }]);
      setEscalated(true);
      return;
    }
    setMessages((m) => [...m, { role: "assistant", content: answer ?? "Let me connect you with our team." }]);
    if (data?.escalate) setEscalated(true);
  };

  const send = () => {
    const t = input.trim();
    if (!t || busy) return;
    const next = [...messages, { role: "user" as const, content: t }];
    setMessages(next);
    setInput("");
    ask(next.filter((_, i) => i > 0));
  };

  const reset = async () => {
    await supabase.auth.signOut();
    setStep("screen"); setCategory(""); setForm({ full_name: "", email: "", phone: "", summary: "" });
    setCode(""); setRef(""); setMessages([]); setEscalated(false); setError("");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Siza"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" /> Chat with Siza
        </button>
      )}

      {open && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col border border-border bg-card text-card-foreground shadow-2xl sm:bottom-5 sm:right-5 sm:h-[600px] sm:w-[390px]">
          <div className="flex items-center justify-between border-b border-border bg-ink px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-primary font-display text-lg text-primary-foreground">S</div>
              <div>
                <p className="font-display text-xl leading-none">Siza</p>
                <p className="text-xs text-muted-foreground">Zino Digital assistant{ref && ` · ${ref}`}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-muted-foreground hover:text-primary">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            {step === "screen" && (
              <>
                <p className="leading-relaxed">Hi, I'm <b>Siza</b> 👋 What can I help you with today?</p>
                <div className="grid gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCategory(c); setStep("register"); }}
                      className="border border-border px-3 py-2.5 text-left transition-colors hover:border-primary hover:text-primary"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === "register" && (
              <div className="space-y-3">
                <p><b>{category}</b> — please register so I can verify you and open a reference.</p>
                <Input placeholder="Full name" value={form.full_name} maxLength={100} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                <Input placeholder="Email address" type="email" value={form.email} maxLength={255} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input placeholder="Phone (optional)" type="tel" value={form.phone} maxLength={20} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Textarea placeholder={category === "Complaint" ? "Describe your complaint" : "How can we help?"} rows={3} value={form.summary} maxLength={1000} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
                <Button className="w-full" onClick={sendCode} disabled={busy}>
                  {busy ? <Loader2 className="animate-spin" /> : <ShieldCheck />} Send verification code
                </Button>
                <button className="text-xs text-muted-foreground underline" onClick={() => setStep("screen")}>Back</button>
              </div>
            )}

            {step === "otp" && (
              <div className="space-y-4">
                <p>I've emailed a 6-digit code to <b>{form.email}</b>. Enter it below.</p>
                <InputOTP maxLength={6} value={code} onChange={setCode}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}
                  </InputOTPGroup>
                </InputOTP>
                <Button className="w-full" onClick={verify} disabled={busy || code.length < 6}>
                  {busy ? <Loader2 className="animate-spin" /> : null} Verify
                </Button>
                <button className="text-xs text-muted-foreground underline" onClick={sendCode} disabled={busy}>Resend code</button>
              </div>
            )}

            {step === "chat" && messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "ml-auto max-w-[85%] bg-primary px-3 py-2 text-primary-foreground" : "max-w-[90%] leading-relaxed"}>
                <div className="prose prose-sm prose-invert max-w-none [&_p]:my-1"><ReactMarkdown>{m.content}</ReactMarkdown></div>
              </div>
            ))}
            {step === "chat" && busy && <p className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Siza is typing…</p>}
            {step === "chat" && escalated && (
              <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-primary px-4 py-3 font-medium text-primary-foreground hover:bg-primary/85">
                <MessageCircle className="h-4 w-4" /> Continue with our team on WhatsApp
              </a>
            )}
            {error && <p className="text-destructive">{error}</p>}
            <div ref={endRef} />
          </div>

          {step === "chat" && (
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <Input autoFocus placeholder="Type your message…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} maxLength={2000} />
                <Button size="icon" onClick={send} disabled={busy || !input.trim()} aria-label="Send"><Send /></Button>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-primary">Talk to a person</a>
                <button onClick={reset} className="hover:text-primary">End chat</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SizaChat;
