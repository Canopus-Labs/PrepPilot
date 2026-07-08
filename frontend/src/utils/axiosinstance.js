import axios from "axios";
import { BASE_URL } from "./apiPaths";

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

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        // handle common error globally
        if(error.response){
            if(error.response.status === 401){
                // Only redirect if this wasn't a login/register attempt itself
                const url = error.config?.url || "";
                const isAuthCall = url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/auth/refresh");
                if (!isAuthCall) {
                    // Clear expired/invalid session token and redirect
                    localStorage.removeItem("token");
                    sessionStorage.removeItem("token");
                    window.location.href = "/";
                }
            }
            else if(error.response.status === 500){
                console.error("Server error. Please try again later");
            }
        }
        else if(error.code === "ECONNABORTED"){
            console.error("Request timeout. Please try again");
        }
        return Promise.reject(error);   
    }
);

export default axiosInstance;
