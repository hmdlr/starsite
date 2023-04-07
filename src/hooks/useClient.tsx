import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { AxiosClient } from "@hmdlr/types";
import { useAuth } from "./useAuth";
import { Scanphish } from "@hmdlr/utils";

const defaultOptions: AxiosRequestConfig = {
  method: "GET",
  // @ts-ignore
  headers: {
    "Content-Type": "application/json",
  },
};

const clientContext = React.createContext<{
  client: AxiosClient;
  sdk: {
    scanphish: Scanphish;
  }
}>({
  client: {
    get: (url: string, options?: any) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url: string, data: any, options?: any) => axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url: string, data: any, options?: any) => axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url: string, options?: any) => axios.delete(url, { ...defaultOptions, ...options }),
  },
  sdk: {
    scanphish: undefined!
  }
});

export const ProvideClient = ({ children }: { children: any }) => {
  const client = useProvideClient();
  return <clientContext.Provider value={client}>{children}</clientContext.Provider>;
};

export const useClient = () => {
  return React.useContext(clientContext);
};

function useProvideClient() {
  const { token } = useAuth();

  // use axiosCall
  const get = (url: string, options?: any) => axios.get(url, { ...defaultOptions, ...options });
  const post = (url: string, data: any, options?: any) => axios.post(url, data, { ...defaultOptions, ...options });
  const put = (url: string, data: any, options?: any) => axios.put(url, data, { ...defaultOptions, ...options });
  const deleteRequest = (url: string, options?: any) => axios.delete(url, { ...defaultOptions, ...options });

  React.useEffect(() => {
    // @ts-ignore
    axios.interceptors.request.use((config: AxiosRequestConfig) => {
      if (!config.headers) {
        // @ts-ignore
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, [token]);

  const scanphish = new Scanphish({
    get: (url: string, options?: any) => axios.get(url, { ...defaultOptions, ...options }).then((res: AxiosResponse) => res.data),
    post: (url: string, data: any, options?: any) => axios.post(url, data, { ...defaultOptions, ...options }).then((res: AxiosResponse) => res.data),
    put: (url: string, data: any, options?: any) => axios.put(url, data, { ...defaultOptions, ...options }).then((res: AxiosResponse) => res.data),
    delete: (url: string, options?: any) => axios.delete(url, { ...defaultOptions, ...options }).then((res: AxiosResponse) => res.data),
  });

  return {
    client: {
      get,
      post,
      put,
      delete: deleteRequest,
    },
    sdk: {
      scanphish,
    }
  };
}
