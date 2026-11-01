import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { theme, toggle } = useTheme();
  const { data } = usePortfolio();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const name = data?.profile?.name || "Harsh";

  function submitSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="site-header">
      <div className="header-inner glass">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            H
          </span>
          {name}
        </Link>
        <nav className="nav-desk" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <form onSubmit={submitSearch} role="search">
            <input
              aria-label="Search the site"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{
                width: 120,
                borderRadius: 999,
                border: "1px solid var(--stroke)",
                background: "var(--glass)",
                color: "inherit",
                padding: "8px 12px",
                font: "inherit",
              }}
            />
          </form>
          <button type="button" className="icon-btn theme-toggle" onClick={toggle} aria-label="Toggle color theme">
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-drawer glass" aria-label="Mobile">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
