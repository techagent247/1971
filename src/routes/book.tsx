import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import interior from "@/assets/interior.jpg";
import { businessInfo, siteConfig } from "@/lib/restaurant";
import { PageHero, HoursTable } from "@/components/site/PageHero";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Table | Thè 1971 Harpenden" },
      { name: "description", content: "Reserve your table at Thè 1971, 36 Station Rd, Harpenden. Call 01582 766954." },
      { property: "og:title", content: "Book a Table — Thè 1971" },
      { property: "og:description", content: "Reserve your table at Thè 1971." },
    ],
  }),
  component: Book,
});

function Book() {
  return (
    <>
      <PageHero eyebrow="Reservations" title="Book a Table" image={interior}><p>We look forward to welcoming you.</p></PageHero>
      <section className="mx-auto grid max-w-5xl gap-16 px-6 py-20 md:grid-cols-2">
        <div>
          {siteConfig.BOOKING_URL ? (
            <>
              <h2 className="text-4xl">Reserve online</h2>
              <a href={siteConfig.BOOKING_URL} target="_blank" rel="noreferrer" className="btn-green mt-8">Book a Table</a>
            </>
          ) : (
            <>
              <h2 className="text-4xl">Reserve by phone</h2>
              <p className="mt-4 text-muted-foreground">Call us and our team will arrange your table.</p>
              <a href={businessInfo.phoneHref} className="btn-green mt-8"><Phone size={16} /> {businessInfo.phone}</a>
            </>
          )}
          <p className="mt-8 text-sm text-muted-foreground">For private dining, events or large groups, email <a href={`mailto:${businessInfo.email}`} className="underline">{businessInfo.email}</a> or use our contact form.</p>
        </div>
        <div>
          <h2 className="text-4xl">Opening Hours</h2>
          <div className="mt-6"><HoursTable /></div>
        </div>
      </section>
    </>
  );
}
