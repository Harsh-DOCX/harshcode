import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <>
      <Seo
        path="/404"
        title="Page not found | Harsh"
        description="The requested page is not on Harsh’s portfolio. Return home or browse projects."
      />
      <header className="page-head">
        <h1>This page is missing</h1>
        <p>The address is not part of this site. Use the links below to continue.</p>
      </header>
      <div className="btn-row">
        <Link className="btn btn-primary" to="/">
          Home
        </Link>
        <Link className="btn" to="/projects">
          Projects
        </Link>
        <Link className="btn" to="/contact">
          Contact
        </Link>
      </div>
    </>
  );
}
