// axios client — prefers httpOnly cookies; keeps optional Bearer for migration.

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const ACCESS_TOKEN_KEY = 'vip_access_token';
const REFRESH_TOKEN_KEY = 'vip_refresh_token';

/** Legacy localStorage helpers — cleared on logout; prefer cookies. */
export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (accessToken: string, refreshToken: string) => {
    // Keep in sync only if server still returns tokens (non-browser clients).
    // Browser auth relies on httpOnly cookies set by the API.
    if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const api = axios.create({
  baseURL: '/api',
  timeout: 20000,
  withCredentials: true
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Cookie is sent automatically via withCredentials.
  // Attach Bearer only if a legacy localStorage token still exists.
  const token = tokenStorage.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  try {
    const { data } = await axios.post<{ accessToken?: string; refreshToken?: string }>(
      '/api/auth/refresh',
      {},
      { withCredentials: true }
    );
    if (data.accessToken && data.refreshToken) {
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
    }
    return true;
  } catch {
    tokenStorage.clear();
    return false;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const ok = await refreshPromise;
      if (ok) {
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
