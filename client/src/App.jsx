import { lazy, Suspense, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { usePortfolio } from "./context/PortfolioContext.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Skills = lazy(() => import("./pages/Skills.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const Experience = lazy(() => import("./pages/Experience.jsx"));
const Education = lazy(() => import("./pages/Education.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const SearchPage = lazy(() => import("./pages/SearchPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));

function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="orb" />
    </div>
  );
}

export default function App() {
  const { loading, error, data } = usePortfolio();
  const location = useLocation();
  const isAdmin = location.pathname === "/hx-console";
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [cookies, setCookies] = useState(() => localStorage.getItem("cookie-choice"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShowTop(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdmin) {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/hx-console" element={<Admin />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <Header />
      <main id="content" className="layout">
        {loading && <Loader />}
        {error && !loading && <p className="alert err">{error}</p>}
        {!loading && data && (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/education" element={<Education />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        )}
      </main>
      <Footer />
      {showTop && (
        <button type="button" className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0 })}>
          ↑
        </button>
      )}
      <Link className="float-contact" to="/contact" aria-label="Open contact form">
        ✉
      </Link>
      {!cookies && (
        <div className="cookie-banner glass">
          <p>
            This site stores a theme preference and, if you accept, a cookie-choice flag used only for that setting.
            Campaign parameters in the URL are kept in session storage so contact messages can include UTM context.
          </p>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                localStorage.setItem("cookie-choice", "accept");
                setCookies("accept");
              }}
            >
              Accept
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                localStorage.setItem("cookie-choice", "reject");
                setCookies("reject");
              }}
            >
              Reject extras
            </button>
          </div>
        </div>
      )}
    </>
  );
}
