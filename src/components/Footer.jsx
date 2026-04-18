import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className='footer font-poppins'>
      <hr className='border-slate-200' />

      <div className='footer-container'>
        <p>
          © 2026 <strong>Het Patel</strong>. All rights reserved.
        </p>

        <div className='flex items-center justify-center gap-3'>
          {socialLinks.map((link) =>
            link.link.startsWith("http") ? (
              <a
                key={link.name}
                href={link.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src={link.iconUrl}
                  alt={link.name}
                  className='h-6 w-6 object-contain'
                />
              </a>
            ) : (
              <Link key={link.name} to={link.link}>
                <img
                  src={link.iconUrl}
                  alt={link.name}
                  className='h-6 w-6 object-contain'
                />
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
