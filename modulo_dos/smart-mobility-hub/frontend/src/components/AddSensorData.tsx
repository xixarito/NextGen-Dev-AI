import { useState } from "react";

type Props = {
  token: string;
  onDataAdded: () => void;
};

type SensorFormData = {
  sensor_id: string;
  sensor_type: string;
  value: number;
  latitude: number;
  longitude: number;
};

export default function AddSensorData({ token, onDataAdded }: Props) {
  const [formData, setFormData] = useState<SensorFormData>({
    sensor_id: "",
    sensor_type: "temperature",
    value: 0,
    latitude: 19.4326,
    longitude: -99.1332,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sensorTypes = [
    { value: "temperature", label: "Temperatura", icon: "🌡️" },
    { value: "humidity", label: "Humedad", icon: "💧" },
    { value: "air", label: "Calidad del Aire", icon: "🌬️" },
    { value: "pressure", label: "Presión", icon: "📊" },
    { value: "noise", label: "Ruido", icon: "🔊" },
    { value: "motion", label: "Movimiento", icon: "🚶" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
      
      const response = await fetch(`${API_URL}/data/iot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el registro");
      }

      setSuccess(true);
      setFormData({
        sensor_id: "",
        sensor_type: "temperature",
        value: 0,
        latitude: 19.4326,
        longitude: -99.1332,
      });
      
      // Notificar al dashboard para actualizar datos
      setTimeout(() => {
        onDataAdded();
        setSuccess(false);
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || "Error al agregar datos");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' || name === 'latitude' || name === 'longitude' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  return (
    <div className="card">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Agregar Datos de Sensor</h3>
            <p className="text-sm text-gray-600">Simular nuevos datos IoT en tiempo real</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="sensor_id" className="label">
                <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                ID del Sensor
              </label>
              <input
                type="text"
                id="sensor_id"
                name="sensor_id"
                value={formData.sensor_id}
                onChange={handleInputChange}
                placeholder="Ej: TEMP_001, HUM_002"
                className="input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sensor_type" className="label">
                <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Tipo de Sensor
              </label>
              <select
                id="sensor_type"
                name="sensor_type"
                value={formData.sensor_type}
                onChange={handleInputChange}
                className="input"
                disabled={loading}
              >
                {sensorTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="value" className="label">
                <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Valor
              </label>
              <input
                type="number"
                id="value"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                step="0.01"
                placeholder="Ej: 23.5, 65.2"
                className="input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="label">
                <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ubicación
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  step="0.0001"
                  placeholder="Latitud"
                  className="input"
                  required
                  disabled={loading}
                />
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  step="0.0001"
                  placeholder="Longitud"
                  className="input"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <svg className="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Los datos se agregarán con timestamp actual
            </div>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loader"></div>
                  Agregando...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar Datos
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="error animate-slide-in">
              <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="success animate-fade-in">
              <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ¡Datos agregados exitosamente! El dashboard se actualizará automáticamente.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}