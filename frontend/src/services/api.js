


import axios from "axios";

const API_BASE_URL =
  "http://localhost:8080/api";

const getToken = () =>
  localStorage.getItem(
    "token"
  ) ||
  localStorage.getItem(
    "authToken"
  ) ||
  "";

const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      clearAuthSession();
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    if (status === 403) {
      if (window.location.pathname !== "/") {
        window.location.href = "/dashboard";
      }
    }

    return Promise.reject(error);
  }
);

const makeConfig = (
  config = {}
) => {
  const token =
    getToken();

  const headers = {
    ...(config.headers || {}),
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  return {
    ...config,
    headers,
  };
};

const api = {
  get: (
    url,
    config
  ) => {
    if (
      !config &&
      !getToken()
    ) {
      return apiClient.get(url);
    }

    return apiClient.get(
      url,
      makeConfig(config)
    );
  },

  post: (
    url,
    data,
    config
  ) => {
    if (
      !config &&
      !getToken()
    ) {
      return apiClient.post(
        url,
        data
      );
    }

    return apiClient.post(
      url,
      data,
      makeConfig(config)
    );
  },

  put: (
    url,
    data,
    config
  ) => {
    if (
      !config &&
      !getToken()
    ) {
      return apiClient.put(
        url,
        data
      );
    }

    return apiClient.put(
      url,
      data,
      makeConfig(config)
    );
  },

  delete: (
    url,
    config
  ) => {
    if (
      !config &&
      !getToken()
    ) {
      return apiClient.delete(url);
    }

    return apiClient.delete(
      url,
      makeConfig(config)
    );
  },
};

export {
  API_BASE_URL,
  getToken,
};

export default api;