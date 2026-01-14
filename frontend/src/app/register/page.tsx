'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '../../components';
import { useTracking } from '../../hooks/use-tracking';
import { useRegister } from '../../hooks/use-auth';

export default function RegisterPage() {
  const router = useRouter();
  const { track } = useTracking();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      setTimeout(() => setIsChecking(false), 0);
    }
  }, [router]);

  const registerMutation = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    registerMutation.mutate(
      { email: formData.email, password: formData.password },
      {
        onSuccess: () => {
          track({
            component: 'RegisterPage',
            action: 'register_success',
          });
          router.push('/dashboard');
        },
      }
    );
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      {isChecking ? (
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
        </div>
      ) : (
        <Card className='w-full max-w-md p-6' variant='shadow'>
          <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>
            Crear Cuenta
          </h1>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='Email'
              type='email'
              placeholder='correo@ejemplo.com'
              value={formData.email}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              label='Contraseña'
              type='password'
              placeholder='******'
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <Input
              label='Confirmar Contraseña'
              type='password'
              placeholder='******'
              value={formData.confirmPassword}
              onChange={e =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />

            {registerMutation.error && (
              <p className='text-sm text-danger text-center'>
                {registerMutation.error.message}
              </p>
            )}

            <Button
              className='w-full mt-4'
              isLoading={registerMutation.isPending}
              type='submit'
            >
              Registrarse
            </Button>
          </form>

          <div className='mt-4 text-center'>
            <button
              onClick={() => router.push('/login')}
              className='text-sm text-primary hover:underline'
            >
              ¿Ya tienes cuenta? Ingresa
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
