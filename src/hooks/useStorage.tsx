import React, { useEffect } from "react";

export const storageContext = React.createContext<{
  storeToken: (token: string) => void;
  getStoredToken: () => string | undefined;
  token: string | undefined;
}>(undefined!);

export const ProvideStorage = ({ children }: { children: any }) => {
  const storage = useProvideStorage();
  return <storageContext.Provider value={storage}>{children}</storageContext.Provider>;
};

export const useStorage = () => {
  return React.useContext(storageContext);
};

function useProvideStorage() {
  const [token, setToken] = React.useState<string>();

  const storeToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const getStoredToken = () => {
    return localStorage.getItem("token") || undefined;
  };

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      setToken(token);
    }
  }, []);

  return {
    storeToken,
    getStoredToken,
    token
  };
}
