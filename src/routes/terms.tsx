import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Thè 1971" },
      { name: "description", content: "Terms of use for the Thè 1971 website." },
      { property: "og:title", content: "Terms & Conditions — Thè 1971" },
      { property: "og:description", content: "Website terms of use." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Information" title="Terms & Conditions" />
      <section className="mx-auto max-w-3xl space-y-4 px-6 py-20 text-muted-foreground">
        <p>Information on this website is provided as a guide and may change. Please confirm details such as opening hours, menu and allergens directly with the restaurant.</p>
        <p>Answers from our website assistant are for guidance only and do not confirm bookings or allergen safety.</p>
      </section>
    </>
  ),
});
