
import axiosClient from './axiosClient';

export const authApi = {
  register: (userData) => axiosClient.post('/auth/register', userData),
  login: (credentials) => axiosClient.post('/auth/login', credentials),
  
};

