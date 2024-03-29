import { createSlice } from "@reduxjs/toolkit";

const retrieveStoredSession = () => {
  const storedSession = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
  };
  return storedSession;
};

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: !!retrieveStoredSession().token,
    user: retrieveStoredSession().user,
    token: retrieveStoredSession().token,
    isFirstLoad: true,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = !!action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cartItems");
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setFirstLoad: (state, action) => {
      state.isFirstLoad = action.payload.isFirstLoad;
    },
  },
});

export const { login, logout, setUser, setFirstLoad } = authSlice.actions;

export default authSlice.reducer;
