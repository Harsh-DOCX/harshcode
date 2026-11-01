import Seo from "../components/Seo.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import { Link } from "react-router-dom";

export default function Skills() {
  const { data } = usePortfolio();
  return (
    <>
      <Seo path="/skills" />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Skills" }]} />
      <header className="page-head">
        <h1>Skills and tools</h1>
        <p>Core stack, languages, computer science, and the editors I use daily.</p>
      </header>
      <div className="card-grid" style={{ marginTop: 20 }}>
        {data.skills.map((skill) => (
          <article className="glass card" key={skill.name}>
            <p className="kicker">{skill.category}</p>
            <h2>{skill.name}</h2>
            <div className="skill-bar" aria-hidden="true">
              <span style={{ width: `${skill.level}%` }} />
            </div>
            <p className="meta">{skill.level}% working fluency</p>
          </article>
        ))}
      </div>
      <h2 style={{ marginTop: 32 }}>Tools</h2>
      <div className="card-grid">
        {data.tools.map((tool) => (
          <article className="glass card" key={tool.name}>
            <h3>{tool.name}</h3>
            <p>{tool.note}</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: 20 }}>
        These skills show up in <Link to="/projects">shipped projects</Link>.
      </p>
    </>
  );
}
