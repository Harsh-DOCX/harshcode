import Seo from "../components/Seo.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CopyButton from "../components/CopyButton.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import { Link } from "react-router-dom";

export default function About() {
  const { data } = usePortfolio();
  const p = data.profile;
  return (
    <>
      <Seo path="/about" />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <header className="page-head">
        <h1>About {p.name}</h1>
        <p className="lede">{p.summary}</p>
      </header>
      <div className="card-grid" style={{ marginTop: 20 }}>
        <article className="glass card">
          <h2>Academic standing</h2>
          <p>
            {p.degree}, {p.academicYear}. {p.graduated ? "Graduated." : "Not yet graduated."} Current CGPA {p.cgpa}.
            Expected completion {p.graduationYear}.
          </p>
          <p>
            Age {p.age}. Based in {p.location}.
          </p>
          <p>
            Email {p.email} <CopyButton text={p.email} />
          </p>
        </article>
        <article className="glass card">
          <h2>How I work</h2>
          <ul>
            {(p.traits || []).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p>
            See <Link to="/skills">skills</Link>, <Link to="/projects">projects</Link>, and{" "}
            <Link to="/experience">experience</Link>.
          </p>
        </article>
      </div>
    </>
  );
}
