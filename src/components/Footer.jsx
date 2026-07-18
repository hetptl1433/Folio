import { Link } from "react-router-dom";

import { socialLinks } from "../constants";
import { BrandMark } from "./BrandMark";

const Footer = () => {
  return (
    <footer className="footer footer-shell font-poppins">
      <div className="footer-container border-t border-slate-300/80 pt-6 sm:pt-7">
        <div className="flex flex-col items-center gap-2.5 sm:items-start">
          <Link
            to="/"
            className="footer-brand-link rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            aria-label="Het Patel — Home"
          >
            <BrandMark variant="footer" />
          </Link>
          <p className="text-sm text-slate-600">
            © 2026 Het Patel. All rights reserved.
          </p>
        </div>

        <nav className="flex items-center justify-center gap-1" aria-label="Social links">
          {socialLinks.map((link) => {
            const socialClassName =
              "footer-social-link magnetic grid h-11 w-11 place-items-center rounded-xl border border-transparent transition-colors hover:border-blue-200 hover:bg-white/75 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200";

            return link.link.startsWith("http") ? (
              <a
                key={link.name}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className={socialClassName}
                aria-label={`${link.name} (opens in a new tab)`}
              >
                <img src={link.iconUrl} alt="" className="h-[18px] w-[18px] object-contain" />
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.link}
                className={socialClassName}
                aria-label={link.name}
              >
                <img src={link.iconUrl} alt="" className="h-[18px] w-[18px] object-contain" />
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
