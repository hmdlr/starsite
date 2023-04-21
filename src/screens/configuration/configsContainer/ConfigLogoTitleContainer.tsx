import { ConfigLogoTitle } from "./ConfigLogoTitle";
import { IConfig } from "@hmdlr/types";
import './configBox.scss'

export const ConfigLogoTitleContainer = (props: {
  config?: IConfig,
}) => {

  const { config } = props;

  return (
    <div className={'config_logo_title_container'}>
      <ConfigLogoTitle config={config}/>
    </div>
  );
}
