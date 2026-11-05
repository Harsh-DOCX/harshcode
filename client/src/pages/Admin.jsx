import { useEffect, useState } from "react";
import { adminLogin, fetchMessages, fetchPortfolio, savePortfolio } from "../api.js";
import ConfirmModal from "../components/ConfirmModal.jsx";

const empty = {
  profile: {
    name: "",
    headline: "",
    location: "",
    age: 20,
    degree: "",
    academicYear: "",
    graduated: false,
    cgpa: "",
    graduationYear: 2027,
    email: "",
    github: "",
    linkedin: "",
    instagram: "",
    summary: "",
    traits: [],
  },
  skills: [],
  tools: [],
  education: [],
  experience: [],
  projects: [],
  currentWork: [],
};

export default function Admin() {
  const [token, setToken] = useState(sessionStorage.getItem("adminToken") || "");
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [draft, setDraft] = useState(empty);
  const [messages, setMessages] = useState([]);
  const [notice, setNotice] = useState({ type: "", text: "" });
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    document.title = "Console | Harsh";
    let robots = document.head.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex,nofollow");
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchPortfolio()
      .then((data) => setDraft({ ...empty, ...data, profile: { ...empty.profile, ...data.profile } }))
      .catch((err) => setNotice({ type: "err", text: err.message }));
    fetchMessages(token)
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [token]);

  async function login(e) {
    e.preventDefault();
    setNotice({ type: "", text: "" });
    try {
      const data = await adminLogin(creds.username, creds.password);
      sessionStorage.setItem("adminToken", data.token);
      setToken(data.token);
    } catch (err) {
      setNotice({ type: "err", text: err.message });
    }
  }

  function setProfile(key, value) {
    setDraft((d) => ({ ...d, profile: { ...d.profile, [key]: value } }));
  }

  function updateList(key, index, field, value) {
    setDraft((d) => {
      const next = [...d[key]];
      next[index] = { ...next[index], [field]: value };
      return { ...d, [key]: next };
    });
  }

  function addItem(key, item) {
    setDraft((d) => ({ ...d, [key]: [...(d[key] || []), item] }));
  }

  function removeItem(key, index) {
    setDraft((d) => ({ ...d, [key]: d[key].filter((_, i) => i !== index) }));
  }

  async function persist() {
    setConfirm(false);
    try {
      const saved = await savePortfolio(token, draft);
      setDraft({ ...empty, ...saved, profile: { ...empty.profile, ...saved.profile } });
      setNotice({ type: "ok", text: "Portfolio updated on the public site." });
    } catch (err) {
      setNotice({ type: "err", text: err.message });
    }
  }

  if (!token) {
    return (
      <div className="layout">
        <header className="page-head">
          <h1>Console</h1>
          <p>Restricted access. This route is not listed in the public navigation.</p>
        </header>
        <form className="glass card form" onSubmit={login}>
          <label>
            Username
            <input
              value={creds.username}
              onChange={(e) => setCreds((c) => ({ ...c, username: e.target.value }))}
              autoComplete="username"
            />
          </label>
          <label className="field-wrap">
            Password
            <input
              type={showPass ? "text" : "password"}
              value={creds.password}
              onChange={(e) => setCreds((c) => ({ ...c, password: e.target.value }))}
              autoComplete="current-password"
            />
            <button type="button" className="icon-btn eye" onClick={() => setShowPass((v) => !v)}>
              {showPass ? "Hide" : "Show"}
            </button>
          </label>
          {notice.text && <div className={`alert ${notice.type}`}>{notice.text}</div>}
          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  const p = draft.profile;

  return (
    <div className="layout">
      <header className="page-head">
        <h1>Update portfolio</h1>
        <p>Change profile facts, skills, projects, education, and experience. Nothing here is linked from the public menu.</p>
      </header>
      {notice.text && <div className={`alert ${notice.type}`}>{notice.text}</div>}

      <section className="glass card form" style={{ marginTop: 16 }}>
        <h2>Profile</h2>
        <label>
          Name
          <input value={p.name} onChange={(e) => setProfile("name", e.target.value)} />
        </label>
        <label>
          Headline
          <input value={p.headline} onChange={(e) => setProfile("headline", e.target.value)} />
        </label>
        <label>
          Age
          <input type="number" value={p.age} onChange={(e) => setProfile("age", Number(e.target.value))} />
        </label>
        <label>
          Academic year
          <input value={p.academicYear} onChange={(e) => setProfile("academicYear", e.target.value)} />
        </label>
        <label>
          Graduated
          <select value={String(p.graduated)} onChange={(e) => setProfile("graduated", e.target.value === "true")}>
            <option value="false">No — still enrolled</option>
            <option value="true">Yes — graduated</option>
          </select>
        </label>
        <label>
          CGPA
          <input value={p.cgpa} onChange={(e) => setProfile("cgpa", e.target.value)} />
        </label>
        <label>
          Graduation year
          <input
            type="number"
            value={p.graduationYear}
            onChange={(e) => setProfile("graduationYear", Number(e.target.value))}
          />
        </label>
        <label>
          Email
          <input value={p.email} onChange={(e) => setProfile("email", e.target.value)} />
        </label>
        <label>
          GitHub
          <input value={p.github} onChange={(e) => setProfile("github", e.target.value)} />
        </label>
        <label>
          LinkedIn
          <input value={p.linkedin} onChange={(e) => setProfile("linkedin", e.target.value)} />
        </label>
        <label>
          Instagram
          <input value={p.instagram || ""} onChange={(e) => setProfile("instagram", e.target.value)} />
        </label>
        <label>
          Summary
          <textarea value={p.summary} onChange={(e) => setProfile("summary", e.target.value)} />
        </label>
        <label>
          Traits (one per line)
          <textarea
            value={(p.traits || []).join("\n")}
            onChange={(e) => setProfile("traits", e.target.value.split("\n").filter(Boolean))}
          />
        </label>
      </section>

      <details className="glass card admin-dropdown" style={{ marginTop: 16 }}>
        <summary>Skills</summary>
        {draft.skills.map((skill, i) => (
          <div className="form" key={i} style={{ marginBottom: 12 }}>
            <input value={skill.name} onChange={(e) => updateList("skills", i, "name", e.target.value)} placeholder="Name" />
            <input
              value={skill.category}
              onChange={(e) => updateList("skills", i, "category", e.target.value)}
              placeholder="Category"
            />
            <input
              type="number"
              value={skill.level}
              onChange={(e) => updateList("skills", i, "level", Number(e.target.value))}
            />
            <button type="button" className="btn" onClick={() => removeItem("skills", i)}>
              Remove skill
            </button>
          </div>
        ))}
        <button type="button" className="btn" onClick={() => addItem("skills", { name: "", category: "", level: 70 })}>
          Add skill
        </button>
      </details>

      <details className="glass card admin-dropdown" style={{ marginTop: 16 }}>
        <summary>Projects</summary>
        {draft.projects.map((project, i) => (
          <div className="form" key={i} style={{ marginBottom: 16 }}>
            <input value={project.title} onChange={(e) => updateList("projects", i, "title", e.target.value)} placeholder="Title" />
            <input value={project.slug} onChange={(e) => updateList("projects", i, "slug", e.target.value)} placeholder="slug" />
            <input value={project.stack} onChange={(e) => updateList("projects", i, "stack", e.target.value)} placeholder="Stack" />
            <input value={project.status} onChange={(e) => updateList("projects", i, "status", e.target.value)} />
            <textarea value={project.summary} onChange={(e) => updateList("projects", i, "summary", e.target.value)} />
            <label>
              GitHub repository URL (optional)
              <input
                type="url"
                value={project.githubUrl || ""}
                onChange={(e) => updateList("projects", i, "githubUrl", e.target.value)}
                placeholder="https://github.com/username/repository"
              />
            </label>
            <label>
              Website URL (optional)
              <input
                type="url"
                value={project.websiteUrl || ""}
                onChange={(e) => updateList("projects", i, "websiteUrl", e.target.value)}
                placeholder="https://example.com"
              />
            </label>
            <button type="button" className="btn" onClick={() => removeItem("projects", i)}>
              Remove project
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn"
          onClick={() =>
            addItem("projects", {
              slug: "new-project",
              title: "",
              stack: "",
              status: "In progress",
              summary: "",
              highlights: [],
              githubUrl: "",
              websiteUrl: "",
            })
          }
        >
          Add project
        </button>
      </details>

      <details className="glass card admin-dropdown" style={{ marginTop: 16 }}>
        <summary>Currently working on</summary>
        {(draft.currentWork || []).map((item, i) => (
          <div className="form" key={i} style={{ marginBottom: 16 }}>
            <input value={item.title} onChange={(e) => updateList("currentWork", i, "title", e.target.value)} />
            <input value={item.slug} onChange={(e) => updateList("currentWork", i, "slug", e.target.value)} />
            <input value={item.stack} onChange={(e) => updateList("currentWork", i, "stack", e.target.value)} />
            <textarea value={item.summary} onChange={(e) => updateList("currentWork", i, "summary", e.target.value)} />
            <button type="button" className="btn" onClick={() => removeItem("currentWork", i)}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn"
          onClick={() => addItem("currentWork", { slug: "in-progress", title: "", stack: "", summary: "" })}
        >
          Add current work
        </button>
      </details>

      <section className="glass card" style={{ marginTop: 16 }}>
        <h2>Experience</h2>
        {draft.experience.map((job, i) => (
          <div className="form" key={i} style={{ marginBottom: 16 }}>
            <input value={job.role} onChange={(e) => updateList("experience", i, "role", e.target.value)} placeholder="Role" />
            <input value={job.company} onChange={(e) => updateList("experience", i, "company", e.target.value)} placeholder="Company" />
            <input value={job.start} onChange={(e) => updateList("experience", i, "start", e.target.value)} />
            <input value={job.end} onChange={(e) => updateList("experience", i, "end", e.target.value)} />
            <textarea value={job.summary} onChange={(e) => updateList("experience", i, "summary", e.target.value)} />
            <button type="button" className="btn" onClick={() => removeItem("experience", i)}>
              Remove role
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn"
          onClick={() => addItem("experience", { role: "", company: "", start: "", end: "", summary: "" })}
        >
          Add experience
        </button>
      </section>

      <section className="glass card" style={{ marginTop: 16 }}>
        <h2>Education</h2>
        {draft.education.map((item, i) => (
          <div className="form" key={i} style={{ marginBottom: 16 }}>
            <input value={item.title} onChange={(e) => updateList("education", i, "title", e.target.value)} />
            <input value={item.institution} onChange={(e) => updateList("education", i, "institution", e.target.value)} />
            <input value={item.year} onChange={(e) => updateList("education", i, "year", e.target.value)} />
            <input value={item.result} onChange={(e) => updateList("education", i, "result", e.target.value)} />
            <input value={item.status} onChange={(e) => updateList("education", i, "status", e.target.value)} />
            <button type="button" className="btn" onClick={() => removeItem("education", i)}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn"
          onClick={() => addItem("education", { title: "", institution: "", year: "", result: "", status: "" })}
        >
          Add education
        </button>
      </section>

      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={() => setConfirm(true)}>
          Save changes
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            sessionStorage.removeItem("adminToken");
            setToken("");
          }}
        >
          Sign out
        </button>
      </div>
      <h2>Incoming messages</h2>
      <div className="timeline">
        {messages.map((m, i) => (
          <article className="glass card" key={m._id || i}>
            <h3>
              {m.name} · {m.email}
            </h3>
            <p>{m.message}</p>
            <p className="meta">{m.createdAt}</p>
          </article>
        ))}
        {!messages.length && <p className="meta">No messages yet.</p>}
      </div>
      {confirm && (
        <ConfirmModal
          title="Publish these edits?"
          body="The public pages will show the updated profile, skills, and projects immediately."
          confirmLabel="Publish"
          onCancel={() => setConfirm(false)}
          onConfirm={persist}
        />
      )}
    </div>
  );
}
