const variantsWithWordmark = new Set(["navbar", "footer"]);

export const BrandMark = ({ variant = "mark" }) => {
  const showWordmark = variantsWithWordmark.has(variant);

  return (
    <span className={`brand-lockup brand-lockup--${variant}`} aria-hidden="true">
      <span className="brand-mark">
        <svg
          viewBox="0 0 64 64"
          className="brand-mark__svg"
          focusable="false"
        >
          <path
            className="brand-mark__h"
            fill="currentColor"
            d="M6 6h11v20h16v12H17v20H6V6Z"
          />
          <path
            className="brand-mark__flight"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31 6h15.25C56.65 6 63 12.22 63 22s-6.35 16-16.75 16H42v20H31V34.5l4.75-4.75L31 26V6Zm11 10v12h4.25C50.08 28 52 25.98 52 22s-1.92-6-5.75-6H42Z"
          />
        </svg>
      </span>

      {showWordmark ? (
        <span className="brand-wordmark">
          Het <span className="brand-wordmark__surname">Patel</span>
        </span>
      ) : null}
    </span>
  );
};

export default BrandMark;
