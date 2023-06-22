import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.81.172:3000/api/v1", //"http://192.168.0.106:3000/api/v1",
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.request.use(
  async (config) => {
    if (!config.url.includes("login")) {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const auth = token ? `Bearer ${token}` : "";
        config.headers.Authorization = auth;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const useGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get(url);
      setData(response.data);
      setError("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch };
};

export const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setLoading(true);

    try {
      const result = await api.post(url, data);
      setLoading(false);
      setError("");
      return result.data;
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  return { data, postData, loading, error };
};

export const usePut = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (id, data) => {
    setLoading(true);

    try {
      await api.put(url + "/" + id, data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { putData, loading, error };
};

export const useDelete = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (id?) => {
    setLoading(true);

    try {
      if (id) {
        await api.delete(url + "/" + id);
      } else {
        await api.delete(url);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export const usePatch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = async (data?) => {
    setLoading(true);

    try {
      await api.patch(url, data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { patchData, loading, error };
};
