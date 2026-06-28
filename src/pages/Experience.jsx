import { education, experiences } from "../constants";

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

export const Experience = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <main className="flex-grow pt-28 md:pt-32 pb-stack-lg px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <header className="max-w-3xl reveal-element is-revealed">
          <p className="section-kicker text-ember mb-5">~/ experience</p>
          <h1 className="font-display text-display leading-[0.95]">
            Professional <span className="text-ember-grad">journey</span>
          </h1>
          <p className="mt-6 section-copy">
            A chronological map of my research, ML, and full-stack engineering
            roles — newest first.
          </p>
        </header>

        <section className="relative pl-7 md:pl-9">
          <div className="absolute left-0 top-2 bottom-2 timeline-line" />
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div
                key={`${exp.org}-${exp.role}`}
                className="relative reveal-element"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span
                  className={`absolute -left-[29px] md:-left-[37px] top-7 w-3 h-3 rounded-full border ${aBorder[exp.accent]} ${
                    i === 0 ? "bg-ember shadow-glow-ember animate-pulse-dot" : aDot[exp.accent]
                  }`}
                />
                <article className={`panel p-7 lift-hover border-t-2 ${aBorder[exp.accent]}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h2 className="font-display text-xl text-text">{exp.role}</h2>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim">
                      {exp.date}
                    </span>
                  </div>
                  <p className={`mt-1 font-mono text-[12px] tracking-[0.04em] ${aText[exp.accent]}`}>
                    {exp.org} <span className="text-text-faint">· {exp.location}</span>
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {exp.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm text-text-dim leading-relaxed">
                        <span className={`${aText[exp.accent]} mt-0.5`}>▸</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className={`tag-chip ${aChip[exp.accent]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-gutter">
          {education.map((item) => (
            <article
              key={item.school}
              className={`panel p-6 reveal-element border-l-2 ${aBorder[item.accent]}`}
            >
              <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${aText[item.accent]}`}>
                {item.date}
              </p>
              <h3 className="mt-2 font-display text-lg text-text">{item.school}</h3>
              <p className="mt-1 text-sm text-text-dim">
                {item.degree} · {item.location}
              </p>
            </article>
          ))}
        </section>
      </main>
    </section>
  );
};
