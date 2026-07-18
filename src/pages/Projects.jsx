import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import cryptexForecasting from "../assets/images/projects/cryptex-forecasting.webp";
import fraudDetection from "../assets/images/projects/fraud-detection.webp";
import realEstateMap from "../assets/images/projects/real-estate-map.webp";
import eMotelOperations from "../assets/images/projects/e-motel-operations.webp";

const projectImages = {
  CryptexLLM: {
    src: cryptexForecasting,
    alt: "CryptexLLM cryptocurrency forecasting dashboard preview",
  },
  "Credit Card Fraud Detection Using Transformer": {
    src: fraudDetection,
    alt: "Credit Card Fraud Detection transformer analysis preview",
  },
  "Real-Estate Management": {
    src: realEstateMap,
    alt: "Real-Estate Management interactive property map preview",
  },
  "E-Motel": {
    src: eMotelOperations,
    alt: "E-Motel operations and reservations dashboard preview",
  },
};

const ProjectRow = ({ project, position }) => {
  const projectNumber = String(position + 1).padStart(2, "0");
  const visualFirst = position % 2 === 0;
  const linkLabel = project.linkLabel || "View Project";
  const projectImage = projectImages[project.name];

  return (
    <li className="project-index-item">
      <article
        id={project.slug}
        className={`project-entry reveal grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-5 py-9 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-7 sm:py-12 lg:grid-cols-[4rem_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-x-10 lg:py-14 ${
          position === 0
            ? "project-entry--featured rounded-[1.75rem] border border-blue-100 bg-white/[0.65] px-4 shadow-[0_24px_70px_-52px_rgba(0,114,255,0.8)] sm:px-6 lg:px-8"
            : "project-entry--standard border-t border-slate-200/80"
        }`}
        style={{ transitionDelay: `${position * 90}ms` }}
      >
        <div className="project-number-rail row-span-2 flex h-full min-h-40 flex-col items-center lg:col-start-1 lg:row-start-1 lg:min-h-48">
          <span className="project-number font-poppins text-xl font-semibold tracking-tight text-blue-600 sm:text-2xl">
            {projectNumber}
          </span>
          <span
            className="project-rail-line relative mt-4 w-px flex-1 bg-blue-200 before:absolute before:left-1/2 before:top-0 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-blue-600"
            aria-hidden="true"
          />
        </div>

        <div
          className={`project-visual col-start-2 row-start-1 aspect-[3/2] overflow-hidden rounded-2xl border border-blue-100/80 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/70 p-2 shadow-[0_24px_50px_-36px_rgba(8,109,245,0.6)] lg:row-start-1 ${
            visualFirst ? "lg:col-start-2" : "lg:col-start-3"
          }`}
        >
          {projectImage ? (
            <picture className="block h-full w-full">
              <img
                src={projectImage.src}
                alt={projectImage.alt}
                width="960"
                height="640"
                loading={position === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full rounded-xl object-cover"
              />
            </picture>
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#086df5] via-[#2b8ef7] to-[#08bff6]"
            >
              <svg
                viewBox="0 0 96 64"
                className="h-3/5 w-auto text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M10 56h76" opacity="0.9" />
                <rect x="16" y="36" width="11" height="20" rx="2" fill="currentColor" stroke="none" opacity="0.55" />
                <rect x="34" y="28" width="11" height="28" rx="2" fill="currentColor" stroke="none" opacity="0.75" />
                <rect x="52" y="20" width="11" height="36" rx="2" fill="currentColor" stroke="none" opacity="0.9" />
                <rect x="70" y="12" width="11" height="44" rx="2" fill="currentColor" stroke="none" />
                <path d="M16 30c12-4 20-10 30-14 10-4 20-6 34-4" strokeDasharray="1 6" strokeWidth="3" />
              </svg>
            </div>
          )}
        </div>

        <div
          className={`project-copy col-start-2 row-start-2 flex min-w-0 flex-col justify-center lg:row-start-1 ${
            visualFirst ? "lg:col-start-3" : "lg:col-start-2"
          }`}
        >
          <h2 className="project-title break-words font-poppins text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl">
            {project.name}
          </h2>
          <p className="project-description mt-3 max-w-2xl text-[0.975rem] leading-7 text-slate-500 sm:text-base sm:leading-8">
            {project.description}
          </p>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link magnetic group mt-5 inline-flex min-h-11 w-fit items-center gap-2 border-b border-dashed border-blue-400 font-poppins font-semibold text-blue-600 transition-colors hover:border-blue-700 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
              aria-label={`${linkLabel}: ${project.name} (opens in a new tab)`}
              data-burst
            >
              {linkLabel}
              <img
                src={arrow}
                alt=""
                aria-hidden="true"
                className="project-link-arrow h-4 w-4 object-contain transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          ) : (
            <p className="project-availability mt-5 text-sm font-medium leading-6 text-slate-400">
              No public demo for this one — but I&apos;m happy to walk you through it.
            </p>
          )}
        </div>
      </article>
    </li>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="site-anchor project-page max-container">
      <header className="project-intro relative isolate grid min-h-[260px] items-center gap-10 overflow-hidden pb-10 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)] lg:pb-14">
        <div className="max-w-3xl">
          <h1 className="project-heading head-text reveal">
            Things I&apos;ve{" "}
            <span className="blue-gradient_text drop-shadow font-semibold">Built</span>
          </h1>

          <p className="project-intro-copy mt-4 max-w-3xl text-base leading-7 text-slate-500 reveal sm:text-lg sm:leading-8">
            Straight off my resume, plus one bonus — from sales forecasting and
            LLM experiments to fraud detection and apps people actually run
            their day on.
          </p>
        </div>

        <div className="project-hero-visual pointer-events-none relative hidden h-56 lg:block" aria-hidden="true">
          <span className="absolute right-[18%] top-[12%] h-40 w-48 rotate-6 rounded-[2rem] border border-blue-200/80 bg-white/30" />
          <span className="absolute right-[5%] top-[26%] h-36 w-44 -rotate-3 rounded-[1.75rem] border border-cyan-200/80 bg-cyan-100/25" />
          <span className="absolute right-[31%] top-[31%] h-32 w-40 -rotate-6 rounded-[1.6rem] border border-blue-300/70 bg-blue-100/30 shadow-[0_28px_60px_-38px_rgba(8,109,245,0.55)]" />
          <picture className="absolute right-[23%] top-[27%] block aspect-[3/2] w-48 rotate-2 overflow-hidden rounded-[1.5rem] border-4 border-white/90 bg-white shadow-[0_22px_48px_-30px_rgba(8,109,245,0.5)]">
            <img
              src={projectImages.CryptexLLM.src}
              alt=""
              width="960"
              height="640"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
          <span className="absolute bottom-[8%] right-[3%] h-20 w-28 bg-[radial-gradient(circle,#2583f7_1.4px,transparent_1.4px)] bg-[length:12px_12px] opacity-55" />
        </div>
      </header>

      <ol className="project-index my-10 list-none sm:my-16 sm:rounded-[2.25rem] sm:border sm:border-blue-100/80 sm:bg-white/25 sm:px-6 lg:px-8" aria-label="Projects">
        {projects.map((project, position) => (
          <ProjectRow key={project.name} project={project} position={position} />
        ))}
      </ol>

      <hr className="project-divider border-slate-200" />

      <CTA />
    </section>
  );
};
