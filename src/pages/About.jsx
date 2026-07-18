import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { education, experiences, skillCategories, skills } from "../constants";
import { highlights, profile } from "../data/portfolio.js";

import "react-vertical-timeline-component/style.min.css";

const CalendarIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-6 w-6 fill-none stroke-current"
    strokeWidth="1.8"
  >
    <path d="M7 2.75v3M17 2.75v3M3.75 9h16.5M5.75 4.75h12.5a2 2 0 0 1 2 2v11.5a2 2 0 0 1-2 2H5.75a2 2 0 0 1-2-2V6.75a2 2 0 0 1 2-2Z" />
    <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" strokeLinecap="round" />
  </svg>
);

const CategoryIcon = ({ title }) => {
  const commonProps = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-6 w-6 fill-none stroke-current",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (title === "Languages") {
    return (
      <svg {...commonProps}>
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14.5 4 9.5 20" />
      </svg>
    );
  }

  if (title === "Embedded & IoT") {
    return (
      <svg {...commonProps}>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M10 2.8v3M14 2.8v3M10 18.2v3M14 18.2v3M2.8 10h3M2.8 14h3M18.2 10h3M18.2 14h3" />
      </svg>
    );
  }

  if (title === "ML & GenAI") {
    return (
      <svg {...commonProps}>
        <path d="m12 3 1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2-4.2-1.3 4.2-1.3L12 3ZM18.5 14l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3ZM5 14.5l.6 1.9 1.9.6-1.9.6L5 19.5l-.6-1.9-1.9-.6 1.9-.6.6-1.9Z" />
      </svg>
    );
  }

  if (title === "Cloud & Backend") {
    return (
      <svg {...commonProps}>
        <path d="M6.5 18.5h11a4 4 0 0 0 .4-8 6 6 0 0 0-11.5-1.1 4.6 4.6 0 0 0 .1 9.1Z" />
      </svg>
    );
  }

  if (title === "CS Fundamentals") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="5" cy="6" r="1.5" />
        <circle cx="19" cy="6" r="1.5" />
        <circle cx="5" cy="18" r="1.5" />
        <circle cx="19" cy="18" r="1.5" />
        <path d="m7 7.5 3 2.8M17 7.5l-3 2.8M7 16.5l3-2.8M17 16.5l-3-2.8" />
      </svg>
    );
  }

  if (title === "Frontend") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8.5 20h7M12 16v4" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M14.2 6.1a4.5 4.5 0 0 0-5.7 5.7L3.7 16.6a2.6 2.6 0 1 0 3.7 3.7l4.8-4.8a4.5 4.5 0 0 0 5.7-5.7l-2.8 2.8-3.7-3.7 2.8-2.8Z" />
    </svg>
  );
};

const SectionHeading = ({ children }) => (
  <div className="editorial-heading shrink-0">
    <h2 className="subhead-text reveal text-slate-950">{children}</h2>
    <span aria-hidden="true" className="mt-3 block h-0.5 w-11 bg-blue-600" />
  </div>
);

