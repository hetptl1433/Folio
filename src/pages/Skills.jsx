import { researchFocus, skillBands } from "../constants";

const aText = { violet: "text-violet", teal: "text-teal", ember: "text-ember" };
const aChip = {
  violet: "tag-chip-violet",
  teal: "tag-chip-teal",
  ember: "tag-chip-ember",
};

export const Skills = () => {
  const levelBands = skillBands.filter((b) => Array.isArray(b.levels));
  const pillBands = skillBands.filter((b) => Array.isArray(b.pills));

  return (
    <section className="min-h-screen flex flex-col">
      <main className="flex-grow pt-28 md:pt-32 pb-stack-lg px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <header className="max-w-3xl reveal-element is-revealed">
          <p className="section-kicker text-teal mb-5">~/ skills</p>
          <h1 className="font-display text-display leading-[0.95]">
            Technical <span className="text-teal-grad">arsenal</span>
          </h1>
          <p className="mt-6 section-copy">
            The languages, frameworks, and systems I use to build and evaluate
            intelligent, production-grade software — color-coded by domain.
          </p>
        </header>

        {/* proficiency meters */}
        <section className="grid md:grid-cols-2 gap-gutter">
          {levelBands.map((band) => (
            <div key={band.title} className="panel p-7 reveal-element">
              <h2 className={`font-display text-lg mb-6 ${aText[band.accent]}`}>
                {band.title}
              </h2>
              <div className="flex flex-col gap-5">
                {band.levels.map((level) => (
                  <div key={level.label} className="reveal-element">
                    <div className="flex justify-between font-mono text-[12px] text-text-dim mb-2">
                      <span>{level.label}</span>
                      <span className="metric-value text-text">{level.value}</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill" style={{ "--v": `${level.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* pill groups */}
        <section className="grid md:grid-cols-3 gap-gutter">
          {pillBands.map((band) => (
            <div key={band.title} className="panel p-6 reveal-element">
              <h2 className={`font-mono text-[12px] uppercase tracking-[0.2em] mb-4 ${aText[band.accent]}`}>
                {band.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {band.pills.map((pill) => (
                  <span key={pill} className={`tag-chip ${aChip[band.accent]}`}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* research focus feature */}
        <section className="panel p-8 reveal-element border-l-2 border-teal/40 relative overflow-hidden">
          <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-teal/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <p className="section-kicker text-teal">Research Focus</p>
              <h2 className="mt-3 font-display text-2xl text-text">{researchFocus.title}</h2>
              <p className="mt-3 text-text-dim leading-relaxed text-sm">
                {researchFocus.description}
              </p>
            </div>
            <div className="md:w-2/3 grid sm:grid-cols-2 gap-5">
              {researchFocus.items.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-surface-2 border border-hairline rounded-xl p-5"
                >
                  <h3 className={`font-mono text-[11px] uppercase tracking-[0.18em] mb-2 ${i === 0 ? "text-violet" : "text-teal"}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-dim leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};
