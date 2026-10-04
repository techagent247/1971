import { createFileRoute } from "@tanstack/react-router";
import { businessInfo } from "@/lib/restaurant";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Thè 1971" },
      { name: "description", content: "How Thè 1971 handles information you share through our website." },
      { property: "og:title", content: "Privacy Policy — Thè 1971" },
      { property: "og:description", content: "Our privacy policy." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Information" title="Privacy Policy" />
      <section className="mx-auto max-w-3xl space-y-4 px-6 py-20 text-muted-foreground">
        <p>When you contact us or send an enquiry, we store the details you provide (name, email, phone and message) solely to respond to you.</p>
        <p>Questions asked to our website assistant may be recorded anonymously so we can improve the information we provide.</p>
        <p>To ask about or remove your data, email <a className="underline" href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>.</p>
      </section>
    </>
  ),
});
