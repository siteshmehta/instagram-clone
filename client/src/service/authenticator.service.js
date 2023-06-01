import axios from "axios";
import { API_ENDPOINT_URL } from "../constant/services";


export async function validateToken() {
  let token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_ENDPOINT_URL}/user/isAuth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response?.status === 200;
  } catch (error) {
    return false;
  }
}