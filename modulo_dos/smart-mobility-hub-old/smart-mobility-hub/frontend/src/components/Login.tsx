import { useState } from "react";
import { login, getMe } from "../services/api";

type Props = { onAuthenticated: (token: string, user: any) => void };

export default function Login({ onAuthenticated }: Props) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      const me = await getMe(token);
      onAuthenticated(token, me);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 320, margin: "2rem auto" }}>
      <h3>Smart Mobility Hub</h3>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" type="password" />
      <button type="submit">Ingresar</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}