'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '../../components';
import { useTracking } from '../../hooks/use-tracking';
import { useLogin } from '../../hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const { track } = useTracking();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      setTimeout(() => setIsChecking(false), 0);
    }
  }, [router]);

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(formData, {
      onSuccess: () => {
        track({
          component: 'AuthPage',
          action: 'login_success',
        });
        router.push('/dashboard');
      },
    });
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
            Iniciar Sesión
          </h1>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='Email'
              type='email'
              placeholder='admin@t1.com'
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

            {loginMutation.error && (
              <p className='text-sm text-danger text-center'>
                {loginMutation.error.message}
              </p>
            )}

            <Button
              className='w-full mt-4'
              isLoading={loginMutation.isPending}
              type='submit'
            >
              Ingresar
            </Button>
          </form>

          <div className='mt-4 text-center'>
            <button
              onClick={() => router.push('/register')}
              className='text-sm text-primary hover:underline'
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
