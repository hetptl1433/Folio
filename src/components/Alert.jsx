export const Alert = ({ type, text }) => {
  const isDanger = type === "danger";

  return (
    <div className='pointer-events-none fixed inset-x-0 top-24 z-50 flex justify-center px-4'>
      <div
        className='pointer-events-auto inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-medium shadow-[0_24px_70px_rgba(2,8,23,0.45)]'
        style={{
          borderColor: isDanger
            ? "rgba(248,113,113,0.28)"
            : "rgba(93,230,255,0.28)",
          background: isDanger
            ? "rgba(127,29,29,0.9)"
            : "rgba(8,17,33,0.92)",
          color: "var(--text)",
        }}
        role='alert'
      >
        <span
          className='rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em]'
          style={{
            background: isDanger
              ? "rgba(248,113,113,0.18)"
              : "rgba(93,230,255,0.14)",
            color: isDanger ? "#fecaca" : "var(--secondary)",
          }}
        >
          {isDanger ? "Error" : "Success"}
        </span>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Alert;
