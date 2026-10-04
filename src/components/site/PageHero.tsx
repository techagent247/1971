import { openingHours } from "@/lib/restaurant";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children, image }: { eyebrow: string; title: string; children?: ReactNode; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-ink-foreground">
      {image ? (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="hero-overlay absolute inset-0" />
        </>
      ) : (
        <div className="pattern-nakshi absolute inset-0 opacity-40" aria-hidden />
      )}
      <div className="relative mx-auto max-w-4xl px-6 text-center animate-rise">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-5 text-5xl md:text-7xl">{title}</h1>
        {children && <div className="mx-auto mt-6 max-w-2xl text-lg text-ink-foreground/75">{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, children, center }: { eyebrow: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow text-copper">{eyebrow}</p>
      <h2 className="mt-4 text-4xl md:text-5xl">{title}</h2>
      <div className={`gold-rule mt-6 w-24 ${center ? "mx-auto" : ""}`} />
      {children && <div className="mt-6 text-muted-foreground">{children}</div>}
    </div>
  );
}

export function HoursTable() {
  const today = typeof window === "undefined" ? -1 : new Date().getDay();
  return (
    <ul className="divide-y divide-border">
      {openingHours.map((h, i) => (
        <li key={h.day} className={`flex justify-between py-3 ${i === today ? "font-semibold text-primary" : ""}`}>
          <span>{h.day}</span><span>{h.open} – {h.close}</span>
        </li>
      ))}
    </ul>
  );
}
