// src/store/scheduleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedules: [],
  },
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    addScheduleItem: (state, action) => {
      state.schedules.push(action.payload);
    },
    removeScheduleItem: (state, action) => {
      state.schedules = state.schedules.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setSchedules, addScheduleItem, removeScheduleItem } = scheduleSlice.actions;

export default scheduleSlice.reducer;
