


// import api from "./api";

// const maintenanceService = {
//   getSchedules: async () => {
//     const response = await api.get(
//       "/maintenance/schedules"
//     );

//     if (response == null) {
//       return [];
//     }

//     if (response.data !== undefined) {
//       return response.data;
//     }

//     return response;
//   },

//   getLogs: async () => {
//     const response = await api.get(
//       "/maintenance/logs"
//     );

//     if (response == null) {
//       return [];
//     }

//     if (response.data !== undefined) {
//       return response.data;
//     }

//     return response;
//   },

//   createSchedule: async (data) => {
//     const response = await api.post(
//       "/maintenance/schedule",
//       data
//     );

//     if (response == null) {
//       return null;
//     }

//     if (response.data !== undefined) {
//       return response.data;
//     }

//     return response;
//   },

//   completeMaintenance: async (
//     data
//   ) => {
//     const response = await api.post(
//       "/maintenance/log",
//       data
//     );

//     if (response == null) {
//       return null;
//     }

//     if (response.data !== undefined) {
//       return response.data;
//     }

//     return response;
//   },

//   createLog: async (data) => {
//     return maintenanceService.completeMaintenance(
//       data
//     );
//   },
// };

// export const fetchSchedules =
//   maintenanceService.getSchedules;

// export const getSchedules =
//   maintenanceService.getSchedules;

// export const createSchedule =
//   maintenanceService.createSchedule;

// export const completeMaintenance =
//   maintenanceService.completeMaintenance;

// export const createMaintenanceLog =
//   maintenanceService.createLog;

// export default maintenanceService;
import api from "./api";

const maintenanceService = {

  getSchedules: async () => {
    const response =
      await api.get("/maintenance/schedules");

    if (!response) return [];

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  },

  getLogs: async () => {
    const response =
      await api.get("/maintenance/logs");

    if (!response) return [];

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  },

  createSchedule: async (data) => {
    const response =
      await api.post(
        "/maintenance/schedule",
        data
      );

    return response?.data ?? response;
  },

  completeMaintenance: async (data) => {
    const response =
      await api.post(
        "/maintenance/complete",
        data
      );

    return response?.data ?? response;
  },

  deleteLog: async (id) => {
    const response =
      await api.delete(
        `/maintenance/logs/${id}`
      );

    return response?.data ?? response;
  }
};

export const getSchedules =
  maintenanceService.getSchedules;

export const getMaintenanceLogs =
  maintenanceService.getLogs;

export const createSchedule =
  maintenanceService.createSchedule;

export const completeMaintenance =
  maintenanceService.completeMaintenance;

export const deleteMaintenanceLog =
  maintenanceService.deleteLog;

export default maintenanceService;