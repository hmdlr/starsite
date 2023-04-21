import { Img } from "../../../components/protectedImage/Img";
import './configBox.scss';
import { IConfig } from "@hmdlr/types";

export const ConfigLogoTitle = (props: {
  config?: IConfig,
}) => {

  const { config } = props;

  return (
      <div className={'configbox__title'}>
        <Img src={config?.logo} alt=""/>
        <p>{config?.name}</p>
      </div>
  );
};
