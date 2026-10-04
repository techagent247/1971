import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Music2 } from "lucide-react";
import { businessInfo, openingHours, siteConfig } from "@/lib/restaurant";
import { Logo, navLinks } from "./Header";

const icons: Record<string, typeof Facebook> = { facebook: Facebook, instagram: Instagram, youtube: Youtube, tiktok: Music2 };

export function Footer() {
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url);
  return (
    <footer className="relative bg-ink text-ink-foreground">
      <div className="pattern-nakshi absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-6 text-sm text-ink-foreground/60">A taste of Bangladesh. A story of 1971.</p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {socials.map(([k, url]) => { const I = icons[k]; if (!I) return null; return <a key={k} href={url} aria-label={k} className="text-gold hover:text-ink-foreground"><I size={18} /></a>; })}
            </div>
          )}
        </div>
        <div>
          <h3 className="eyebrow text-gold">Navigation</h3>
          <ul className="mt-5 space-y-2 text-sm">{navLinks.map((l) => <li key={l.to}><Link to={l.to} className="text-ink-foreground/70 hover:text-gold">{l.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="eyebrow text-gold">Information</h3>
          <ul className="mt-5 space-y-2 text-sm">
            <li><Link to="/allergy-information" className="text-ink-foreground/70 hover:text-gold">Allergy Information</Link></li>
            <li><Link to="/privacy" className="text-ink-foreground/70 hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-ink-foreground/70 hover:text-gold">Terms &amp; Conditions</Link></li>
            <li><Link to="/book" className="text-ink-foreground/70 hover:text-gold">Book a Table</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-gold">Contact</h3>
          <address className="mt-5 space-y-1 text-sm not-italic text-ink-foreground/70">
            <p>{businessInfo.address.line1}</p><p>{businessInfo.address.town}</p><p>{businessInfo.address.postcode}</p>
            <p className="pt-3"><a href={businessInfo.phoneHref} className="hover:text-gold">{businessInfo.phone}</a></p>
            <p><a href={`mailto:${businessInfo.email}`} className="hover:text-gold">{businessInfo.email}</a></p>
          </address>
        </div>
        <div>
          <h3 className="eyebrow text-gold">Opening Hours</h3>
          <ul className="mt-5 space-y-1 text-sm text-ink-foreground/70">
            {openingHours.map((h) => <li key={h.day} className="flex justify-between gap-4"><span>{h.day}</span><span>{h.open} – {h.close}</span></li>)}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-gold/15 py-6 text-center text-xs text-ink-foreground/50">© 2026 Thè 1971. All rights reserved.</div>
    </footer>
  );
}
