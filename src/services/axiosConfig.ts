import { getValueFromLocalStorage, setValueInLocalStorage } from "@/utils/localStorage";
import axios, { AxiosResponse, AxiosError } from "axios";
import useAuth from "@/hook/api/useAuth";
const BASE_URL = "http://localhost:8080"
const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return (status >= 200 && status < 300) || status === 302; // Chấp nhận status 2xx hoặc 302
  },
});


let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
const refreshAccessToken = async () => {
  try {
    const refreshTokenFromWeb = JSON.parse(getValueFromLocalStorage("refreshToken") || "null");
    if (!refreshTokenFromWeb) {
      throw new Error("No refresh token available");
    }
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshTokenFromWeb
    })
    const { accessToken, refreshToken } = response.data;
    setValueInLocalStorage("accessToken", accessToken);
    setValueInLocalStorage("refreshToken", refreshToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

axiosConfig.interceptors.request.use(
  function (config) {
    const accessToken = JSON.parse(getValueFromLocalStorage("accessToken") || "null");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosConfig.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  async function (error: AxiosError) {
    const originalRequest = error.config;
    const isChangePasswordApi = error.config?.url?.includes("/auth/change-password");
    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      if (isChangePasswordApi) {
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosConfig(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
      (originalRequest as any)._retry = true;
      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();

        if (!newToken) {
          const { handleLogout } = useAuth();
          handleLogout();
          // setValueInLocalStorage("accessToken", "");
          // setValueInLocalStorage("refreshToken", "");
          // window.location.href = "/auth/login";
          processQueue(new Error('Failed to refresh token'));
          return Promise.reject(error);
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return axiosConfig(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
export default axiosConfig;