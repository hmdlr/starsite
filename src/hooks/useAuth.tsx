import axios, { AxiosResponse } from "axios";
import React, { useCallback } from "react";
import { DeployedPaths, Microservice } from "@hmdlr/utils/dist/Microservice";

const authContext = React.createContext<{
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
  signOut: () => Promise<void>;
  /**
   * Send the extension token to the backend
   * @param extToken
   */
  sendExtToken: (extToken: string) => Promise<any | undefined>;
  /**
   * Get the user id from the cookie
   */
  getUserIdCookie: () => string | undefined;
}>(undefined!);

export const ProvideAuth = ({ children }: { children: any }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(authContext);
};

function useProvideAuth() {
  const signIn = async (
    username: string,
    password: string,
  ): Promise<AxiosResponse> => {
    const response = await axios.post<{ token: string }>(
      `${DeployedPaths[Microservice.Authphish]}/api/auth`,
      { username, password },
      { withCredentials: true },
    );
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

  const sendExtToken = async (extToken: string): Promise<any | undefined> => {
    if (!getCookieId()) return;
    await axios.put(
      `${DeployedPaths[Microservice.Authphish]}/api/auth/ext-token`,
      { halfToken: extToken },
      { withCredentials: true },
    );
  };

  const signOut = async () => {
    await axios.delete(
      `${DeployedPaths[Microservice.Authphish]}/api/auth/cookies`,
      { withCredentials: true },
    );
  };

  const getUserIdCookie = useCallback(() => {
    return getCookieId();
  }, []);

  return {
    signIn,
    signUp,
    signOut,
    sendExtToken,
    getUserIdCookie,
  };
}

const getCookieId = (): string | undefined => {
  const cookie = document.cookie
    .split(";")
    .find((c) => c.startsWith("user-id="));
  if (!cookie) return;
  return cookie.split("=")[1];
};
