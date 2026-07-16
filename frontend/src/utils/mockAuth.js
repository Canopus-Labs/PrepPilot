/**
 * Mock authentication utilities.
 * Mock auth is disabled by default — only activates when the
 * "mock_auth_enabled" flag is explicitly set in localStorage (dev only).
 */

const MOCK_AUTH_KEY = "mock_auth_enabled";
const MOCK_USER_KEY = "mock_user";

/**
 * Returns true only when the mock auth flag is explicitly set in localStorage.
 * Will never be true in a normal production environment.
 */
export const isMockAuthEnabled = () => {
  try {
    return localStorage.getItem(MOCK_AUTH_KEY) === "true";
  } catch {
    return false;
  }
};

/**
 * Returns the mock user object stored in localStorage, or null if not set.
 */
export const getMockUser = () => {
  try {
    const raw = localStorage.getItem(MOCK_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Persists a mock user to localStorage.
 */
export const saveMockUser = (userData) => {
  try {
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(userData));
  } catch {
    // ignore
  }
};

/**
 * Removes the mock user and mock auth flag from localStorage.
 */
export const clearMockUser = () => {
  try {
    localStorage.removeItem(MOCK_AUTH_KEY);
    localStorage.removeItem(MOCK_USER_KEY);
  } catch {
    // ignore
  }
};

/**
 * Simulates a login request when mock auth is enabled.
 * Always succeeds and returns a fake token + user object.
 */
export const mockLogin = async ({ email }) => {
  return {
    data: {
      token: "mock-token-dev",
      user: {
        _id: "mock-user-id",
        name: "Dev User",
        email: email || "dev@mock.local",
        profileImageUrl: "",
      },
    },
  };
};
