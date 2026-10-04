import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { allergenInformation, businessInfo } from "@/lib/restaurant";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/allergy-information")({
  head: () => ({
    meta: [
      { title: "Allergy Information | Thè 1971" },
      { name: "description", content: "Allergen information for Thè 1971. Please inquire about allergies when ordering." },
      { property: "og:title", content: "Allergy Information — Thè 1971" },
      { property: "og:description", content: "Potential allergens and how to order safely." },
    ],
  }),
  component: Allergy,
});

function Allergy() {
  return (
    <>
      <PageHero eyebrow="Your Safety" title="Allergy Information"><p>{allergenInformation.notice}</p></PageHero>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div role="alert" className="flex gap-4 border-2 border-secondary bg-card p-6">
          <AlertTriangle className="shrink-0 text-secondary" />
          <div>
            <p className="font-display text-2xl text-secondary">{allergenInformation.warning}</p>
            <p className="mt-2 text-sm text-muted-foreground">Please speak to our team before ordering: <a href={businessInfo.phoneHref} className="underline">{businessInfo.phone}</a>.</p>
          </div>
        </div>
        <h2 className="mt-16 text-4xl">Potential allergens in our kitchen</h2>
        <div className="gold-rule mt-4 w-20" />
        <ul className="mt-8 grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
          {allergenInformation.allergens.map((a) => <li key={a} className="bg-background px-5 py-4">{a}</li>)}
        </ul>
      </section>
    </>
  );
}
