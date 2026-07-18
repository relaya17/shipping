// axios client — browser auth is httpOnly cookies only (no JWT in localStorage).

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const LEGACY_ACCESS_KEY = 'vip_access_token';
const LEGACY_REFRESH_KEY = 'vip_refresh_token';

/** One-shot wipe of legacy JWTs left in localStorage from older builds. */
export function clearLegacyAuthStorage() {
  try {
    localStorage.removeItem(LEGACY_ACCESS_KEY);
    localStorage.removeItem(LEGACY_REFRESH_KEY);
  } catch {
    /* ignore */
  }
}

clearLegacyAuthStorage();

function readCookie(name: string): string | null {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

export const api = axios.create({
  baseURL: '/api',
  timeout: 20000,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const csrf = readCookie('vip_csrf');
  if (csrf && config.headers) {
    config.headers['X-CSRF-Token'] = csrf;
  }
  return config;
});

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  try {
    const csrf = readCookie('vip_csrf');
    await axios.post(
      '/api/auth/refresh',
      {},
      {
        withCredentials: true,
        headers: csrf ? { 'X-CSRF-Token': csrf } : undefined
      }
    );
    return true;
  } catch {
    clearLegacyAuthStorage();
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
