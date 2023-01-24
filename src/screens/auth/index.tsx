import { Microservice } from "@hmdlr/utils/dist/Microservice";
import { useState } from "react";
import { redirect } from "react-router-dom";
import env from "../../env";
import { useUrl } from "../../hooks/useUrl";
import { useAuth } from "../../hooks/useAuth";

export const Auth = () => {
  const { parameters } = useUrl();
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn(username, password);
    if (response.status !== 200) {
      return alert("Invalid credentials");
    }
    redirect(parameters.redirect || "/"); // todo: think logic gate for signed in users and what to do after sign in
  };

  return (
      <div>
        <form
            onSubmit={handleSubmit}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}>

            <input
                type="text"
                className={'login-input'}
                placeholder={'@username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className={'login-input'}
                placeholder={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type={'submit'} className={'login-button'}>Login</button>
          </div>
        </form>
      </div>
  );
};
