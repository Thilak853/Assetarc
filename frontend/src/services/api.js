


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
      return axios.get(
        `${API_BASE_URL}${url}`
      );
    }

    return axios.get(
      `${API_BASE_URL}${url}`,
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
      return axios.post(
        `${API_BASE_URL}${url}`,
        data
      );
    }

    return axios.post(
      `${API_BASE_URL}${url}`,
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
      return axios.put(
        `${API_BASE_URL}${url}`,
        data
      );
    }

    return axios.put(
      `${API_BASE_URL}${url}`,
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
      return axios.delete(
        `${API_BASE_URL}${url}`
      );
    }

    return axios.delete(
      `${API_BASE_URL}${url}`,
      makeConfig(config)
    );
  },
};

export {
  API_BASE_URL,
  getToken,
};

export default api;