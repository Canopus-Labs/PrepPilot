import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export const useLogout = () => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      clearUser();
      navigate("/");
    }
  };

  return logout;
};
