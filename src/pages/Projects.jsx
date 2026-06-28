import { projects } from "../constants";

const aText = { violet: "text-violet", teal: "text-teal", ember: "text-ember" };
const aChip = {
  violet: "tag-chip-violet",
  teal: "tag-chip-teal",
  ember: "tag-chip-ember",
};
const aBorder = {
  violet: "border-violet/40",
  teal: "border-teal/40",
  ember: "border-ember/40",
};
const aGrad = {
  violet: "text-violet-grad",
  teal: "text-teal-grad",
  ember: "text-ember-grad",
};
const aRing = {
  violet: "border-violet/30",
  teal: "border-teal/30",
  ember: "border-ember/30",
};
const aGlow = {
  violet: "bg-violet/20",
  teal: "bg-teal/20",
  ember: "bg-ember/20",
};

// abstract point-cluster visual (no images) for the featured card
const ClusterVisual = ({ accent }) => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    <div className={`absolute w-72 h-72 rounded-full blur-3xl ${aGlow[accent]}`} />
    {[0, 1, 2, 3].map((r) => (
      <span
        key={r}
        className={`absolute rounded-full border ${aRing[accent]}`}
        style={{ width: `${120 + r * 80}px`, height: `${120 + r * 80}px`, opacity: 0.6 - r * 0.12 }}
      />
    ))}
    <div className="grid grid-cols-6 gap-2.5 rotate-12 scale-110">
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${aGlow[accent]}`}
          style={{ opacity: 0.2 + ((i * 37) % 80) / 100 }}
        />
      ))}
    </div>
  </div>
);

export const Projects = () => {
  const [featured, ...rest] = projects;

  return (
    <section className="min-h-screen flex flex-col">
      <main className="flex-grow pt-28 md:pt-32 pb-stack-lg px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <header className="max-w-3xl reveal-element is-revealed">
          <p className="section-kicker text-violet mb-5">~/ projects</p>
          <h1 className="font-display text-display leading-[0.95]">
            Technical <span className="text-spectrum">innovations</span>
          </h1>
          <p className="mt-6 section-copy">
            Selected ML pipelines and shipped products — each one with real metrics
            and a clear engineering story behind it.
          </p>
        </header>

        {/* featured */}
        <article
          className={`panel lift-hover reveal-element overflow-hidden grid md:grid-cols-2 border-t-2 ${aBorder[featured.accent]}`}
        >
          <div className="relative min-h-[280px] bg-surface-2/60 order-1 md:order-2">
            <ClusterVisual accent={featured.accent} />
            {featured.badge ? (
              <span className="absolute top-5 right-5 tag-chip tag-chip-violet">
                {featured.badge}
              </span>
            ) : null}
          </div>
          <div className="p-8 flex flex-col justify-center order-2 md:order-1">
            <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${aText[featured.accent]}`}>
              featured · {featured.category}
            </p>
            <h2 className={`mt-2 font-display text-3xl ${aGrad[featured.accent]}`}>
              {featured.name}
            </h2>
            <p className="mt-4 text-text-dim leading-relaxed">{featured.description}</p>
            <p className="mt-3 text-sm text-text-faint leading-relaxed">{featured.outcome}</p>
            <div className="mt-5 flex flex-wrap gap-5">
              {featured.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className={`metric-value text-lg ${aText[featured.accent]}`}>
                    {m.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span key={tag} className={`tag-chip ${aChip[featured.accent]}`}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-text-faint">
              {featured.stack}
            </p>
          </div>
        </article>

        {/* grid */}
        <section className="grid md:grid-cols-3 gap-gutter">
          {rest.map((p, i) => (
            <article
              key={p.id}
              className={`panel p-6 lift-hover reveal-element flex flex-col border-t-2 ${aBorder[p.accent]}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${aText[p.accent]}`}>
                {p.category}
              </p>
              <h3 className="mt-2 font-display text-xl text-text">{p.name}</h3>
              <p className="mt-3 text-sm text-text-dim leading-relaxed flex-grow">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                {p.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className={`metric-value text-sm ${aText[p.accent]}`}>{m.value}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className={`tag-chip ${aChip[p.accent]}`}>
                    {tag}
                  </span>
                ))}
              </div>
              {p.link ? (
                <a
                  className={`mt-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] ${aText[p.accent]}`}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.linkLabel || "View"} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                  {p.stack}
                </p>
              )}
            </article>
          ))}
        </section>
      </main>
    </section>
  );
};
