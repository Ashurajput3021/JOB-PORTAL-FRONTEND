import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false, // ✅ add loading state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // true / false
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions; // ✅ named exports
export default authSlice.reducer;
