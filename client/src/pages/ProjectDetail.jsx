import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data } = usePortfolio();
  const project = data.projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  return (
    <>
      <Seo
        path={`/projects/${project.slug}`}
        title={`${project.title} | Project by Harsh`}
        description={project.summary}
      />
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Projects", to: "/projects" }, { label: project.title }]}
      />
      <header className="page-head">
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
      </header>
      <article className="glass card" style={{ marginTop: 20 }}>
        <p className="kicker">{project.status}</p>
        <p>
          <strong>Stack:</strong> {project.stack}
        </p>
        <h2>Highlights</h2>
        <ul>
          {(project.highlights || []).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p>
          Related: <Link to="/skills">skills</Link> · <Link to="/contact">discuss this work</Link>
        </p>
      </article>
    </>
  );
}
