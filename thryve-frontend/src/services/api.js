import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "htpps";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config ;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post<RefreshTokenResponse>(
          `${baseURL}/auth/refresh-token`,
          { refreshToken }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
        setTokens(newAccessToken, newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
