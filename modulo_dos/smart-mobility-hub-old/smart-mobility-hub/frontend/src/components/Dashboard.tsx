import { useEffect, useState } from "react";
import { listIoT } from "../services/api";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale);

type Props = { token: string; user: any };

type SensorData = { id: number; sensor_id: string; sensor_type: string; value: number; timestamp: string };

export default function Dashboard({ token, user }: Props) {
  const [data, setData] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listIoT(token, 20).then(setData).catch((e) => setError(e.message));
  }, [token]);

  const grouped = data.reduce((acc: Record<string, number>, d) => {
    acc[d.sensor_type] = (acc[d.sensor_type] || 0) + d.value; return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [{ label: "Valores", data: Object.values(grouped), backgroundColor: "#2b7cff" }]
  };

  return (
    <div style={{ padding: 16 }}>
      <h4>Bienvenido, {user.username}</h4>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Bar data={chartData} />
      <table style={{ marginTop: 16, width: "100%" }}>
        <thead><tr><th>ID</th><th>Sensor</th><th>Tipo</th><th>Valor</th><th>Timestamp</th></tr></thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id}><td>{d.id}</td><td>{d.sensor_id}</td><td>{d.sensor_type}</td><td>{d.value}</td><td>{new Date(d.timestamp).toLocaleString()}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}