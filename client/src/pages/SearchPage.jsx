import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { searchSite } from "../api.js";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const term = params.get("q") || "";
    setQ(term);
    if (!term) {
      setResults([]);
      return;
    }
    searchSite(term)
      .then((data) => {
        setResults(data.results || []);
        setError("");
      })
      .catch((err) => setError(err.message));
  }, [params]);

  function submit(e) {
    e.preventDefault();
    setParams(q.trim() ? { q: q.trim() } : {});
  }

  return (
    <>
      <Seo path="/search" />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />
      <header className="page-head">
        <h1>Search</h1>
        <p>Look through pages, skills, and projects.</p>
      </header>
      <form className="glass card form" style={{ marginTop: 20 }} onSubmit={submit} role="search">
        <label>
          Query
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search query" />
        </label>
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      {error && <p className="alert err">{error}</p>}
      <div className="timeline" style={{ marginTop: 20 }}>
        {results.map((item, i) => (
          <Link className="glass card" key={`${item.path}-${i}`} to={item.path}>
            <p className="kicker">{item.type}</p>
            <h2>{item.title}</h2>
            <p className="meta">{item.path}</p>
          </Link>
        ))}
        {params.get("q") && !results.length && !error && <p>No matches for that query.</p>}
      </div>
    </>
  );
}
