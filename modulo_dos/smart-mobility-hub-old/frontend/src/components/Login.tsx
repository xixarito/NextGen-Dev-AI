import React, { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLogin }: { onLogin: (t: string) => void }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      onLogin(res.access_token);
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 280 }}>
      <h3>Login</h3>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario"/>
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Contraseña"/>
      <button type="submit">Entrar</button>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </form>
  );
}