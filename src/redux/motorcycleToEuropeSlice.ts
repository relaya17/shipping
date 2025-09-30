import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MotorcycleToEuropeState {
  details: string;
}

const initialState: MotorcycleToEuropeState = {
  details: "",
};

const motorcycleToEuropeSlice = createSlice({
  name: "motorcycleToEurope",
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<string>) => {
      state.details = action.payload;
    },
  },
});

export const { setDetails } = motorcycleToEuropeSlice.actions;

export default motorcycleToEuropeSlice.reducer;
