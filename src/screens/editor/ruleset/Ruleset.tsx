import { IBrand } from "@hmdlr/types/dist/brands/IBrand";
import './ruleset.scss'
import { Img } from "../../../components/protectedImage/Img";

export const Ruleset = (props: {
  ruleset?: IBrand
}) => {
  const { ruleset } = props;

  return (
    <div className={'ruleset'}>
      <Img src={ruleset?.logo} alt=""/>
      <span>{ruleset?.name}</span>
    </div>
  );
}
