import { ConfigModel } from "../../models/ConfigModel";
import React, { useEffect } from "react";
import { useClient } from "../useClient";
import { IConfigCreatePayload } from "@hmdlr/types";

export const configurationsContext = React.createContext<{
  configs: ConfigModel[];
  handleChangeActiveState: (config: ConfigModel) => void;
  createdConfig: Partial<IConfigCreatePayload>;
}>(undefined!);

export const ProvideConfigurations = ({ children }: { children: any }) => {
  const configurations = useProvideConfigurations();
  return <configurationsContext.Provider value={configurations}>{children}</configurationsContext.Provider>;
};

export const useConfigurations = () => {
  return React.useContext(configurationsContext);
};

function useProvideConfigurations() {
  const { scanphish } = useClient().sdk;

  const [configs, setConfigs] = React.useState<ConfigModel[]>([]);

  const [createdConfig, setCreatedConfig] = React.useState<Partial<IConfigCreatePayload>>({});

  useEffect(() => {
    Promise.all([
      scanphish.listConfigs({
        pageSize: 50
      }, true),
      scanphish.listPresets()
    ]).then(([configs, presets]) => {
          // active configs are the configs of which ids are in the presets
          const activeConfigsIds = presets.map((preset) => preset.id);
          const configModels = configs.items
              .filter((config) => activeConfigsIds.includes(config.id))
              .map((config): ConfigModel => ({
                ...config,
                active: true
              }));
          configModels.push(...configs.items
              .filter((config) => !activeConfigsIds.includes(config.id))
              .map((config): ConfigModel => ({
                ...config,
                active: false
              }))
          );
          setConfigs(configModels);
        }, (err) => {
          console.error(err);
        }
    );
  }, []);

  const handleChangeActiveState = (config: ConfigModel) => {
    const newConfigs = configs.map((c) => {
      if (c.id === config.id) {
        return {
          ...c,
          active: !c.active
        };
      }
      return c;
    });
    setConfigs(newConfigs);

    // update on the backend as well
    if (config.active) {
      scanphish.deletePreset(config.id);
    } else {
      scanphish.savePreset(config.id);
    }
  };

  return {
    configs,
    createdConfig,
    handleChangeActiveState
  };
}


