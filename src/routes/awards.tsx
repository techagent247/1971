import { createFileRoute } from "@tanstack/react-router";
import { awards } from "@/lib/restaurant";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards & Recognition | Thè 1971" },
      { name: "description", content: "Recognition for Thè 1971's Bangladeshi cuisine and hospitality in Harpenden." },
      { property: "og:title", content: "Awards — Thè 1971" },
      { property: "og:description", content: "Our recognition." },
    ],
  }),
  component: Awards,
});

function Awards() {
  return (
    <>
      <PageHero eyebrow="Our Recognition" title="Awards"><p>Recognition that reflects our commitment to Bangladeshi cuisine and hospitality.</p></PageHero>
      <section className="mx-auto max-w-5xl px-6 py-20">
        {awards.length ? (
          <ul className="divide-y divide-border">
            {awards.map((a) => (
              <li key={a.id} className="grid gap-4 py-10 md:grid-cols-[120px_1fr]">
                <span className="font-display text-4xl text-gold">{a.year}</span>
                <div><h2 className="text-3xl">{a.title}</h2>{a.issuer && <p className="eyebrow mt-2 text-copper">{a.issuer}</p>}{a.description && <p className="mt-3 text-muted-foreground">{a.description}</p>}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-dashed border-gold p-16 text-center">
            <p className="font-display text-3xl">Our awards will be shared here soon.</p>
            <p className="mt-3 text-muted-foreground">We only publish recognition we have genuinely received.</p>
          </div>
        )}
      </section>
    </>
  );
}
