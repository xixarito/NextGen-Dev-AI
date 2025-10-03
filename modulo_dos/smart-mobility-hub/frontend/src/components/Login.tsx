import { useState } from "react";
import { login, getMe } from "../services/api";

type Props = { onAuthenticated: (token: string, user: any) => void };

export default function Login({ onAuthenticated }: Props) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const token = await login(username, password);
      const me = await getMe(token);
      onAuthenticated(token, me);
    } catch (err: any) {
      setError(err.message || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card animate-fade-in">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Smart Mobility Hub</h2>
              <p className="text-gray-600">Accede a tu panel de control IoT</p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="form-group">
                <label htmlFor="username" className="label">
                  <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  className="input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="label">
                  <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="input"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loader"></div>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Iniciar Sesión
                  </>
                )}
              </button>

              {error && (
                <div className="error animate-slide-in">
                  <svg className="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Demo: <span className="font-semibold">admin</span> / <span className="font-semibold">admin123</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}