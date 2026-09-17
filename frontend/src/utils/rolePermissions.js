// src/utils/rolePermissions.js

export const normalizeRole = (role) => {
  const value = String(role || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  // Support both backend enum names and shorter frontend names
  const aliases = {
    ADMIN: "SYSTEM_ADMIN",
    ADMINISTRATOR: "SYSTEM_ADMIN",
    SYSTEMADMIN: "SYSTEM_ADMIN",
    SYSTEM_ADMIN: "SYSTEM_ADMIN",

    MANAGER: "ASSET_MANAGER",
    ASSETMANAGER: "ASSET_MANAGER",
    ASSET_MANAGER: "ASSET_MANAGER",

    TECH: "MAINTENANCE_TECHNICIAN",
    TECHNICIAN: "MAINTENANCE_TECHNICIAN",
    MAINTENANCETECHNICIAN: "MAINTENANCE_TECHNICIAN",
    MAINTENANCE_TECHNICIAN: "MAINTENANCE_TECHNICIAN",

    SUPERVISOR: "OPERATIONS_SUPERVISOR",
    OPERATIONSSUPERVISOR: "OPERATIONS_SUPERVISOR",
    OPERATIONS_SUPERVISOR: "OPERATIONS_SUPERVISOR",
  };

  return aliases[value] || value;
};


export const isAdmin = (role) => {
  return normalizeRole(role) === "SYSTEM_ADMIN";
};


export const isManager = (role) => {
  return normalizeRole(role) === "ASSET_MANAGER";
};


export const canModifyAssets = (role) => {
  const normalized = normalizeRole(role);

  return (
    normalized === "SYSTEM_ADMIN" ||
    normalized === "ASSET_MANAGER"
  );
};


export const canAddAsset = (role) => {
  return canModifyAssets(role);
};


export const canEditAsset = (role) => {
  return canModifyAssets(role);
};


export const canDecommissionAsset = (role) => {
  return canModifyAssets(role);
};


export const canViewAssets = (role) => {
  return [
    "SYSTEM_ADMIN",
    "ASSET_MANAGER",
    "MAINTENANCE_TECHNICIAN",
    "OPERATIONS_SUPERVISOR",
  ].includes(normalizeRole(role));
};


export const canScheduleMaintenance = (role) => {
  return [
    "SYSTEM_ADMIN",
    "ASSET_MANAGER",
    "MAINTENANCE_TECHNICIAN",
    "OPERATIONS_SUPERVISOR",
  ].includes(normalizeRole(role));
};


export const canCompleteMaintenance = (role) => {
  return [
    "SYSTEM_ADMIN",
    "ASSET_MANAGER",
    "MAINTENANCE_TECHNICIAN",
  ].includes(normalizeRole(role));
};


export const canViewHealth = (role) => {
  return [
    "SYSTEM_ADMIN",
    "ASSET_MANAGER",
    "MAINTENANCE_TECHNICIAN",
    "OPERATIONS_SUPERVISOR",
  ].includes(normalizeRole(role));
};


export const canViewReports = (role) => {
  return [
    "SYSTEM_ADMIN",
    "ASSET_MANAGER",
    "MAINTENANCE_TECHNICIAN",
    "OPERATIONS_SUPERVISOR",
  ].includes(normalizeRole(role));
};


export const canAccessAdmin = (role) => {
  return isAdmin(role);
};


export const canManageUsers = (role) => {
  return isAdmin(role);
};