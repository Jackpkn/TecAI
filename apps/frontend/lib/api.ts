import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
      });
    }
    if (
      error.message.includes("disconnected port") ||
      error.code === "ECONNABORTED"
    ) {
      return Promise.reject({
        message: "Connection to server lost. Please check your network.",
        code: "NETWORK_ERROR",
      });
    }
    //handle different http status .codes
    const { status, data } = error.response;

    let errorMessage = "An error occurred";
    if (data?.message) {
      errorMessage = data.message;
    } else if (status === 401) {
      errorMessage = "Unauthorized access";
    } else if (status === 403) {
      errorMessage = "Forbidden access";
    } else if (status === 404) {
      errorMessage = "Resource not found";
    } else if (status >= 500) {
      errorMessage = "Server error. Please try again later.";
    }

    return Promise.reject({
      status,
      message: errorMessage,
      details: data?.errors || null,
    });
  }
);
