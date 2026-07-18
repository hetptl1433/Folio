import React, { useRef, useState, Suspense } from "react";
import emailjs from "@emailjs/browser";
import * as THREE from "three";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

import Fox from "../models/Fox";
import { Loader } from "../components/Loader";
import { ThreeCanvas } from "../components/ThreeCanvas";
import { useAlert } from "../hooks/useAlert";
import { Alert } from "../components/Alert";
import { contactDetails } from "../data/portfolio.js";

export const Contact = () => {
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const formref = useRef(null);
  const [isloading, setIsloading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onsubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Het Patel",
          from_email: form.email,
          to_email: contactDetails.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsloading(false);
          showAlert("success", "Got it — thanks for writing! I'll get back to you soon.");

          setTimeout(() => {
            hideAlert();
            setCurrentAnimation("idle");
            setForm({ name: "", email: "", message: "" });
          }, 3000);
        },
        (error) => {
          setIsloading(false);
          setCurrentAnimation("idle");
          console.log(error);
          showAlert("danger", "Ah, that didn't send. Mind trying again?");
        }
      );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlefocus = () => setCurrentAnimation("walk");
  const handleblur = () => setCurrentAnimation("idle");

  return (
    <section id="contact" className="site-anchor contact-page max-container relative !max-w-7xl">
      {alert.show && (
        <div className="contact-alert relative z-30" aria-live="assertive">
          <Alert {...alert} />
        </div>
      )}

      <div className="contact-layout grid items-center gap-8 lg:grid-cols-[minmax(260px,0.82fr)_minmax(0,2fr)] lg:gap-10 xl:gap-14">
        <header className="contact-intro reveal min-w-0 lg:pb-8">
          <h1 className="font-poppins text-[clamp(3.25rem,6vw,5.75rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-slate-950">
            Get in
            <span className="mt-3 block bg-gradient-to-r from-sky-400 to-blue-700 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <div id="contact-options" className="site-anchor mt-9 space-y-4 sm:mt-11">
            <div className="contact-phone flex items-center gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-blue-200 bg-white/80 text-blue-600 shadow-[0_10px_30px_-18px_rgba(37,99,235,0.8)]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.2 3.5 9.5 7a1.4 1.4 0 0 1-.2 1.7L7.7 10c1.1 2.6 3.2 4.7 5.8 5.8l1.3-1.6a1.4 1.4 0 0 1 1.7-.2l3.5 2.3a1.4 1.4 0 0 1 .6 1.5l-.5 2.3a1.4 1.4 0 0 1-1.4 1.1C10 21.2 2.8 14 2.8 5.3a1.4 1.4 0 0 1 1.1-1.4l2.3-.5a1.4 1.4 0 0 1 1 .1Z"
                  />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Call directly
                </p>
                <a
                  href={contactDetails.phoneHref}
                  aria-label={`Call Het at ${contactDetails.phoneDisplay}`}
                  className="mt-1 inline-flex min-h-11 items-center font-poppins text-lg font-semibold text-blue-600 transition-colors hover:text-blue-800 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:text-xl"
                >
                  {contactDetails.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-blue-200 bg-white/80 text-blue-600 shadow-[0_10px_30px_-18px_rgba(37,99,235,0.8)]"
                aria-hidden="true"
              >
                ✉
              </span>
              <div className="min-w-0">
                <p className="font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Email
                </p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="mt-1 inline-flex min-h-11 max-w-full items-center break-all font-poppins text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:text-base"
                >
                  {contactDetails.email}
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="contact-studio reveal overflow-hidden rounded-[1.75rem] border border-blue-200/80 bg-white/70 shadow-[0_30px_90px_-45px_rgba(15,82,186,0.42)] backdrop-blur-sm sm:rounded-[2.25rem]">
          <div className="grid min-w-0 md:grid-cols-[minmax(0,0.92fr)_minmax(300px,1.08fr)]">
            <div className="contact-form-panel order-last min-w-0 p-5 sm:p-8 md:order-none md:border-r md:border-blue-100 lg:p-9 xl:p-10">
              <form
                id="contact-form"
                className="flex w-full flex-col gap-5"
                ref={formref}
                onSubmit={onsubmit}
                aria-busy={isloading}
              >
                <div>
                  <label htmlFor="contact-name" className="font-poppins text-sm font-semibold text-slate-900">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="input !mt-2 !rounded-xl !border-slate-200 !bg-white/90 !px-4 !py-3.5 !shadow-[0_8px_24px_-20px_rgba(15,23,42,0.6)]"
                    placeholder="Your Name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={handlefocus}
                    onBlur={handleblur}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-poppins text-sm font-semibold text-slate-900">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="input !mt-2 !rounded-xl !border-slate-200 !bg-white/90 !px-4 !py-3.5 !shadow-[0_8px_24px_-20px_rgba(15,23,42,0.6)]"
                    placeholder="Your Email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={handlefocus}
                    onBlur={handleblur}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="font-poppins text-sm font-semibold text-slate-900">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="input !mt-2 min-h-32 resize-y !rounded-xl !border-slate-200 !bg-white/90 !px-4 !py-3.5 !shadow-[0_8px_24px_-20px_rgba(15,23,42,0.6)]"
                    placeholder="Your Message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    onFocus={handlefocus}
                    onBlur={handleblur}
                  />
                </div>
                <button
                  type="submit"
                  className="contact-submit btn magnetic shine mt-1 min-h-12 !w-full !rounded-xl !bg-gradient-to-br !from-sky-400 !via-blue-600 !to-blue-800 !px-6 font-poppins text-base font-semibold shadow-[0_16px_30px_-16px_rgba(37,99,235,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isloading}
                  data-burst
                >
                  {isloading ? "Sending…" : "Send Message"}
                </button>
                <p className="sr-only" role="status" aria-live="polite">
                  {isloading ? "Sending your message." : alert.show ? alert.text : ""}
                </p>
              </form>
            </div>

            <div className="contact-fox-stage order-first relative min-h-[320px] overflow-hidden border-b border-blue-100 bg-[linear-gradient(145deg,rgba(239,246,255,0.96),rgba(219,234,254,0.82)_52%,rgba(255,255,255,0.94))] sm:min-h-[400px] md:order-none md:min-h-full md:border-b-0 md:border-t-0">
              <div className="pointer-events-none absolute inset-5 rounded-[2.2rem] border border-white/90 shadow-[inset_0_0_0_1px_rgba(96,165,250,0.2),inset_0_0_55px_rgba(59,130,246,0.11)] sm:inset-7 sm:rounded-[2.75rem]" />
              <div
                className="pointer-events-none absolute inset-x-12 bottom-7 h-12 rounded-[50%] border border-blue-200 bg-white/55 shadow-[0_16px_35px_-20px_rgba(37,99,235,0.9),inset_0_-5px_12px_rgba(96,165,250,0.15)] sm:inset-x-16 sm:bottom-9"
                aria-hidden="true"
              />
              <div className="absolute inset-0">
                <ThreeCanvas
                  shadows
                  fallbackIcon="🦊"
                  fallbackTitle="3D fox unavailable"
                  dpr={[1, 2]}
                  camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
                  gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.12 }}
                >
                  <ambientLight intensity={0.35} />
                  <directionalLight
                    position={[3, 5, 4]}
                    intensity={2.4}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    shadow-bias={-0.0004}
                  >
                    <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 20]} />
                  </directionalLight>
                  <directionalLight position={[-4, 2, -3]} intensity={1.1} color="#bcd8ff" />
                  <pointLight position={[2, -1, 3]} intensity={0.5} color="#ffd9a8" />

                  <Suspense fallback={<Loader />}>
                    <Fox
                      position={[0.5, 0.35, 0]}
                      currentAnimation={currentAnimation}
                      rotation={[12.6, -0.6, 0]}
                      scale={[0.5, 0.5, 0.5]}
                    />
                    <ContactShadows
                      position={[0.4, -1.05, 0]}
                      scale={7}
                      blur={2.6}
                      far={3}
                      opacity={0.55}
                      color="#1d3a6b"
                    />
                    <Environment resolution={256}>
                      <group rotation={[-Math.PI / 3, 0, 0]}>
                        <Lightformer intensity={2} position={[0, 5, -2]} scale={[10, 5, 1]} color="#ffffff" />
                        <Lightformer intensity={1.3} position={[-5, 1, 1]} scale={[6, 6, 1]} color="#bcd8ff" />
                        <Lightformer intensity={1} position={[5, -1, 1]} scale={[6, 6, 1]} color="#ffd9a8" />
                      </group>
                    </Environment>
                  </Suspense>
                </ThreeCanvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
