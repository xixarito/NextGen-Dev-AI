export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function login(username: string, password: string): Promise<string> {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  return data.access_token;
}

export async function getMe(token: string) {
  const res = await fetch(`${API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function listIoT(token: string, limit = 20) {
  const res = await fetch(`${API_URL}/data/iot?limit=${limit}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}