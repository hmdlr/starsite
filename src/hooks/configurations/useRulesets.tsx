import React, { useEffect } from "react";
import { IBrand } from "@hmdlr/types/dist/brands/IBrand";
import { useClient } from "../useClient";
import { useConfigurations } from "./useConfigurations";
import { usePopup } from "../popup/usePopup";
import { IBrandCreatePayload, IBrandUpdatePayload, PagedResults } from "@hmdlr/types";
import env from "../../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";

export const rulesetsContext = React.createContext<{
  /**
   * All rulesets available
   */
  allRulesets: IBrand[];
  /**
   * All rulesets available to pick from
   */
  selectableRulesets: IBrand[];
  /**
   * This will remove the given ruleset from the selectable rulesets and add it to the active rulesets
   * @param ruleset
   */
  markRulesetActive: (ruleset: IBrand) => void;
  /**
   * This will remove the given ruleset from the active rulesets and add it to the selectable rulesets
   * @param ruleset
   */
  markRulesetInactive: (ruleset: IBrand) => void;
  /**
   * All rulesets that are currently active for the current config(in the dropbox zone)
   */
  activeRulesets: IBrand[];
  /**
   * In this state we will store the ruleset that is currently being edited / created
   */
  currentEditRuleset?: Partial<IBrandUpdatePayload>;
  /**
   * This will update the current edit ruleset
   * @param ruleset
   */
  setCurrentEditRuleset: (ruleset: Partial<IBrandUpdatePayload>) => void;
  /**
   * This will load, paginated, the rulesets from the server
   * @param query
   * @param pageNumber
   * @param pageSize
   */
  search(query: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IBrand>>;
  /**
   * This will save the current active rulesets to the current config and redirect to the configs page
   */
  saveRulesetsToConfig(): Promise<void>;
  /**
   * This will create a new ruleset. It will also set the current edit ruleset to the newly created ruleset
   */
  create(ruleset: IBrandCreatePayload): Promise<IBrand>;
  /**
   * Validator for the correctness of the ruleset to be created
   * @param ruleset
   */
  validateCreateRuleset(ruleset?: Partial<IBrandCreatePayload>): ruleset is IBrandCreatePayload;
  /**
   * Will call the enhance endpoint on the ruleset, and return a list of possible logo candidates.
   */
  enhance(rulesetId: string): Promise<Array<string>>;
  /**
   * Will download the logo from the given url and upload it to the server as form data
   * @param rulesetId
   * @param logo
   */
  enhanceUploadLogo(rulesetId: string, logo: string): Promise<void>;
}>(undefined!);

export const ProvideRulesets = ({ children }: { children: any }) => {
  const rulesets = useProvideRulesets();
  return <rulesetsContext.Provider value={rulesets}>{children}</rulesetsContext.Provider>;
};

export const useRulesets = () => {
  return React.useContext(rulesetsContext);
};

function useProvideRulesets() {
  const { scanphish } = useClient().sdk;
  const { client } = useClient();
  const { currentEditConfig } = useConfigurations();
  const { popup } = usePopup();

  const [allRulesets, setAllRulesets] = React.useState<IBrand[]>([]);
  const [activeRulesets, setActiveRulesets] = React.useState<IBrand[]>([]);
  const [selectableRulesets, setSelectableRulesets] = React.useState<IBrand[]>([]);
  const [currentEditRuleset, setCurrentEditRuleset] = React.useState<Partial<IBrandUpdatePayload>>();

  const loadRulesets = async () => {
    const { items } = await scanphish.listBrands({ pageSize: 50 });
    setAllRulesets(items);
    // selectable rulesets are all rulesets that are not active
    setSelectableRulesets(items.filter((r) => !activeRulesets.map((ar) => ar.id).includes(r.id)));
  };

  useEffect(() => {
    if (!currentEditConfig) {
      return;
    }
    setActiveRulesets(currentEditConfig.brands);
    loadRulesets();
  }, [currentEditConfig]);

  const markRulesetActive = (ruleset: IBrand) => {
    if (activeRulesets.map((r) => r.id).includes(ruleset.id)) {
      return;
    }
    setSelectableRulesets(selectableRulesets.filter((r) => r.id !== ruleset.id));
    setActiveRulesets([...activeRulesets, ruleset]);
  };

  const markRulesetInactive = (ruleset: IBrand) => {
    if (selectableRulesets.map((r) => r.id).includes(ruleset.id)) {
      return;
    }
    setActiveRulesets(activeRulesets.filter((r) => r.id !== ruleset.id));
    setSelectableRulesets([...selectableRulesets, ruleset]);
  };

  // todo: search query not implemented on BE
  const search = async (query: string, pageNumber?: number, pageSize?: number) => {
    return scanphish.listBrands({ pageNumber, pageSize });
  };

  const saveRulesetsToConfig = async () => {
    await scanphish.addRulesetsToConfig(currentEditConfig!.id, activeRulesets.map((r) => r.id));
    popup.success("The configuration has been saved with the new rulesets.");
    setTimeout(() => {
      window.location.href = "/configure/overview";
    }, 2000);
  };

  const validateCreateRuleset = (ruleset?: Partial<IBrandCreatePayload>): ruleset is IBrandCreatePayload => {
    if (!ruleset) {
      return false;
    }
    if (!ruleset.authUrl) {
      popup.error("Please enter an auth url for the brand's website");
      return false;
    }
    if (!ruleset.name) {
      popup.error("Please enter a name for the ruleset");
      return false;
    }
    // if (!ruleset.keywords) {
    //   popup.error("Please enter at least one keyword for the ruleset");
    //   return false;
    // }
    return true;
  };

  const create = async (ruleset: IBrandCreatePayload): Promise<IBrand> => {
    const creationPayload = {
      ...ruleset,
      domain: new URL(ruleset.authUrl!).hostname,
    };
    const { brand } = await scanphish.createBrand(creationPayload);
    setCurrentEditRuleset({
      name: ruleset.name,
    });
    return brand;
  };

  const enhance = async (rulesetId: string): Promise<Array<string>> => {
    const { candidates } = await scanphish.enhanceBrand(rulesetId);
    return candidates;
  };

  const enhanceUploadLogo = async (rulesetId: string, logo: string): Promise<void> => {
    const formData = new FormData();

    // download the logo
    const response = await fetch(logo);
    const blob = await response.blob();
    formData.append("logo", blob);

    await client.put(
        `${env.api[Microservice.Scanphish]}/api/brand/${rulesetId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
    );
  };

  return {
    allRulesets,
    activeRulesets,
    selectableRulesets,
    markRulesetActive,
    markRulesetInactive,
    search,
    saveRulesetsToConfig,
    currentEditRuleset,
    setCurrentEditRuleset,
    create,
    enhance,
    validateCreateRuleset,
    enhanceUploadLogo
  };
}
