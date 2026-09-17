



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