export const About = () => {
  return (
    <section className="about-page max-container">
      <header id="about-overview" className="site-anchor about-hero relative isolate grid min-h-[290px] items-center gap-10 overflow-hidden pb-12 pt-4 sm:min-h-[330px] sm:pb-16 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
        <div className="relative z-10 max-w-3xl">
          <h1 className="head-text reveal text-slate-950">
            Hello, I&apos;m{" "}
            <span className="blue-gradient_text font-semibold drop-shadow">Het</span>
            <span className="ml-2 inline-block origin-bottom animate-wiggle">👋</span>
          </h1>

          <div className="mt-6 flex flex-col gap-5 text-[0.98rem] leading-7 text-slate-600 reveal sm:text-base sm:leading-8">
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="about-geometry pointer-events-none absolute inset-y-3 right-0 hidden w-[43%] lg:block">
          <div className="absolute right-[8%] top-[18%] h-40 w-52 -skew-y-12 border border-blue-300/70 bg-gradient-to-br from-white/10 to-blue-100/40 shadow-[0_28px_50px_-38px_rgba(37,99,235,0.55)]" />
          <div className="absolute right-[29%] top-[28%] h-36 w-48 -skew-y-12 border border-blue-400/60 bg-white/20" />
          <div className="absolute right-[3%] top-[8%] h-36 w-44 -skew-y-12 border border-slate-300/70 bg-gradient-to-b from-blue-500/65 to-blue-100/20 shadow-[0_30px_60px_-35px_rgba(37,99,235,0.8)]" />
          <div className="absolute bottom-[14%] right-[1%] h-24 w-32 bg-[radial-gradient(circle,#2583f7_1.5px,transparent_1.5px)] bg-[length:13px_13px] opacity-75" />
          <div className="absolute bottom-[11%] right-[22%] h-14 w-32 -skew-y-12 bg-emerald-200/55" />
        </div>
      </header>

      <section
        id="highlights"
        aria-labelledby="highlights-title"
        className="site-anchor editorial-section border-t border-slate-300/80 py-8 sm:py-10"
      >
        <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
          <div id="highlights-title">
            <SectionHeading>Focus &amp; Highlights</SectionHeading>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Current focus
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.focus.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-sm text-slate-700 shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-slate-600">{profile.opportunities}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Highlights
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="education" aria-labelledby="education-title" className="site-anchor editorial-section border-y border-slate-300/80 py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
          <div id="education-title">
            <SectionHeading>Education</SectionHeading>
          </div>

          <div className="about-education-grid grid gap-8 md:grid-cols-2 md:gap-0">
            {education.map((item, index) => (
              <article
                key={item.school}
                id={`education-${item.slug}`}
                className={`reveal relative grid grid-cols-[34px_minmax(0,1fr)] gap-4 ${index > 0 ? "border-t border-slate-200 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0" : "md:pr-12"}`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span className="mt-0.5 text-blue-600">
                  <CalendarIcon />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 sm:text-sm">
                    {item.date}
                  </p>
                  <h3 className="mt-3 font-poppins text-lg font-semibold leading-snug text-slate-950 sm:text-xl">
                    {item.school}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-700">{item.degree}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" aria-labelledby="experience-title" className="site-anchor editorial-section border-b border-slate-300/80 py-10 sm:py-14">
        <div id="experience-title">
          <SectionHeading>Experience</SectionHeading>
        </div>

        <p className="reveal mt-7 max-w-3xl leading-relaxed text-slate-600">
          Here&apos;s where I&apos;ve been lately — research and teaching at
          Illinois Tech, with engineering roles before and alongside grad
          school.
        </p>

        <div className="mt-8 sm:mt-10">
          <VerticalTimeline lineColor="#bfdbfe">
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={`${experience.company_name}-${experience.title}`}
                className="reveal"
                date={experience.date}
                dateClassName="font-semibold text-slate-500"
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className="flex h-full w-full items-center justify-center">
                    <img
                      src={experience.icon}
                      alt=""
                      className="h-[60%] w-[60%] object-contain"
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: `4px solid ${experience.iconBg}`,
                  borderRadius: "0.75rem",
                  boxShadow: "0 18px 45px -32px rgba(15, 23, 42, 0.45)",
                }}
                contentArrowStyle={{ borderRightColor: "#ffffff" }}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <article
                  id={`experience-${experience.slug}`}
                  className="site-anchor"
                  aria-label={`${experience.title} at ${experience.company_name}`}
                >
                  <h3 className="break-words font-poppins text-xl font-semibold leading-snug text-slate-950">
                    {experience.title}
                  </h3>
                  <p className="mt-1 font-medium text-slate-600">
                    {experience.company_name}
                  </p>

                  <ul className="my-5 ml-5 list-disc space-y-2 text-sm leading-6 text-slate-600 sm:text-[0.95rem] sm:leading-7">
                    {experience.points.map((point, pointIndex) => (
                      <li key={`experience-point-${pointIndex}`} className="pl-1">
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </section>

      <section id="selected-stack" aria-labelledby="stack-title" className="site-anchor about-stack py-10 sm:py-14">
        <div id="stack-title">
          <SectionHeading>Selected Stack</SectionHeading>
        </div>

        <ul className="about-stack-rail mt-9 grid grid-cols-2 gap-y-9 sm:grid-cols-4 lg:mt-12 lg:grid-cols-8">
          {skills.map((skill, index) => (
            <li
              key={skill.name}
              className="reveal group flex min-w-0 flex-col items-center text-center"
              style={{ transitionDelay: `${index * 55}ms` }}
            >
              <div className="flex h-16 items-center justify-center sm:h-20">
                <img
                  src={skill.imageUrl}
                  alt=""
                  className="h-11 w-11 object-contain transition-transform duration-300 group-hover:-translate-y-1 sm:h-12 sm:w-12"
                />
              </div>
              <div className="relative mt-2 w-full border-t border-blue-200 pt-5">
                <span aria-hidden="true" className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                <p className="break-words font-poppins text-sm font-semibold text-slate-900">
                  {skill.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{skill.type}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="skills" aria-labelledby="skills-title" className="site-anchor editorial-section border-t border-slate-300/80 py-10 sm:py-14">
        <div id="skills-title">
          <SectionHeading>Core Skills</SectionHeading>
        </div>

        <ul className="about-skill-list mt-8 divide-y divide-slate-200 sm:mt-10">
          {skillCategories.map((category, index) => (
            <li
              key={category.title}
              id={`skills-${category.slug}`}
              className="reveal grid gap-5 py-7 first:pt-2 sm:grid-cols-[64px_minmax(160px,220px)_minmax(0,1fr)] sm:items-center sm:gap-6 sm:py-8"
              style={{ transitionDelay: `${index * 65}ms` }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-[0_10px_28px_-18px_rgba(37,99,235,0.7)]">
                <CategoryIcon title={category.title} />
              </span>
              <h3 className="font-poppins text-lg font-semibold text-slate-950">
                {category.title}
              </h3>
              <div className="relative flex flex-wrap gap-2 sm:border-l sm:border-blue-200 sm:pl-8">
                <span aria-hidden="true" className="absolute -left-[3px] top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-600 sm:block" />
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-8 items-center rounded-md border border-slate-200 bg-white/75 px-3 py-1 text-sm text-slate-700 shadow-[0_6px_20px_-18px_rgba(15,23,42,0.6)] transition-colors duration-200 hover:border-blue-300 hover:text-blue-700"
                  >
                    <span aria-hidden="true" className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {item}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="about-cta border-t border-slate-300/80">
        <CTA />
      </div>
    </section>
  );
};
