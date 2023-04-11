import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { getParsedJwt } from "../utils/utils";
import env from "../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";
import { useStorage } from "./useStorage";

const authContext = React.createContext<{
  username: string | undefined;
  token: string | undefined;
  signIn: (username: string, password: string) => Promise<AxiosResponse>;
  signUp: (username: string, name: string, password: string, email: string) => Promise<AxiosResponse>;
  signOut: () => void;
  sendExtToken: (extToken: string) => Promise<any | undefined>;
}>(undefined!);

export const ProvideAuth = ({ children }: { children: any }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(authContext);
};

function useProvideAuth() {
  const [username, setUsername] = React.useState<string>();
  const [token, setToken] = React.useState<string>();
  const { storeToken, getStoredToken } = useStorage();


  const signIn = async (username: string, password: string): Promise<AxiosResponse> => {
    const response = await axios.post<{ token: string }>(
        `${env.api[Microservice.Authphish]}/api/auth`,
        { username, password }
    );
    if (response.data.token) {
      setToken(response.data.token);
      storeToken(response.data.token);
      setUsername(getParsedJwt<{ username: string }>(response.data.token)?.username);
    }
    return response;
  };

  const signUp = async (username: string, name: string, password: string, email: string): Promise<AxiosResponse> => {
    return await axios.post<void>(
        `${env.api[Microservice.Authphish]}/api/auth/signup`,
        { username, name, password, email }
    );
  }

  /* On page startup */
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      setToken(token);
      setUsername(getParsedJwt<{ username: string }>(token)?.username);
    }
  }, []);

  const signOut = () => {
    setUsername(undefined);
  };

  const sendExtToken = useCallback(
      async (extToken: string): Promise<any | undefined> => {
        if (!token) return;
        return await fetch(
            `${env.api[Microservice.Authphish]}/auth/ext-token`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({ halfToken: extToken })
            }
        );
      }
      , [token]);

  return {
    username,
    token,
    signIn,
    signUp,
    signOut,
    sendExtToken,
  };
}
