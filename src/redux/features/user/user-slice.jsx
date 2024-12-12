import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    value: null,
    loading: true,
  },
  reducers: {
    getUserData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
