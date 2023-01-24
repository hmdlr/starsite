import * as React from "react";
import { ChakraProvider, extendTheme, ThemeConfig, } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./screens/auth";
import { Home } from "./screens/home";
import GradientBody from "./components/gradientBody/GradientBody";
import Bubbles from "./components/bubbles/FloatingBubbles";
import { ProvideUrl } from "./hooks/useUrl";
import { ProvideAuth } from "./hooks/useAuth";


export const App = () => {
  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };

  const theme = extendTheme({ config });
  return (
      <ChakraProvider theme={theme}>
        <ProvideUrl>
          <ProvideAuth>
            <GradientBody>
              <Router>
                <Routes>
                  <Route path={"/"} element={<Home/>}/>
                  <Route path={"/auth"} element={<Auth/>}/>
                </Routes>
              </Router>
            </GradientBody>
          </ProvideAuth>
        </ProvideUrl>
        <Bubbles/>
      </ChakraProvider>
  );
};
