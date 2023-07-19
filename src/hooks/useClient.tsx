import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { AxiosClient } from "@hmdlr/types";
import { Scanphish } from "@hmdlr/utils";
import env from "../env";
import { DeployedPaths, Microservice } from "@hmdlr/utils/dist/Microservice";
import { useStorage } from "./useStorage";

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
  const { token } = useStorage();
  const scanphishAxios = axios.create({
    baseURL: DeployedPaths[Microservice.Scanphish]
  })

  // use axiosCall
  const get = (url: string, options?: any) => axios.get(url, { ...defaultOptions, ...options });
  const post = (url: string, data: any, options?: any) => axios.post(url, data, { ...defaultOptions, ...options });
  const put = (url: string, data: any, options?: any) => axios.put(url, data, { ...defaultOptions, ...options });
  const deleteRequest = (url: string, options?: any) => axios.delete(url, { ...defaultOptions, ...options });

  const axiosDynamicInterceptor = useCallback((config: AxiosRequestConfig) => {
    if (!token) {
      return config;
    }
    if (!config.headers) {
      // @ts-ignore
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, [token]);

  useEffect(() => {
    axios.interceptors.request.clear();
    scanphishAxios.interceptors.request.clear();
    // @ts-ignore
    axios.interceptors.request.use(axiosDynamicInterceptor);
    // @ts-ignore
    scanphishAxios.interceptors.request.use(axiosDynamicInterceptor);
  }, [axiosDynamicInterceptor])

  const scanphish = new Scanphish({
    get: (url: string, options?: any) => scanphishAxios.get(url, { ...defaultOptions, ...options }).then((res: AxiosResponse) => res.data),
    post: (url: string, data: any, options?: any) => scanphishAxios.post(url, data, { ...defaultOptions, ...options }).then((res: AxiosResponse) => res.data),
    put: (url: string, data: any, options?: any) => scanphishAxios.put(url, data, { ...defaultOptions, ...options }).then((res: AxiosResponse) => res.data),
    delete: (url: string, options?: any) => scanphishAxios.delete(url, { ...defaultOptions, ...options }).then((res: AxiosResponse) => res.data),
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
