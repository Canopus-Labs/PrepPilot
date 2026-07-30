import axios from "axios";
import { BASE_URL, API_PATHS } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    withCredentials: true,   // needed for the refresh-token cookie
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// ── Request interceptor — attach access token ─────────────────────────────
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
    (error) => Promise.reject(error)
);

// ── Token refresh state ───────────────────────────────────────────────────
let isRefreshing = false;
let refreshSubscribers = [];   // subscribers waiting for the new token

function onTokenRefreshed(newToken) {
    refreshSubscribers.forEach((subscriber) => subscriber.resolve(newToken));
    refreshSubscribers = [];
}

function addRefreshSubscriber(resolveCb, rejectCb) {
    refreshSubscribers.push({ resolve: resolveCb, reject: rejectCb });
}

// ── Response interceptor — silent token refresh on 401 ───────────────────
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            // Network / timeout — don't redirect
            if (error.code === "ECONNABORTED") {
                console.error("Request timeout. Please try again.");
            }
            return Promise.reject(error);
        }

        const { status } = error.response;
        const url = originalRequest?.url || "";

        // Don't retry auth calls themselves to avoid infinite loops
        const isAuthCall =
            url.includes("/auth/login") ||
            url.includes("/auth/register") ||
            url.includes("/auth/refresh") ||
            url.includes("/auth/logout");

        if (status === 401 && !isAuthCall && !originalRequest._retry) {
            // Mark so we don't retry the same request more than once
            originalRequest._retry = true;

            if (isRefreshing) {
                // Another refresh is already in-flight — queue this request
                return new Promise((resolve, reject) => {
                    addRefreshSubscriber(
                        (newToken) => {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            resolve(axiosInstance(originalRequest));
                        },
                        (error) => reject(error)
                    );
                });
            }

            isRefreshing = true;

            try {
                // The refresh token is in an httpOnly cookie — just POST
                const { data } = await axios.post(
                    `${BASE_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = data.accessToken;
                if (!newToken) throw new Error("No access token in refresh response");

                // Persist in the same storage the original login used
                if (localStorage.getItem("token")) {
                    localStorage.setItem("token", newToken);
                } else {
                    sessionStorage.setItem("token", newToken);
                }

                // Update default header for future requests
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

                // Notify queued subscribers
                onTokenRefreshed(newToken);

                // Retry the original failed request with the new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh failed — reject all queued requests before clearing
                refreshSubscribers.forEach((subscriber) => {
                    if (subscriber.reject) {
                        subscriber.reject(refreshError);
                    }
                });
                refreshSubscribers = [];
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        if (status === 500) {
            console.error("Server error. Please try again later.");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
