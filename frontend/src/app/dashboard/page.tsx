'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Modal, Card } from '../../components';
import { Download, RefreshCw, LogOut, Loader2 } from 'lucide-react';
import { useStats, useExport } from '../../hooks/use-stats';

export default function Dashboard() {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: stats = [], isLoading: loadingStats, refetch } = useStats();
  const exportMutation = useExport();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    setIsAuthenticated(true);
    setIsCheckingAuth(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExport = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Por favor inicia sesión.');
      router.push('/login');
      return;
    }

    exportMutation.mutate();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  if (isCheckingAuth) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='h-12 w-12 animate-spin text-primary' />
          <p className='text-gray-600'>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='flex justify-between items-center mb-8 max-w-6xl mx-auto'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Component Analytics
          </h1>
          <p className='text-gray-600'>
            Interactúa con los componentes para generar datos.
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            onClick={logout}
            leftIcon={<LogOut size={16} />}
          >
            Salir
          </Button>
        </div>
      </div>

      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='space-y-6'>
          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-600'>
              1. Prueba los Botones
            </h2>
            <Card className='p-4'>
              <div className='flex flex-wrap gap-3 items-center justify-center'>
                <Button onClick={() => refetch()}>Click Normal</Button>
                <Button variant='secondary'>Secundario</Button>
                <Button variant='danger'>Peligro</Button>
                <Button isLoading>Cargando</Button>
              </div>
            </Card>
          </section>

          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-600'>
              2. Prueba los Inputs (Escribe y sal)
            </h2>
            <Card className='p-4'>
              <div className='flex flex-col gap-4'>
                <Input
                  type='text'
                  label='Nombre de Usuario'
                  placeholder='Escribe tu nombre...'
                />
                <Input
                  type='email'
                  label='Correo Electrónico'
                  placeholder='tu@email.com'
                />
                <Input
                  type='password'
                  label='Contraseña'
                  placeholder='Ingresa tu contraseña'
                />
                <Input
                  type='email'
                  label='Con Error'
                  error='Este correo ya está registrado'
                  defaultValue='correo@invalido'
                />
                <Input
                  type='password'
                  label='Con Éxito'
                  success
                  defaultValue='Password123!'
                />
                <Input
                  type='text'
                  label='Con Advertencia'
                  warning
                  defaultValue='Usuario con mayúsculas'
                  helperText='Se recomienda usar minúsculas'
                />
              </div>
            </Card>
          </section>

          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-600'>
              3. Prueba el Modal
            </h2>
            <Card className='p-4'>
              <Button onClick={() => setIsModalOpen(true)}>
                Abrir Modal Demo
              </Button>
            </Card>
          </section>
        </div>

        <div className='space-y-6'>
          <Card
            className='h-full bg-white border-l-4 border-primary'
            title='Panel de Estadísticas en Vivo'
          >
            <div className='flex justify-between items-center mb-6'>
              <p className='text-sm text-gray-500'>Datos desde MongoDB Atlas</p>
              <div className='flex gap-2'>
                <Button
                  size='sm'
                  variant='secondary'
                  onClick={() => refetch()}
                  leftIcon={<RefreshCw size={14} />}
                  isLoading={loadingStats}
                >
                  Refrescar
                </Button>
                <Button
                  size='sm'
                  onClick={handleExport}
                  leftIcon={<Download size={14} />}
                  isLoading={exportMutation.isPending}
                >
                  Exportar CSV
                </Button>
              </div>
            </div>

            {loadingStats ? (
              <div className='text-center py-10 text-gray-400'>
                Cargando datos...
              </div>
            ) : (
              <div className='overflow-hidden rounded-lg border border-gray-200'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Componente
                      </th>
                      <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Interacciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {stats.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className='px-6 py-4 text-center text-sm text-gray-500'
                        >
                          No hay datos aún. ¡Usa los componentes!
                        </td>
                      </tr>
                    ) : (
                      stats.map(stat => (
                        <tr key={stat._id}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            {stat._id}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 font-bold'>
                            {stat.count}
                          </td>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='¡Hola Mundo!'
        footer={
          <div className='flex gap-3 justify-end'>
            <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                refetch();
              }}
            >
              Entendido
            </Button>
          </div>
        }
      >
        <p className='text-gray-600'>
          Este es un modal totalmente funcional. Si lo cierras (con la X, el
          botón o click afuera), se enviará un evento de tracking al backend.
        </p>
      </Modal>
    </div>
  );
}
