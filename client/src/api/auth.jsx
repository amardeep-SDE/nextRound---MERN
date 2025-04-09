import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/user"

export const signupUser = async (userData) => {

    const response = await axios.post( `${API_URL}/signup`, userData);
    return response.data;
}
