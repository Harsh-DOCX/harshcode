export const SITE_URL = "https://www.harshog.dev";

export const pageMeta = {
  "/": {
    title: "Harsh | MERN Stack Developer",
    description:
      "Portfolio of Harsh, a final-year BCA student and MERN stack developer building web products in India.",
  },
  "/about": {
    title: "About Harsh | Final-Year BCA Developer",
    description:
      "Background, academic standing, and working style of Harsh, currently in the final year of BCA with a CGPA of 7.1/10.",
  },
  "/skills": {
    title: "Skills | Harsh — MERN, Languages, and Tools",
    description:
      "MERN stack, JavaScript, HTML/CSS, DSA, Java, C, C++, Python, Git, VS Code, IntelliJ, and Cursor.",
  },
  "/projects": {
    title: "Projects | iSaves, ZipURL, MoneyMinded, TextLens",
    description:
      "Selected software projects by Harsh including iSaves, ZipURL, MoneyMinded, TextLens, and MissingFileFinder.",
  },
  "/experience": {
    title: "Experience | GigaNodes and Outlook Publications India",
    description:
      "Web development internship at GigaNodes and business analyst role at Outlook Publications India.",
  },
  "/education": {
    title: "Education | Class 10, Class 12, and BCA",
    description:
      "Academic record: Class 10 91% (2022), Class 12 81% (2024), BCA final year with CGPA 7.1/10, graduating 2027.",
  },
  "/contact": {
    title: "Contact Harsh | Project and Internship Enquiries",
    description: "Write to Harsh about internships, freelance web work, or collaboration.",
  },
  "/search": {
    title: "Search | Harsh Portfolio",
    description: "Search pages, skills, and projects on Harsh’s portfolio.",
  },
};

export function jsonLd(portfolio) {
  const p = portfolio?.profile || {};
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: p.name || "Harsh",
        jobTitle: p.headline,
        url: SITE_URL,
        email: p.email,
        address: { "@type": "PostalAddress", addressCountry: "IN" },
      },
      {
        "@type": "ProfessionalService",
        name: `${p.name || "Harsh"} — Web Development`,
        url: SITE_URL,
        image: `${SITE_URL}/og-image.svg`,
        areaServed: "India",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        sameAs: [p.github, p.linkedin].filter(Boolean),
      },
      {
        "@type": "WebSite",
        name: "Harsh Portfolio",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
