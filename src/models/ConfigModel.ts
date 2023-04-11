import { IConfig } from "@hmdlr/types";
import { IBrand } from "@hmdlr/types/dist/brands/IBrand";

export interface ConfigModel extends IConfig {
  id: string;
  name: string;
  creatorId: string;
  logo: string;
  brands: IBrand[];
  active: boolean;
}
