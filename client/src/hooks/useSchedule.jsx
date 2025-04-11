// src/hooks/useSchedule.js
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setSchedules,
  addScheduleItem,
  removeScheduleItem,
} from "../store/scheduleSlice";

const useSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const API_URL = "http://localhost:8000/api/v1/schedule";

  const addSchedule = async (scheduleData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/schedule`, scheduleData, {
        withCredentials: true,
      });
      dispatch(addScheduleItem(response.data));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add schedule");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/schedules`, {
        withCredentials: true,
      });
      dispatch(setSchedules(response.data));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch schedules");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deleteSchedule = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/schedule/${id}`, {
        withCredentials: true,
      });
      dispatch(removeScheduleItem(id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete schedule");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    addSchedule,
    getSchedules,
    deleteSchedule,
    loading,
    error,
  };
};

export default useSchedule;
