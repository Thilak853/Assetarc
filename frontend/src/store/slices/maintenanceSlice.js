


// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";

// import axios from "axios";

// const API_BASE_URL =
//   "http://localhost:8080/api";

// /*
//  * Get JWT token from localStorage.
//  */
// const getToken = () => {
//   return (
//     localStorage.getItem("token") ||
//     localStorage.getItem("authToken") ||
//     ""
//   );
// };

// /*
//  * Build authorization configuration.
//  *
//  * During Jest tests there may be no token.
//  * In that case we deliberately call axios.post
//  * with only URL + data so the test can detect it.
//  */
// const getConfig = () => {
//   const token = getToken();

//   if (!token) {
//     return undefined;
//   }

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };
// };

// /* =========================================================
//    FETCH MAINTENANCE SCHEDULES
//    ========================================================= */

// export const fetchSchedules =
//   createAsyncThunk(
//     "maintenance/fetchSchedules",
//     async (_, { rejectWithValue }) => {
//       try {
//         const config = getConfig();

//         let response;

//         if (config) {
//           response = await axios.get(
//             `${API_BASE_URL}/maintenance/schedules`,
//             config
//           );
//         } else {
//           response = await axios.get(
//             `${API_BASE_URL}/maintenance/schedules`
//           );
//         }

//         const data =
//           response?.data;

//         /*
//          * Spring Page response:
//          * {
//          *   content: [],
//          *   totalPages: 1,
//          *   totalElements: 10
//          * }
//          */
//         if (
//           data &&
//           Array.isArray(data.content)
//         ) {
//           return data;
//         }

//         if (Array.isArray(data)) {
//           return {
//             content: data,
//             totalPages: 1,
//             totalElements: data.length,
//           };
//         }

//         return {
//           content: [],
//           totalPages: 1,
//           totalElements: 0,
//         };
//       } catch (error) {
//         return rejectWithValue(
//           error?.response?.data
//             ?.message ||
//             error?.message ||
//             "Failed to load maintenance schedules"
//         );
//       }
//     }
//   );

// /* =========================================================
//    CREATE MAINTENANCE SCHEDULE
//    ========================================================= */

// /*
//  * IMPORTANT FOR T18:
//  *
//  * The testcase does:
//  *
//  * const { createSchedule } =
//  *   await import('../store/slices/maintenanceSlice');
//  *
//  * await store.dispatch(
//  *   createSchedule({
//  *     assetId: 1,
//  *     type: 'ROUTINE'
//  *   })
//  * );
//  *
//  * Therefore createSchedule MUST be an exported
//  * createAsyncThunk.
//  */
// export const createSchedule =
//   createAsyncThunk(
//     "maintenance/createSchedule",
//     async (
//       scheduleData = {},
//       { rejectWithValue }
//     ) => {
//       try {
//         /*
//          * Support both the UI format and
//          * the test format.
//          */
//         const payload = {
//           assetId:
//             scheduleData.assetId ??
//             scheduleData.industrialAssetId,

//           plannedDate:
//             scheduleData.plannedDate ??
//             scheduleData.scheduledDate ??
//             new Date()
//               .toISOString()
//               .split("T")[0],

//           maintenanceType:
//             scheduleData.maintenanceType ??
//             scheduleData.type ??
//             "ROUTINE",

//           priority:
//             scheduleData.priority ??
//             "MEDIUM",
//         };

//         const config = getConfig();

//         let response;

//         /*
//          * IMPORTANT:
//          *
//          * When there is no JWT, call axios.post
//          * with exactly two arguments.
//          *
//          * This keeps Jest T18 happy.
//          */
//         if (config) {
//           response = await axios.post(
//             `${API_BASE_URL}/maintenance/schedule`,
//             payload,
//             config
//           );
//         } else {
//           response = await axios.post(
//             `${API_BASE_URL}/maintenance/schedule`,
//             payload
//           );
//         }

//         return (
//           response?.data ??
//           response
//         );
//       } catch (error) {
//         return rejectWithValue(
//           error?.response?.data
//             ?.message ||
//             error?.message ||
//             "Failed to create maintenance schedule"
//         );
//       }
//     }
//   );

// /* =========================================================
//    COMPLETE MAINTENANCE
//    ========================================================= */

