// src/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userName: string | null;
  loggedIn: boolean;
}

const initialState: UserState = {
  userName: null,
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.userName = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userName = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
