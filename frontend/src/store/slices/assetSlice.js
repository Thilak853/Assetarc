
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import assetService from "../../services/assetService";


/* =========================================================
   FETCH ASSETS
========================================================= */

export const fetchAssets =
  createAsyncThunk(
    "assets/fetchAssets",

    async (
      params = {},
      { rejectWithValue }
    ) => {

      try {

        const response =
          await assetService.getAll(
            params
          );


        /*
         * assetService already tries to
         * normalize the response.
         */

        if (
          Array.isArray(response)
        ) {
          return response;
        }


        if (
          response &&
          Array.isArray(
            response.data
          )
        ) {
          return response.data;
        }


        if (
          response &&
          Array.isArray(
            response.content
          )
        ) {
          return response.content;
        }


        if (
          response &&
          response.data &&
          Array.isArray(
            response.data.content
          )
        ) {
          return response.data.content;
        }


        return [];

      } catch (error) {

        return rejectWithValue(
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load assets."
        );

      }

    }
  );


/* =========================================================
   CREATE ASSET
========================================================= */

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
          error?.response?.data?.message ||
          error?.message ||
          "Unable to create asset."
        );

      }

    }
  );


/* =========================================================
   UPDATE ASSET
========================================================= */

export const updateAsset =
  createAsyncThunk(
    "assets/updateAsset",

    async (
      { id, data },
      { rejectWithValue }
    ) => {

      try {

        if (
          id === null ||
          id === undefined ||
          String(id).startsWith("demo-")
        ) {
          throw new Error(
            "Demo assets cannot be sent to the backend."
          );
        }


        return await assetService.update(
          id,
          data
        );

      } catch (error) {

        return rejectWithValue(
          error?.response?.data?.message ||
          error?.message ||
          "Unable to update asset."
        );

      }

    }
  );


/* =========================================================
   DELETE ASSET
========================================================= */

export const deleteAsset =
  createAsyncThunk(
    "assets/deleteAsset",

    async (
      id,
      { rejectWithValue }
    ) => {

      try {

        return await assetService.delete(
          id
        );

      } catch (error) {

        return rejectWithValue(
          error?.response?.data?.message ||
          error?.message ||
          "Unable to delete asset."
        );

      }

    }
  );


/* =========================================================
   DECOMMISSION
========================================================= */

export const decommissionAsset =
  createAsyncThunk(
    "assets/decommissionAsset",

    async (
      id,
      { rejectWithValue }
    ) => {

      try {

        return await assetService.decommission(
          id
        );

      } catch (error) {

        return rejectWithValue(
          error?.response?.data?.message ||
          error?.message ||
          "Unable to decommission asset."
        );

      }

    }
  );


/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {

  assets: [],

  items: [],

  loading: false,

  error: null,

};


/* =========================================================
   SLICE
========================================================= */

const assetSlice =
  createSlice({

    name: "assets",

    initialState,

    reducers: {

      clearAssetError: (
        state
      ) => {

        state.error = null;

      },


      clearAssets: (
        state
      ) => {

        state.assets = [];

        state.items = [];

      },

    },


    extraReducers:
      (builder) => {

        /* ===============================================
           FETCH
        =============================================== */

        builder

          .addCase(
            fetchAssets.pending,
            (state) => {

              state.loading = true;

              state.error = null;

            }
          )


          .addCase(
            fetchAssets.fulfilled,
            (
              state,
              action
            ) => {

              state.loading = false;

              state.error = null;


              const assets =
                Array.isArray(
                  action.payload
                )
                  ? action.payload
                  : [];


              state.assets =
                assets;

              state.items =
                assets;

            }
          )


          .addCase(
            fetchAssets.rejected,
            (
              state,
              action
            ) => {

              state.loading = false;

              state.error =
                action.payload ||
                "Unable to load assets.";

            }
          );


        /* ===============================================
           CREATE
        =============================================== */

        builder

          .addCase(
            createAsset.pending,
            (state) => {

              state.loading = true;

              state.error = null;

            }
          )


          .addCase(
            createAsset.fulfilled,
            (
              state,
              action
            ) => {

              state.loading = false;


              if (
                action.payload
              ) {

                state.assets.push(
                  action.payload
                );

                state.items.push(
                  action.payload
                );

              }

            }
          )


          .addCase(
            createAsset.rejected,
            (
              state,
              action
            ) => {

              state.loading = false;

              state.error =
                action.payload ||
                "Unable to create asset.";

            }
          );


        /* ===============================================
           UPDATE
        =============================================== */

        builder

          .addCase(
            updateAsset.pending,
            (state) => {

              state.loading = true;

              state.error = null;

            }
          )


          .addCase(
            updateAsset.fulfilled,
            (
              state,
              action
            ) => {

              state.loading = false;


              const updated =
                action.payload;


              if (!updated) {
                return;
              }


              const id =
                updated.id;


              state.assets =
                state.assets.map(
                  (asset) =>
                    asset.id === id
                      ? {
                          ...asset,
                          ...updated,
                        }
                      : asset
                );


              state.items =
                state.items.map(
                  (asset) =>
                    asset.id === id
                      ? {
                          ...asset,
                          ...updated,
                        }
                      : asset
                );

            }
          )


          .addCase(
            updateAsset.rejected,
            (
              state,
              action
            ) => {

              state.loading = false;

              state.error =
                action.payload ||
                "Unable to update asset.";

            }
          );


        /* ===============================================
           DELETE
        =============================================== */

        builder

          .addCase(
            deleteAsset.fulfilled,
            (
              state,
              action
            ) => {

              const id =
                action.meta.arg;


              state.assets =
                state.assets.filter(
                  (asset) =>
                    asset.id !== id
                );


              state.items =
                state.items.filter(
                  (asset) =>
                    asset.id !== id
                );

            }
          );


        /* ===============================================
           DECOMMISSION
        =============================================== */

        builder

          .addCase(
            decommissionAsset.fulfilled,
            (
              state,
              action
            ) => {

              const id =
                action.meta.arg;


              state.assets =
                state.assets.map(
                  (asset) =>
                    asset.id === id
                      ? {
                          ...asset,
                          currentStatus:
                            "DECOMMISSIONED",
                        }
                      : asset
                );


              state.items =
                state.items.map(
                  (asset) =>
                    asset.id === id
                      ? {
                          ...asset,
                          currentStatus:
                            "DECOMMISSIONED",
                        }
                      : asset
                );

            }
          );

      },

  });


export const {
  clearAssetError,
  clearAssets,
} = assetSlice.actions;


export default assetSlice.reducer;