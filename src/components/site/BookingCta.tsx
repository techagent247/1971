import { Link } from "@tanstack/react-router";

export function BookingCta() {
  return (
    <section className="relative overflow-hidden bg-secondary py-28 text-secondary-foreground">
      <div className="pattern-nakshi absolute inset-0 opacity-25" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-5xl tracking-wide md:text-7xl">Come. Taste. Remember.</h2>
        <div className="gold-rule mx-auto mt-8 w-32" />
        <p className="mx-auto mt-8 max-w-xl text-lg opacity-85">Experience Bangladeshi cuisine while discovering the story and legacy behind Thè 1971.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/book" className="btn-gold">Book a Table</Link>
          <Link to="/menu" className="btn-outline-light">View Menu</Link>
        </div>
      </div>
    </section>
  );
}
