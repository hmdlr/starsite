import { FrontPaths } from "@hmdlr/utils";
import React from "react";
import { usePopup } from "./popup/usePopup";
import { useAuth } from "./useAuth";

const afterAuthContext = React.createContext<{
  handleAfterAuth: () => Promise<void>;
}>(undefined!);

export const ProvideAfterAuth = ({ children }: { children: any }) => {
  const afterAuth = useProvideAfterAuth();
  return (
    <afterAuthContext.Provider value={afterAuth}>
      {children}
    </afterAuthContext.Provider>
  );
};

export const useAfterAuth = () => {
  return React.useContext(afterAuthContext);
};

function useProvideAfterAuth() {
  const { sendExtToken, getUserIdCookie, signOut } = useAuth();
  const { popup } = usePopup();

  const handleAfterAuth = async () => {
    const parameters = new URLSearchParams(window.location.search);
    const oauthState = parameters.get("oauth");
    const extToken = parameters.get("ext-token");
    const signInCompleted = parameters.get("signin");

    if (oauthState === "success") {
      if (parameters.get("ext-token")) {
        await sendExtToken(parameters.get("ext-token")!);
        popup.success("Successfully signed in with the extension 🎊");
      } else {
        popup.success("Successfully signed in ⚡");
      }

      setTimeout(() => {
        window.location.replace(`${FrontPaths["workspace"]}?signin=completed`);
      }, 1000);
    }

    if (getUserIdCookie() && extToken && !oauthState && !signInCompleted) {
      await signOut();
      // refresh the page to clear the cookie
      window.location.reload();
    }
  };

  return {
    handleAfterAuth,
  };
}
