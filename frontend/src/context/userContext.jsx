import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sheetProgress, setSheetProgress] = useState([]);

    useEffect(() => {
        if (user) return;

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
        clearUser(); // only logs out if AUTH fails 
        return;
    } finally {
        setLoading(false);
    }
    try {
        const progressRes = await axiosInstance.get("/api/user/sheet-progress");
        setSheetProgress(progressRes.data.progressList || []);
    } catch (error) {
        console.error("Failed to load progress:", error);
        toast.error("Failed to load progress. Please try again.");
    }
};
        fetchUser();
    }, []);

    const updateUser = (userData) => {
    setUser(userData);
    if (userData.token) {
        localStorage.setItem("token", userData.token);
    }
    setLoading(false);
};
    const clearUser = () => {
        setUser(null);
        setSheetProgress([]);
        localStorage.removeItem("token");
sessionStorage.removeItem("token");
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