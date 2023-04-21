import { ConfigModel } from "../../models/ConfigModel";
import React, { useEffect } from "react";
import { useClient } from "../useClient";
import { IConfig, IConfigCreatePayload, UUID } from "@hmdlr/types";
import env from "../../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";
import { IBrand } from "@hmdlr/types/dist/brands/IBrand";

export const configurationsContext = React.createContext<{
  configs: ConfigModel[];
  rulesets: IBrand[];
  handleChangeActiveState: (config: ConfigModel) => void;
  createdConfig: IConfig | undefined;
  create: (config: IConfigCreatePayload) => Promise<void>;
  loadRulesets: () => Promise<void>;
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

  const [rulesets, setRulesets] = React.useState<IBrand[]>([]);

  const [createdConfig, setCreatedConfig] = React.useState<IConfig | undefined>(undefined);

  useEffect(() => {
    Promise.all([
      scanphish.listConfigs({
            pageSize: 50
          },
          true,
          true
      ),
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

  useEffect(() => {
    const url = new URL(window.location.href);
    const path = url.pathname.split("/").pop()!;
    if(UUID.isValid(path) && !createdConfig) {
      scanphish.getConfig(path).then(setCreatedConfig);
    }
  }, [])

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
    setCreatedConfig(createdConfig);
  };

  const loadRulesets = async () => {
    const { items } = await scanphish.listBrands({ pageSize: 50 });
    setRulesets(items);
  }

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

  return {
    configs,
    rulesets,
    createdConfig,
    handleChangeActiveState,
    create,
    loadRulesets
  };
}


