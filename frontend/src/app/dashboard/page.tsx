'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Modal, Card } from '../../components';
import { Download, RefreshCw, LogOut } from 'lucide-react';

// Tipo de dato para las estadísticas
interface StatItem {
  _id: string; // Nombre del componente
  count: number;
}

export default function Dashboard() {
  const router = useRouter();
  
  // Estado para el Modal de prueba
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado para las estadísticas
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);

  // Cargar estadísticas al iniciar
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('http://localhost:5000/api/components/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error cargando stats', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Función para exportar CSV (Requiere Token)
  const handleExport = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Por favor inicia sesión.');
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/components/export', {
        headers: {
          'Authorization': `Bearer ${token}` // 🔒 Enviamos el token
        }
      });

      if (!res.ok) throw new Error('Fallo en la exportación');

      // Truco para descargar el archivo blob que devuelve el backend
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics_export_${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert('Error al exportar. ¿Tal vez expiró tu sesión?');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Component Analytics</h1>
          <p className="text-gray-600">Interactúa con los componentes para generar datos.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={logout} leftIcon={<LogOut size={16}/>}>
            Salir
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* COLUMNA IZQUIERDA: Playground de Componentes */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Prueba los Botones</h2>
            <Card className="p-4 flex flex-wrap gap-4 items-center">
              <Button onClick={() => fetchStats()}>Click Normal</Button>
              <Button variant="secondary">Secundario</Button>
              <Button variant="danger">Peligro</Button>
              <Button isLoading>Cargando</Button>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Prueba los Inputs (Escribe y sal)</h2>
            <Card className="p-4 space-y-4">
              <Input label="Nombre de Usuario" placeholder="Escribe algo..." />
              <Input label="Con Error" error="Este campo es inválido" />
              <Input label="Con Éxito" success defaultValue="Validado" />
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Prueba el Modal</h2>
            <Card className="p-4">
              <Button onClick={() => setIsModalOpen(true)}>Abrir Modal Demo</Button>
            </Card>
          </section>
        </div>

        {/* COLUMNA DERECHA: Panel de Analíticas */}
        <div className="space-y-6">
          <Card className="h-full bg-white border-l-4 border-primary" title="Panel de Estadísticas en Vivo">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">Datos desde MongoDB Atlas</p>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={fetchStats} leftIcon={<RefreshCw size={14}/>}>
                  Refrescar
                </Button>
                <Button size="sm" onClick={handleExport} leftIcon={<Download size={14}/>}>
                  Exportar CSV
                </Button>
              </div>
            </div>

            {loadingStats ? (
              <div className="text-center py-10 text-gray-400">Cargando datos...</div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Componente</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Interacciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.length === 0 ? (
                      <tr><td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">No hay datos aún. ¡Usa los componentes!</td></tr>
                    ) : (
                      stats.map((stat) => (
                        <tr key={stat._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat._id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 font-bold">{stat.count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

      </div>

      {/* Modal Demo */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="¡Hola Mundo!"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => { setIsModalOpen(false); fetchStats(); }}>Entendido</Button>
          </>
        }
      >
        <p className="text-gray-600">
          Este es un modal totalmente funcional. Si lo cierras (con la X, el botón o click afuera),
          se enviará un evento de tracking al backend.
        </p>
      </Modal>
    </div>
  );
}