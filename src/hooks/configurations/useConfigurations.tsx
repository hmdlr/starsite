import { ConfigModel } from "../../models/ConfigModel";
import React, { useEffect } from "react";
import { useClient } from "../useClient";
import { IConfig, IConfigCreatePayload, UUID } from "@hmdlr/types";
import env from "../../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";
import { IBrand } from "@hmdlr/types/dist/brands/IBrand";

export const configurationsContext = React.createContext<{
  /**
   * All configs available
   */
  configs: ConfigModel[];
  /**
   * All public configs available (system owned)
   */
  publicOnlyConfigs: ConfigModel[];
  /**
   * This will load all the available configs from the server. This will populate configs.
   */
  loadAllConfigs: () => Promise<void>;
  /**
   * Presets are all the configs that the user currently has active
   */
  presets: IConfig[];
  /**
   * Action when the user sets a config as active/inactive
   * @param config
   */
  handleChangeActiveState: (config: ConfigModel) => void;
  /**
   * The currently selected config
   */
  currentEditConfig: IConfig | undefined;
  /**
   * This will create a new config.
   * @param config
   */
  create: (config: IConfigCreatePayload) => Promise<void>;
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

  const { client } = useClient();

  const [configs, setConfigs] = React.useState<ConfigModel[]>([]);
  const [publicOnlyConfigs, setPublicOnlyConfigs] = React.useState<ConfigModel[]>([]);
  const [presets, setPresets] = React.useState<IConfig[]>([]);
  const [rulesets, setRulesets] = React.useState<IBrand[]>([]);
  const [currentEditConfig, setCurrentEditConfig] = React.useState<IConfig | undefined>(undefined);

  useEffect(() => {
    const url = new URL(window.location.href);
    const path = url.pathname.split("/").pop()!;
    if (UUID.isValid(path) && !currentEditConfig) {
      scanphish.getConfig(path).then(setCurrentEditConfig);
    }

    scanphish.listPresets().then((presets) => {
      console.log(presets);
      setPresets(presets);
    });
  }, []);

  useEffect(() => {
    if (presets.length === 0) {
      return;
    }
    scanphish.listConfigs({
          pageSize: 50
        },
        true,
        true
    ).then((configs) => {
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
          setPublicOnlyConfigs(configModels);
        }
    );
  }, [presets]);

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

  const create = async (config: IConfigCreatePayload) => {
    const { config: createdConfig } = await createConfig(config);
    setCurrentEditConfig(createdConfig);
  };

  const createConfig = (config: IConfigCreatePayload): Promise<{ config: IConfig }> => {
    const formData = new FormData();
    formData.append('name', config.name);
    if (config.logo) {
      formData.append('logo', config.logo.buffer, 'logo');
    }

    return client.post<{ config: IConfig }>(
        `${env.api[Microservice.Scanphish]}/api/config`,
        formData
    ).then((res) => res.data);
  };

  const loadAllConfigs = async () => {
    const { items } = await scanphish.listConfigs({
      pageSize: 50
    }, true, false);

    setConfigs(items
        .map((config): ConfigModel => ({
          ...config,
          active: presets.some((preset) => preset.id === config.id)
        }))
    );
  };

  return {
    configs,
    rulesets,
    currentEditConfig,
    handleChangeActiveState,
    create,
    loadAllConfigs,
    presets,
    publicOnlyConfigs
  };
}


