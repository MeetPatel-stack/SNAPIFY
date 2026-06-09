import axiosClient from "./axiosClient";

export const userApi = {
  getProfile: (id) => axiosClient.get(`/users/${id}`),

  updateProfile: (data) => axiosClient.put("/users/profile", data),
  toggleFollow: (id) => axiosClient.put(`/users/${id}/follow`),
  searchUsers: (keyword) => axiosClient.get(`/users/search?search=${keyword}`),
};
