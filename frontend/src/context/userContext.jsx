import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS, BASE_URL } from "../utils/apiPaths";
import toast from "react-hot-toast";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sheetProgress, setSheetProgress] = useState([]);

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
                // Fetch all sheet progress for user
                const progressRes = await axiosInstance.get("/api/user/sheet-progress");
                setSheetProgress(progressRes.data.progressList || []);
            } catch (error) {
                clearUser();
            } finally {
                setLoading(false);
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