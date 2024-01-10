import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { getParsedJwt } from "../utils/utils";
import { DeployedPaths, Microservice } from "@hmdlr/utils/dist/Microservice";
import { useStorage } from "./useStorage";

const authContext = React.createContext<{
  /**
   * The username of the currently logged in user
   */
  username: string | undefined;
  /**
   * The JWT token of the currently logged in user
   */
  token: string | undefined;
  /**
   * Sign in the user
   * @param username
   * @param password
   */
  signIn: (username: string, password: string) => Promise<AxiosResponse>;
  /**
   * Sign up a new user
   * @param username
   * @param name
   * @param password
   * @param email
   */
  signUp: (
    username: string,
    name: string,
    password: string,
    email: string,
  ) => Promise<AxiosResponse>;
  /**
   * Sign out the user
   */
  signOut: () => void;
  /**
   * Send the extension token to the backend
   * @param extToken
   */
  sendExtToken: (extToken: string) => Promise<any | undefined>;
  /**
   * Get the id of the currently logged in user
   */
  getId(): string | undefined;
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

  const signIn = async (
    username: string,
    password: string,
  ): Promise<AxiosResponse> => {
    const response = await axios.post<{ token: string }>(
      `${DeployedPaths[Microservice.Authphish]}/api/auth`,
      { username, password },
      { withCredentials: true },
    );
    if (response.data.token) {
      setToken(response.data.token);
      storeToken(response.data.token);
      setUsername(
        getParsedJwt<{ username: string }>(response.data.token)?.username,
      );
    }
    return response;
  };

  const signUp = async (
    username: string,
    name: string,
    password: string,
    email: string,
  ): Promise<AxiosResponse> => {
    return await axios.post<void>(
      `${DeployedPaths[Microservice.Authphish]}/api/auth/signup`,
      { username, name, password, email },
    );
  };

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

  const sendExtToken = async (extToken: string): Promise<any | undefined> => {
    if (!token && !getCookieId()) return;
    await axios.put(
      `${DeployedPaths[Microservice.Authphish]}/api/auth/ext-token`,
      { halfToken: extToken },
      { withCredentials: true },
    );
  };

  const getId = useCallback((): string | undefined => {
    if (!token) return;
    return getParsedJwt<{ id: string }>(token)?.id;
  }, [token]);

  return {
    username,
    token,
    signIn,
    signUp,
    signOut,
    sendExtToken,
    getId,
  };
}

const getCookieId = (): string | undefined => {
  const cookie = document.cookie
    .split(";")
    .find((c) => c.startsWith("user-id="));
  if (!cookie) return;
  return cookie.split("=")[1];
};
