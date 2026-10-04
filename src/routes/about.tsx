import { createFileRoute } from "@tanstack/react-router";
import interior from "@/assets/interior.jpg";
import spices from "@/assets/spices.jpg";
import { restaurantStory } from "@/lib/restaurant";
import { PageHero } from "@/components/site/PageHero";
import { BookingCta } from "@/components/site/BookingCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — The Meaning of 1971 | Thè 1971" },
      { name: "description", content: "Why Thè 1971 exists: honouring Bangladesh's independence and the Bangladeshi contribution to UK dining." },
      { property: "og:title", content: "Our Story — Thè 1971" },
      { property: "og:description", content: "Honouring the legacy of 1971 through Bangladeshi cuisine." },
    ],
  }),
  component: About,
});

const timeline = [
  { mark: "1971", text: "Bangladesh becomes independent." },
  { mark: "Generations", text: "Bangladeshi culture and culinary traditions are passed down." },
  { mark: "Today", text: "Thè 1971 celebrates that heritage through food and hospitality." },
];

function Block({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow text-copper">{eyebrow}</p>
      <h2 className="mt-4 text-4xl md:text-5xl">{title}</h2>
      <div className="gold-rule mt-6 w-24" />
      <p className="mt-8 font-display text-2xl leading-relaxed">{text}</p>
    </div>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="A Legacy on Every Plate" image={interior}>
        <p>Honouring 1971, and the generations who carried Bangladesh forward.</p>
      </PageHero>
      <Block eyebrow="01" title="The Year 1971" text={restaurantStory.year1971} />
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <p className="eyebrow text-center text-gold">Heritage Timeline</p>
          <ol className="relative mt-14 grid gap-12 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gold/40 md:block" aria-hidden />
            {timeline.map((t) => (
              <li key={t.mark} className="relative">
                <span className="relative z-10 block h-3 w-3 translate-y-[18px] rounded-full bg-gold" />
                <h3 className="mt-10 font-display text-5xl text-gold">{t.mark}</h3>
                <p className="mt-3 text-primary-foreground/80">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Block eyebrow="02" title="Our Purpose" text={restaurantStory.purpose} />
      <img src={spices} alt="Bengali spices on a brass plate" loading="lazy" className="mx-auto h-[420px] w-full max-w-6xl object-cover px-6" />
      <Block eyebrow="03" title="Bangladeshi Contribution" text={restaurantStory.contribution} />
      <Block eyebrow="04" title="Our Cuisine" text={restaurantStory.cuisine} />
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow text-copper">05 · Our Legacy</p>
          <blockquote className="mt-8 font-display text-3xl italic leading-relaxed md:text-4xl">“{restaurantStory.legacy}”</blockquote>
        </div>
      </section>
      <BookingCta />
    </>
  );
}
