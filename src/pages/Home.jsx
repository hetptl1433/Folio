import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { contact, github, linkedin } from "../assets/icons";
import {
  aboutIntro,
  aboutStrands,
  awards,
  certifications,
  experiences,
  heroMeta,
  homeStats,
  profile,
  projects,
  publication,
  queryTokens,
  skillBands,
} from "../constants";

const LatentField = lazy(() => import("../components/LatentField"));

const CLUSTER_ID = { violet: 0, teal: 1, ember: 2 };

const accentText = { violet: "text-violet", teal: "text-teal", ember: "text-ember" };
const accentChip = {
  violet: "tag-chip-violet",
  teal: "tag-chip-teal",
  ember: "tag-chip-ember",
};
const accentBorder = {
  violet: "border-violet/40",
  teal: "border-teal/40",
  ember: "border-ember/40",
};

const SectionHead = ({ index, label, accent = "violet" }) => (
  <div className="reveal-element flex items-center gap-4">
    <span className="section-index">{index}</span>
    <span className={`section-kicker ${accentText[accent]}`}>{label}</span>
    <span className="h-px flex-1 bg-hairline" />
  </div>
);

export const Home = () => {
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const queryRef = useRef({ cluster: -1 });
  const [enable3d, setEnable3d] = useState(false);
  const [query, setQuery] = useState("");
  const [caption, setCaption] = useState("");

  // capability gate: WebGL + motion preference
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(
        window.WebGLRenderingContext &&
        (c.getContext("webgl2") || c.getContext("webgl"))
      );
    } catch (err) {
      webgl = false;
    }
    setEnable3d(webgl && !reduce);
  }, []);

  // scroll + pointer drivers (rAF throttled)
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        frame = 0;
      });
    };
    const onPointer = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // reveal on scroll
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal-element"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // query → latent field reorganization
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      queryRef.current.cluster = -1;
      setCaption("");
      return;
    }
    const match = queryTokens.find(
      (t) => t.token.startsWith(q) || q.startsWith(t.token) || t.caption.toLowerCase().includes(q)
    );
    if (match) {
      queryRef.current.cluster = CLUSTER_ID[match.cluster];
      setCaption(match.caption);
    } else {
      queryRef.current.cluster = -1;
      setCaption("no cluster found — try: ml · fraud · llm · react · aws · ship");
    }
  }, [query]);

  const [mlBand, fullStackBand, langBand] = skillBands;

  return (
    <>
      {enable3d ? (
        <Suspense fallback={null}>
          <LatentField scrollRef={scrollRef} pointerRef={pointerRef} queryRef={queryRef} />
        </Suspense>
      ) : null}

      <div className="relative z-10">
        {/* ===================== HERO ===================== */}
        <section
          id="hero"
          className="min-h-[100svh] flex items-center px-margin-mobile md:px-margin-desktop pt-28 pb-16"
        >
          <div className="w-full max-w-container-max mx-auto">
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-text-dim mb-6 reveal-element">
              het@latent-space:~$ whoami
            </p>
            <h1 className="font-display text-display leading-[0.92] reveal-element">
              <span className="text-text">Het</span>{" "}
              <span className="text-spectrum">Patel</span>
            </h1>
            <p
              className="mt-4 font-display text-headline-lg-mobile md:text-headline-lg text-text-dim reveal-element"
              style={{ transitionDelay: "80ms" }}
            >
              Software&nbsp;Engineer&nbsp;
              <span className="text-text-faint">·</span>&nbsp;ML&nbsp;Engineer
            </p>
            <p
              className="mt-5 cloud-caption reveal-element"
              style={{ transitionDelay: "140ms" }}
            >
              {heroMeta.rendering}
              <span className="cursor-blink" />
            </p>

            <p
              className="mt-6 max-w-xl section-copy reveal-element"
              style={{ transitionDelay: "180ms" }}
            >
              {profile.summary}
            </p>

            {/* query bar — the signature interaction */}
            <div
              className="mt-9 max-w-xl reveal-element"
              style={{ transitionDelay: "220ms" }}
            >
              <label className="query-bar" htmlFor="latent-query">
                <span className="text-ember">&gt;</span>
                <input
                  id="latent-query"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="query the latent space…  (try: fraud, llm, react)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <span className="text-text-faint text-[11px] uppercase tracking-[0.18em] hidden sm:inline">
                  {enable3d ? "live" : "static"}
                </span>
              </label>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {queryTokens.map((t) => (
                  <button
                    key={t.token}
                    type="button"
                    className="query-token"
                    onClick={() => setQuery(t.token)}
                  >
                    {t.token}
                  </button>
                ))}
              </div>
              <p className="mt-3 h-5 cloud-caption text-text-dim">{caption}</p>
            </div>

            {/* CTAs + socials */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3 reveal-element"
              style={{ transitionDelay: "260ms" }}
            >
              <a className="btn-ember" href="#projects">
                Explore work
                <span aria-hidden="true">↘</span>
              </a>
              <a className="btn-ghost" href={profile.resume} download>
                Résumé.pdf
              </a>
              <div className="flex items-center gap-1 ml-1">
                {[
                  { icon: linkedin, label: "LinkedIn", href: profile.links.linkedin },
                  { icon: github, label: "GitHub", href: profile.links.github },
                  { icon: contact, label: "Email", href: profile.links.email },
                ].map((s) => (
                  <a
                    key={s.label}
                    aria-label={s.label}
                    className="p-2 rounded-full hover:bg-surface-2 transition-colors"
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <img alt={s.label} className="w-5 h-5 object-contain opacity-70" src={s.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* stat ticker */}
            <div
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline rounded-xl overflow-hidden reveal-element max-w-3xl"
              style={{ transitionDelay: "300ms" }}
            >
              {homeStats.map((s) => (
                <div key={s.label} className="bg-void/70 backdrop-blur-sm p-4">
                  <p className="metric-value text-2xl text-text">{s.value}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-dim">
                    {s.label}
                  </p>
                  <p className="mt-1 text-[11px] text-text-faint leading-snug">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section
          id="about"
          className="scroll-mt-28 px-margin-mobile md:px-margin-desktop py-stack-lg"
        >
          <div className="max-w-container-max mx-auto space-y-stack-md">
            <SectionHead index="01" label="About" accent="violet" />
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-stack-md">
              <div className="space-y-5 max-w-2xl">
                {aboutIntro.map((p, i) => (
                  <p
                    key={p}
                    className="section-copy reveal-element"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="space-y-4">
                {aboutStrands.map((s, i) => (
                  <div
                    key={s.key}
                    className={`panel p-6 lift-hover reveal-element border-l-2 ${accentBorder[s.accent]}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${accentText[s.accent]}`}>
                      strand_{i + 1}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-text">{s.title}</h3>
                    <p className="mt-2 text-sm text-text-dim leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SKILLS ===================== */}
        <section
          id="skills"
          className="scroll-mt-28 px-margin-mobile md:px-margin-desktop py-stack-lg"
        >
          <div className="max-w-container-max mx-auto space-y-stack-md">
            <SectionHead index="02" label="Skills" accent="teal" />
            <div className="grid md:grid-cols-2 gap-gutter">
              {[mlBand, fullStackBand].map((band) => (
                <div key={band.title} className="panel p-6 reveal-element">
                  <h3 className={`font-display text-lg mb-5 ${accentText[band.accent]}`}>
                    {band.title}
                  </h3>
                  <div className="space-y-4">
                    {band.levels.map((lvl) => (
                      <div key={lvl.label}>
                        <div className="flex justify-between font-mono text-[12px] text-text-dim mb-2">
                          <span>{lvl.label}</span>
                          <span className="metric-value text-text">{lvl.value}</span>
                        </div>
                        <div className="meter-track">
                          <div className="meter-fill" style={{ "--v": `${lvl.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="panel p-6 reveal-element">
              <h3 className={`font-display text-lg mb-4 ${accentText[langBand.accent]}`}>
                {langBand.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {langBand.pills.map((pill) => (
                  <span key={pill} className="tag-chip">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== EXPERIENCE ===================== */}
        <section
          id="experience"
          className="scroll-mt-28 px-margin-mobile md:px-margin-desktop py-stack-lg"
        >
          <div className="max-w-container-max mx-auto space-y-stack-md">
            <SectionHead index="03" label="Experience" accent="ember" />
            <div className="relative pl-6 md:pl-8">
              <div className="absolute left-0 top-2 bottom-2 timeline-line" />
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div
                    key={`${exp.org}-${exp.role}`}
                    className="relative reveal-element"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <span
                      className={`absolute -left-[25px] md:-left-[33px] top-6 w-3 h-3 rounded-full border ${accentBorder[exp.accent]} ${i === 0 ? "bg-ember shadow-glow-ember animate-pulse-dot" : "bg-surface-3"}`}
                    />
                    <div className="panel p-6 lift-hover">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-display text-lg text-text">
                          {exp.role}
                        </h3>
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim">
                          {exp.date}
                        </span>
                      </div>
                      <p className={`mt-1 font-mono text-[12px] tracking-[0.04em] ${accentText[exp.accent]}`}>
                        {exp.org} <span className="text-text-faint">· {exp.location}</span>
                      </p>
                      <ul className="mt-4 space-y-2">
                        {exp.points.slice(0, 2).map((pt) => (
                          <li key={pt} className="flex gap-2 text-sm text-text-dim leading-relaxed">
                            <span className={`${accentText[exp.accent]} mt-1`}>▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className={`tag-chip ${accentChip[exp.accent]}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== PROJECTS ===================== */}
        <section
          id="projects"
          className="scroll-mt-28 px-margin-mobile md:px-margin-desktop py-stack-lg"
        >
          <div className="max-w-container-max mx-auto space-y-stack-md">
            <SectionHead index="04" label="Projects" accent="violet" />
            <div className="grid md:grid-cols-2 gap-gutter">
              {projects.map((p, i) => (
                <article
                  key={p.id}
                  className={`panel p-6 lift-hover reveal-element flex flex-col border-t-2 ${accentBorder[p.accent]}`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl text-text">{p.name}</h3>
                      <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.16em] ${accentText[p.accent]}`}>
                        {p.category}
                      </p>
                    </div>
                    {p.badge ? (
                      <span className="tag-chip tag-chip-violet whitespace-nowrap">{p.badge}</span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm text-text-dim leading-relaxed flex-grow">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className={`metric-value text-sm ${accentText[p.accent]}`}>
                          {m.value}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className={`tag-chip ${accentChip[p.accent]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.link ? (
                    <a
                      className={`mt-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] ${accentText[p.accent]}`}
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.linkLabel || "View"} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-text-faint">
                      {p.stack}
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== SIGNALS (certs / awards / pub) ===================== */}
        <section
          id="signals"
          className="scroll-mt-28 px-margin-mobile md:px-margin-desktop py-stack-lg"
        >
          <div className="max-w-container-max mx-auto space-y-stack-md">
            <SectionHead index="05" label="Signals" accent="teal" />
            <div className="grid md:grid-cols-3 gap-gutter">
              <div className={`panel p-6 lift-hover reveal-element border-t-2 ${accentBorder[publication.accent]}`}>
                <p className="section-kicker text-violet">Publication</p>
                <h3 className="mt-3 font-display text-lg text-text">{publication.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                  {publication.authors} · {publication.status}
                </p>
                <p className="mt-3 text-sm text-text-dim leading-relaxed">{publication.text}</p>
              </div>
              <div className={`panel p-6 lift-hover reveal-element border-t-2 ${accentBorder[awards[0].accent]}`} style={{ transitionDelay: "70ms" }}>
                <p className="section-kicker text-ember">Award</p>
                <h3 className="mt-3 font-display text-lg text-text">{awards[0].title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                  {awards[0].category}
                </p>
                <p className="mt-3 text-sm text-text-dim leading-relaxed">{awards[0].text}</p>
              </div>
              <div className="panel p-6 lift-hover reveal-element space-y-4" style={{ transitionDelay: "140ms" }}>
                <p className="section-kicker text-teal">Certifications</p>
                {certifications.map((c) => (
                  <div key={c.title}>
                    <h3 className="font-display text-base text-text">{c.title}</h3>
                    <p className="mt-1 text-sm text-text-dim leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section
          id="contact"
          className="scroll-mt-28 px-margin-mobile md:px-margin-desktop py-stack-lg"
        >
          <div className="max-w-container-max mx-auto">
            <SectionHead index="06" label="Contact" accent="ember" />
            <div className="mt-stack-md panel-strong p-8 md:p-12 reveal-element text-center max-w-3xl mx-auto">
              <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-ember">
                het@latent-space:~$ ./say-hello.sh
              </p>
              <h2 className="mt-5 font-display text-headline-lg-mobile md:text-4xl text-text">
                Let&apos;s build something measurable.
              </h2>
              <p className="mt-4 section-copy max-w-xl mx-auto">
                I&apos;m open to software, ML engineering, and research-oriented roles. Have a
                team, role, or problem in mind? The fastest path to me is below.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a className="btn-ember" href={profile.links.email}>
                  Say hello ↗
                </a>
                <Link className="btn-ghost" to="/contact">
                  Open contact form
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
