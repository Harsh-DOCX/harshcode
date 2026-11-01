import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext.jsx";

export default function Footer() {
  const { data } = usePortfolio();
  const name = data?.profile?.name || "Harsh";
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <strong>{name}</strong>
        <p className="meta">MERN stack developer · India · Final-year BCA, expected 2027</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/education">Education</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/search">Search</Link>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/robots.txt">Robots</a>
          <a href="/llms.txt">LLMs</a>
        </div>
        <p className="meta">© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
