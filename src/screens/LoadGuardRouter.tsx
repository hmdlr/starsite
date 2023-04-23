import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLoadGuard } from "../hooks/useLoadGuard";
import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Auth } from "./auth/login";
import { Register } from "./auth/register";
import { Configure } from "./configuration";
import { Home } from "./home";
import { ProvideConfigurations } from "../hooks/configurations/useConfigurations";
import { CreateCustomConfig } from "./editor/CreateCustomConfig";
import { CustomConfigRulesets } from "./editor/CustomConfigRulesets";
import { ProvideRulesets } from "../hooks/configurations/useRulesets";
import { CreateRuleset } from "./editor/ruleset/CreateRuleset";

export const LoadGuardRouter = () => {
  const { cacheLoaded, LoadGuard } = useLoadGuard();
  // const { AuthGuard } = useAuthGuard();

  return (
      <div style={{ zIndex: 2, width: '100%', flexDirection: 'column' }}>
        <Navbar/>
        {!cacheLoaded && (
            <LoadGuard/>
        )}
        {cacheLoaded && (
            <>
              {/*<AuthGuard/>*/}
              <ProvideConfigurations>
                <ProvideRulesets>
                  <Router>
                    <Routes>
                      <Route path={"/"} element={<Home/>}/>
                      <Route path={"/auth"} element={<Auth/>}/>
                      <Route path={"/auth/register"} element={<Register/>}/>
                      <Route path={"/configure"} element={<Configure/>}/>
                      <Route path={"/configure/editor"} element={<CreateCustomConfig/>}/>
                      <Route path={"/configure/editor/rulesets/:configId"} element={<CustomConfigRulesets/>}/>
                      <Route path={"/ruleset/create"} element={<CreateRuleset/>}/>
                    </Routes>
                  </Router>
                </ProvideRulesets>
              </ProvideConfigurations>
            </>
        )}
      </div>

  );
};
