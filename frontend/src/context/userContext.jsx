/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";

import {
    isMockAuthEnabled,
    getMockUser,
    clearMockUser,
} from "../utils/mockAuth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sheetProgress, setSheetProgress] = useState([]);

    useEffect(() => {
        if (user) return;

        if (isMockAuthEnabled()) {
            const mockUser = getMockUser();
            if (mockUser) {
                setUser(mockUser);
            }
            setLoading(false);
            return;
        }

        const accessToken =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");
        if (!accessToken) {
            setLoading(false);
            return;
        }

 const fetchUser = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
    } catch (error) {
        // Only clear the session if the error is a genuine auth failure
        // (401 after the interceptor already tried to refresh, or no token at all).
        // Don't clear on network errors or 5xx so we don't log users out on transient failures.
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            clearUser();
        }
        setLoading(false);
        return;
    } finally {
        setLoading(false);
    }
    try {
        const progressRes = await axiosInstance.get("/api/user/sheet-progress");
        setSheetProgress(progressRes.data.progressList || []);
    } catch (error) {
        console.error("Failed to load progress:", error);
    }
};
        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        setLoading(false);
    };
    const clearUser = () => {
        setUser(null);
        setSheetProgress([]);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        clearMockUser();
    };
    // Optionally, add a function to refresh sheet progress
    const refreshSheetProgress = async () => {
        try {
            const progressRes = await axiosInstance.get("/api/user/sheet-progress");
            setSheetProgress(progressRes.data.progressList || []);
        } catch (error) {
    toast.error("Unable to refresh progress. Please try again.");
}
    };
    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser, sheetProgress, refreshSheetProgress }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
