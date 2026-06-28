import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { Footer, Navbar } from "./components";
import {
  About,
  Contact,
  Experience,
  Home,
  Projects,
  Skills,
} from "./pages";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <main className='page-shell'>
        <div className='grid-floor' aria-hidden='true' />
        <div className='noise-overlay' aria-hidden='true' />
        <Navbar />

        <div className='relative z-10'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/skills' element={<Skills />} />
            <Route path='/experience' element={<Experience />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>

          <Footer />
        </div>
      </main>
    </Router>
  );
};
