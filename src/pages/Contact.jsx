import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { Alert } from "../components";
import { contactHighlights, contactMethods, profile } from "../constants";
import { useAlert } from "../hooks/useAlert";

const inputClass =
  "mt-3 w-full rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-text font-body placeholder:text-text-faint focus:border-ember focus:outline-none transition-colors";

export const Contact = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Het Patel",
          from_email: form.email,
          to_email: "hetptl143324@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsLoading(false);
          showAlert("success", "Thank you. I will get back to you as soon as possible.");

          setTimeout(() => {
            hideAlert();
            setForm({ name: "", email: "", message: "" });
          }, 3000);
        },
        () => {
          setIsLoading(false);
          showAlert("danger", "Something went wrong. Please try again.");
        }
      );
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <section className="min-h-screen flex flex-col">
      {alert.show ? <Alert {...alert} /> : null}

      <main className="flex-grow pt-28 md:pt-32 pb-stack-lg px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <header className="max-w-3xl reveal-element is-revealed">
          <p className="section-kicker text-ember mb-5">het@latent-space:~$ ./contact.sh</p>
          <h1 className="font-display text-display leading-[0.95]">
            Get in <span className="text-ember-grad">touch</span>
          </h1>
          <p className="mt-6 section-copy">
            I&apos;m open to software engineering, ML engineering, and research-oriented
            roles. Whether you have a question or a project in mind, the channels below
            reach me directly.
          </p>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-gutter">
          <div className="space-y-6">
            <div className="panel p-7">
              <h2 className="font-display text-xl text-text mb-6">Direct Channels</h2>
              <div className="grid gap-3">
                {contactMethods.map((method) =>
                  method.href ? (
                    <a
                      key={method.label}
                      className="bg-surface-2 border border-hairline rounded-xl p-4 transition-colors hover:border-ember/40 block"
                      href={method.href}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                        {method.label}
                      </p>
                      <p className="text-text mt-1.5">{method.value}</p>
                    </a>
                  ) : (
                    <div
                      key={method.label}
                      className="bg-surface-2 border border-hairline rounded-xl p-4"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
                        {method.label}
                      </p>
                      <p className="text-text mt-1.5">{method.value}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
              {contactHighlights.map((item) => (
                <div key={item.title} className="panel p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet">
                    {item.title}
                  </p>
                  <p className="text-text-dim mt-3 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-strong p-7 md:p-9">
            <h2 className="font-display text-xl text-text mb-2">Send a Note</h2>
            <p className="text-text-dim text-sm">
              Goes straight to my inbox at {profile.email}.
            </p>

            <form ref={formRef} onSubmit={onSubmit} className="mt-8 flex flex-col gap-6">
              <label className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-dim">
                Name
                <input
                  className={inputClass}
                  name="name"
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  type="text"
                  value={form.name}
                />
              </label>

              <label className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-dim">
                Email
                <input
                  className={inputClass}
                  name="email"
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  type="email"
                  value={form.email}
                />
              </label>

              <label className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-dim">
                Message
                <textarea
                  className={`${inputClass} min-h-[180px] resize-none`}
                  name="message"
                  onChange={handleChange}
                  placeholder="Tell me about the role, team, or project."
                  required
                  rows={7}
                  value={form.message}
                />
              </label>

              <button
                className="btn-ember w-full sm:w-fit disabled:opacity-60"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Sending…" : "Send Message ↗"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </section>
  );
};
