// src/redux/authSlice.ts
// Auth אמיתי (JWT) מול /api/auth. שונה מ-userSlice.ts הישן (שמתאר רק שם משתמש דמו) -
// authSlice הוא מקור האמת ל-session האמיתי: טוקנים + משתמש מה-DB.

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api, { tokenStorage } from '../service/api';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null
};

interface AuthResponse {
  success: boolean;
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', payload);
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      return data.user;
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { error?: string } } })?.response?.data?.error
        || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    payload: { email: string; password: string; firstName: string; lastName: string; phone?: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', payload);
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      return data.user;
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { error?: string } } })?.response?.data?.error
        || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

// Restore session via httpOnly cookie (or legacy localStorage Bearer)
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.get<{ success: boolean; user: AuthUser }>('/auth/me');
      return data.user;
    } catch {
      tokenStorage.clear();
      return rejectWithValue('session-invalid');
    }
  }
);

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  try {
    await api.post('/auth/logout');
  } catch {
    /* ignore network errors on logout */
  } finally {
    tokenStorage.clear();
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      tokenStorage.clear();
      state.user = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = (action.payload as string) || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'error';
        state.error = (action.payload as string) || 'Registration failed';
      })
      .addCase(restoreSession.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.status = 'idle';
        state.user = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
