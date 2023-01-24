import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { getParsedJwt } from "../utils/utils";
import { useClient } from "./useClient";
import env from "../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";

const authContext = React.createContext<{
  username: string | undefined;
  token: string | undefined;
  signIn: (username: string, password: string) => Promise<AxiosResponse>;
  signOut: () => void;
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
  const { client } = useClient();

  const signIn = async (username: string, password: string): Promise<AxiosResponse> => {
    const response = await client.post<{ token: string }>(
        `${env.api[Microservice.Authphish]}/auth`,
        { username, password }
    );
    if (response.data.token) {
      setToken(response.data.token);
      setUsername(getParsedJwt<{ username: string }>(response.data.token)?.username);
    }
    return response;
  };

  /* After token is set */
  useEffect(() => {
    localStorage.setItem("token", token || "");
  }, [token]);

  /* On page startup */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setUsername(getParsedJwt<{ username: string }>(token)?.username);
    }
  }, []);

  const signOut = () => {
    setUsername(undefined);
  };

  return {
    username,
    token,
    signIn,
    signOut,
  };
}
