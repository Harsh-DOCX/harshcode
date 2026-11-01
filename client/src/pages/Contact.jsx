import { useState } from "react";
import Seo from "../components/Seo.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import CopyButton from "../components/CopyButton.jsx";
import { sendMessage } from "../api.js";
import { readUtm } from "../utm.js";
import { usePortfolio } from "../context/PortfolioContext.jsx";

export default function Contact() {
  const { data } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [confirm, setConfirm] = useState(false);
  const email = data.profile.email;
  const contactLinks = [
    { label: "Email", href: `mailto:${email}` },
    { label: "Instagram", href: data.profile.instagram },
    { label: "LinkedIn", href: data.profile.linkedin },
    { label: "GitHub", href: data.profile.github },
  ].filter((link) => link.href);

  function update(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function actuallySend() {
    setConfirm(false);
    setStatus({ type: "", text: "" });
    try {
      const utm = readUtm();
      const result = await sendMessage({
        ...form,
        utmSource: utm.utm_source || "",
        utmMedium: utm.utm_medium || "",
        utmCampaign: utm.utm_campaign || "",
        utmContent: utm.utm_content || "",
        utmTerm: utm.utm_term || "",
      });
      setStatus({ type: result.emailSent ? "ok" : "err", text: result.notice });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "err", text: err.message });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (form.name.trim().length < 2 || !form.email.includes("@") || form.message.trim().length < 10) {
      setStatus({
        type: "err",
        text: "Enter your name, a valid email, and a message of at least 10 characters.",
      });
      return;
    }
    setConfirm(true);
  }

  return (
    <>
      <Seo path="/contact" />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <header className="page-head">
        <h1>Contact</h1>
        <p>
          For internships, product work, or a conversation about a build, write here or email {email}
          <CopyButton text={email} />
        </p>
      </header>
      <nav className="contact-options glass card" aria-label="Other ways to contact">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("https://") ? "_blank" : undefined}
            rel={link.href.startsWith("https://") ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <form className="glass card form" style={{ marginTop: 20 }} onSubmit={onSubmit} noValidate>
        <label>
          Name
          <input name="name" value={form.name} onChange={update} autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" required />
        </label>
        <label>
          Message
          <textarea name="message" value={form.message} onChange={update} required />
        </label>
        {status.text && <div className={`alert ${status.type}`}>{status.text}</div>}
        <button className="btn btn-primary" type="submit">
          Send message
        </button>
      </form>
      {confirm && (
        <ConfirmModal
          title="Send this message?"
          body="Confirm that the name, email, and message are ready to submit."
          confirmLabel="Send"
          onCancel={() => setConfirm(false)}
          onConfirm={actuallySend}
        />
      )}
    </>
  );
}
