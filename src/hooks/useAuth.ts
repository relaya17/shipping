// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { login, logoutAsync, register, restoreSession } from '../redux/authSlice';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(restoreSession());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    isAuthenticated: status === 'authenticated' && !!user,
    isLoading: status === 'loading',
    error,
    login: (email: string, password: string) => dispatch(login({ email, password })),
    register: (payload: { email: string; password: string; firstName: string; lastName: string; phone?: string }) =>
      dispatch(register(payload)),
    logout: () => dispatch(logoutAsync())
  };
}
