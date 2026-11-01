import { useEffect } from "react";
import { jsonLd, pageMeta, SITE_URL } from "../seo.js";
import { usePortfolio } from "../context/PortfolioContext.jsx";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ path, title, description }) {
  const { data } = usePortfolio();
  const fallback = pageMeta[path] || pageMeta["/"];
  const pageTitle = title || fallback.title;
  const pageDescription = description || fallback.description;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const image = `${SITE_URL}/og-image.svg`;

  useEffect(() => {
    document.title = pageTitle;
    upsertMeta("name", "description", pageDescription);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", pageDescription);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", "Harsh, MERN stack developer, black silver and crimson portfolio cover");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", pageDescription);
    upsertMeta("name", "twitter:image", image);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    let script = document.getElementById("jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd(data));
  }, [pageTitle, pageDescription, canonical, image, data]);

  return null;
}
