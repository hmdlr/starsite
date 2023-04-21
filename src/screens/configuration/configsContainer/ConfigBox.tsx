import './configBox.scss';
import { Img } from "../../../components/protectedImage/Img";
import { ConfigModel } from "../../../models/ConfigModel";
import { ConfigLogoTitle } from "./ConfigLogoTitle";

export const ConfigBox = (props: {
  config: ConfigModel,
  changeActiveState: (config: ConfigModel) => void
}) => {
  const { config, changeActiveState } = props;

  return (
      <div className={'config__configbox'} key={config.id}>
        <div className={'configbox__active_row'}>

          <div
              className={`configbox__title__container ${config.active ? 'active' : ''}`}
              onClick={() => {
                changeActiveState(config);
              }}
          >
            <ConfigLogoTitle config={config}/>
          </div>
          {
              config.active &&
              <span style={{
                fontSize: '0.6rem'
              }}>🟢</span>
          }
        </div>

        <div className={'configbox__rulesets'}>
        </div>
      </div>
  );
};
