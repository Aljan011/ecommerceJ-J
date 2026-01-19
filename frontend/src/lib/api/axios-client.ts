import axios, { AxiosError } from "axios";

// Create Axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true, // include cookies
});

// Request interceptor: add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle errors / refresh token
apiClient.interceptors.response.use(
  (response) => response.data, // return only data
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! You can trigger refresh token here.");
      // Optional: call refresh token endpoint and retry
    }
    return Promise.reject(error);
  },
);
