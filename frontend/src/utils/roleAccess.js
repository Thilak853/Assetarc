// src/utils/roleAccess.js

export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  ASSET_MANAGER: "ASSET_MANAGER",
  TECH: "TECH",
  SUPERVISOR: "SUPERVISOR",
};

export const normalizeRole = (role) => {
  const value = String(role || "")
    .trim()
    .toUpperCase();

  switch (value) {
    case "ADMINISTRATOR":
      return "ADMIN";

    case "ASSET_MANAGER":
      return "MANAGER";

    case "MANAGER":
      return "MANAGER";

    case "TECHNICIAN":
      return "TECH";

    case "TECH":
      return "TECH";

    case "SUPERVISOR":
      return "SUPERVISOR";

    case "ADMIN":
      return "ADMIN";

    default:
      return value;
  }
};

export const hasRole = (role, allowedRoles = []) => {
  const currentRole = normalizeRole(role);

  return allowedRoles.some(
    (allowedRole) =>
      normalizeRole(allowedRole) === currentRole
  );
};

// =====================================================
// NAVIGATION ACCESS
// =====================================================

export const canAccessDashboard = () => true;

export const canAccessAssets = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "TECH",
    "SUPERVISOR",
  ]);

export const canAccessMaintenance = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "TECH",
    "SUPERVISOR",
  ]);

export const canAccessHealth = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "TECH",
    "SUPERVISOR",
  ]);

export const canAccessReports = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "SUPERVISOR",
  ]);

export const canAccessAdmin = (role) =>
  hasRole(role, ["ADMIN"]);

// =====================================================
// ASSET ACCESS
// =====================================================

export const canViewAsset = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "TECH",
    "SUPERVISOR",
  ]);

export const canAddAsset = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
  ]);

export const canEditAsset = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
  ]);

export const canDecommissionAsset = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
  ]);

// =====================================================
// MAINTENANCE ACCESS
// =====================================================

export const canViewMaintenance = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "TECH",
    "SUPERVISOR",
  ]);

export const canScheduleMaintenance = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "SUPERVISOR",
  ]);

export const canCompleteMaintenance = (role) =>
  hasRole(role, [
    "ADMIN",
    "TECH",
  ]);

// =====================================================
// HEALTH
// =====================================================

export const canRefreshHealth = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "TECH",
    "SUPERVISOR",
  ]);

// =====================================================
// REPORTS
// =====================================================

export const canExportReport = (role) =>
  hasRole(role, [
    "ADMIN",
    "MANAGER",
    "SUPERVISOR",
  ]);

// =====================================================
// ADMIN
// =====================================================

export const canManageUsers = (role) =>
  hasRole(role, ["ADMIN"]);

export const canEditUser = (role) =>
  hasRole(role, ["ADMIN"]);

export const canDeleteUser = (role) =>
  hasRole(role, ["ADMIN"]);