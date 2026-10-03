import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    withCredentials: true,   // needed for the refresh-token cookie
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest", // required by backend CSRF header check on cookie-based auth routes
    },
});

// ── CSRF token (double-submit cookie) ─────────────────────────────────────
// /api/auth/refresh and /api/auth/logout authenticate off an httpOnly cookie, so
// the backend requires an X-CSRF-Token header matching its `csrfToken` cookie.
// The token is fetched from the backend (which also sets the cookie) and kept in
// memory; the cookie lives on the API origin so it can't be read from here.
let csrfToken = null;
let csrfRequest = null;

function fetchCsrfToken(force = false) {
    if (csrfToken && !force) return Promise.resolve(csrfToken);
    if (!csrfRequest) {
        csrfRequest = axios
            .get(`${BASE_URL}/api/auth/csrf-token`, { withCredentials: true })
            .then(({ data }) => {
                if (!data?.csrfToken) throw new Error("No CSRF token in response");
                csrfToken = data.csrfToken;
                return csrfToken;
            })
            .finally(() => {
                csrfRequest = null;
            });
    }
    return csrfRequest;
}

const isLogoutUrl = (url = "") => url.includes("/auth/logout");

// ── Request interceptor — attach access token (+ CSRF token for logout) ───
axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        if (isLogoutUrl(config.url)) {
            config.headers["X-CSRF-Token"] = await fetchCsrfToken();
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// POST /api/auth/refresh with a CSRF token; if the token was rejected (cookie
// expired or rotated), fetch a fresh one and retry exactly once.
async function requestTokenRefresh(allowCsrfRetry = true) {
    const token = await fetchCsrfToken();
    try {
        return await axios.post(
            `${BASE_URL}/api/auth/refresh`,
            {},
            {
                withCredentials: true,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": token,
                },
            }
        );
    } catch (err) {
        if (allowCsrfRetry && err.response?.status === 403) {
            await fetchCsrfToken(true);
            return requestTokenRefresh(false);
        }
        throw err;
    }
}

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
                const { data } = await requestTokenRefresh();

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

        // Logout rejected for a stale/missing CSRF token: refresh it and retry once.
        if (status === 403 && isLogoutUrl(url) && !originalRequest._csrfRetried) {
            originalRequest._csrfRetried = true;
            originalRequest.headers["X-CSRF-Token"] = await fetchCsrfToken(true);
            return axiosInstance(originalRequest);
        }

        if (status === 500) {
            console.error("Server error. Please try again later.");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;