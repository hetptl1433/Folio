import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { BrandMark } from "./BrandMark";

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

      <nav className="flex items-center gap-2 text-sm font-medium font-poppins min-[380px]:gap-3 min-[380px]:text-base sm:gap-8 sm:text-lg">
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
      </nav>
    </header>
  );
};

export default Navbar;
