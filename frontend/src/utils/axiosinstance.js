import axios from "axios";
import { BASE_URL, API_PATHS } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const storeAccessToken = (accessToken) => {
    if (localStorage.getItem("token") !== null) {
        localStorage.setItem("token", accessToken);
    } else {
        sessionStorage.setItem("token", accessToken);
    }
};

const clearSessionAndRedirect = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
};

let refreshPromise = null;

const refreshAccessToken = () => {
    if (!refreshPromise) {
        refreshPromise = axiosInstance
            .post(API_PATHS.AUTH.REFRESH) // refreshToken cookie is sent automatically (withCredentials: true)
            .then((response) => {
                const newAccessToken = response.data?.accessToken;
                if (!newAccessToken) {
                    throw new Error("Refresh response did not include an accessToken");
                }
                storeAccessToken(newAccessToken);
                return newAccessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
};

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            if (error.response.status === 401) {
                const url = originalRequest?.url || "";
                const isAuthCall =
                    url.includes("/auth/login") ||
                    url.includes("/auth/register") ||
                    url.includes("/auth/refresh");

                if (!isAuthCall && originalRequest && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const newAccessToken = await refreshAccessToken();
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        clearSessionAndRedirect();
                        return Promise.reject(refreshError);
                    }
                }

                if (isAuthCall && url.includes("/auth/refresh")) {
                    clearSessionAndRedirect();
                }
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;