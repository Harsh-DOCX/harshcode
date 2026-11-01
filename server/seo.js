const { getPortfolio } = require("./store");

function siteUrl() {
  return (process.env.SITE_URL || "https://www.harshog.dev").replace(/\/$/, "");
}

async function sitemapXml() {
  const data = await getPortfolio();
  const origin = siteUrl();
  const paths = ["/", "/about", "/skills", "/projects", "/experience", "/education", "/contact", "/search"];
  (data.projects || []).forEach((p) => paths.push(`/projects/${p.slug}`));
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${origin}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function robotsTxt() {
  const origin = siteUrl();
  return `  User-agent: *
  Allow: /
  Sitemap: ${origin}/sitemap.xml
  `;
  }

async function llmsTxt() {
  const data = await getPortfolio();
  const origin = siteUrl();
  return `# ${data.profile.name}

> ${data.profile.headline} based in ${data.profile.location}. Final-year BCA student (expected ${data.profile.graduationYear}), current CGPA ${data.profile.cgpa}.

Site: ${origin}

## Pages
- ${origin}/
- ${origin}/about
- ${origin}/skills
- ${origin}/projects
- ${origin}/experience
- ${origin}/education
- ${origin}/contact

## Projects
${(data.projects || []).map((p) => `- ${p.title}: ${p.summary}`).join("\n")}

## Currently building
${(data.currentWork || []).map((p) => `- ${p.title}: ${p.summary}`).join("\n")}
`;
}

module.exports = { sitemapXml, robotsTxt, llmsTxt, siteUrl };
