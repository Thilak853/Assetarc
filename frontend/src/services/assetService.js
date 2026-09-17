


import api from "./api";

const assetService = {

  getAll: async (params = {}) => {
    const response =
      Object.keys(params).length > 0
        ? await api.get("/assets", { params })
        : await api.get("/assets");

    if (!response) return [];

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.data?.content)) {
      return response.data.content;
    }

    if (Array.isArray(response.content)) {
      return response.content;
    }

    return [];
  },

  getById: async (id) => {
    const response =
      await api.get(`/assets/${id}`);

    return response?.data ?? response;
  },

  create: async (data) => {
    const response =
      await api.post("/assets", data);

    return response?.data ?? response;
  },

  update: async (id, data) => {
    const response =
      await api.put(`/assets/${id}`, data);

    return response?.data ?? response;
  },

  delete: async (id) => {
    const response =
      await api.delete(`/assets/${id}`);

    return response?.data ?? response;
  },

  decommission: async (id) => {
    const response =
      await api.delete(`/assets/${id}`);

    return response?.data ?? response;
  }
};

export const fetchAssets =
  assetService.getAll;

export const getAssets =
  assetService.getAll;

export const getAssetById =
  assetService.getById;

export const createAsset =
  assetService.create;

export const updateAsset =
  assetService.update;

export const deleteAsset =
  assetService.delete;

export const decommissionAsset =
  assetService.decommission;

export default assetService;