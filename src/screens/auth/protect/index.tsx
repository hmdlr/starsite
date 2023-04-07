import './protect.scss'
import strings from '../../../strings.json';
import { ConfigsContainer } from "./configsContainer/ConfigsContainer";

export const Protect = () => {
  return (
      <div className={'protect__container'}>
        <div className={'protect__headline'}>
          <h2>
            {strings.protect_screen_headline.first}
            <span className={'protect__headline__green'}>
              {strings.protect_screen_headline.second}
            </span>
          </h2>
          <h2>
            {strings.protect_screen_headline.third}
          </h2>
        </div>
        <ConfigsContainer/>
      </div>
  );
};
