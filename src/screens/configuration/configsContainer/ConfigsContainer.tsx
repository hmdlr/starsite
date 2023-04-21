import './configContainer.scss';
import { ConfigBox } from "./ConfigBox";
import { useConfigurations } from '../../../hooks/configurations/useConfigurations';
import strings from '../../../strings.json';

export const ConfigsContainer = () => {
  const { configs, handleChangeActiveState } = useConfigurations();

  return (
      <div className={'configs__container'}>
        <div className={'configs__container__configboxes'}>

          {
            configs.map((config) => (
                    ConfigBox({ config, changeActiveState: handleChangeActiveState })
                )
            )
          }
        </div>

        <div className={'configs__container__vertical_line'}/>

        <div className={'configs__container__premium_message'}>
          <span>
            {
              strings.premium_message_config_screen.first
            }
          </span>
          <span>
            {
              strings.premium_message_config_screen.second
            }
          </span>
        </div>

        {/* hackish but cool */}
        <div></div>
      </div>
  );
};
