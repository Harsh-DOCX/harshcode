import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";

export default function Home() {
  const { data } = usePortfolio();
  const p = data.profile;
  return (
    <>
      <Seo path="/" />
      <section className="hero">
        <div className="glass card">
          <p className="kicker">{p.location} · {p.academicYear}</p>
          <h1 className="display">{p.name}</h1>
          <p className="lede">{p.headline}. {p.summary}</p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/projects">
              View projects
            </Link>
            <Link className="btn" to="/contact">
              Open contact
            </Link>
          </div>
        </div>
        <aside className="glass card">
          <img
            src="/og-image.svg"
            width="640"
            height="336"
            alt="Cover graphic for Harsh, MERN stack developer, in black, silver, and crimson"
          />
          <p className="meta" style={{ marginTop: 16 }}>
            CGPA {p.cgpa} · {p.degree} · Graduate {p.graduationYear} · Age {p.age}
          </p>
        </aside>
      </section>
      <section style={{ marginTop: 28 }} className="stat-grid">
        <Link className="glass card" to="/skills">
          <h2>Skills</h2>
          <p>MERN stack, languages, DSA, and Git.</p>
        </Link>
        <Link className="glass card" to="/experience">
          <h2>Experience</h2>
          <p>GigaNodes and Outlook Publications India.</p>
        </Link>
        <Link className="glass card" to="/education">
          <h2>Education</h2>
          <p>Class 10, Class 12, and BCA through 2027.</p>
        </Link>
      </section>
    </>
  );
}
