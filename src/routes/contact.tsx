import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { businessInfo } from "@/lib/restaurant";
import { PageHero, HoursTable } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions | Thè 1971 Harpenden" },
      { name: "description", content: "Contact Thè 1971 at 36 Station Rd, Harpenden AL5 4ST. Phone 01582 766954, email info@the1971.co.uk." },
      { property: "og:title", content: "Contact — Thè 1971" },
      { property: "og:description", content: "Find us at 36 Station Rd, Harpenden." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(1, "Please enter a message").max(3000),
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [err, setErr] = useState("");
  const [loadedAt] = useState(() => Date.now());

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (f['website'] || Date.now() - loadedAt < 2500) return; // spam protection
    const r = schema.safeParse(f);
    if (!r.success) return setErr(r.error.issues[0]?.message ?? "Please check the form");
    setErr(""); setStatus("sending");
    const { error } = await supabase.from("enquiries").insert({ ...r.data, phone: r.data.phone || null, subject: r.data.subject || null, source: "contact" });
    if (error) { setStatus("idle"); return setErr("Couldn't send your message — please call or email us."); }
    setStatus("sent");
  }

  const cls = "w-full border border-input bg-card px-4 py-3 outline-none focus:border-gold";
  return (
    <>
      <PageHero eyebrow="Get in Touch" title="Contact Us" />
      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-2">
        <div>
          <ul className="space-y-5">
            <li className="flex gap-4"><MapPin className="text-gold" /><address className="not-italic">{businessInfo.name}<br />{businessInfo.address.line1}<br />{businessInfo.address.town}, {businessInfo.address.postcode}<br />{businessInfo.address.country}</address></li>
            <li className="flex gap-4"><Phone className="text-gold" /><a href={businessInfo.phoneHref}>{businessInfo.phone}</a></li>
            <li className="flex gap-4"><Mail className="text-gold" /><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a></li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={businessInfo.phoneHref} className="btn-green">Call Us</a>
            <a href={`mailto:${businessInfo.email}`} className="btn-outline-dark">Email Us</a>
            <Link to="/book" className="btn-outline-dark">Book a Table</Link>
          </div>
          <h2 className="mt-14 text-3xl">Opening Hours</h2>
          <div className="mt-4"><HoursTable /></div>
        </div>
        <div>
          {status === "sent" ? (
            <div className="border border-gold p-10 text-center"><p className="font-display text-3xl">Thank you.</p><p className="mt-3 text-muted-foreground">Your message has been sent. We'll be in touch soon.</p></div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <h2 className="text-3xl">Send us a message</h2>
              <input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
              <input name="name" placeholder="Name *" aria-label="Name" maxLength={120} className={cls} />
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="email" type="email" placeholder="Email *" aria-label="Email" maxLength={255} className={cls} />
                <input name="phone" placeholder="Phone" aria-label="Phone" maxLength={40} className={cls} />
              </div>
              <input name="subject" placeholder="Subject" aria-label="Subject" maxLength={160} className={cls} />
              <textarea name="message" rows={6} placeholder="Message *" aria-label="Message" maxLength={3000} className={cls} />
              {err && <p className="text-sm text-destructive">{err}</p>}
              <button disabled={status === "sending"} className="btn-green w-full">{status === "sending" ? "Sending…" : "Send Message"}</button>
            </form>
          )}
        </div>
      </section>
      <iframe title="Map to Thè 1971" src={`https://www.google.com/maps?q=${encodeURIComponent(businessInfo.mapsQuery)}&output=embed`} className="h-[420px] w-full border-0 grayscale" loading="lazy" />
    </>
  );
}
