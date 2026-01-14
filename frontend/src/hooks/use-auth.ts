// frontend/src/hooks/use-auth.ts
import { useMutation } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:5000';

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  _id: string;
  email: string;
  token: string;
}

const authFetch = async (
  endpoint: string,
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error en la petición');
  }

  return data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) =>
      authFetch('/api/auth/login', credentials),
    onSuccess: data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.email);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) =>
      authFetch('/api/auth/register', credentials),
    onSuccess: data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.email);
    },
  });
};
