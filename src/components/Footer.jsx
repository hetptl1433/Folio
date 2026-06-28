import { Link } from "react-router-dom";

import { profile } from "../constants";

const links = [
  { label: "GitHub", href: profile.links.github, external: true },
  { label: "LinkedIn", href: profile.links.linkedin, external: true },
  { label: "Email", href: profile.links.email, external: false },
  { label: "Résumé", href: profile.resume, external: false, download: true },
];

export const Footer = () => {
  return (
    <footer className="relative w-full border-t border-hairline bg-void/70 backdrop-blur-sm mt-stack-lg">
      <div className="px-margin-mobile md:px-margin-desktop py-10 w-full max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link to="/" className="font-display text-2xl font-semibold text-text">
              het<span className="text-ember">.</span>patel
            </Link>
            <p className="mt-2 font-mono text-[12px] text-text-dim">
              {profile.title} · {profile.location}
            </p>
            <p className="mt-1 font-mono text-[11px] text-text-faint">
              latent-space build · {profile.graduation} grad · {profile.email}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.label}
                className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-dim hover:text-ember transition-colors"
                href={l.href}
                download={l.download || undefined}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-hairline flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-mono text-[11px] text-text-faint">
            © 2026 Het Patel — rendered as a latent space.
          </p>
          <p className="font-mono text-[11px] text-text-faint">
            React · three.js · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
