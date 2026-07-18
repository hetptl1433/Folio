import { useCallback, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { About, Projects, Contact, Home } from "./pages";
import { Navbar, Footer, Fx } from "./components";
import { BirdChat } from "./components/BirdChat";

const ScrollToLocation = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      let targetId = "";
      if (hash) {
        try {
          targetId = decodeURIComponent(hash.slice(1));
        } catch {
          targetId = hash.slice(1);
        }
      }
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, key, pathname]);
  return null;
};

const SiteBackdrop = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div
      className={`aurora ${isHome ? "aurora--home" : "aurora--editorial"}`}
      aria-hidden="true"
    >
      <span className="aurora__blob aurora__blob--1" />
      <span className="aurora__blob aurora__blob--2" />
      <span className="aurora__blob aurora__blob--3" />
      <span className="aurora__blob aurora__blob--4" />
      <span className="aurora__grid" />
    </div>
  );
};

const SiteContent = () => {
  const { pathname } = useLocation();
  const [chatOpen, setChatOpen] = useState(false);
  const [focusChat, setFocusChat] = useState(true);
  const [birdPlaying, setBirdPlaying] = useState(false);
  const nonHomeLauncherRef = useRef(null);
  const isHome = pathname === "/";

  const openBirdChat = useCallback(({ autoFocus = true } = {}) => {
    setFocusChat(autoFocus);
    setChatOpen(true);
  }, []);

  const playWithBird = useCallback(() => {
    setBirdPlaying(true);
  }, []);

  const finishPlayingWithBird = useCallback(() => {
    setBirdPlaying(false);
  }, []);

  const closeBirdChat = useCallback(() => {
    setChatOpen(false);
    setBirdPlaying(false);
    window.requestAnimationFrame(() => {
      const launcher = isHome
        ? document.getElementById("sushi-home-launcher")
        : nonHomeLauncherRef.current;
      launcher?.focus();
    });
  }, [isHome]);

  return (
    <main className="relative">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              chatOpen={chatOpen}
              birdPlaying={birdPlaying}
              onOpenBirdChat={openBirdChat}
              onPlayBird={playWithBird}
              onBirdPlayComplete={finishPlayingWithBird}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isHome ? <Footer /> : null}

      <div className={isHome ? "pointer-events-none fixed inset-0 z-30" : undefined}>
        <div
          className={
            isHome
              ? "pointer-events-auto sm:absolute sm:right-4 sm:top-[43%] sm:-translate-y-1/2 lg:right-8"
              : undefined
          }
        >
          <BirdChat
            open={chatOpen}
            onClose={closeBirdChat}
            onPlayBird={isHome ? playWithBird : undefined}
            variant={isHome ? "anchored" : "corner"}
            autoFocus={focusChat}
          />
        </div>
      </div>

      {!isHome && !chatOpen ? (
        <button
          ref={nonHomeLauncherRef}
          type="button"
          onClick={() => openBirdChat()}
          aria-label="Open Sushi chat"
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex min-h-11 items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-2 text-sm font-semibold text-blue-600 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:bottom-6 sm:right-6"
        >
          <span aria-hidden="true">🐦</span>
          <span>Ask Sushi</span>
        </button>
      ) : null}
    </main>
  );
};

export const App = () => {
  return (
    <Router>
      <SiteBackdrop />

      <Fx />
      <ScrollToLocation />

      <SiteContent />
    </Router>
  );
};
