import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLoadGuard } from "../hooks/useLoadGuard";
import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Auth } from "./auth/login";
import { Register } from "./auth/register";
import { Home } from "./home";
import { PrivacyPolicy } from "./privacy-policy/PrivacyPolicy";

export const LoadGuardRouter = () => {
  const { cacheLoaded, LoadGuard } = useLoadGuard();
  // const { AuthGuard } = useAuthGuard();

  return (
    <div style={{ zIndex: 2, width: "100%", flexDirection: "column" }}>
      <Navbar />
      {!cacheLoaded && <LoadGuard />}
      {cacheLoaded && (
        <>
          {/*<AuthGuard/>*/}
          <Router>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/auth"} element={<Auth />} />
              <Route path={"/auth/register"} element={<Register />} />
              <Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
};
