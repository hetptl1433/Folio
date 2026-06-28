import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { profile } from "../constants";

const homeLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const pageLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const linkClass =
  "font-mono text-[12px] uppercase tracking-[0.16em] text-text-dim hover:text-text transition-colors px-3 py-2";

export const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-void/80 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-container-max mx-auto">
        <Link to="/" className="group inline-flex items-baseline gap-2" aria-label="Home">
          <span className="font-mono text-[13px] tracking-[0.04em] text-text-faint group-hover:text-ember transition-colors">
            ~/
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-text">
            het<span className="text-ember">.</span>patel
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {isHome
            ? homeLinks.map((link) => (
                <a key={link.href} className={linkClass} href={link.href}>
                  {link.label}
                </a>
              ))
            : pageLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? "text-ember" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
          <a className="btn-ember ml-3 !px-5 !py-2 !text-[11px]" download href={profile.resume}>
            Résumé
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-text font-mono text-sm border border-hairline rounded-lg px-3 py-1.5"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? "[ close ]" : "[ menu ]"}
        </button>
      </div>

      {isOpen ? (
        <div className="md:hidden px-margin-mobile pb-4">
          <div className="panel-strong rounded-xl p-3 flex flex-col gap-1">
            {(isHome ? homeLinks : pageLinks).map((link) =>
              isHome ? (
                <a
                  key={link.href}
                  className={linkClass}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? "text-ember" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
            <a
              className="btn-ember mt-2 !text-[11px]"
              download
              href={profile.resume}
              onClick={() => setIsOpen(false)}
            >
              Résumé.pdf
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
