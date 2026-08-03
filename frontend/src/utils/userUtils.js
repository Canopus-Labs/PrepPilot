export const getUserInitial = (user) => {
  if (!user) return "?";
  return user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U";
};
