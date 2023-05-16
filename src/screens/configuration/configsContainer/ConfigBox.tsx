import './configBox.scss';
import { Img } from "../../../components/protectedImage/Img";
import { ConfigModel } from "../../../models/ConfigModel";
import { ConfigLogoTitle } from "./ConfigLogoTitle";
import { useAuth } from "../../../hooks/useAuth";
import { ImageWithContrast } from '../../../components/protectedImage/ImageWithContrast';

export const ConfigBox = (props: {
  config: ConfigModel,
  changeActiveState: (config: ConfigModel) => void
}) => {
  const { config, changeActiveState } = props;

  const { getId } = useAuth();

  return (
      <div className={'config__configbox'} key={config.id}>
        <div className={'configbox__active_row'}>
          <div className={'configbox__title_and_rulesets'}>
            <div className={'configbox__title_active_state'}>
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
              {
                config.brands.slice(0, 4).map((brand) => (
                    <Img
                        className={'ruleset_logo'}
                        src={brand.logo}
                        alt={brand.name}
                        key={brand.id}/>
                ))
              }
            </div>
          </div>
        </div>

        {
            config.creatorId === getId() && (
            <div className={'configbox__edit'}>
                <a href={`/configure/editor/rulesets/${config.id}`}>⚙</a>
            </div>
          )
        }

      </div>
  );
};
