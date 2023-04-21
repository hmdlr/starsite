import { useParams } from 'react-router-dom';
import { useConfigurations } from "../../hooks/configurations/useConfigurations";
import { useEffect } from "react";
import { ConfigLogoTitleContainer } from "../configuration/configsContainer/ConfigLogoTitleContainer";

import './createCustomConfig.scss'
import { Ruleset } from "./ruleset/Ruleset";

export const CustomConfigRulesets = () => {

  const { configId } = useParams();


  const { rulesets, loadRulesets, createdConfig } = useConfigurations();

  useEffect(() => {
    loadRulesets();
  }, []);

  return (
      <div className={'ruleset_select'}>
        <div className={'ruleset_select__config_title'}>
          <ConfigLogoTitleContainer config={createdConfig}/>
        </div>

        <div className={'ruleset_select__currently_selected'}>
          <span>Current configuration rulesets:</span>
          <div className={'ruleset_select__dropbox'}>
            {
              rulesets?.map((ruleset) => {
                return (
                    <Ruleset ruleset={ruleset}/>
                );
              })
            }
          </div>
        </div>
      </div>
  );
};
