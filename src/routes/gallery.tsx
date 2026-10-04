import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, type GalleryCategory } from "@/lib/gallery";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Thè 1971 Bangladeshi Restaurant" },
      { name: "description", content: "Food, dining and heritage at Thè 1971, Harpenden." },
      { property: "og:title", content: "Gallery — Thè 1971" },
      { property: "og:description", content: "Moments at the table." },
    ],
  }),
  component: Gallery,
});

const cats: ("All" | GalleryCategory)[] = ["All", "Food", "Restaurant", "Dining", "Events", "Heritage"];

function Gallery() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [idx, setIdx] = useState<number | null>(null);
  const list = galleryImages.filter((g) => cat === "All" || g.category === cat);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i! + 1) % list.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i! - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx, list.length]);

  return (
    <>
      <PageHero eyebrow="Gallery" title="Moments at the Table" />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap justify-center gap-2">
          {cats.map((c) => <button key={c} onClick={() => setCat(c)} className={`border px-4 py-2 text-xs uppercase tracking-widest ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{c}</button>)}
        </div>
        {list.length ? (
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {list.map((g, i) => (
              <button key={g.id} onClick={() => setIdx(i)} className="mb-4 block w-full overflow-hidden">
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition-transform duration-700 hover:scale-105" />
              </button>
            ))}
          </div>
        ) : <p className="mt-16 text-center text-muted-foreground">Photos in this category are coming soon.</p>}
        <p className="mt-8 text-center text-xs text-muted-foreground">Some images are illustrative and will be replaced with the restaurant's own photography.</p>
      </section>
      {idx !== null && list[idx] && (
        <div role="dialog" aria-label="Image viewer" className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-6" onClick={() => setIdx(null)}>
          <img src={list[idx].src} alt={list[idx].alt} className="max-h-[85vh] max-w-full object-contain animate-rise" onClick={(e) => e.stopPropagation()} />
          <button className="absolute right-6 top-6 text-ink-foreground" aria-label="Close"><X /></button>
          <button className="absolute left-4 text-ink-foreground" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + list.length) % list.length); }}><ChevronLeft size={32} /></button>
          <button className="absolute right-4 text-ink-foreground" aria-label="Next" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % list.length); }}><ChevronRight size={32} /></button>
        </div>
      )}
    </>
  );
}
