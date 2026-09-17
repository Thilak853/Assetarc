export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  TECH: "TECH",
  SUPERVISOR: "SUPERVISOR",
};

export const getCurrentRole = (auth) => {
  return String(
    auth?.role ||
      auth?.user?.role ||
      localStorage.getItem("role") ||
      ""
  ).toUpperCase();
};

export const hasRole = (auth, roles) => {
  const currentRole = getCurrentRole(auth);

  return roles.includes(currentRole);
};

export const canManageAssets = (auth) => {
  return hasRole(auth, [
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]);
};

export const canPerformMaintenance = (auth) => {
  return hasRole(auth, [
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.TECH,
  ]);
};

export const isAdmin = (auth) => {
  return hasRole(auth, [
    ROLES.ADMIN,
  ]);
};