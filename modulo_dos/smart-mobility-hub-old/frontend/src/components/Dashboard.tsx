import React, { useEffect, useState, useRef } from "react";
import { fetchMe, fetchSampleData } from "../services/api";
import Chart from "chart.js/auto";

export default function Dashboard({ token }: { token: string }) {
  const [user, setUser] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    fetchMe(token).then(setUser).catch(() => setUser(null));
    fetchSampleData(token).then(setRows);
  }, [token]);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();
    const labels = rows.map(r => r.sensor_id);
    const data = rows.map(r => r.value);
    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: { labels, datasets: [{ label: "Valor", data, backgroundColor: "#3b82f6" }] },
      options: { responsive: true }
    });
  }, [rows]);

  return (
    <div>
      <h3>Dashboard</h3>
      {user && <p>Bienvenido, {user.full_name || user.username}</p>}
      <canvas ref={canvasRef} />
      <table border={1} cellPadding={4} style={{ marginTop: 16 }}>
        <thead>
          <tr><th>Sensor</th><th>Tipo</th><th>Valor</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}><td>{r.sensor_id}</td><td>{r.type}</td><td>{r.value}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}