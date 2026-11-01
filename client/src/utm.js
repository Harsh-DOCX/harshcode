const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export function captureUtm() {
  const params = new URLSearchParams(window.location.search);
  const found = {};
  KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) found[key] = value;
  });
  if (Object.keys(found).length) {
    sessionStorage.setItem("utm", JSON.stringify({ ...readUtm(), ...found }));
  }
}

export function readUtm() {
  try {
    return JSON.parse(sessionStorage.getItem("utm") || "{}");
  } catch {
    return {};
  }
}
