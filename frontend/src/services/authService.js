


import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post(
      "/auth/login",
      credentials
    );

    if (!response) {
      return null;
    }

    if (response.data !== undefined) {
      return response.data;
    }

    return response;
  },

  register: async (data) => {
    const response = await api.post(
      "/auth/register",
      data
    );

    if (!response) {
      return null;
    }

    if (response.data !== undefined) {
      return response.data;
    }

    return response;
  },
};

export default authService;