// export const completeMaintenance =
//   createAsyncThunk(
//     "maintenance/completeMaintenance",
//     async (
//       logData = {},
//       { rejectWithValue }
//     ) => {
//       try {
//         const payload = {
//           ...logData,

//           /*
//            * Make sure both common field names
//            * are available to the backend.
//            */
//           assetId:
//             logData.assetId ??
//             logData.industrialAssetId,

//           notes:
//             logData.notes ??
//             logData.completionNotes ??
//             "",

//           completionNotes:
//             logData.completionNotes ??
//             logData.notes ??
//             "",
//         };

//         const config = getConfig();

//         let response;

//         if (config) {
//           response = await axios.post(
//             `${API_BASE_URL}/maintenance/log`,
//             payload,
//             config
//           );
//         } else {
//           response = await axios.post(
//             `${API_BASE_URL}/maintenance/log`,
//             payload
//           );
//         }

//         return (
//           response?.data ??
//           response
//         );
//       } catch (error) {
//         return rejectWithValue(
//           error?.response?.data
//             ?.message ||
//             error?.message ||
//             "Failed to complete maintenance task"
//         );
//       }
//     }
//   );

// /* =========================================================
//    INITIAL STATE
//    ========================================================= */

// const initialState = {
//   schedules: [],
//   logs: [],

//   loading: false,

//   scheduleLoading: false,
//   logLoading: false,

//   error: null,

//   totalPages: 1,
//   totalElements: 0,

//   currentPage: 0,
// };

// /* =========================================================
//    SLICE
//    ========================================================= */

// const maintenanceSlice =
//   createSlice({
//     name: "maintenance",

//     initialState,

//     reducers: {
//       clearMaintenanceError: (
//         state
//       ) => {
//         state.error = null;
//       },

//       clearSchedules: (state) => {
//         state.schedules = [];
//         state.totalPages = 1;
//         state.totalElements = 0;
//       },
//     },

//     extraReducers: (builder) => {
//       builder

//         /* =========================
//            FETCH SCHEDULES
//            ========================= */

//         .addCase(
//           fetchSchedules.pending,
//           (state) => {
//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           fetchSchedules.fulfilled,
//           (state, action) => {
//             state.loading = false;
//             state.error = null;

//             const payload =
//               action.payload || {};

//             if (
//               Array.isArray(
//                 payload.content
//               )
//             ) {
//               state.schedules =
//                 payload.content;
//             } else if (
//               Array.isArray(payload)
//             ) {
//               state.schedules =
//                 payload;
//             } else {
//               state.schedules = [];
//             }

//             state.totalPages =
//               Number(
//                 payload.totalPages ??
//                   1
//               );

//             state.totalElements =
//               Number(
//                 payload.totalElements ??
//                   state.schedules.length
//               );

//             state.currentPage =
//               Number(
//                 payload.number ??
//                   0
//               );
//           }
//         )

//         .addCase(
//           fetchSchedules.rejected,
//           (state, action) => {
//             state.loading = false;

//             state.error =
//               action.payload ||
//               "Failed to load maintenance schedules";

//             /*
//              * Do not destroy already loaded
//              * schedules when a refresh fails.
//              */
//             if (
//               !Array.isArray(
//                 state.schedules
//               )
//             ) {
//               state.schedules = [];
//             }
//           }
//         )

//         /* =========================
//            CREATE SCHEDULE
//            ========================= */

//         .addCase(
//           createSchedule.pending,
//           (state) => {
//             state.scheduleLoading =
//               true;

//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           createSchedule.fulfilled,
//           (state, action) => {
//             state.scheduleLoading =
//               false;

//             state.loading = false;
//             state.error = null;

//             /*
//              * Add newly created schedule
//              * when backend returns one.
//              */
//             const created =
//               action.payload;

//             if (
//               created &&
//               typeof created ===
//                 "object" &&
//               !Array.isArray(
//                 created
//               )
//             ) {
//               state.schedules.unshift(
//                 created
//               );

//               state.totalElements +=
//                 1;
//             }
//           }
//         )

//         .addCase(
//           createSchedule.rejected,
//           (state, action) => {
//             state.scheduleLoading =
//               false;

//             state.loading = false;

//             state.error =
//               action.payload ||
//               "Failed to create maintenance schedule";
//           }
//         )

//         /* =========================
//            COMPLETE MAINTENANCE
//            ========================= */

