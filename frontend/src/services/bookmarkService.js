import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

/**
 * Create a new bookmark.
 * @param {{ resourceId: string, resourceType: string, title: string, description?: string, metadata?: object }} data
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const addBookmark = (data) => {
  return axiosInstance.post(API_PATHS.BOOKMARKS.ADD, data);
};

/**
 * Remove a bookmark by its MongoDB _id.
 * @param {string} bookmarkId
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const removeBookmark = (bookmarkId) => {
  return axiosInstance.delete(API_PATHS.BOOKMARKS.REMOVE(bookmarkId));
};

/**
 * Fetch bookmarks for the authenticated user.
 * @param {{ type?: string, search?: string, page?: number, limit?: number }} [params]
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const getBookmarks = (params = {}) => {
  return axiosInstance.get(API_PATHS.BOOKMARKS.GET_ALL, { params });
};
