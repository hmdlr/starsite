import axios, { AxiosRequestConfig } from "axios";
import React from "react";
import { StarClient } from "@hmdlr/types";
import { useAuth } from "./useAuth";

const defaultOptions: AxiosRequestConfig = {
  method: "GET",
  // @ts-ignore
  headers: {
    "Content-Type": "application/json",
  },
};

const clientContext = React.createContext<{
  client: StarClient
}>({
  client: {
    get: (url: string, options?: any) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url: string, data: any, options?: any) => axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url: string, data: any, options?: any) => axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url: string, options?: any) => axios.delete(url, { ...defaultOptions, ...options }),
  }
});

export const ProvideClient = ({ children }: { children: any }) => {
  const client = useProvideClient();
  return <clientContext.Provider value={client}>{children}</clientContext.Provider>;
};

export const useClient = () => {
  return React.useContext(clientContext);
}

function useProvideClient() {
  const { token } = useAuth();
  const get = (url: string, options?: any) => axios.get(url, { ...defaultOptions, ...options });
  const post = (url: string, data: any, options?: any) => axios.post(url, data, { ...defaultOptions, ...options });
  const put = (url: string, data: any, options?: any) => axios.put(url, data, { ...defaultOptions, ...options });
  const deleteRequest = (url: string, options?: any) => axios.delete(url, { ...defaultOptions, ...options });

  React.useEffect(() => {
    axios.interceptors.request.use((config: AxiosRequestConfig) => {
      if (!config.headers) {
        // @ts-ignore
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, [token]);

  return {
    client: {
      get,
      post,
      put,
      delete: deleteRequest,
    }
  }
}
