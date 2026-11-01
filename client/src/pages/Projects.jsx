import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";

export default function Projects() {
  const { data } = usePortfolio();
  return (
    <>
      <Seo path="/projects" />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Projects" }]} />
      <header className="page-head">
        <h1>Projects</h1>
        <p>Selected work across web, desktop, and current builds.</p>
      </header>
      <div className="card-grid" style={{ marginTop: 20 }}>
        {data.projects.map((project) => (
          <Link className="glass project-card" key={project.slug} to={`/projects/${project.slug}`}>
            <p className="kicker">{project.status}</p>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <p className="meta">{project.stack}</p>
          </Link>
        ))}
      </div>
      <h2 style={{ marginTop: 32 }}>Currently working on</h2>
      <div className="card-grid">
        {data.currentWork.map((item) => (
          <article className="glass card" key={item.slug}>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <p className="meta">{item.stack}</p>
          </article>
        ))}
      </div>
    </>
  );
}
