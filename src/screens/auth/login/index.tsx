import "../auth.scss";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { LoadingButton } from "../../../components/loadingButton/LoadingButton";
import { usePopup } from "../../../hooks/popup/usePopup";
import { DeployedPaths } from "@hmdlr/utils";
import { FrontPaths } from "@hmdlr/utils/dist/Microservice";

export const Auth = () => {
  const { popup } = usePopup();
  const { signIn, signOut, sendExtToken, getUserIdCookie } = useAuth();

  const parameters = new URLSearchParams(window.location.search);

  const extToken = parameters.get("ext-token");
  const extTokenQuery = extToken ? `?ext-token=${extToken}` : "";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const signInAction = async () => {
    try {
      const response = await signIn(username, password);
      if (response.status === 200) {
        if (parameters.get("ext-token")) {
          await sendExtToken(parameters.get("ext-token")!);
        }
      } else {
        return popup.error("Invalid username or password.");
      }
      // hard redirect to query param "redirect" string, if empty go to "/?signin=completed"
      const redirect = parameters.get("redirect") || "/?signin=completed";
      window.location.replace(redirect);
    } catch (e: any) {
      popup.error(
        e?.response?.data?.error ||
          "A network error occurred. Please try again later.",
      );
    }
  };

  useEffect(() => {
    const oauthState = parameters.get("oauth");
    const extToken = parameters.get("ext-token");
    const signInCompleted = parameters.get("signin");

    if (getUserIdCookie() && (!extToken || !signInCompleted || !oauthState)) {
      (async () => {
        await signOut();
        // refresh the page to clear the cookie
        window.location.reload();
      })();
    }

    (async () => {
      console.log("oauthState", oauthState);
      if (oauthState === "success") {
        if (parameters.get("ext-token")) {
          await sendExtToken(parameters.get("ext-token")!);
          popup.success("Successfully signed in with the extension 🎊");
        } else {
          popup.success("Successfully signed in ⚡");
        }

        console.log("redirecting...");
        setTimeout(() => {
          window.location.replace(
            `${FrontPaths["workspace"]}?signin=completed`,
          );
        }, 1000);
      }
    })();
  }, [parameters.get("oauth")]);

  return (
    <div className={"auth_container"}>
      <form onSubmit={handleSubmit} autoComplete={"new-password"}>
        <div className={"auth_container_form pt30 pb30 pl70 pr70"}>
          <div className={"auth_classic_container"}>
            <div className="did-floating-label-content input-group">
              <span className="input-group-prepend">
                <div className="input-group-text">@</div>
              </span>
              <input
                className="did-floating-input"
                type="text"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete={"new-password"}
              />
              <label className="did-floating-label">username</label>
            </div>

            <div className="did-floating-label-content input-group mt20">
              <span className="input-group-prepend">
                <div className="input-group-text">
                  <img src="/password.svg" alt="" />
                </div>
              </span>
              <input
                className="did-floating-input"
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={"new-password"}
              />
              <label className="did-floating-label">password</label>
            </div>

            <LoadingButton
              text={"Sign in"}
              callbackFn={signInAction}
              className={"mt15"}
            />
            <p>
              Don't have an account? <a href={"/auth/register"}>Sign up</a>
            </p>
          </div>
          <div className={"auth_social_container mt20"}>
            <button
              onClick={async () => {
                await signOut();
                window.location.replace(
                  `${DeployedPaths.authphish}/api/auth/federated/google${extTokenQuery}`,
                );
              }}
            >
              <img
                src={"/brands/google.svg"}
                alt={"google"}
                className={"mr10"}
              />
              Continue with Google
            </button>
            {/* <button> */}
            {/*   <img */}
            {/*     src={"/brands/github.svg"} */}
            {/*     alt={"github"} */}
            {/*     className={"mr10"} */}
            {/*   /> */}
            {/*   Continue with Github */}
            {/* </button> */}
          </div>
        </div>
      </form>
    </div>
  );
};
