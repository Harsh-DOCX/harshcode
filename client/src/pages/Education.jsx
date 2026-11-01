import Seo from "../components/Seo.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import { Link } from "react-router-dom";

export default function Education() {
  const { data } = usePortfolio();
  const p = data.profile;
  return (
    <>
      <Seo path="/education" />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Education" }]} />
      <header className="page-head">
        <h1>Education</h1>
        <p>
          {p.degree}, {p.academicYear}. {p.graduated ? "Graduated." : "Currently enrolled, not yet graduated."} CGPA{" "}
          {p.cgpa}.
        </p>
      </header>
      <div className="timeline" style={{ marginTop: 20 }}>
        {data.education.map((item) => (
          <article className="glass card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.institution}</p>
            <p className="meta">
              {item.year} · {item.result}
            </p>
            <p>{item.status}</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: 20 }}>
        Professional work sits on <Link to="/experience">experience</Link>.
      </p>
    </>
  );
}
