

import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";

const API =
  "http://localhost:8080/api";

export const login =
  createAsyncThunk(
    "auth/login",
    async (
      { username, password },
      { rejectWithValue }
    ) => {
      try {
        const response =
          await axios.post(
            `${API}/auth/login`,
            {
              username,
              password,
            }
          );

        const data =
          response?.data || {};

        return {
          token:
            data.token ||
            data.accessToken ||
            data.jwt ||
            "",

          username:
            data.username ||
            data.user?.username ||
            username,

          role:
            data.role ||
            data.user?.role ||
            "USER",
        };
      } catch (error) {
        return rejectWithValue(
          error?.response
            ?.data?.message ||
            error?.message ||
            "Invalid Credentials. Please try again."
        );
      }
    }
  );

const initialState = {
  user: null,
  token: null,
  username: null,
  role: null,

  isAuthenticated: false,
  authenticated: false,

  loading: false,
  error: null,
};

const authSlice =
  createSlice({
    name: "auth",

    initialState,

    reducers: {
      logout: (
        state
      ) => {
        state.user = null;
        state.token = null;
        state.username = null;
        state.role = null;

        state.isAuthenticated =
          false;

        state.authenticated =
          false;

        state.loading = false;
        state.error = null;

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "authToken"
        );

        localStorage.removeItem(
          "username"
        );

        localStorage.removeItem(
          "role"
        );
      },

      clearAuthError: (
        state
      ) => {
        state.error = null;
      },
    },

    extraReducers:
      (builder) => {
        builder

          .addCase(
            login.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            login.fulfilled,
            (
              state,
              action
            ) => {
              const payload =
                action.payload ||
                {};

              const token =
                payload.token ||
                "";

              const username =
                payload.username ||
                "User";

              const role =
                payload.role ||
                "USER";

              state.loading =
                false;

              state.error =
                null;

              state.token =
                token;

              state.username =
                username;

              state.role =
                role;

              state.user = {
                token,
                username,
                role,
              };

              state.isAuthenticated =
                true;

              state.authenticated =
                true;

              if (token) {
                localStorage.setItem(
                  "token",
                  token
                );

                localStorage.setItem(
                  "authToken",
                  token
                );
              }

              localStorage.setItem(
                "username",
                username
              );

              localStorage.setItem(
                "role",
                role
              );
            }
          )

          .addCase(
            login.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload ||
                "Invalid Credentials. Please try again.";

              state.user =
                null;

              state.token =
                null;

              state.username =
                null;

              state.role =
                null;

              state.isAuthenticated =
                false;

              state.authenticated =
                false;
            }
          );
      },
  });

export const {
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;