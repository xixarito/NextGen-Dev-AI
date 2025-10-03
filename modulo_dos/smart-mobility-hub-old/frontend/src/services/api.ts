export async function login(username: string, password: string) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);
  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function ingestSensorData(token: string, payload: any) {
  const res = await fetch("http://localhost:8000/data/iot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Ingest failed");
  return res.json();
}

export async function fetchMe(token: string) {
  const res = await fetch("http://localhost:8000/users/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Auth required");
  return res.json();
}

export async function fetchSampleData(token: string) {
  return [
    { sensor_id: "S-Z1-001", type: "traffic", value: 120 },
    { sensor_id: "S-Z2-002", type: "air_quality", value: 42 },
    { sensor_id: "S-Z3-003", type: "traffic", value: 95 }
  ];
}