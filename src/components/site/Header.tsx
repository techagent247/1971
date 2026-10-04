import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/restaurant";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Our Story" },
  { to: "/menu", label: "Menu" },
  { to: "/awards", label: "Awards" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className={`flex flex-col leading-none ${light ? "text-ink-foreground" : "text-foreground"}`} aria-label="Thè 1971 home">
      <span className="font-display text-2xl tracking-wide">Thè <span className="text-gold">1971</span></span>
      <span className="mt-1 text-[0.55rem] uppercase tracking-[0.4em] opacity-70">Bangladeshi Cuisine</span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const order = siteConfig.ORDER_ONLINE_URL;

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "bg-ink/95 py-3 backdrop-blur" : "bg-transparent py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        <Logo light />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="eyebrow text-ink-foreground/80 transition-colors hover:text-gold" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {order ? (
            <a href={order} target="_blank" rel="noreferrer" className="btn-outline-light hidden !py-3 md:inline-flex">Order Online</a>
          ) : (
            <span title="Online ordering coming soon" className="btn-outline-light hidden cursor-not-allowed !py-3 opacity-50 md:inline-flex">Order Online</span>
          )}
          <Link to="/book" className="btn-gold !px-4 !py-3">Book a Table</Link>
          <button className="text-ink-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mt-3 border-t border-gold/20 bg-ink px-6 py-6 lg:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl text-ink-foreground">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
