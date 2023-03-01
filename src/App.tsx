import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./screens/auth";
import { Home } from "./screens/home";
import GradientBody from "./components/gradientBody/GradientBody";
import Bubbles from "./components/bubbles/FloatingBubbles";
import { ProvideUrl } from "./hooks/useUrl";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideClient } from "./hooks/useClient";
import { Navbar } from "./components/navbar/Navbar";


export const App = () => {
  return (
      <div style={{ display: 'flex', height: '100vh', width: '100%', overflowX: 'hidden' }}>
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
                    </Routes>
                  </Router>
                </div>
              </GradientBody>
            </ProvideClient>
          </ProvideAuth>
        </ProvideUrl>
        <Bubbles/>
      </div>
  )
      ;
};
