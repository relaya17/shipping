// src/redux/trustedMovingCompanySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrustedMovingCompanyState {
  message: string;
}

const initialState: TrustedMovingCompanyState = {
  message: '',
};

const trustedMovingCompanySlice = createSlice({
  name: 'trustedMovingCompany',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = trustedMovingCompanySlice.actions;
export default trustedMovingCompanySlice.reducer;
