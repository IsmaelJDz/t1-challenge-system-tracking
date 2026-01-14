'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '../../components';
import { useTracking } from '../../hooks/use-tracking';

export default function LoginPage() {
  const router = useRouter();
  const { track } = useTracking();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error en la petición');

      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.email);

      track({
        component: 'AuthPage',
        action: isLogin ? 'login_success' : 'register_success',
      });

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

          {error && <p className='text-sm text-danger text-center'>{error}</p>}

          <Button className='w-full mt-4' isLoading={loading} type='submit'>
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
