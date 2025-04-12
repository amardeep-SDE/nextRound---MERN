import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("currentUser");

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: savedUser ? JSON.parse(savedUser) : null,
    otherUsers: [],
    selectedUser: null,
    onlineUsers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      // localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.currentUser = null;
      // localStorage.removeItem("currentUser");
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setOtherUsers,
  setSelectedUser,
  setOnlineUsers,
} = userSlice.actions;
export default userSlice.reducer;
