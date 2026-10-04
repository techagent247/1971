import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, UtensilsCrossed, Landmark, BookOpen, Users, MapPin, Phone, Mail } from "lucide-react";
import hero from "@/assets/hero.jpg";
import dish1 from "@/assets/dish-1.jpg";
import interior from "@/assets/interior.jpg";
import spices from "@/assets/spices.jpg";
import { restaurantStory, menuCategories, awards, businessInfo } from "@/lib/restaurant";
import { galleryImages } from "@/lib/gallery";
import { SectionTitle, HoursTable } from "@/components/site/PageHero";
import { BookingCta } from "@/components/site/BookingCta";
import { openChat } from "@/components/site/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thè 1971 — A Taste of Bangladesh, A Story of 1971 | Harpenden" },
      { name: "description", content: "Premium Bangladeshi cuisine in Harpenden celebrating the heritage and legacy of 1971. Book a table at 36 Station Rd." },
      { property: "og:title", content: "Thè 1971 — Bangladeshi Cuisine, Harpenden" },
      { property: "og:description", content: "A taste of Bangladesh. A story of 1971." },
    ],
  }),
  component: Home,
});

const pillars = [
  { icon: UtensilsCrossed, title: "Food", text: "Bangladeshi cooking, served with care." },
  { icon: Landmark, title: "Heritage", text: "Traditions carried across generations." },
  { icon: BookOpen, title: "History", text: "Honouring the legacy of 1971." },
  { icon: Users, title: "Community", text: "Celebrating Bangladeshis in British dining." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="A spread of Bangladeshi dishes in brass serveware" width={1920} height={1088} className="animate-slow-zoom absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 text-center">
          <p className="eyebrow text-gold animate-rise">Thè 1971 · Bangladeshi Cuisine</p>
          <h1 className="mt-8 text-5xl leading-[1.05] md:text-8xl animate-rise [animation-delay:200ms]">
            A Taste of Bangladesh.<br /><em className="text-gold">A Story of 1971.</em>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-ink-foreground/80 animate-rise [animation-delay:400ms]">
            Celebrating Bangladeshi cuisine, heritage and the generations who carried its legacy forward.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-rise [animation-delay:600ms]">
            <Link to="/menu" className="btn-outline-light">View Menu</Link>
            <Link to="/book" className="btn-gold">Book a Table</Link>
          </div>
        </div>
        <a href="#story" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold animate-drift" aria-label="Scroll to story"><ChevronDown /></a>
      </section>

      {/* 1971 Story */}
      <section id="story" className="relative overflow-hidden py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative select-none">
            <span className="block font-display text-[10rem] leading-none text-primary md:text-[16rem] lg:text-[19rem]">1971</span>
            <div className="mt-4 flex items-center gap-4">
              <span className="h-3 w-3 rounded-full bg-secondary" />
              <span className="h-px flex-1 bg-gold" />
              <span className="eyebrow text-muted-foreground">Independence</span>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Our Heritage" title="The Story Behind 1971" />
            <p className="mt-8 font-display text-2xl leading-relaxed">{restaurantStory.year1971}</p>
            <p className="mt-6 text-muted-foreground">{restaurantStory.purpose}</p>
            <Link to="/about" className="btn-outline-dark mt-10">Read Our Story</Link>
          </div>
        </div>
      </section>

      {/* More than a restaurant */}
      <section className="bg-primary py-28 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow text-gold">Our Purpose</p>
              <h2 className="mt-4 text-4xl md:text-6xl">More Than a Restaurant</h2>
            </div>
            <div className="space-y-4 text-primary-foreground/80">
              <p>Thè 1971 is about celebrating Bangladeshi heritage through food, hospitality and storytelling.</p>
              <p>{restaurantStory.contribution}</p>
            </div>
          </div>
          <div className="mt-16 grid gap-px bg-gold/25 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="bg-primary p-8">
                <p.icon className="text-gold" size={26} strokeWidth={1.25} />
                <h3 className="mt-6 text-3xl">{p.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured food */}
      <section className="py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-5">
          <img src={dish1} alt="Plated lamb curry with saffron rice" loading="lazy" width={1024} height={1280} className="h-[520px] w-full object-cover md:col-span-2" />
          <div className="flex flex-col justify-between gap-6 md:col-span-3">
            <img src={spices} alt="Bengali spices on a brass plate" loading="lazy" width={1280} height={1280} className="h-72 w-full object-cover" />
            <div>
              <SectionTitle eyebrow="From Our Kitchen" title="Rooted in Bengal, served in Harpenden">
                <p>{restaurantStory.cuisine}</p>
              </SectionTitle>
              <p className="mt-4 text-xs text-muted-foreground">Illustrative photography — the restaurant's own dishes coming soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menus */}
      <section className="bg-muted py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle center eyebrow="Explore" title="Our Menus"><p>Take a look at what we are serving before you book your table.</p></SectionTitle>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {menuCategories.map((c, i) => (
              <Link key={c} to="/menu" hash={c.toLowerCase().replace(/\s+/g, "-")} className="group flex items-center justify-between border border-border bg-card px-6 py-8 transition-colors hover:border-gold">
                <span className="font-display text-2xl">{c}</span>
                <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center"><Link to="/menu" className="btn-green">View Full Menu</Link></div>
        </div>
      </section>

      {/* Why + awards */}
      <section className="py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <div>
            <img src={interior} alt="Dining room with deep green walls and burgundy banquettes" loading="lazy" width={1600} height={1072} className="h-full max-h-[480px] w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <SectionTitle eyebrow="Why Thè 1971" title="Hospitality with a story to tell">
              <p>Every plate is a tribute to Bangladeshi heritage and to the generations who built Britain's love of curry.</p>
            </SectionTitle>
            <div className="mt-10 border-l-2 border-gold pl-6">
              <p className="eyebrow text-copper">Our Recognition</p>
              {awards.length ? (
                <ul className="mt-3 space-y-2">{awards.slice(0, 3).map((a) => <li key={a.id} className="font-display text-xl">{a.title}{a.year && ` · ${a.year}`}</li>)}</ul>
              ) : (
                <p className="mt-3 text-muted-foreground">Recognition that reflects our commitment to Bangladeshi cuisine and hospitality.</p>
              )}
              <Link to="/awards" className="mt-4 inline-block text-sm underline decoration-gold underline-offset-4">View awards</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6">
            <SectionTitle eyebrow="Gallery" title="Moments at the table" />
            <Link to="/gallery" className="hidden text-sm underline decoration-gold underline-offset-4 md:block">See the gallery</Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.map((g) => <img key={g.id} src={g.src} alt={g.alt} loading="lazy" className="aspect-square w-full object-cover" />)}
          </div>
        </div>
      </section>

      {/* Info + hours */}
      <section className="bg-card py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Visit Us" title="Find Thè 1971" />
            <ul className="mt-10 space-y-5">
              <li className="flex gap-4"><MapPin className="text-gold" /><span>{businessInfo.address.line1}, {businessInfo.address.town} {businessInfo.address.postcode}</span></li>
              <li className="flex gap-4"><Phone className="text-gold" /><a href={businessInfo.phoneHref} className="hover:text-primary">{businessInfo.phone}</a></li>
              <li className="flex gap-4"><Mail className="text-gold" /><a href={`mailto:${businessInfo.email}`} className="hover:text-primary">{businessInfo.email}</a></li>
            </ul>
            <Link to="/contact" className="btn-outline-dark mt-10">Contact & Directions</Link>
          </div>
          <div>
            <SectionTitle eyebrow="Opening Hours" title="Every evening" />
            <div className="mt-8"><HoursTable /></div>
          </div>
        </div>
      </section>

      <BookingCta />

      {/* Chat CTA */}
      <section className="py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <p className="eyebrow text-copper">Questions?</p>
          <h2 className="text-4xl">Ask Thè 1971</h2>
          <p className="text-muted-foreground">Opening times, directions, our story — our assistant answers from the restaurant's own information.</p>
          <button onClick={openChat} className="btn-green">Start a conversation</button>
        </div>
      </section>
    </>
  );
}
