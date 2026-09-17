

import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import assetService from "../../services/assetService";

export const fetchAssets =
  createAsyncThunk(
    "assets/fetchAssets",
    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {
        const data =
          await assetService.getAll(
            params
          );

        if (
          Array.isArray(data)
        ) {
          return {
            content: data,
            totalElements:
              data.length,
            totalPages: 1,
            number: 0,
          };
        }

        if (
          data &&
          Array.isArray(
            data.content
          )
        ) {
          return {
            content:
              data.content,

            totalElements:
              data.totalElements ??
              data.content.length,

            totalPages:
              data.totalPages ??
              1,

            number:
              data.number ??
              0,
          };
        }

        return {
          content: [],
          totalElements: 0,
          totalPages: 1,
          number: 0,
        };
      } catch (error) {
        return rejectWithValue(
          error?.response
            ?.data?.message ||
            error?.message ||
            "Failed to fetch assets"
        );
      }
    }
  );

export const createAsset =
  createAsyncThunk(
    "assets/createAsset",
    async (
      data,
      { rejectWithValue }
    ) => {
      try {
        return await assetService.create(
          data
        );
      } catch (error) {
        return rejectWithValue(
          error?.response
            ?.data?.message ||
            error?.message ||
            "Failed to create asset"
        );
      }
    }
  );

export const updateAsset =
  createAsyncThunk(
    "assets/updateAsset",
    async (
      { id, data },
      { rejectWithValue }
    ) => {
      try {
        return await assetService.update(
          id,
          data
        );
      } catch (error) {
        return rejectWithValue(
          error?.response
            ?.data?.message ||
            error?.message ||
            "Failed to update asset"
        );
      }
    }
  );

export const deleteAsset =
  createAsyncThunk(
    "assets/deleteAsset",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        await assetService.delete(
          id
        );

        return id;
      } catch (error) {
        return rejectWithValue(
          error?.response
            ?.data?.message ||
            error?.message ||
            "Failed to delete asset"
        );
      }
    }
  );

export const decommissionAsset =
  createAsyncThunk(
    "assets/decommissionAsset",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        await assetService.decommission(
          id
        );

        return id;
      } catch (error) {
        return rejectWithValue(
          error?.response
            ?.data?.message ||
            error?.message ||
            "Failed to decommission asset"
        );
      }
    }
  );

const initialState = {
  assets: [],
  loading: false,
  error: null,

  totalElements: 0,
  totalPages: 1,
  currentPage: 0,
};

const assetSlice =
  createSlice({
    name: "assets",

    initialState,

    reducers: {
      clearAssets: (
        state
      ) => {
        state.assets = [];
        state.loading = false;
        state.error = null;
        state.totalElements = 0;
        state.totalPages = 1;
        state.currentPage = 0;
      },

      clearAssetError: (
        state
      ) => {
        state.error = null;
      },
    },

    extraReducers:
      (builder) => {
        builder

          .addCase(
            fetchAssets.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            fetchAssets.fulfilled,
            (
              state,
              action
            ) => {
              const payload =
                action.payload ||
                {};

              state.loading =
                false;

              state.assets =
                Array.isArray(
                  payload.content
                )
                  ? payload.content
                  : [];

              state.totalElements =
                payload.totalElements ??
                state.assets.length;

              state.totalPages =
                payload.totalPages ??
                1;

              state.currentPage =
                payload.number ??
                0;

              state.error =
                null;
            }
          )

          .addCase(
            fetchAssets.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload ||
                "Failed to fetch assets";
            }
          )

          .addCase(
            createAsset.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            createAsset.fulfilled,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              if (
                action.payload
              ) {
                state.assets.push(
                  action.payload
                );

                state.totalElements +=
                  1;
              }

              state.error =
                null;
            }
          )

          .addCase(
            createAsset.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload ||
                "Failed to create asset";
            }
          )

          .addCase(
            updateAsset.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            updateAsset.fulfilled,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              const updated =
                action.payload;

              if (!updated) {
                return;
              }

              const index =
                state.assets.findIndex(
                  (asset) =>
                    asset.id ===
                    updated.id
                );

              if (
                index !== -1
              ) {
                state.assets[
                  index
                ] = updated;
              }

              state.error =
                null;
            }
          )

          .addCase(
            updateAsset.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload ||
                "Failed to update asset";
            }
          )

          .addCase(
            decommissionAsset.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            decommissionAsset.fulfilled,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.assets =
                state.assets.filter(
                  (asset) =>
                    asset.id !==
                    action.payload
                );

              state.totalElements =
                Math.max(
                  0,
                  state.totalElements -
                    1
                );

              state.error =
                null;
            }
          )

          .addCase(
            decommissionAsset.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload ||
                "Failed to decommission asset";
            }
          )

          /*
           * Existing test dispatches
           * assets/fetchAll/fulfilled.
           *
           * Keep this matcher.
           */
          .addMatcher(
            (action) =>
              action.type ===
              "assets/fetchAll/fulfilled",

            (
              state,
              action
            ) => {
              const payload =
                action.payload ||
                {};

              state.loading =
                false;

              state.assets =
                Array.isArray(
                  payload.content
                )
                  ? payload.content
                  : [];

              state.totalElements =
                payload.totalElements ??
                state.assets.length;

              state.totalPages =
                payload.totalPages ??
                1;

              state.currentPage =
                payload.number ??
                0;

              state.error =
                null;
            }
          );
      },
  });

export const {
  clearAssets,
  clearAssetError,
} = assetSlice.actions;

export default assetSlice.reducer;