import Seo from "../components/Seo.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import { Link } from "react-router-dom";

export default function Experience() {
  const { data } = usePortfolio();
  return (
    <>
      <Seo path="/experience" />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Experience" }]} />
      <header className="page-head">
        <h1>Experience</h1>
        <p>Internship and analyst work in web development and publishing.</p>
      </header>
      <div className="timeline" style={{ marginTop: 20 }}>
        {data.experience.map((job) => (
          <article className="glass card" key={`${job.company}-${job.role}`}>
            <h2>{job.role}</h2>
            <p className="kicker">{job.company}</p>
            <p className="meta">
              {job.start} — {job.end}
            </p>
            <p>{job.summary}</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: 20 }}>
        Academic context is on the <Link to="/education">education</Link> page.
      </p>
    </>
  );
}
