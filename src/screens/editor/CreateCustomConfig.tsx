import './createCustomConfig.scss';
import { useConfigurations } from "../../hooks/configurations/useConfigurations";
import { IConfigCreatePayload } from "@hmdlr/types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateCustomConfig = () => {
  const { create, createdConfig } = useConfigurations();

  const navigate = useNavigate();

  const [config, setConfig] = useState<IConfigCreatePayload>({ name: '' });


  const updateConfigName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      name: e.target.value
    });
  };

  const createConfigGoToEnhancePage = async () => {
    await create(config);
  };

  useEffect(() => {
    if (!createdConfig?.id) {
      return;
    }
    navigate(`/configure/editor/rulesets/${createdConfig?.id}`);
  }, [createdConfig]);

  return (
      <div className={'custom__config'}>
        <div className={'custom__config__config_name'}>
          <span>What will this configuration be named?</span>
          <input
              type="text"
              placeholder={'Blast shield 99'}
              onChange={updateConfigName}
              value={config.name}
          />
        </div>
        <div className={'custom__config__image_and_next'}>
          <img src="/configurations/settings.svg" alt=""/>
          <div className={'custom__config__image_and_next__button'}>
            <button
                className={'green_neon_button_xl'}
                onClick={createConfigGoToEnhancePage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
  );
};
