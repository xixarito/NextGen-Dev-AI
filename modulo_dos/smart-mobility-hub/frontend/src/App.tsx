import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  if (!token || !user) {
    return <Login onAuthenticated={(t, u) => { setToken(t); setUser(u); localStorage.setItem("token", t); }} />;
  }
  return <Dashboard token={token} user={user} />;
}