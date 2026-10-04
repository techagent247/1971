import { useRef, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, Send } from "lucide-react";
import { askChat } from "@/lib/chat.functions";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What are your opening times?", "Where are you located?", "What type of food do you serve?",
  "What is the story behind 1971?", "Do you have vegetarian dishes?", "What allergens are in your food?",
  "How can I book a table?", "Do you offer takeaway?", "What awards have you received?",
];

export function openChat() {
  window.dispatchEvent(new Event("open-1971-chat"));
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const ask = useServerFn(askChat);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener("open-1971-chat", h);
    return () => window.removeEventListener("open-1971-chat", h);
  }, []);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy, showEnquiry]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    const next = [...msgs, { role: "user" as const, content: t.slice(0, 1000) }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const r = await ask({ data: { messages: next.slice(-12) } });
      setMsgs([...next, { role: "assistant", content: r.reply }]);
      if (r.enquiry) setShowEnquiry(true);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Sorry, something went wrong. Please call 01582 766954." }]);
    } finally { setBusy(false); }
  }

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-50 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-gold bg-primary text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-105" aria-label="Ask Thè 1971">
          <MessageCircle size={20} className="text-gold" />
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.15em]">Ask 1971</span>
        </button>
      )}
      {open && (
        <div role="dialog" aria-label="Ask Thè 1971" className="fixed inset-x-3 bottom-3 z-50 flex max-h-[85vh] flex-col overflow-hidden rounded-lg border border-gold/40 bg-card shadow-[var(--shadow-soft)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px]">
          <div className="flex items-start justify-between bg-primary px-5 py-4 text-primary-foreground">
            <div>
              <p className="font-display text-xl">Ask Thè <span className="text-gold">1971</span></p>
              <p className="text-xs opacity-75">How can we help?</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={20} /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-border px-3 py-1.5 text-left text-xs hover:border-gold hover:bg-accent">{s}</button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>{m.content}</div>
            ))}
            {busy && <div className="w-16 rounded-lg bg-muted px-3 py-2 text-muted-foreground">…</div>}
            {showEnquiry && <EnquiryForm onDone={() => { setShowEnquiry(false); setMsgs((m) => [...m, { role: "assistant", content: "Thank you — your enquiry has been sent. The team will be in touch. Please note availability isn't confirmed until they reply." }]); }} />}
            <div ref={end} />
          </div>
          <p className="px-4 pb-1 text-[0.65rem] text-muted-foreground">For allergies, always confirm directly with the restaurant.</p>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-border p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={1000} placeholder="Ask a question…" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold" aria-label="Your question" />
            <button disabled={busy} className="rounded-md bg-primary px-3 text-primary-foreground disabled:opacity-50" aria-label="Send"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}

function EnquiryForm({ onDone }: { onDone: () => void }) {
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return;
    const name = String(f.get("name") || "").trim(), email = String(f.get("email") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) return setErr("Please add your name and a valid email.");
    setSending(true);
    const { error } = await supabase.from("enquiries").insert({
      name, email, source: "chatbot",
      phone: String(f.get("phone") || "") || null, event_type: String(f.get("event_type") || "") || null,
      preferred_date: String(f.get("date") || "") || null, guests: String(f.get("guests") || "") || null,
      message: String(f.get("message") || "") || null,
    });
    setSending(false);
    if (error) return setErr("Couldn't send — please call 01582 766954.");
    onDone();
  }
  const cls = "w-full rounded border border-input bg-background px-2 py-1.5 text-xs";
  return (
    <form onSubmit={submit} className="space-y-2 rounded-lg border border-gold/40 p-3">
      <p className="eyebrow text-copper">Event enquiry</p>
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input name="name" placeholder="Name *" maxLength={120} className={cls} />
      <input name="email" type="email" placeholder="Email *" maxLength={255} className={cls} />
      <input name="phone" placeholder="Phone" maxLength={40} className={cls} />
      <div className="grid grid-cols-3 gap-2">
        <input name="event_type" placeholder="Event type" maxLength={80} className={cls} />
        <input name="date" type="date" className={cls} />
        <input name="guests" placeholder="Guests" maxLength={20} className={cls} />
      </div>
      <textarea name="message" placeholder="Message" maxLength={3000} rows={2} className={cls} />
      {err && <p className="text-xs text-destructive">{err}</p>}
      <button disabled={sending} className="btn-green w-full !py-2">{sending ? "Sending…" : "Send Enquiry"}</button>
    </form>
  );
}
