import React from "react";
import { useStorage } from "./useStorage";

const loadGuardContext = React.createContext<{
  cacheLoaded: boolean;
  LoadGuard: React.FC;
}>({
  cacheLoaded: false,
  LoadGuard: () => null
});

export const useLoadGuard = () => React.useContext(loadGuardContext);

export const ProvideLoadGuard = ({ children }: { children: any }) => {
  const { cacheLoaded, LoadGuard } = useProvideLoadGuard();
  return (
      <loadGuardContext.Provider value={{ cacheLoaded, LoadGuard }}>
        {children}
      </loadGuardContext.Provider>
  );
};

function useProvideLoadGuard() {
  const [cacheLoaded, setCacheLoaded] = React.useState<boolean>(false);
  const { token } = useStorage();

  const LoadGuard = () => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      </div>
  );

  React.useEffect(() => {
    if (token !== undefined) {
      setCacheLoaded(true);
    }
  }, [token]);

  return {
    cacheLoaded,
    LoadGuard,
  };
}
