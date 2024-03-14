import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem("authToken") || null },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);

      setTimeout(() => {
        state.token = null;
        localStorage.removeItem("authToken");
      }, 60 * 60 * 1000);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
