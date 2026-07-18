import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Fx = () => {
  const { pathname } = useLocation();

  // reveal + magnetic + tilt, re-armed per route
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const enablePlayfulMotion = pathname === "/";
    const cleanups = [];
    const timer = window.setTimeout(() => {
      const reveals = Array.from(document.querySelectorAll(".reveal"));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      if (reduce) reveals.forEach((el) => el.classList.add("in"));
      else reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());

      if (enablePlayfulMotion && fine && !reduce) document.querySelectorAll(".magnetic").forEach((el) => {
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${x * 0.3}px, ${y * 0.45}px)`;
        };
        const leave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });

      if (enablePlayfulMotion && fine && !reduce) {
        document.querySelectorAll(".tilt").forEach((el) => {
          const move = (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(900px) rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateY(-4px)`;
          };
          const leave = () => {
            el.style.transform = "";
          };
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          });
        });
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
};

export default Fx;
