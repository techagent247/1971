import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Flame, Leaf } from "lucide-react";
import { menuCategories, menuItems, businessInfo } from "@/lib/restaurant";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Bangladeshi Dishes | Thè 1971 Harpenden" },
      { name: "description", content: "Explore the Thè 1971 menu: starters, Bangladeshi specialities, curries, rice, breads and desserts." },
      { property: "og:title", content: "Menu — Thè 1971" },
      { property: "og:description", content: "Bangladeshi cuisine in Harpenden." },
    ],
  }),
  component: MenuPage,
});

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function MenuPage() {
  const [q, setQ] = useState("");
  const [diet, setDiet] = useState<"" | "vegetarian" | "vegan">("");
  const filtered = useMemo(
    () => menuItems.filter((m) => (!q || `${m.name} ${m.description}`.toLowerCase().includes(q.toLowerCase())) && (!diet || m.dietary?.includes(diet))),
    [q, diet],
  );

  return (
    <>
      <PageHero eyebrow="Our Menus" title="The Menu"><p>Take a look at what we are serving before you book your table.</p></PageHero>
      <div className="sticky top-[68px] z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-4">
          {menuCategories.map((c) => <a key={c} href={`#${slug(c)}`} className="eyebrow shrink-0 text-muted-foreground hover:text-primary">{c}</a>)}
        </div>
      </div>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <label className="flex flex-1 items-center gap-2 border border-input bg-card px-4 py-3">
            <Search size={16} className="text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes" className="flex-1 bg-transparent outline-none" aria-label="Search dishes" />
          </label>
          <div className="flex gap-2">
            {(["", "vegetarian", "vegan"] as const).map((d) => (
              <button key={d || "all"} onClick={() => setDiet(d)} className={`border px-4 py-3 text-xs uppercase tracking-widest ${diet === d ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{d || "All"}</button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          <Flame size={12} className="inline text-secondary" /> spice level · <Leaf size={12} className="inline text-primary" /> vegetarian / vegan · Allergies? Please see our <Link to="/allergy-information" className="underline">allergy information</Link>.
        </p>

        {menuCategories.map((c) => {
          const items = filtered.filter((m) => m.category === c);
          return (
            <div key={c} id={slug(c)} className="scroll-mt-40 pt-16">
              <h2 className="text-4xl">{c}</h2>
              <div className="gold-rule mt-4 w-20" />
              {items.length ? (
                <ul className="mt-8 divide-y divide-border">
                  {items.map((m) => (
                    <li key={m.id} className="flex gap-6 py-6">
                      {m.image && <img src={m.image} alt={m.name} loading="lazy" className="h-24 w-24 object-cover" />}
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-2xl">{m.name} {m.dietary?.length ? <Leaf size={14} className="inline text-primary" /> : null}{Array.from({ length: m.spicyLevel ?? 0 }).map((_, i) => <Flame key={i} size={14} className="inline text-secondary" />)}</h3>
                          {m.price && <span className="font-display text-xl text-copper">{m.price}</span>}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                        {m.allergens?.length ? <p className="mt-2 text-xs text-muted-foreground">Contains: {m.allergens.join(", ")}</p> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-muted-foreground">
                  {menuItems.length ? "No dishes match your filters." : <>Our full {c.toLowerCase()} selection will be published here soon. For today's menu, please call <a href={businessInfo.phoneHref} className="underline">{businessInfo.phone}</a>.</>}
                </p>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}
