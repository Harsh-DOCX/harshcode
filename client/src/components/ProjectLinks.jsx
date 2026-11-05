function externalUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

export default function ProjectLinks({ project }) {
  const githubUrl = externalUrl(project.githubUrl);
  const websiteUrl = externalUrl(project.websiteUrl);
  if (!githubUrl && !websiteUrl) return null;

  return (
    <div className="contact-options project-links">
      {githubUrl && (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>
      )}
      {websiteUrl && (
        <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
          Live website
        </a>
      )}
    </div>
  );
}
