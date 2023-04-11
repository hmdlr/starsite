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
import { ProvideStorage } from "./hooks/useStorage";
import { Configure } from "./screens/protect";
import { ProvideLoadGuard } from "./hooks/useLoadGuard";
import { LoadGuardRouter } from "./screens/LoadGuardRouter";


export const App = () => {
  return (
      <div style={{ display: 'flex', height: '100vh', width: '100%', overflowX: 'hidden' }}>
        <ProvideStorage>
          <ProvidePopup>
            <ProvideUrl>
              <ProvideAuth>
                <ProvideClient>
                  <ProvideLoadGuard>
                    <GradientBody>
                      <LoadGuardRouter/>
                    </GradientBody>
                  </ProvideLoadGuard>
                </ProvideClient>
              </ProvideAuth>
            </ProvideUrl>
          </ProvidePopup>
        </ProvideStorage>
        <Bubbles/>
      </div>
  )
      ;
};