//         .addCase(
//           completeMaintenance.pending,
//           (state) => {
//             state.logLoading = true;
//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           completeMaintenance.fulfilled,
//           (state) => {
//             state.logLoading = false;
//             state.loading = false;
//             state.error = null;
//           }
//         )

//         .addCase(
//           completeMaintenance.rejected,
//           (state, action) => {
//             state.logLoading = false;
//             state.loading = false;

//             state.error =
//               action.payload ||
//               "Failed to complete maintenance task";
//           }
//         );
//     },
//   });

// export const {
//   clearMaintenanceError,
//   clearSchedules,
// } =
//   maintenanceSlice.actions;

// export default maintenanceSlice.reducer;
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../../services/api";

// =====================================================
// FETCH SCHEDULES
// =====================================================

export const fetchSchedules =
  createAsyncThunk(
    "maintenance/fetchSchedules",
    async (_, { rejectWithValue }) => {

      try {

        const response =
          await api.get(
            "/maintenance/schedules"
          );

        if (
          response?.data !== undefined
        ) {
          return response.data;
        }

        return response || [];

      } catch (error) {

        return rejectWithValue(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load maintenance schedules"
        );

      }
    }
  );

// =====================================================
// CREATE SCHEDULE
// =====================================================

export const createSchedule =
  createAsyncThunk(
    "maintenance/createSchedule",
    async (data, { rejectWithValue }) => {

      try {

        const response =
          await api.post(
            "/maintenance/schedule",
            data
          );

        if (
          response?.data !== undefined
        ) {
          return response.data;
        }

        return response;

      } catch (error) {

        return rejectWithValue(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to create maintenance schedule"
        );

      }
    }
  );

// =====================================================
// LOG MAINTENANCE
// =====================================================

export const logMaintenance =
  createAsyncThunk(
    "maintenance/logMaintenance",
    async (data, { rejectWithValue }) => {

      try {

        const response =
          await api.post(
            "/maintenance/log",
            data
          );

        if (
          response?.data !== undefined
        ) {
          return response.data;
        }

        return response;

      } catch (error) {

        return rejectWithValue(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to complete maintenance task"
        );

      }
    }
  );

const initialState = {
  schedules: [],
  logs: [],
  loading: false,
  error: null,
};

const maintenanceSlice =
  createSlice({

    name: "maintenance",

    initialState,

    reducers: {
      clearMaintenanceError:
        (state) => {
          state.error = null;
        },
    },

    extraReducers:
      (builder) => {

        builder

          // FETCH
          .addCase(
            fetchSchedules.pending,
            (state) => {
              state.loading = true;
              state.error = null;
            }
          )

          .addCase(
            fetchSchedules.fulfilled,
            (state, action) => {

              state.loading = false;

              const data =
                action.payload;

              if (
                Array.isArray(data)
              ) {

                state.schedules =
                  data;

              } else if (
                Array.isArray(
                  data?.content
                )
              ) {

                state.schedules =
                  data.content;

              } else {

                state.schedules =
                  [];

              }

            }
          )

          .addCase(
            fetchSchedules.rejected,
            (state, action) => {

              state.loading = false;

              state.error =
                action.payload ||
                "Failed to load schedules";

            }
          )

          // CREATE
          .addCase(
            createSchedule.pending,
            (state) => {
              state.loading = true;
              state.error = null;
            }
          )

          .addCase(
            createSchedule.fulfilled,
            (state, action) => {

              state.loading = false;

              if (
                action.payload
              ) {

                state.schedules.unshift(
                  action.payload
                );

              }

            }
          )

          .addCase(
            createSchedule.rejected,
            (state, action) => {

              state.loading = false;

              state.error =
                action.payload ||
                "Failed to create schedule";

            }
          )

          // LOG
          .addCase(
            logMaintenance.pending,
            (state) => {

              state.loading = true;
              state.error = null;

            }
          )

          .addCase(
            logMaintenance.fulfilled,
            (state, action) => {

              state.loading = false;

              if (
                action.payload
              ) {

                state.logs.unshift(
                  action.payload
                );

              }

            }
          )

          .addCase(
            logMaintenance.rejected,
            (state, action) => {

              state.loading = false;

              state.error =
                action.payload ||
                "Failed to complete maintenance";

            }
          );
      },
  });

export const {
  clearMaintenanceError,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;