import { useConfigurations } from "../../hooks/configurations/useConfigurations";
import { ConfigBox } from "./configsContainer/ConfigBox";
import { useEffect } from "react";

export const ConfigOverview = () => {

  const {
    configs,
    handleChangeActiveState,
    loadAllConfigs,
    presets
  } = useConfigurations();

  useEffect(() => {
    if (presets === undefined) {
      return;
    }
    loadAllConfigs();
    /* we must wait for the presets to load */
  }, [presets]);

  return (
      <div className={'config_overview mt80'}>
        <div className={'config_overview__header_text'}>
          <span>
            Select the configuration that suits you best
          </span>
        </div>
        <div className={'configs__container'}>
          <div className={'configs__container__configboxes'}>
            {
              configs.map((config, idx) => (
                      <ConfigBox key={idx} config={config} changeActiveState={handleChangeActiveState}/>
                  )
              )
            }
          </div>
        </div>
      </div>
  );
};
