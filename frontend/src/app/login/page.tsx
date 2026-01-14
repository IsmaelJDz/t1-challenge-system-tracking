'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '../../components';
import { useTracking } from '../../hooks/use-tracking';
import { useLogin, useRegister } from '../../hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const { track } = useTracking();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const currentMutation = isLogin ? loginMutation : registerMutation;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    currentMutation.mutate(formData, {
      onSuccess: () => {
        track({
          component: 'AuthPage',
          action: isLogin ? 'login_success' : 'register_success',
        });
        router.push('/dashboard');
      },
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-md p-6' variant='shadow'>
        <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            label='Email'
            type='email'
            placeholder='admin@t1.com'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
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

          {currentMutation.error && (
            <p className='text-sm text-danger text-center'>
              {currentMutation.error.message}
            </p>
          )}

          <Button
            className='w-full mt-4'
            isLoading={currentMutation.isPending}
            type='submit'
          >
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </Button>
        </form>

        <div className='mt-4 text-center'>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className='text-sm text-primary hover:underline'
          >
            {isLogin
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Ingresa'}
          </button>
        </div>
      </Card>
    </div>
  );
}
