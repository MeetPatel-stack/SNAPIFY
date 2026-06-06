import axiosClient from "./axiosClient";

export const postApi = {
  createPost: (postData) => axiosClient.post("/posts", postData),

  getPosts: () => axiosClient.get("/posts"),

  deletePost: (postId) => axiosClient.delete(`/posts/${postId}`),

  toggleLike: (id) => axiosClient.put(`/posts/${id}/like`),

  getPostById: (id) => axiosClient.get(`/posts/${id}`),

  addComment: (id, text) => axiosClient.post(`/posts/${id}/comment`, { text }),

  getUserPosts: (id) => axiosClient.get(`/posts/user/${id}`),
};
