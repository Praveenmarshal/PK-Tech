/**
 * api.js — centralised fetch wrapper for all backend calls.
 *
 * ⚠  Never put API keys or secrets in this file.
 *    All sensitive operations go through the backend (/api/*).
 */

const BASE_URL = window.location.origin; // same-origin via nginx proxy

/** Retrieve the JWT stored after login */
function getToken() {
  return sessionStorage.getItem("zilist_token") || localStorage.getItem("zilist_token");
}

/** Core fetch wrapper — adds auth header + JSON defaults */
async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `HTTP ${response.status}`);
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────
export const AuthAPI = {
  login:  (email, password) => request("/api/auth/login",  { method: "POST", body: { email, password } }),
  me:     ()                => request("/api/auth/me",      { auth: true }),
};

// ── Projects ──────────────────────────────────────────────────────────────
export const ProjectAPI = {
  list:   ()           => request("/api/projects"),
  get:    (slug)       => request(`/api/projects/${slug}`),
  create: (data)       => request("/api/projects",       { method: "POST",   body: data, auth: true }),
  update: (id, data)   => request(`/api/projects/${id}`, { method: "PUT",    body: data, auth: true }),
  remove: (id)         => request(`/api/projects/${id}`, { method: "DELETE", auth: true }),
};

// ── Resources ─────────────────────────────────────────────────────────────
export const ResourceAPI = {
  list:   ()           => request("/api/resources"),
  get:    (slug)       => request(`/api/resources/${slug}`),
  create: (data)       => request("/api/resources",       { method: "POST",   body: data, auth: true }),
  update: (id, data)   => request(`/api/resources/${id}`, { method: "PUT",    body: data, auth: true }),
  remove: (id)         => request(`/api/resources/${id}`, { method: "DELETE", auth: true }),
};

// ── Chatbot ───────────────────────────────────────────────────────────────
export const ChatAPI = {
  send: (message, page = "") => request("/api/chatbot/message", { method: "POST", body: { message, page } }),
};

// ── Contact ───────────────────────────────────────────────────────────────
export const ContactAPI = {
  send: (data) => request("/api/contact", { method: "POST", body: data }),
};

// ── Analytics ─────────────────────────────────────────────────────────────
export const AnalyticsAPI = {
  event:   (type, page, metadata = {}) =>
    request("/api/analytics/event", { method: "POST", body: { type, page, metadata } }),
  summary: () => request("/api/analytics/summary", { auth: true }),
};
