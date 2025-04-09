// src/hooks/useAuth.js
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"
import { clearUser, setUser } from "../store/userSlice";
const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const API_URL = "http://localhost:8000/api/v1/user";

  const signup = async (signupData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/signup`, signupData, {
        withCredentials: true,
      });
      dispatch(setUser(response.data));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/login`, loginData, {
        withCredentials: true,
      });
      dispatch(setUser(response.data));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/verify-email`,  { verificationCode: code }, {
        withCredentials: true,
      });
      dispatch(setUser(response.data.user)); // Assuming backend sends updated user
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      dispatch(clearUser());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return {
    signup,
    login,
    verifyEmail,
    logout,
    loading,
    error,
  };
};

export default useAuth;
