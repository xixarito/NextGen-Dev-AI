import { useEffect, useState } from "react";
import { listIoT } from "../services/api";
import { Bar, Line } from "react-chartjs-2";
import AddSensorData from "./AddSensorData";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = { token: string; user: any };

type SensorData = {
  id: number;
  sensor_id: string;
  sensor_type: string;
  value: number;
  timestamp: string;
  latitude?: number;
  longitude?: number;
};

export default function Dashboard({ token, user }: Props) {
  const [data, setData] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await listIoT(token, 50);
      setData(result);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Actualizar datos cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Estadísticas
  const stats = {
    total: data.length,
    sensors: new Set(data.map(d => d.sensor_id)).size,
    types: new Set(data.map(d => d.sensor_type)).size,
    avgValue: data.length > 0 ? (data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(2) : '0'
  };

  // Datos para gráfico de barras (por tipo de sensor)
  const typeData = data.reduce((acc: Record<string, number>, d) => {
    acc[d.sensor_type] = (acc[d.sensor_type] || 0) + d.value;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(typeData),
    datasets: [
      {
        label: "Valores por Tipo de Sensor",
        data: Object.values(typeData),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4"
        ],
        borderColor: [
          "#2563eb",
          "#059669",
          "#d97706",
          "#dc2626",
          "#7c3aed",
          "#0891b2"
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Datos para gráfico de líneas (últimos 10 registros)
  const recentData = data.slice(-10);
  const lineChartData = {
    labels: recentData.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Valores Recientes",
        data: recentData.map(d => d.value),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loader mx-auto mb-4" style={{ width: '40px', height: '40px' }}></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Mobility Hub</h1>
                <p className="text-sm text-gray-600">Panel de control IoT</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Bienvenido, {user.username}</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <button
                onClick={logout}
                className="btn btn-secondary"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="error mb-6 animate-slide-in">
            <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card animate-fade-in">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Registros</div>
          </div>
          <div className="stat-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="stat-value">{stats.sensors}</div>
            <div className="stat-label">Sensores Únicos</div>
          </div>
          <div className="stat-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="stat-value">{stats.types}</div>
            <div className="stat-label">Tipos de Sensor</div>
          </div>
          <div className="stat-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="stat-value">{stats.avgValue}</div>
            <div className="stat-label">Valor Promedio</div>
          </div>
        </div>

        {/* Add Sensor Data Form */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <AddSensorData token={token} onDataAdded={fetchData} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="chart-container animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Valores por Tipo de Sensor</h3>
            {Object.keys(typeData).length > 0 ? (
              <Bar data={barChartData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="mt-2">No hay datos disponibles</p>
                </div>
              </div>
            )}
          </div>

          <div className="chart-container animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencia Reciente</h3>
            {recentData.length > 0 ? (
              <Line data={lineChartData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <p className="mt-2">No hay datos recientes</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="card animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Registros Recientes</h3>
              <span className="badge badge-info">{data.length} registros</span>
            </div>
            
            {data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Sensor</th>
                      <th>Tipo</th>
                      <th>Valor</th>
                      <th>Ubicación</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(-20).reverse().map((d, index) => (
                      <tr key={d.id} className="animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <td>
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            #{d.id}
                          </span>
                        </td>
                        <td>
                          <span className="font-semibold text-gray-900">{d.sensor_id}</span>
                        </td>
                        <td>
                          <span className={`badge ${
                            d.sensor_type === 'temperature' ? 'badge-danger' :
                            d.sensor_type === 'humidity' ? 'badge-info' :
                            d.sensor_type === 'air' ? 'badge-warning' :
                            'badge-success'
                          }`}>
                            {d.sensor_type}
                          </span>
                        </td>
                        <td>
                          <span className="font-semibold text-blue-600">
                            {d.value.toFixed(2)}
                          </span>
                        </td>
                        <td>
                          {d.latitude && d.longitude ? (
                            <span className="text-sm text-gray-600">
                              {d.latitude.toFixed(4)}, {d.longitude.toFixed(4)}
                            </span>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td>
                          <span className="text-sm text-gray-600">
                            {new Date(d.timestamp).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No hay datos disponibles</h3>
                <p className="mt-2 text-gray-600">Aún no se han registrado datos de sensores IoT.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}