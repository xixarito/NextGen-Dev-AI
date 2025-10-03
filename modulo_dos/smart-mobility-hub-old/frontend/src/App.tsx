import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  return (
    <div style={{ padding: 16 }}>
      <h2>Smart Mobility Hub</h2>
      {!token ? <Login onLogin={setToken} /> : <Dashboard token={token} />}
    </div>
  );
}