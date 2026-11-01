const API = "/api";

export async function fetchPortfolio() {
  const res = await fetch(`${API}/portfolio`);
  if (!res.ok) throw new Error("Unable to load portfolio");
  return res.json();
}

export async function sendMessage(payload) {
  const res = await fetch(`${API}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Send failed");
  return data;
}

export async function searchSite(q) {
  const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export async function adminLogin(username, password) {
  const res = await fetch(`${API}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function savePortfolio(token, payload) {
  const res = await fetch(`${API}/admin/portfolio`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Save failed");
  return data;
}

export async function fetchMessages(token) {
  const res = await fetch(`${API}/admin/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Unable to load messages");
  return data;
}
