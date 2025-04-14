import axios from "axios";
import { use, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../store/userSlice";
const useOtherUsers = () => {
  const API_URL = "http://localhost:8000/api/v1/user";

  const dispatch = useDispatch();
  const getOtherUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/`, {
        withCredentials: true,
      });
      console.log(response.data);

      dispatch(setOtherUsers(response.data));
    } catch (err) {
      console.error("Failed to fetch other users:", err);
      return [];
    }
  };

  useEffect(() => {
    getOtherUsers();
  }, []);
};

export default useOtherUsers;
