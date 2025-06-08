import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import httpService from '@/service/ApiService';
import { setAccessToken, setRefreshToken } from '@/lib/utils';

interface FormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    role: 'manager' | 'engineer' | string;
    email: string;
    name: string;
    skills?: string[];
    maxCapacity?: number;
    department?: string;
  };
}

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      httpService.post<LoginResponse>(`${BASE_URL}/api/auth/login`, data),
    onSuccess: (response) => {
      const { token, user, refreshToken } = response.data;
      setAccessToken(token);
      setRefreshToken(refreshToken);

      if (user?.role === 'manager') {
        console.log('Manager logged in:', user);
        navigate('/manager');
      } else if (user?.role === 'engineer') {
        console.log('Engineer logged in:', user);
        navigate('/engineer');
      }
    },
    onError: (error: any) => {
      alert('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    },
  });

  return {
    user: mutation.data?.data.user,
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    token: mutation.data?.data.token,
    refreshToken: mutation.data?.data.refreshToken,
    mutation
  };
};
