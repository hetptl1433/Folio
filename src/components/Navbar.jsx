import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { BrandMark } from "./BrandMark";
import { resumeDetails } from "../data/portfolio.js";

const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/70 shadow-[0_8px_30px_-16px_rgba(0,114,255,0.45)] rounded-b-2xl py-3"
          : "py-4"
      }`}
    >
      <NavLink
        to="/"
        className="brand-link magnetic animate-pop"
        aria-label="Het Patel — Home"
        data-burst
      >
        <BrandMark variant="navbar" />
      </NavLink>

      <nav
        aria-label="Primary navigation"
        className="flex items-center gap-2 text-sm font-medium font-poppins min-[380px]:gap-3 min-[380px]:text-base sm:gap-6 md:gap-8 md:text-lg"
      >
        {links.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link animate-fade-up transition-colors duration-200 ${
                isActive ? "active text-blue-500" : "text-black hover:text-blue-500"
              }`
            }
            style={{ animationDelay: `${120 + i * 80}ms` }}
          >
            {link.label}
          </NavLink>
        ))}
        <a
          href={resumeDetails.href}
          download={resumeDetails.fileName}
          aria-label="Download Het Patel's resume as a PDF"
          className="resume-download group"
          style={{ animationDelay: `${120 + links.length * 80}ms` }}
          data-burst
        >
          <span className="resume-download__glow" aria-hidden="true" />
          <svg
            className="resume-download__icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M7 3.75h6.8L18 7.95V20.25H7V3.75Z" />
            <path d="M13.5 3.75V8.2H18" />
            <path className="resume-download__arrow" d="M12.5 10.25v5.25m0 0-2.1-2.1m2.1 2.1 2.1-2.1" />
          </svg>
          <span className="resume-download__label">Resume</span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
