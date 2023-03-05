import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./screens/auth/login";
import { Home } from "./screens/home";
import GradientBody from "./components/gradientBody/GradientBody";
import Bubbles from "./components/bubbles/FloatingBubbles";
import { ProvideUrl } from "./hooks/useUrl";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideClient } from "./hooks/useClient";
import { Navbar } from "./components/navbar/Navbar";
import { Register } from "./screens/auth/register";
import { ProvidePopup } from "./hooks/popup/usePopup";


export const App = () => {
  return (
      <div style={{ display: 'flex', height: '100vh', width: '100%', overflowX: 'hidden' }}>
        <ProvidePopup>
          <ProvideUrl>
            <ProvideAuth>
              <ProvideClient>
                <GradientBody>
                  <div style={{ zIndex: 2, width: '100%', flexDirection: 'column' }}>
                    <Navbar/>
                    <Router>
                      <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/auth"} element={<Auth/>}/>
                        <Route path={"/auth/register"} element={<Register/>}/>
                      </Routes>
                    </Router>
                  </div>
                </GradientBody>
              </ProvideClient>
            </ProvideAuth>
          </ProvideUrl>
        </ProvidePopup>
        <Bubbles/>
      </div>
  )
      ;
};
