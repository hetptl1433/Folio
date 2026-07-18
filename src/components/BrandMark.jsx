const variantsWithWordmark = new Set(["navbar", "footer"]);

export const BrandMark = ({ variant = "mark" }) => {
  const showWordmark = variantsWithWordmark.has(variant);

  return (
    <span className={`brand-lockup brand-lockup--${variant}`} aria-hidden="true">
      <span className="brand-mark">
        <svg
          viewBox="0 0 48 48"
          className="brand-mark__svg"
          focusable="false"
        >
          <path
            className="brand-mark__h"
            fill="currentColor"
            d="M7.75 5.5h5.5v15.25h9.25v7.5h-9.25V41.5H5.5V7.75A2.25 2.25 0 0 1 7.75 5.5Z"
          />
          <path
            className="brand-mark__flight"
            fillRule="evenodd"
            d="M21.5 5.5h11.4C40.4 5.5 45 9.6 45 16.2c0 5.5-3.1 9.4-8.6 11.25l-6.7 2.25v4.1c4.32.24 8.45-.9 12.42-3.42-2.34 5.18-6.28 8.82-12.42 10.5-2.82.77-5.55.75-8.2-.08V5.5Zm8.2 7.1v9.3l4.18-1.16c2.38-.66 3.63-2.08 3.63-4.08 0-2.67-1.72-4.06-4.82-4.06H29.7Z"
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
