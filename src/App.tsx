import GradientBody from "./components/gradientBody/GradientBody";
import Bubbles from "./components/bubbles/FloatingBubbles";
import { ProvideUrl } from "./hooks/useUrl";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideClient } from "./hooks/useClient";
import { ProvidePopup } from "./hooks/popup/usePopup";
import { ProvideStorage } from "./hooks/useStorage";
import { ProvideLoadGuard } from "./hooks/useLoadGuard";
import { LoadGuardRouter } from "./screens/LoadGuardRouter";

export const App = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <ProvideStorage>
        <ProvidePopup>
          <ProvideUrl>
            <ProvideAuth>
              <ProvideClient>
                <ProvideLoadGuard>
                  <GradientBody>
                    <LoadGuardRouter />
                  </GradientBody>
                </ProvideLoadGuard>
              </ProvideClient>
            </ProvideAuth>
          </ProvideUrl>
        </ProvidePopup>
      </ProvideStorage>
      <Bubbles />
    </div>
  );
};
