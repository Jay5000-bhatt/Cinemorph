import axios from "axios";

const BASE_URL = "https://cinemorph-api.vercel.app/discuss";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const makeRequest = async (url, options = {}) => {
  try {
    const response = await api(url, options);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const getComments = async (postId) => {
  return makeRequest(`${BASE_URL}/${mediaType}/${id}`);
};

export const postComment = async (postId, message, parentId) => {
  return makeRequest(`${BASE_URL}/${mediaType}/${id}`, {
    method: "POST",
    data: { message, parentId },
  });
};

export const updateComment = async (postId, commentId, message) => {
  return makeRequest(`${BASE_URL}/${mediaType}/${id}`, {
    method: "PUT",
    data: { message },
  });
};

export const deleteComment = async (postId, commentId) => {
  return makeRequest(`${BASE_URL}/${mediaType}/${id}`, {
    method: "DELETE",
  });
};
