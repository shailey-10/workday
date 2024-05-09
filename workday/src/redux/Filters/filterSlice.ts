import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilterState {
  minExp: string | null;
  companyName: string | null
  type: string[] | null
  minBasePay: string | null
  role: string[] | null
}

const initialState: FilterState = {
  minExp: null,
  companyName: null,
  type: null,
  minBasePay: null,
  role: null
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setMinExp: (state, action: PayloadAction<string | null>) => {
      state.minExp = action.payload;
    },
    setCompanyName: (state, action: PayloadAction<string | null>) => {
      state.companyName = action.payload;
    },
    setType: (state, action: PayloadAction<string[] | null>) => {
      state.type = action.payload;
    },
    setMinBasePay: (state, action: PayloadAction<string | null>) => {
      state.minBasePay = action.payload;
    },
    setRole: (state, action: PayloadAction<string[] | null>) => {
      state.role = action.payload;
    },

  },

});

export const { setMinExp, setCompanyName, setMinBasePay, setRole, setType } = filterSlice.actions;

export default filterSlice.reducer;