import {
  aboutIntro,
  aboutStrands,
  education,
  focusAreas,
  profile,
  skillCategories,
} from "../constants";

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
const aDot = { violet: "bg-violet", teal: "bg-teal", ember: "bg-ember" };

export const About = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <main className="flex-grow pt-28 md:pt-32 pb-stack-lg px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <header className="max-w-3xl reveal-element is-revealed">
          <p className="section-kicker text-violet mb-5">~/ about</p>
          <h1 className="font-display text-display leading-[0.95]">
            About the <span className="text-violet-grad">work</span>
          </h1>
          <div className="mt-6 space-y-4">
            {aboutIntro.map((p) => (
              <p key={p} className="section-copy">
                {p}
              </p>
            ))}
          </div>
        </header>

        {/* two strands */}
        <section className="grid md:grid-cols-2 gap-gutter">
          {aboutStrands.map((s, i) => (
            <article
              key={s.key}
              className={`panel p-7 lift-hover reveal-element border-l-2 ${aBorder[s.accent]}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${aText[s.accent]}`}>
                strand_{i + 1}
              </p>
              <h2 className="mt-2 font-display text-2xl text-text">{s.title}</h2>
              <p className="mt-3 text-text-dim leading-relaxed">{s.text}</p>
            </article>
          ))}
        </section>

        {/* focus areas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {focusAreas.map((area, i) => (
            <article
              key={area.title}
              className={`panel p-6 lift-hover reveal-element border-t-2 ${aBorder[area.accent]}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <h2 className={`font-display text-lg ${aText[area.accent]}`}>{area.title}</h2>
              <p className="mt-3 text-sm text-text-dim leading-relaxed">{area.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {area.points.map((point) => (
                  <span key={point} className={`tag-chip ${aChip[area.accent]}`}>
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        {/* education + core stack */}
        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-gutter">
          <article className="panel p-7 reveal-element">
            <h2 className="font-display text-xl text-text mb-6">Education</h2>
            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.school}
                  className="relative pl-5 border-l border-hairline"
                >
                  <span
                    className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${aDot[item.accent]}`}
                  />
                  <h3 className={`font-display text-base ${aText[item.accent]}`}>
                    {item.school}
                  </h3>
                  <p className="text-text mt-1 text-sm">{item.degree}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint mt-1">
                    {item.location} · {item.date}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel p-7 reveal-element">
            <h2 className="font-display text-xl text-text mb-6">Core Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <h3 className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-3 ${aText[category.accent]}`}>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span key={item} className="tag-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </section>
  );
};
