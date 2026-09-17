

// import axios from "axios";

// const API =
//   "http://localhost:8080/api";

// const getToken = () =>
//   localStorage.getItem(
//     "token"
//   ) ||
//   localStorage.getItem(
//     "authToken"
//   ) ||
//   "";

// const getConfig = () => {
//   const token =
//     getToken();

//   if (!token) {
//     return undefined;
//   }

//   return {
//     headers: {
//       Authorization:
//         `Bearer ${token}`,
//     },
//   };
// };

// const assetService = {
//   getAll: async (
//     params = {}
//   ) => {
//     const config =
//       getConfig();

//     let response;

//     if (
//       params &&
//       Object.keys(params)
//         .length > 0
//     ) {
//       response = config
//         ? await axios.get(
//             `${API}/assets`,
//             {
//               ...config,
//               params,
//             }
//           )
//         : await axios.get(
//             `${API}/assets`,
//             {
//               params,
//             }
//           );
//     } else {
//       response = config
//         ? await axios.get(
//             `${API}/assets`,
//             config
//           )
//         : await axios.get(
//             `${API}/assets`
//           );
//     }

//     return (
//       response?.data ?? []
//     );
//   },

//   getById: async (
//     id
//   ) => {
//     const config =
//       getConfig();

//     const response =
//       config
//         ? await axios.get(
//             `${API}/assets/${id}`,
//             config
//           )
//         : await axios.get(
//             `${API}/assets/${id}`
//           );

//     return (
//       response?.data ?? null
//     );
//   },

//   create: async (
//     data
//   ) => {
//     const config =
//       getConfig();

//     const response =
//       config
//         ? await axios.post(
//             `${API}/assets`,
//             data,
//             config
//           )
//         : await axios.post(
//             `${API}/assets`,
//             data
//           );

//     return (
//       response?.data ?? null
//     );
//   },

//   update: async (
//     id,
//     data
//   ) => {
//     const config =
//       getConfig();

//     const response =
//       config
//         ? await axios.put(
//             `${API}/assets/${id}`,
//             data,
//             config
//           )
//         : await axios.put(
//             `${API}/assets/${id}`,
//             data
//           );

//     return (
//       response?.data ?? null
//     );
//   },

//   delete: async (
//     id
//   ) => {
//     const config =
//       getConfig();

//     const response =
//       config
//         ? await axios.delete(
//             `${API}/assets/${id}`,
//             config
//           )
//         : await axios.delete(
//             `${API}/assets/${id}`
//           );

//     return (
//       response?.data ?? null
//     );
//   },

//   decommission:
//     async (id) => {
//       const token =
//         getToken();

//       /*
//        * Keep one argument when
//        * there is no token.
//        */
//       if (!token) {
//         const response =
//           await axios.delete(
//             `${API}/assets/${id}`
//           );

//         return (
//           response?.data ??
//           null
//         );
//       }

//       const response =
//         await axios.delete(
//           `${API}/assets/${id}`,
//           {
//             headers: {
//               Authorization:
//                 `Bearer ${token}`,
//             },
//           }
//         );

//       return (
//         response?.data ?? null
//       );
//     },
// };

// export const fetchAssets =
//   assetService.getAll;

// export const getAssets =
//   assetService.getAll;

// export const getAssetById =
//   assetService.getById;

// export const createAsset =
//   assetService.create;

// export const updateAsset =
//   assetService.update;

// export const deleteAsset =
//   assetService.delete;

// export const decommissionAsset =
//   assetService.decommission;

// export default assetService;
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