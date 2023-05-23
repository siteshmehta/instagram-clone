import axios from 'axios';
import { API_ENDPOINT_URL } from '../constant/services';



const axiosClient = axios.create();
axiosClient.defaults.baseURL = API_ENDPOINT_URL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
   Accept: 'application/json'
};
 

axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) { 
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosClient;