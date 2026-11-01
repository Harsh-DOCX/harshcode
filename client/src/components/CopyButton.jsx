import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      setDone(false);
    }
  }

  return (
    <button type="button" className="btn copy-btn" onClick={copy}>
      {done ? "Copied" : label}
    </button>
  );
}
