import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovingInsuranceState {
  coverage: string;
}

const initialState: MovingInsuranceState = {
  coverage: "",
};

const movingInsuranceSlice = createSlice({
  name: "movingInsurance",
  initialState,
  reducers: {
    setCoverage: (state, action: PayloadAction<string>) => {
      state.coverage = action.payload;
    },
  },
});

export const { setCoverage } = movingInsuranceSlice.actions;

export default movingInsuranceSlice.reducer;
