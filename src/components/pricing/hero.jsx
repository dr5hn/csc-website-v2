export default function PricingHero() {
  return (
    <section className="wrap flex flex-col gap-3.5 pb-7 pt-[clamp(40px,6vw,88px)]">
      <div className="eyebrow">Pricing</div>
      <h1 className="m-0 max-w-[760px] font-cal text-[length:clamp(42px,5.6vw,76px)] font-normal leading-[.98] tracking-[-.02em] [text-wrap:balance]">
        Start free. Pay only when you scale.
      </h1>
      <p className="lead m-0">No setup fees, no card to start. The database itself is free forever.</p>
    </section>
  );
}
