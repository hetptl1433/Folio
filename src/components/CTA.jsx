import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta cta-band relative isolate overflow-hidden rounded-[1.75rem] bg-[#061a42] px-5 py-8 text-white shadow-[0_26px_70px_-38px_rgba(7,47,121,0.85)] sm:rounded-[2rem] sm:px-9 sm:py-10 lg:px-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(14,165,233,0.12),transparent_35%,rgba(37,99,235,0.24))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent"
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1 max-md:text-center">
        <p className="cta-text !text-white">
          Have a project in mind? <br className="hidden sm:block" />
          Let’s build something together!
        </p>
      </div>

      <Link
        to="/contact"
        className="cta-link magnetic inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full border border-sky-300/40 bg-white px-6 py-3 font-poppins text-sm font-semibold text-[#071b42] shadow-[0_14px_34px_-18px_rgba(56,189,248,0.9)] transition hover:-translate-y-1 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40"
      >
        Contact
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5" />
        </svg>
      </Link>
    </section>
  );
};

export default CTA;
